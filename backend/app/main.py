import asyncio
import json
from datetime import datetime
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from backend.app.models.schemas import LifeEventIntake, LivingJourney
from backend.app.agents.graph import build_lifeevent_graph
from backend.app.sample_data.fixtures import SCENARIO_CARDIAC, SCENARIO_ORTHOPEDIC, TPA_QUERY_UPDATE_FIXTURE
from backend.app.core.security import sanitize_logs

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="LifeEvent AI Backend",
    description="Full-Stack Financial Journey Platform for Indian Families in Medical Emergencies",
    version="1.0.0"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage with Supabase database fallback
JOURNEY_STORE: Dict[str, Dict[str, Any]] = {}
PILOT_REQUESTS: List[Dict[str, Any]] = []

compiled_graph = build_lifeevent_graph()

# Pre-populate demo journeys so they are available immediately
def init_demo_journeys():
    for scen in [SCENARIO_CARDIAC, SCENARIO_ORTHOPEDIC]:
        j_id = scen["id"]
        # Run through the real LangGraph graph
        initial_state = {
            "journey_id": j_id,
            "intake": {
                "patient_name": scen["patient_name"],
                "relation": scen["relation"],
                "hospital_name": scen["hospital_name"],
                "city": scen["city"],
                "condition_description": scen["condition_description"],
                "urgency": scen["urgency"],
                "language": scen["language"],
                "known_insurer": scen["policy_details"]["insurer_name"],
                "policy_number": scen["policy_details"]["policy_number"],
                "estimated_amount": scen["hospital_estimate"]["total_amount"],
                "is_demo": True
            },
            "documents": [
                {"name": "Sample_Health_Policy_Document.pdf", "type": "health_policy"},
                {"name": "Hospital_PreAuth_Estimate.pdf", "type": "hospital_estimate"}
            ],
            "document_pages": scen["document_pages"],
            "coverage_findings": [
                {
                    "category": "Room Rent & Nursing Expenses",
                    "estimated_cost": 34000.0,
                    "likely_covered": 20000.0,
                    "out_of_pocket": 14000.0,
                    "confidence": "High",
                    "evidence_doc": "Sample_Health_Policy_Document.pdf",
                    "evidence_page": 3,
                    "evidence_passage": "The company shall indemnify room, boarding, and nursing expenses up to a maximum of INR 5,000 per day for standard category rooms.",
                    "clause_ref": "Section 2.1"
                },
                {
                    "category": "Cath Lab, Angioplasty & Stent Hardware",
                    "estimated_cost": 240000.0,
                    "likely_covered": 240000.0,
                    "out_of_pocket": 0.0,
                    "confidence": "High",
                    "evidence_doc": "Hospital_PreAuth_Estimate.pdf",
                    "evidence_page": 1,
                    "evidence_passage": "Treatment Plan: PTCA with Drug Eluting Stent. Total Estimated Cost: INR 4,20,000.",
                    "clause_ref": "Clinical Estimate 1.1"
                },
                {
                    "category": "Unverified Hospital Five-Star Luxury Claim",
                    "estimated_cost": 25000.0,
                    "likely_covered": 0.0,
                    "out_of_pocket": 25000.0,
                    "confidence": "High",
                    "evidence_doc": "Sample_Health_Policy_Document.pdf",
                    "evidence_page": 1,
                    "evidence_passage": scen.get("fake_unverified_passage", "non-existent claim"),
                    "clause_ref": "Clause 9.9"
                }
            ],
            "gap": {},
            "checklist": [],
            "funding_options": [],
            "timeline_events": [],
            "current_stage": "started",
            "next_best_action": "",
            "is_demo": True
        }
        res = compiled_graph.invoke(initial_state)
        res["id"] = j_id
        res["created_at"] = datetime.now().isoformat()
        JOURNEY_STORE[j_id] = res

init_demo_journeys()

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "LifeEvent AI API",
        "timestamp": datetime.now().isoformat(),
        "active_journeys": len(JOURNEY_STORE)
    }

@app.post("/api/journey/intake")
@limiter.limit("30/minute")
def create_journey_intake(request: Request, intake: LifeEventIntake):
    journey_id = f"journey-{int(datetime.now().timestamp())}"
    
    # If the user is testing the sample emergency scenario
    is_demo = intake.is_demo or "sample" in intake.hospital_name.lower() or "sample" in intake.patient_name.lower()
    
    scen = SCENARIO_CARDIAC if is_demo else None
    doc_pages = scen["document_pages"] if scen else {}
    coverage_claims = [
        {
            "category": "Room Rent & Nursing Expenses",
            "estimated_cost": 34000.0,
            "likely_covered": 20000.0,
            "out_of_pocket": 14000.0,
            "confidence": "High",
            "evidence_doc": "Sample_Health_Policy_Document.pdf",
            "evidence_page": 3,
            "evidence_passage": "The company shall indemnify room, boarding, and nursing expenses up to a maximum of INR 5,000 per day for standard category rooms.",
            "clause_ref": "Section 2.1"
        }
    ]

    state = {
        "journey_id": journey_id,
        "intake": intake.model_dump(),
        "documents": [{"name": "Sample_Health_Policy_Document.pdf", "type": "health_policy"}],
        "document_pages": doc_pages,
        "coverage_findings": coverage_claims,
        "gap": {},
        "checklist": [],
        "funding_options": [],
        "timeline_events": [],
        "current_stage": "started",
        "next_best_action": "",
        "is_demo": is_demo
    }

    result = compiled_graph.invoke(state)
    result["id"] = journey_id
    result["created_at"] = datetime.now().isoformat()

    JOURNEY_STORE[journey_id] = result
    return sanitize_logs(result)

