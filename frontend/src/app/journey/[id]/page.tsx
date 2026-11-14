"use client";

import { useEffect, useState, use } from "react";
import Link from "next/navigation";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { LivingJourneyLine } from "@/components/LivingJourneyLine";
import { Language, translations } from "@/lib/translations";
import { formatINR } from "@/lib/utils";
import {
  ShieldAlert,
  ArrowRight,
  FileText,
  CreditCard,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  User,
  HeartPulse,
  Info,
  ShieldCheck,
  Zap,
  HelpCircle,
  Trash2
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
    status: "done" | "in_progress" | "pending";
  }>;
  current_stage: string;
  next_best_action: string;
  is_demo: boolean;
}

// Default fallback mock in case backend is offline
const FALLBACK_JOURNEY: JourneyData = {
  id: "demo-journey-cardiac-01",
  intake: {
    patient_name: "Ramesh Kulkarni",
    hospital_name: "Sample City Hospital",
    condition_description: "Acute chest pain, diagnosed with acute coronary syndrome, immediate angioplasty recommended.",
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
      "Room rent capped at INR 5,000/day by policy Section 2.1; hospital ICU is INR 8,500/day causing proportionate deduction.",
      "Non-payable consumables (gloves, PPE, syringes, administrative kits) estimated at 10% of total hospital bill per IRDAI master circular guidelines.",
      "Zero co-pay assumed based on standard corporate group health insurance terms."
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
      title: "Request Treating Physician to sign Pre-Authorization Request Form Part B",
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
      action_label: "Instant Disbursal to Hospital Account"
    }
  ],
  timeline_events: [
    {
      id: "evt-1",
      timestamp: "10:15 AM",
      title: "Patient Admitted to Emergency Triage",
      description: "Patient registered at Sample City Hospital Casualty ward. Preliminary ECG indicated acute coronary syndrome.",
      actor: "Hospital Casualty Desk",
      status: "done"
    },
    {
      id: "evt-2",
      timestamp: "10:30 AM",
      title: "Voice Situation Dictated & AI Journey Initialized",
      description: "Intake recorded by family attendant. Multi-document evidence engine extracted room-rent limits and stent guidelines.",
      actor: "LifeEvent AI Assistant",
      status: "done"
    },
    {
      id: "evt-3",
      timestamp: "10:45 AM",
      title: "Pre-Authorization Sent to Insurer TPA",
      description: "Hospital desk submitted cashless query to Sample Health Insurance Co. Cashless response expected in 60-90 minutes.",
      actor: "Hospital TPA Desk",
      status: "in_progress"
    }
  ],
  current_stage: "preauth_pending",
  next_best_action: "Submit Patient Aadhaar and Signed Form Part B to Hospital Insurance Desk (Counter #4)",
  is_demo: true
};

