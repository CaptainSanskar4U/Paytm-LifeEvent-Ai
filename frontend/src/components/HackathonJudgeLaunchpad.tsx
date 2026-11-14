"use client";

import Link from "next/link";
import {
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Activity,
  Sparkles
} from "lucide-react";

export function HackathonJudgeLaunchpad() {
  const matrix = [
    {
      feature: "Patient PII & Aadhaar Privacy",
      naive: "Leaks raw Aadhaar & medical details to cloud LLMs",
      naiveStatus: "fail",
      legacy: "Stored unencrypted in local hospital databases",
      legacyStatus: "warning",
      lifeEvent: "100% Client-Side Verhoeff Masking before network egress",
      lifeEventStatus: "success",
    },
    {
      feature: "Out-of-Pocket Gap Calculation",
      naive: "Hallucinates generic percentages ('~20-30% out-of-pocket')",
      naiveStatus: "fail",
      legacy: "Passive ledger — passes all TPA cuts to patient invoice",
      legacyStatus: "warning",
      lifeEvent: "Deterministic IRDAI 2024 Room-Rent Proportion Algorithm",
      lifeEventStatus: "success",
    },
    {
      feature: "Regulatory Grounding & Trap Defense",
      naive: "Agrees with fake insurer exclusions; invents fake clauses",
      naiveStatus: "fail",
      legacy: "No policy parsing — staff blindly accept TPA query letters",
      legacyStatus: "warning",
      lifeEvent: "Verbatim Clause Citations & Planted Trap Resistance",
      lifeEventStatus: "success",
    },
    {
      feature: "Treatment State Management",
      naive: "Stateless single-turn chat; resets on every question",
      naiveStatus: "fail",
      legacy: "Static form checklists updated manually once daily",
      legacyStatus: "warning",
      lifeEvent: "Living Reactive State Machine via Server-Sent Events (SSE)",
      lifeEventStatus: "success",
    },
    {
      feature: "Emergency Liquidity Solution",
      naive: "None — suggests patient ask family or borrow cash",
      naiveStatus: "fail",
      legacy: "Counter standoff — halts admission until deposit is paid",
      legacyStatus: "fail",
      lifeEvent: "8-Second Paytm UPI Emergency Caution Deposit Bridge",
      lifeEventStatus: "success",
    },
  ];

  return (
    <section className="relative w-full bg-[#fcfcfd] text-slate-900 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#00baf2]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#002970]">
              Paytm AI Hackathon Differentiation
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Why LifeEvent AI is fundamentally different.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Built for the Paytm AI Hackathon (Build for India). We didn&apos;t build a toy chatbot with prompt engineering — we built a deterministic regulatory financial coordinator with real Paytm rails.
          </p>
        </div>

        {/* Technical Differentiation Matrix Table */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 mb-12 overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs font-mono min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 pb-3 text-slate-500">
                <th className="py-3 font-bold w-1/4">CAPABILITY / CRITERIA</th>
                <th className="py-3 font-bold w-1/4">NAIVE LLM WRAPPER</th>
                <th className="py-3 font-bold w-1/4">LEGACY HOSPITAL HIMS</th>
                <th className="py-3 font-bold w-1/4 text-[#002970]">LIFEEVENT AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {matrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 font-bold text-slate-900 font-mono text-xs pr-4">
                    {row.feature}
                  </td>
                  <td className="py-4 text-slate-500 text-xs pr-4">
                    <div className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{row.naive}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-500 text-xs pr-4">
                    <div className="flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-900 text-xs font-semibold pr-4">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-[#002970] font-bold">{row.lifeEvent}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Launchpad for Hackathon Judges */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-blue-50/80 border border-blue-200/90 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono text-[#002970] uppercase tracking-wider block font-bold">
              3-MINUTE DEMO RUNBOOK
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Ready to judge? Follow our synchronized presentation timeline.
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Complete with spoken audio script, live route launchers, judge FAQ answers, and zero-compromise deterministic evidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/demo-script"
              className="px-6 py-3.5 rounded-xl bg-[#002970] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#001d52] transition-all shadow-xs active:scale-98 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#00baf2]" />
              <span>Launch 3-Min Judge Script</span>
            </Link>
            <Link
              href="/intake"
              className="px-5 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-xs uppercase tracking-wider hover:bg-slate-50 transition-all border border-slate-200 flex items-center gap-2 shadow-xs"
            >
              <span>Emergency Voice Intake</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#002970]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