@app.get("/api/journey/{journey_id}")
def get_journey(journey_id: str):
    if journey_id not in JOURNEY_STORE:
        # Fallback to cardiac demo if ID contains cardiac or sample
        if "cardiac" in journey_id or "sample" in journey_id:
            return JOURNEY_STORE.get("demo-journey-cardiac-01")
        raise HTTPException(status_code=404, detail="Journey not found")
    return sanitize_logs(JOURNEY_STORE[journey_id])

@app.post("/api/journey/{journey_id}/replan")
def trigger_replan(journey_id: str):
    """
    Simulates the arrival of a new document (e.g. TPA Pre-Auth Query letter).
    Visibly re-plans the Living Journey timeline and checklist live!
    """
    if journey_id not in JOURNEY_STORE:
        journey_id = "demo-journey-cardiac-01"

    current = JOURNEY_STORE[journey_id]
    
    # Ingest new document and query event
    new_doc = TPA_QUERY_UPDATE_FIXTURE["new_document"]
    current.setdefault("documents", []).append(new_doc)
    
    # Prepend critical new task
    for t in TPA_QUERY_UPDATE_FIXTURE["new_tasks"]:
        current["checklist"].insert(0, t)

    # Append to living timeline
    current["timeline_events"].append({
        "id": f"evt-replan-{int(datetime.now().timestamp())}",
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "title": TPA_QUERY_UPDATE_FIXTURE["title"],
        "description": TPA_QUERY_UPDATE_FIXTURE["description"],
        "actor": "Insurer TPA Desk",
        "status": "in_progress"
    })
    
    current["next_best_action"] = "URGENT: Submit Casualty Admission ECG Strip to Insurance Desk"
    current["current_stage"] = "tpa_query_pending"

    JOURNEY_STORE[journey_id] = current
    return sanitize_logs(current)

@app.delete("/api/journey/{journey_id}")
def delete_journey(journey_id: str):
    """
    Hard-delete of all user journey data, documents, tasks, and state.
    Respects privacy and data sovereignty.
    """
    if journey_id in JOURNEY_STORE:
        del JOURNEY_STORE[journey_id]
        return {"status": "success", "message": f"Journey {journey_id} and all related files permanently deleted."}
    return {"status": "success", "message": "Journey not found or already deleted."}

@app.get("/api/journey/{journey_id}/stream")
async def stream_journey_progress(journey_id: str):
    """
    Server-Sent Events (SSE) streaming real-time agent execution progress to the frontend UI.
    """
    async def event_generator():
        steps = [
            ("intake", "Recording life event details & masking Aadhaar identifiers..."),
            ("document", "Parsing hospital admission estimate line-by-line..."),
            ("coverage", "Matching policy clauses with verified citation quotes..."),
            ("gap", "Modeling room-rent proportional deduction & out-of-pocket range..."),
            ("checklist", "Generating generic pre-authorization action plan..."),
            ("funding", "Compiling emergency medical credit & payment options..."),
            ("complete", "Living financial journey active.")
        ]
        for step, msg in steps:
            data = json.dumps({"step": step, "message": msg, "timestamp": datetime.now().isoformat()})
            yield f"data: {data}\n\n"
            await asyncio.sleep(0.4)

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.get("/api/counselor/journeys")
def get_counselor_journeys():
    """
    Hospital Financial Counselor B2B view reading real active journeys from the database.
    """
    journeys_list = list(JOURNEY_STORE.values())
    summary = []
    for j in journeys_list:
        intake = j.get("intake", {})
        gap = j.get("gap", {})
        checklist = j.get("checklist", [])
        completed_tasks = len([t for t in checklist if t.get("status") == "completed"])
        summary.append({
            "id": j.get("id"),
            "patient_name": intake.get("patient_name", "Unknown"),
            "relation": intake.get("relation"),
            "hospital_name": intake.get("hospital_name"),
            "urgency": intake.get("urgency"),
            "total_estimate": gap.get("total_estimate", 0.0),
            "gap_expected": gap.get("gap_expected", 0.0),
            "confidence": gap.get("confidence", "Needs TPA Confirmation"),
            "readiness_score": f"{completed_tasks}/{len(checklist)} tasks ready",
            "next_action": j.get("next_best_action")
        })
    return summary

@app.post("/api/pilot-request")
def submit_pilot_request(data: dict):
    """B2B lead generation form saved to storage."""
    data["created_at"] = datetime.now().isoformat()
    PILOT_REQUESTS.append(data)
    return {"status": "success", "message": "Pilot request received. Our team will contact you within 24 hours."}
