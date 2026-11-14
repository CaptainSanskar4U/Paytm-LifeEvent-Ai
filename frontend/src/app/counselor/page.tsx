"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { formatINR } from "@/lib/utils";
import {
  Building2,
  Users,
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Check
} from "lucide-react";

interface CounselorJourney {
  id: string;
  patient_name: string;
  hospital_name: string;
  urgency: string;
  estimated_cost: number;
  gap_expected: number;
  current_stage: string;
  next_action: string;
  tasks_done: number;
  tasks_total: number;
}

const FALLBACK_COUNSELOR_JOURNEYS: CounselorJourney[] = [
  {
    id: "demo-journey-cardiac-01",
    patient_name: "Ramesh Kulkarni",
    hospital_name: "Sample City Hospital (Apollo Pune Network)",
    urgency: "critical",
    estimated_cost: 420000,
    gap_expected: 160000,
    current_stage: "preauth_pending",
    next_action: "Submit Patient Aadhaar and Signed Form Part B to Hospital Insurance Desk (Counter #4)",
    tasks_done: 1,
    tasks_total: 3
  },
  {
    id: "demo-journey-ortho-02",
    patient_name: "Sunita Patil",
    hospital_name: "Sample Metropolitan Hospital",
    urgency: "urgent",
    estimated_cost: 185000,
    gap_expected: 45000,
    current_stage: "admitted",
    next_action: "Upload implant vendor invoice for TPA cashless clearance",
    tasks_done: 2,
    tasks_total: 2
  }
];

export default function CounselorConsolePage() {
  const [journeys, setJourneys] = useState<CounselorJourney[]>(FALLBACK_COUNSELOR_JOURNEYS);
  const [search, setSearch] = useState("");
  const [filterUrgency, setFilterUrgency] = useState<string>("all");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/counselor/journeys")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJourneys(data);
        }
      })
      .catch(() => {
        // Fallback maintained
      });
  }, []);

  const filtered = journeys.filter((j) => {
    const matchQuery =
      j.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      j.hospital_name.toLowerCase().includes(search.toLowerCase()) ||
      j.next_action.toLowerCase().includes(search.toLowerCase());
    if (filterUrgency === "all") return matchQuery;
    return matchQuery && j.urgency === filterUrgency;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Navigation Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <NextLink
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-paytm-cyan transition-colors group"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Overview</span>
            </NextLink>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>COUNTER #4 TPA TELEMETRY LIVE</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono uppercase text-paytm-cyan font-semibold mb-2">
                <Building2 className="w-3.5 h-3.5 text-paytm-cyan" />
                <span>Hospital TPA & Nursing Counselor Mission Control</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Institutional Emergency Counselor Cockpit
              </h1>
              <p className="text-sm text-neutral-400 max-w-2xl mt-1.5 leading-relaxed">
                Real-time visibility into incoming patient triage, document completeness, and pre-authorization cycle times.
                Empowers hospital billing desks to eliminate family disputes before admission.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <NextLink
                href="/for-hospitals"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold border border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <span>Pilot Details</span>
              </NextLink>
              <NextLink
                href="/intake"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-paytm-cyan text-paytm-navy hover:bg-cyan-300 transition-colors shadow-sm"
              >
                <span>+ New Intake</span>
              </NextLink>
            </div>
          </div>
        </div>

        {/* Operational Statistics Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/70">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Active Triage Cases</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">{journeys.length}</span>
            <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Live admissions in progress</span>
          </div>

          <div className="p-4 rounded-xl border border-rose-900/60 bg-rose-950/30">
            <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block">Critical Triage (ICU)</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-300 mt-1 block">1</span>
            <span className="text-[10px] text-rose-400 font-mono mt-1 block">Requires instant caution clearance</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/70">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Average Approval Time</span>
            <span className="text-2xl sm:text-3xl font-black text-paytm-cyan mt-1 block">38 min</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">vs 4.5h national avg</span>
          </div>

          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/70">
            <span className="text-[11px] font-mono uppercase tracking-wider text-paytm-cyan block font-semibold">Verhoeff Redaction</span>
            <span className="text-2xl sm:text-3xl font-black text-paytm-cyan mt-1 block">100%</span>
            <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Zero PII persisted</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by patient, hospital, or task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-950 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-paytm-cyan focus:border-paytm-cyan transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono self-start sm:self-auto">
            <button
              onClick={() => setFilterUrgency("all")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                filterUrgency === "all" ? "bg-neutral-800 text-paytm-cyan border border-neutral-700 shadow-xs" : "text-neutral-400 hover:text-white"
              }`}
            >
              All Urgencies
            </button>
            <button
              onClick={() => setFilterUrgency("critical")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                filterUrgency === "critical" ? "bg-rose-950/60 text-rose-300 border border-rose-800 shadow-sm" : "text-neutral-400 hover:text-rose-300"
              }`}
            >
              Critical ICU
            </button>
            <button
              onClick={() => setFilterUrgency("urgent")}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                filterUrgency === "urgent" ? "bg-amber-950/60 text-amber-300 border border-amber-800 shadow-sm" : "text-neutral-400 hover:text-amber-300"
              }`}
            >
              Urgent
            </button>
          </div>
        </div>

        {/* Triage Patient Matrix Cards */}
        <div className="space-y-4 mb-12">
          {filtered.map((j) => (
            <div
              key={j.id}
              className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/70 hover:border-neutral-700 transition-all shadow-sm group"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg font-bold text-white group-hover:text-paytm-cyan transition-colors">
                      {j.patient_name}
                    </h3>

                    {j.urgency === "critical" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-rose-950/50 text-rose-300 border border-rose-800/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                        <span>CRITICAL // CATH LAB</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-950/50 text-amber-300 border border-amber-800/60">
                        <span>URGENT // ELECTIVE OT</span>
                      </span>
                    )}

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800">
                      ID: {j.id}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{j.hospital_name}</span>
                  </p>

                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Next Best Action Required:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-200 leading-relaxed">
                      {j.next_action}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                    <span>Tasks: <strong className="text-white">{j.tasks_done}/{j.tasks_total} Completed</strong></span>
                    <span>&bull;</span>
                    <span>Stage: <code className="bg-neutral-950 border border-neutral-800 px-1 py-0.5 rounded text-neutral-300">{j.current_stage}</code></span>
                  </div>
                </div>

                {/* Financial figures & Action Link */}
                <div className="flex lg:flex-col items-end justify-between lg:justify-center border-t lg:border-t-0 lg:border-l border-neutral-800 pt-4 lg:pt-0 lg:pl-6 min-w-[220px] flex-shrink-0 bg-neutral-950/50 lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">Total Est. Bill</span>
                    <span className="text-base font-bold text-white">{formatINR(j.estimated_cost)}</span>
                  </div>

                  <div className="text-left lg:text-right mt-0 lg:mt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block">Family Gap Exposure</span>
                    <span className="text-base font-extrabold text-rose-300">{formatINR(j.gap_expected)}</span>
                  </div>

                  <div className="mt-3 lg:mt-4 w-full text-right">
                    <NextLink
                      href={`/journey/${j.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-paytm-cyan text-paytm-navy hover:bg-cyan-300 transition-colors shadow-xs"
                    >
                      <span>Open Console</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </NextLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
