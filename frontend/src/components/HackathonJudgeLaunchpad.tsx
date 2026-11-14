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
import { SpotlightCard } from "./SpotlightCard";

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 mb-3 shadow-2xs">
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

        {/* Technical Differentiation Matrix Table wrapped in SpotlightCard */}
        <SpotlightCard className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 mb-12 overflow-x-auto shadow-2xs">
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
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
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
        </SpotlightCard>

        {/* Signature Dark Contrast Launchpad */}
        <div className="rounded-3xl bg-gradient-to-br from-[#001744] via-[#001030] to-neutral-950 text-white border border-blue-900/50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00baf2]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-xl relative z-10">
            <span className="text-[11px] font-mono text-[#00baf2] uppercase tracking-widest block font-bold mb-1">
              3-MINUTE DEMO RUNBOOK &bull; BUILD FOR INDIA
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Ready to evaluate? Follow our synchronized presentation timeline.
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
              Complete with spoken teleprompter script, live route launchers, judge FAQ answers, and zero-compromise deterministic evidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 flex-shrink-0">
            <Link
              href="/demo-script"
              className="px-6 py-3.5 rounded-xl bg-[#00baf2] text-[#002970] font-black text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg btn-tactile flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#002970]" />
              <span>Launch 3-Min Judge Script</span>
            </Link>
            <Link
              href="/intake"
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 flex items-center gap-2 shadow-xs btn-tactile"
            >
              <span>Emergency Voice Intake</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00baf2]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}