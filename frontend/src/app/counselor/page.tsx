"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { Language, translations } from "@/lib/translations";
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
  Filter
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
    hospital_name: "Sample City Hospital",
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
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const [journeys, setJourneys] = useState<CounselorJourney[]>(FALLBACK_COUNSELOR_JOURNEYS);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/counselor/journeys")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setJourneys(data);
        }
      })
      .catch(() => {
        // Fallback already set
      });
  }, []);

  const filtered = journeys.filter(j =>
    j.patient_name.toLowerCase().includes(search.toLowerCase()) ||
    j.hospital_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full flex-grow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-paytm-navy px-2.5 py-0.5 rounded text-xs font-bold uppercase mb-2">
              <Building2 className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>Hospital Desk View // TPA Coordination</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-paytm-navy">
              Hospital Financial Counselor Console
            </h1>
            <p className="text-xs sm:text-sm text-paytm-muted mt-1">
              Live intake monitor for hospital insurance counselors: Track family document readiness and resolve TPA queries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Live Console Active</span>
            </span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-paytm-border shadow-sm">
            <span className="text-xs font-bold text-paytm-muted uppercase">Active Cases Under Triage</span>
            <div className="text-2xl font-extrabold text-paytm-navy mt-1">{journeys.length} Admissions</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-paytm-border shadow-sm">
            <span className="text-xs font-bold text-paytm-muted uppercase">Average Readiness Score</span>
            <div className="text-2xl font-extrabold text-paytm-cyan mt-1">78% Complete</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-paytm-border shadow-sm">
            <span className="text-xs font-bold text-paytm-muted uppercase">Discharge Delays Prevented</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">~3.5 Hours / Case</div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-paytm-border shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by patient name or hospital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2 rounded border border-gray-200 focus:outline-none focus:border-paytm-cyan"
            />
          </div>
        </div>

        {/* Journeys Table */}
        <div className="bg-white rounded-lg border border-paytm-border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-paytm-sky border-b border-paytm-border font-bold text-paytm-navy uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Patient & Hospital</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3">Est. Cost</th>
                <th className="px-4 py-3">Out-of-Pocket Gap</th>
                <th className="px-4 py-3">Document Readiness</th>
                <th className="px-4 py-3">Next Action Required</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((j) => (
                <tr key={j.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-paytm-navy">{j.patient_name}</div>
                    <div className="text-paytm-muted text-[11px]">{j.hospital_name}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      j.urgency === "critical" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-900"
                    }`}>
                      {j.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-paytm-navy">
                    {formatINR(j.estimated_cost)}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-amber-900">
                    {formatINR(j.gap_expected)}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-paytm-cyan h-1.5 rounded-full"
                          style={{ width: `${Math.round((j.tasks_done / (j.tasks_total || 1)) * 100)}%` }}
                        />
                      </div>
                      <span className="font-semibold text-paytm-navy text-[11px]">
                        {j.tasks_done}/{j.tasks_total}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 max-w-xs truncate text-paytm-navy">
                    {j.next_action}
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <NextLink
                      href={`/journey/${j.id}`}
                      className="inline-flex items-center gap-1 font-bold text-paytm-navy bg-paytm-sky px-2.5 py-1 rounded hover:bg-blue-100 text-[11px]"
                    >
                      <span>Open Journey</span>
                      <ArrowRight className="w-3 h-3" />
                    </NextLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="mt-auto py-6 bg-white border-t border-paytm-border text-center text-xs text-paytm-muted">
        <div className="max-w-7xl mx-auto px-4">
          <p>{t.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}

