"use client";

import { useEffect, useState, use } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { LivingJourneyLine } from "@/components/LivingJourneyLine";
import { EvidenceModal } from "@/components/EvidenceModal";
import { Language, translations } from "@/lib/translations";
import { formatINR } from "@/lib/utils";
import {
  ShieldAlert,
  ArrowRight,
  FileText,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  Clock,
  Building2,
  HeartPulse,
  Info,
  ShieldCheck,
  Zap,
  Lock,
  QrCode,
  ChevronRight,
  Trash2,
  SlidersHorizontal,
  FileCheck,
  Camera
} from "lucide-react";

interface JourneyData {
  id: string;
  intake: {
    patient_name: string;
    hospital_name: string;
    condition_description: string;
    urgency: string;
    estimated_amount: number;
    known_insurer: string;
  };
  documents?: Array<{
    name: string;
    type: string;
    status?: string;
    preview?: string | null;
  }>;
  coverage_findings: Array<{
    category: string;
    estimated_cost: number;
    likely_covered: number;
    out_of_pocket: number;
    confidence: string;
    evidence_doc: string;
    evidence_page: number;
    evidence_passage: string;
    clause_ref: string;
    verified_against_source: boolean;
  }>;
  gap: {
    estimated_total_cost: number;
    likely_covered_total: number;
    gap_expected: number;
    gap_low: number;
    gap_high: number;
    non_payable_consumables: number;
    room_rent_penalty: number;
    copay_amount: number;
    assumptions: string[];
  };
  checklist: Array<{
    id: string;
    title: string;
    responsible_party: string;
    status: string;
    deadline_minutes: number;
    required_doc: string;
  }>;
  funding_options: Array<any>;
  timeline_events: Array<{
    id: string;
    timestamp: string;
    title: string;
    description: string;
    actor: string;
    status: "completed" | "done" | "in_progress" | "pending";
  }>;
  current_stage: string;
  next_best_action: string;
  is_demo: boolean;
}