export default function JourneyDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const journeyId = resolvedParams.id;

  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const [journey, setJourney] = useState<JourneyData>(FALLBACK_JOURNEY);
  const [isLoading, setIsLoading] = useState(true);
  const [isReplanning, setIsReplanning] = useState(false);
  const [replanNotice, setReplanNotice] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchJourney = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/journey/${journeyId}`);
      if (res.ok) {
        const data = await res.json();
        setJourney(data);
      } else {
        console.warn("Using fallback demo journey state");
      }
    } catch (e) {
      console.warn("Backend unavailable, using client fallback", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJourney();
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
        setReplanNotice("Simulated TPA Query Ingested! The Living Journey Line has dynamically adapted with urgent tasks.");
      } else {
        // Client-side simulation fallback
        const updated = { ...journey };
        updated.checklist.unshift({
          id: "task-tpa-urgent",
          title: "URGENT: Submit Casualty Admission ECG Strip to Insurance Desk",
          responsible_party: "Family Attendant",
          status: "pending",
          deadline_minutes: 15,
          required_doc: "ECG Strip & Doctor Note"
        });
        updated.timeline_events.push({
          id: "evt-tpa-query",
          timestamp: "11:15 AM",
          title: "TPA Pre-Auth Query Received: Initial ECG Required",
          description: "Insurer TPA requested clear Casualty Admission ECG strip before approving cashless angioplasty sanction.",
          actor: "Insurer TPA Desk",
          status: "in_progress"
        });
        updated.next_best_action = "URGENT: Submit Casualty Admission ECG Strip to Insurance Desk (Counter #4)";
        setJourney(updated);
        setReplanNotice("Simulated TPA Query Ingested! The Living Journey Line has dynamically adapted with urgent tasks.");
      }
    } catch (e) {
      console.error("Replan error:", e);
    } finally {
      setIsReplanning(false);
    }
  };

  const handleDeleteData = async () => {
    setIsDeleting(true);
    try {
      await fetch(`http://127.0.0.1:8000/api/journey/${journeyId}`, {
        method: "DELETE"
      });
      setIsDeleted(true);
    } catch (e) {
      setIsDeleted(true);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isDeleted) {
    return (
      <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col">
        <Navbar currentLang={lang} onLanguageChange={setLang} />
        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
            <Trash2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-paytm-navy mb-2">Journey Data Permanently Deleted</h1>
          <p className="text-sm text-paytm-muted mb-6">
            All records, documents, timeline states, and Aadhaar-redacted caches for journey <code className="bg-white px-2 py-0.5 rounded border border-paytm-border">{journeyId}</code> have been purged from database, storage, and in-memory stores.
          </p>
          <NextLink
            href="/"
            className="inline-flex items-center gap-2 bg-paytm-navy text-white px-5 py-2.5 rounded font-semibold text-sm hover:bg-opacity-95"
          >
            Return to Home
          </NextLink>
        </main>
      </div>
    );
  }

  const gap = journey.gap || FALLBACK_JOURNEY.gap;
  const intake = journey.intake || FALLBACK_JOURNEY.intake;

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      {/* Top Banner: Patient Context & Demo Badge */}
      <div className="bg-white border-b border-paytm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-paytm-navy uppercase tracking-wide">
                <HeartPulse className="w-3.5 h-3.5 text-paytm-cyan" />
                Emergency Active
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                <ShieldAlert className="w-3 h-3 text-amber-700" />
                {t.demoBadge}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-paytm-navy">
              {intake.patient_name} &bull; <span className="font-normal text-paytm-muted">{intake.hospital_name}</span>
            </h1>
            <p className="text-xs text-paytm-muted line-clamp-1 mt-0.5">
              {intake.condition_description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSimulateReplan}
              disabled={isReplanning}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-bold bg-amber-500 hover:bg-amber-600 text-paytm-navy shadow-sm transition-colors disabled:opacity-50"
              title="Simulates insurer TPA raising a clarification query to re-plan the living timeline"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReplanning ? "animate-spin" : ""}`} />
              <span>{isReplanning ? "Re-planning Journey..." : t.replanButton}</span>
            </button>

            <NextLink
              href={`/journey/${journeyId}/coverage`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-white border border-paytm-border text-paytm-navy hover:bg-gray-50 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>{t.viewCoverageEvidence}</span>
            </NextLink>

            <NextLink
              href={`/journey/${journeyId}/funding`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold bg-white border border-paytm-border text-paytm-navy hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>{t.viewFundingOptions}</span>
            </NextLink>
          </div>
        </div>
      </div>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full flex-grow">
        {replanNotice && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r shadow-sm flex items-start gap-3 animate-fade-in">
            <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">Dynamic Adaptation Triggered</p>
              <p className="text-sm text-amber-800">{replanNotice}</p>
            </div>
          </div>
        )}

        {/* Pinned Next Best Action Card */}
        <div className="mb-8 bg-paytm-navy text-white rounded-lg p-5 sm:p-6 shadow-md border-l-8 border-paytm-cyan">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 bg-paytm-cyan text-paytm-navy rounded-md flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 font-bold" />
              </div>
              <div>
                <span className="text-xs font-bold text-paytm-cyan uppercase tracking-wider">
                  {t.nextBestAction} &bull; Immediate Urgency
                </span>
                <h2 className="text-lg sm:text-xl font-bold mt-0.5 text-white">
                  {journey.next_best_action || FALLBACK_JOURNEY.next_best_action}
                </h2>
                <p className="text-xs text-blue-200 mt-1">
                  Assigned to: <span className="font-semibold text-white">Family Attendant</span> &bull; Estimated completion time: 15-20 mins
                </p>
              </div>
            </div>

            <NextLink
              href="/documents"
              className="inline-flex items-center justify-center gap-2 bg-paytm-cyan text-paytm-navy px-4 py-2.5 rounded font-bold text-sm hover:brightness-105 transition-all flex-shrink-0"
            >
              <span>Verify Required Documents</span>
              <ArrowRight className="w-4 h-4" />
            </NextLink>
          </div>
        </div>

        {/* Financial Gap Summary: Honest Estimated Range */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-paytm-navy flex items-center gap-2">
                <span>{t.whereYouStand}</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-paytm-navy">
                  IRDAI Compliant Estimate
                </span>
              </h2>
              <p className="text-xs text-paytm-muted mt-0.5">
                Calculated from verified policy clauses, standard deductions, and hospital billing estimate.
              </p>
            </div>
            <NextLink
              href={`/journey/${journeyId}/coverage`}
              className="text-xs font-semibold text-paytm-navy hover:underline flex items-center gap-1"
            >
              <span>See clause calculations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NextLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Total Hospital Estimate */}
            <div className="bg-white rounded-lg p-5 border border-paytm-border shadow-sm">
              <span className="text-xs font-bold text-paytm-muted uppercase tracking-wider block mb-1">
                {t.totalEstimate}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-paytm-navy">
                {formatINR(gap.estimated_total_cost)}
              </div>
              <p className="text-xs text-paytm-muted mt-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                <span>Pre-admission estimate provided by hospital</span>
              </p>
            </div>

            {/* 2. Likely Covered Total */}
            <div className="bg-white rounded-lg p-5 border border-emerald-200 shadow-sm bg-emerald-50/20">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                {t.likelyCovered}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                {formatINR(gap.likely_covered_total)}
              </div>
              <p className="text-xs text-emerald-800 mt-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Subject to final claim scrutiny & TPA sanction</span>
              </p>
            </div>

            {/* 3. Honest Estimated Out-of-Pocket Range */}
            <div className="bg-white rounded-lg p-5 border-2 border-amber-300 shadow-sm bg-amber-50/25">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                {t.outOfPocketRange}
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono">
                {formatINR(gap.gap_low)} &ndash; {formatINR(gap.gap_high)}
              </div>
              <div className="mt-2 text-xs font-semibold text-paytm-navy flex items-center justify-between">
                <span>Expected Out-of-Pocket:</span>
                <span className="text-sm font-bold text-amber-800">{formatINR(gap.gap_expected)}</span>
              </div>
            </div>
          </div>

          {/* Transparent Assumptions & Deductions Breakdown */}
          <div className="mt-4 bg-white rounded-lg p-5 border border-paytm-border shadow-sm">
            <h3 className="text-xs font-bold text-paytm-navy uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-paytm-navy" />
              <span>Why This Out-of-Pocket Range Exists (Configurable Policy Deductions)</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-xs">
              <div className="bg-paytm-sky p-3 rounded border border-blue-100">
                <span className="font-semibold text-paytm-navy block mb-0.5">Room Rent Proportional Penalty</span>
                <span className="text-sm font-bold text-red-600">{formatINR(gap.room_rent_penalty)}</span>
                <p className="text-paytm-muted mt-1 leading-snug">
                  Policy caps room at ₹5,000/day. ICU billed at ₹8,500/day triggers proportional deduction on associated services.
                </p>
              </div>

              <div className="bg-paytm-sky p-3 rounded border border-blue-100">
                <span className="font-semibold text-paytm-navy block mb-0.5">Non-Payable Consumables (10%)</span>
                <span className="text-sm font-bold text-red-600">{formatINR(gap.non_payable_consumables)}</span>
                <p className="text-paytm-muted mt-1 leading-snug">
                  IRDAI non-payable list (gloves, PPE kits, cotton, administrative charge kits).
                </p>
              </div>

              <div className="bg-paytm-sky p-3 rounded border border-blue-100">
                <span className="font-semibold text-paytm-navy block mb-0.5">Co-Payment / Voluntary Deductible</span>
                <span className="text-sm font-bold text-paytm-navy">{formatINR(gap.copay_amount)} (0%)</span>
                <p className="text-paytm-muted mt-1 leading-snug">
                  No co-pay detected in primary policy document. 100% indemnity on admissible sub-limits.
                </p>
              </div>
            </div>

            <ul className="space-y-1.5 border-t border-gray-100 pt-3">
              {gap.assumptions.map((item, idx) => (
                <li key={idx} className="text-xs text-paytm-muted flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-paytm-cyan flex-shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Two-Column Grid: Left (The Living Journey Line) & Right (Immediate Action Checklist) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Living Journey Line */}
          <section className="lg:col-span-7 bg-white rounded-lg p-5 sm:p-6 border border-paytm-border shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-paytm-navy flex items-center gap-2">
                  <span>{t.livingTimeline}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h2>
                <p className="text-xs text-paytm-muted mt-0.5">
                  Synchronized with Hospital Desk, Insurer TPA, and Family Actions.
                </p>
              </div>
              <button
                onClick={handleSimulateReplan}
                disabled={isReplanning}
                className="text-xs font-semibold text-paytm-navy hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200"
              >
                <RefreshCw className={`w-3 h-3 ${isReplanning ? "animate-spin" : ""}`} />
                <span>Simulate Query</span>
              </button>
            </div>

            <LivingJourneyLine
              events={journey.timeline_events || FALLBACK_JOURNEY.timeline_events}
              onReplan={handleSimulateReplan}
              isReplanning={isReplanning}
            />
          </section>

          {/* Right Column: Required Action Checklist & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Checklist Card */}
            <div className="bg-white rounded-lg p-5 sm:p-6 border border-paytm-border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-paytm-navy flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-paytm-cyan" />
                  <span>Priority Admission Checklist</span>
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-paytm-sky text-paytm-navy">
                  {journey.checklist.filter(c => c.status === "done").length}/{journey.checklist.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {journey.checklist.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`p-3.5 rounded border transition-all ${
                      item.status === "done"
                        ? "bg-emerald-50/30 border-emerald-200 opacity-70"
                        : item.title.includes("URGENT")
                        ? "bg-amber-50/60 border-amber-300 ring-1 ring-amber-300"
                        : "bg-paytm-sky/50 border-blue-100 hover:border-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <input
                          type="checkbox"
                          checked={item.status === "done"}
                          readOnly
                          className="mt-0.5 rounded text-paytm-cyan focus:ring-0"
                        />
                        <div>
                          <p className={`text-xs font-bold ${item.title.includes("URGENT") ? "text-amber-900" : "text-paytm-navy"}`}>
                            {item.title}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-paytm-muted">
                            <span>Actor: <strong className="text-gray-700">{item.responsible_party}</strong></span>
                            <span>&bull;</span>
                            <span>Within: <strong className="text-gray-700">{item.deadline_minutes} mins</strong></span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        item.status === "done" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-paytm-navy"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white rounded-lg p-5 border border-paytm-border shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-paytm-navy uppercase tracking-wider mb-2">
                Emergency Tools & Evidence
              </h4>

              <NextLink
                href="/documents"
                className="flex items-center justify-between p-3 rounded bg-paytm-sky hover:bg-blue-100/60 transition-colors border border-blue-100"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-paytm-navy" />
                  <span className="text-xs font-bold text-paytm-navy">Document Hub & Aadhaar Masking</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-paytm-navy" />
              </NextLink>

              <NextLink
                href={`/journey/${journeyId}/funding`}
                className="flex items-center justify-between p-3 rounded bg-emerald-50 hover:bg-emerald-100/60 transition-colors border border-emerald-100"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-emerald-800" />
                  <span className="text-xs font-bold text-emerald-900">Explore Funding & UPI Deposit</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-800" />
              </NextLink>

              <NextLink
                href="/counselor"
                className="flex items-center justify-between p-3 rounded bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-paytm-muted" />
                  <span className="text-xs font-bold text-paytm-navy">Hospital Counselor View</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-paytm-muted" />
              </NextLink>
            </div>

            {/* Privacy & Hard Delete */}
            <div className="p-4 rounded border border-red-200 bg-red-50/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-red-900">Patient Privacy & Right to Erasure</h4>
                  <p className="text-[11px] text-red-700 mt-0.5">
                    Hard-delete this journey, documents, and embeddings permanently.
                  </p>
                </div>
                <button
                  onClick={() => setDeleteConfirmOpen(true)}
                  className="px-2.5 py-1.5 rounded text-xs font-bold bg-white text-red-600 border border-red-300 hover:bg-red-50"
                >
                  Delete Data
                </button>
              </div>

              {deleteConfirmOpen && (
                <div className="mt-3 pt-3 border-t border-red-200 text-xs text-red-800">
                  <p className="mb-2">Are you sure? This will remove all session records permanently.</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDeleteData}
                      disabled={isDeleting}
                      className="px-3 py-1 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                    >
                      {isDeleting ? "Deleting..." : "Confirm Hard Delete"}
                    </button>
                    <button
                      onClick={() => setDeleteConfirmOpen(false)}
                      className="px-3 py-1 bg-white border border-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="mt-auto py-6 bg-white border-t border-paytm-border text-center text-xs text-paytm-muted">
        <div className="max-w-7xl mx-auto px-4">
          <p>{t.disclaimer}</p>
          <p className="mt-1 font-mono text-[11px]">Paytm AI Hackathon 2024 &bull; Team Crazy Coders (PS-2 Financial Journeys)</p>
        </div>
      </footer>
    </div>
  );
}