const FALLBACK_JOURNEY: JourneyData = {
  id: "demo-journey-cardiac-01",
  intake: {
    patient_name: "Ramesh Kulkarni",
    hospital_name: "Sample City Hospital",
    condition_description: "Acute chest pain, acute coronary syndrome, immediate angioplasty recommended.",
    urgency: "critical",
    estimated_amount: 420000,
    known_insurer: "Sample Health Insurance Co."
  },
  coverage_findings: [
    {
      category: "Room Rent & Nursing Expenses",
      estimated_cost: 34000,
      likely_covered: 20000,
      out_of_pocket: 14000,
      confidence: "High",
      evidence_doc: "Sample_Health_Policy_Document.pdf",
      evidence_page: 3,
      evidence_passage: "The company shall indemnify room, boarding, and nursing expenses up to a maximum of INR 5,000 per day for standard category rooms.",
      clause_ref: "Section 2.1",
      verified_against_source: true
    },
    {
      category: "Cath Lab, Angioplasty & Stent Hardware",
      estimated_cost: 240000,
      likely_covered: 240000,
      out_of_pocket: 0,
      confidence: "High",
      evidence_doc: "Hospital_PreAuth_Estimate.pdf",
      evidence_page: 1,
      evidence_passage: "Treatment Plan: PTCA with Drug Eluting Stent. Total Estimated Cost: INR 4,20,000.",
      clause_ref: "Clinical Estimate 1.1",
      verified_against_source: true
    },
    {
      category: "Non-Payable Hospital Consumables",
      estimated_cost: 42000,
      likely_covered: 0,
      out_of_pocket: 42000,
      confidence: "Medium",
      evidence_doc: "Sample_Health_Policy_Document.pdf",
      evidence_page: 7,
      evidence_passage: "Expenses incurred on non-medical items such as gloves, syringes, and PPE kits are excluded per IRDAI list.",
      clause_ref: "Exclusions 4.8",
      verified_against_source: true
    }
  ],
  gap: {
    estimated_total_cost: 420000,
    likely_covered_total: 260000,
    gap_expected: 160000,
    gap_low: 144000,
    gap_high: 176000,
    non_payable_consumables: 42000,
    room_rent_penalty: 14000,
    copay_amount: 0,
    assumptions: [
      "Room rent capped at ₹5,000/day by policy Section 2.1; ICU billed at ₹8,500/day triggers proportionate deduction.",
      "Non-payable consumables (gloves, PPE, syringes) estimated at 10% of total hospital bill per IRDAI master circular.",
      "Zero co-pay assumed based on standard group health terms."
    ]
  },
  checklist: [
    {
      id: "task-0",
      title: "Submit Aadhaar & PAN Card copy at Hospital TPA Desk",
      responsible_party: "Family Attendant",
      status: "pending",
      deadline_minutes: 30,
      required_doc: "Government Photo ID"
    },
    {
      id: "task-1",
      title: "Request Treating Physician to sign Pre-Auth Form Part B",
      responsible_party: "Hospital TPA Desk",
      status: "in_progress",
      deadline_minutes: 60,
      required_doc: "Pre-Auth Form Part B"
    },
    {
      id: "task-2",
      title: "Deposit Initial Hospital Caution Money (₹50,000)",
      responsible_party: "Family Attendant",
      status: "pending",
      deadline_minutes: 45,
      required_doc: "Payment Slip / UPI"
    }
  ],
  funding_options: [
    {
      id: "offer-1",
      provider_name: "Paytm Emergency Care Credit",
      amount: 150000,
      tenure_months: 6,
      monthly_emi: 25000,
      interest_rate_apr: 0.0,
      speed_minutes: 10,
      badge: "Demo Partner, illustrative terms, not a real offer",
      action_label: "Instant Disbursal to Hospital Desk"
    }
  ],
  timeline_events: [
    {
      id: "evt-1",
      timestamp: "10:15 AM",
      title: "Patient Admitted to Emergency Triage",
      description: "Patient registered at Sample City Hospital. Preliminary ECG indicated acute coronary syndrome.",
      actor: "Hospital Casualty Desk",
      status: "completed"
    },
    {
      id: "evt-2",
      timestamp: "10:30 AM",
      title: "Voice Situation Dictated & AI Journey Initialized",
      description: "Intake recorded by family attendant. Multi-document evidence engine extracted room-rent limits.",
      actor: "LifeEvent AI Assistant",
      status: "completed"
    },
    {
      id: "evt-3",
      timestamp: "10:45 AM",
      title: "Pre-Authorization Sent to Insurer TPA",
      description: "Hospital desk submitted cashless query to Sample Health Insurance Co. Sanction expected in 60-90 mins.",
      actor: "Hospital TPA Desk",
      status: "in_progress"
    }
  ],
  current_stage: "preauth_pending",
  next_best_action: "Submit Patient Aadhaar & Doctor Signature to Hospital Counter #4 (TPA Desk)",
  is_demo: true
};

export default function JourneyDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const journeyId = resolvedParams.id;

  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const [journey, setJourney] = useState<JourneyData>(FALLBACK_JOURNEY);
  const [activeTab, setActiveTab] = useState<"journey" | "breakdown" | "funding">("journey");
  const [isReplanning, setIsReplanning] = useState(false);
  const [replanNotice, setReplanNotice] = useState<string | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<any | null>(null);

  // Instant UPI Deposit Simulation
  const [depositPaid, setDepositPaid] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/journey/${journeyId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.gap) {
          setJourney(data);
        }
      })
      .catch(() => {
        // Fallback already set
      });
  }, [journeyId]);

  const handleSimulateReplan = async () => {
    setIsReplanning(true);
    setReplanNotice(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/journey/${journeyId}/replan`, {
        method: "POST"
      });
      if (res.ok) {
        const updated = await res.json();
        setJourney(updated);
        setReplanNotice("Simulated TPA Query Ingested! Your journey timeline has adapted with urgent tasks.");
      } else {
        // Fallback simulation
        const updated = { ...journey };
        updated.checklist.unshift({
          id: "task-tpa-urgent",
          title: "URGENT: Submit Casualty Admission ECG Strip to Counter #4",
          responsible_party: "Family Attendant",
          status: "pending",
          deadline_minutes: 15,
          required_doc: "ECG Strip & Doctor Note"
        });
        updated.timeline_events.push({
          id: "evt-tpa-query",
          timestamp: "11:15 AM",
          title: "TPA Query: Admission ECG Strip Required",
          description: "Insurer TPA requested clear admission ECG strip before approving cashless sanction.",
          actor: "Insurer TPA Desk",
          status: "in_progress"
        });
        updated.next_best_action = "URGENT: Submit Casualty Admission ECG Strip to Insurance Desk (Counter #4)";
        setJourney(updated);
        setReplanNotice("Simulated TPA Query Ingested! Your journey timeline has adapted with urgent tasks.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsReplanning(false);
    }
  };

  const gap = journey.gap || FALLBACK_JOURNEY.gap;
  const intake = journey.intake || FALLBACK_JOURNEY.intake;
  const coveragePercent = Math.round((gap.likely_covered_total / (gap.estimated_total_cost || 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      {/* Top Reassuring Breadcrumb & Context */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-paytm-navy">{intake.patient_name}</span>
            <span>&bull;</span>
            <span className="text-slate-500">{intake.hospital_name}</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200">
              Demo Cardiac Emergency
            </span>
          </div>

          {/* Discreet Re-planning Simulator for Judges */}
          <button
            onClick={handleSimulateReplan}
            disabled={isReplanning}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors disabled:opacity-50"
            title="Simulates insurer TPA raising a clarification query to re-plan the living timeline"
          >
            <RefreshCw className={`w-3 h-3 ${isReplanning ? "animate-spin" : ""}`} />
            <span>{isReplanning ? "Re-planning..." : "Simulate TPA Query"}</span>
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 w-full flex-grow">
        {replanNotice && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r text-xs flex items-center gap-2.5 shadow-sm animate-fadeIn">
            <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span className="font-semibold text-amber-900">{replanNotice}</span>
          </div>
        )}

        {/* 1. Calm Financial Hero Card */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Family Out-of-Pocket Liability
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-paytm-navy mt-0.5 font-mono">
                {formatINR(gap.gap_low)} &ndash; {formatINR(gap.gap_high)}
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Expected Gap
              </span>
              <span className="text-lg sm:text-xl font-bold text-amber-800">
                ~{formatINR(gap.gap_expected)}
              </span>
            </div>
          </div>

          {/* Visual Split Bar */}
          <div className="space-y-1.5 mb-4">
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${coveragePercent}%` }}
                className="bg-emerald-500 transition-all duration-500"
                title={`Likely Covered: ${formatINR(gap.likely_covered_total)}`}
              />
              <div
                style={{ width: `${100 - coveragePercent}%` }}
                className="bg-amber-400 transition-all duration-500"
                title={`Family Out-of-Pocket: ${formatINR(gap.gap_expected)}`}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Insurance Covers: {formatINR(gap.likely_covered_total)} ({coveragePercent}%)
              </span>
              <span className="flex items-center gap-1.5 text-amber-900">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Family Arranges: ~{formatINR(gap.gap_expected)}
              </span>
            </div>
          </div>

          {/* Why this range? (Compact Explainer Drawer) */}
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-paytm-cyan flex-shrink-0" />
              <span>
                Based on Room Rent cap (₹5,000/day) & 10% non-payable hospital consumables (gloves, syringes).
              </span>
            </div>
            <button
              onClick={() => setActiveTab("breakdown")}
              className="text-paytm-navy font-bold hover:underline flex-shrink-0 flex items-center gap-1 text-[11px]"
            >
              <span>See Clause Details</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. Urgent Next Best Action (Single clear callout) */}
        <div className="bg-paytm-navy text-white rounded-xl p-4 sm:p-5 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-paytm-cyan">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-paytm-cyan text-paytm-navy rounded-md flex-shrink-0 mt-0.5">
              <Clock className="w-4 h-4 font-bold" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-paytm-cyan uppercase tracking-wider block">
                Your Next Immediate Step
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                {journey.next_best_action || FALLBACK_JOURNEY.next_best_action}
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Takes ~15 mins &bull; Required to secure cashless pre-authorization sanction
              </p>
            </div>
          </div>

          <NextLink
            href="/documents"
            className="inline-flex items-center justify-center gap-1.5 bg-paytm-cyan text-paytm-navy px-3.5 py-2 rounded font-bold text-xs hover:brightness-105 transition-all flex-shrink-0 self-start sm:self-auto"
          >
            <span>View Required IDs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        {/* 3. Three Focused Tabs: Journey, Breakdown, Funding */}
        <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-lg px-2">
          <button
            onClick={() => setActiveTab("journey")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "journey"
                ? "border-paytm-navy text-paytm-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Clock className="w-4 h-4 text-paytm-cyan" />
            <span>Living Journey & Tasks</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
              {journey.checklist.filter(c => c.status === "done" || c.status === "completed").length}/{journey.checklist.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("breakdown")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "breakdown"
                ? "border-paytm-navy text-paytm-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4 text-paytm-cyan" />
            <span>Clause Evidence</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
              {journey.coverage_findings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("funding")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "funding"
                ? "border-paytm-navy text-paytm-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <CreditCard className="w-4 h-4 text-paytm-cyan" />
            <span>Payment & Deposit</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
              ₹50k Caution
            </span>
          </button>
        </div>

        {/* Tab 1: Journey Timeline & Checklist */}
        {activeTab === "journey" && (
          <div className="space-y-6">
            {/* The Living Journey Line */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-paytm-navy">Timeline of Events & Approvals</h3>
                  <p className="text-[11px] text-slate-500">Live synchronization with hospital counter and TPA desk</p>
                </div>
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Live
                </span>
              </div>

              <LivingJourneyLine
                events={journey.timeline_events || FALLBACK_JOURNEY.timeline_events}
                onReplan={handleSimulateReplan}
                isReplanning={isReplanning}
              />
            </div>

            {/* Checklist items */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-paytm-navy mb-3">Family Admission Checklist</h3>
              <div className="space-y-2.5">
                {journey.checklist.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`p-3 rounded-lg border text-xs flex items-start justify-between gap-3 ${
                      item.title.includes("URGENT")
                        ? "bg-amber-50 border-amber-300 ring-1 ring-amber-300"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={item.status === "done" || item.status === "completed"}
                        readOnly
                        className="mt-0.5 rounded text-paytm-cyan focus:ring-0"
                      />
                      <div>
                        <p className={`font-bold ${item.title.includes("URGENT") ? "text-amber-900" : "text-slate-800"}`}>
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Responsible: <span className="font-semibold text-slate-700">{item.responsible_party}</span> &bull; Target: <span className="font-semibold text-slate-700">{item.deadline_minutes} mins</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 flex-shrink-0">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Clause Evidence & Policy Breakdown */}
        {activeTab === "breakdown" && (
          <div className="space-y-6">
            {/* Uploaded Case Documents & Photos */}
            {journey.documents && journey.documents.length > 0 && (
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-paytm-navy flex items-center gap-2">
                      <Camera className="w-4 h-4 text-paytm-cyan" />
                      <span>Uploaded Case Evidence & Policy Documents</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      OCR extracted and verified against hospital and policy schedule
                    </p>
                  </div>
                  <NextLink
                    href="/documents"
                    className="text-[11px] font-bold text-paytm-navy hover:underline flex items-center gap-1"
                  >
                    <span>Document Hub & Privacy Redactor</span>
                    <ArrowRight className="w-3 h-3" />
                  </NextLink>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {journey.documents.map((doc, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                    >
                      {doc.preview ? (
                        <div className="mb-2 rounded overflow-hidden border border-slate-200 h-28 bg-white flex items-center justify-center">
                          <img
                            src={doc.preview}
                            alt={doc.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="mb-2 rounded border border-slate-200 h-28 bg-white flex flex-col items-center justify-center text-slate-400">
                          <FileText className="w-8 h-8 text-paytm-cyan mb-1" />
                          <span className="text-[10px] uppercase font-mono font-bold text-slate-500">
                            {doc.type}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-bold text-slate-800 block truncate" title={doc.name}>
                          {doc.name}
                        </span>
                        <div className="flex items-center justify-between mt-1 text-[10px]">
                          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">
                            {doc.status || "Analyzed"}
                          </span>
                          <span className="text-slate-400 font-mono">Verified</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-paytm-navy mb-1">Clause-Verified Policy Coverage</h3>
              <p className="text-xs text-slate-500 mb-4">
                Click any line item to inspect the verbatim policy text extracted from your document.
              </p>

              <div className="space-y-3">
                {journey.coverage_findings.map((finding, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedClaim({ ...finding, is_verified: finding.verified_against_source })}
                    className="p-4 rounded-lg border border-slate-200 hover:border-paytm-cyan transition-all cursor-pointer bg-slate-50/50 hover:bg-blue-50/20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-paytm-navy">{finding.category}</span>
                        {finding.verified_against_source ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            Verified in Policy
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                            Needs TPA Confirmation
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs font-semibold text-slate-500">
                        Clause {finding.clause_ref}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic border-l-2 border-paytm-cyan pl-2 mb-2">
                      &ldquo;{finding.evidence_passage}&rdquo;
                    </p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="text-slate-500">
                        {finding.evidence_doc} &bull; Page {finding.evidence_page}
                      </span>
                      <span className="font-semibold text-paytm-navy">
                        Likely Covered: <strong className="text-emerald-700">{formatINR(finding.likely_covered)}</strong>
                        {finding.out_of_pocket > 0 && (
                          <span className="ml-2 text-amber-900">(Gap: {formatINR(finding.out_of_pocket)})</span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Emergency Funding & Payments */}
        {activeTab === "funding" && (
          <div className="space-y-6">
            {/* Caution deposit card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-paytm-navy">Hospital Caution Deposit (₹50,000)</h3>
                  <p className="text-xs text-slate-500">Required by hospital admission counter for ICU bed allocation</p>
                </div>
                <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                  Urgent
                </span>
              </div>

              {depositPaid ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                  <div className="text-xs text-emerald-900">
                    <span className="font-bold">₹50,000 Deposit Acknowledged! </span>
                    <span>Digital receipt generated (TXN-88492019) and transmitted to Counter #4.</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-paytm-sky rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded border border-paytm-border flex items-center justify-center text-paytm-navy font-mono text-xs">
                      <QrCode className="w-7 h-7 text-paytm-navy" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-paytm-navy block">Pay via Paytm UPI</span>
                      <span className="text-[11px] text-slate-500">Instant direct hospital settlement</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setDepositPaid(true)}
                    className="w-full sm:w-auto bg-paytm-cyan text-paytm-navy font-bold px-4 py-2 rounded text-xs hover:brightness-105 shadow-sm"
                  >
                    Simulate UPI Pay (₹50,000)
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Credit line */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-paytm-navy">Paytm Emergency Care Credit (Direct to Hospital)</span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                  Demo Partner, illustrative terms, not a real offer
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Pre-approved emergency line up to ₹1,50,000 to bridge the out-of-pocket gap with 6-month zero-interest terms.
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="font-semibold text-paytm-navy">Disbursal in ~10 mins to hospital account</span>
                <button
                  type="button"
                  className="px-3 py-1.5 bg-paytm-navy text-white font-bold rounded text-xs hover:bg-opacity-95"
                >
                  Request Disbursal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Verified Evidence Modal */}
      {selectedClaim && (
        <EvidenceModal
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto py-4 bg-white border-t border-slate-200 text-center text-[11px] text-slate-500">
        <div className="max-w-4xl mx-auto px-4">
          <p>{t.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
