"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  FileCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  Copy,
  Check,
  ExternalLink,
  Lock,
  Cpu
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

export function EvidenceTrapInspector() {
  const [trapInjected, setTrapInjected] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(
      "IRDAI Master Circular 2024, Clause 12.3: Under no circumstances shall proportionate deductions be applied to the cost of medicines, pharmaceuticals, implants, consumables, or medical devices."
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full bg-white py-24 px-4 sm:px-6 lg:px-8 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#002970]" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#002970]">
              [ 03 // ZERO-HALLUCINATION DEFENSE ]
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.12]">
            Never trust a hallucinating LLM with your family&apos;s life savings.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Generic AI models invent policy exclusions that do not exist, costing families lakhs in wrongful out-of-pocket payments. LifeEvent AI enforces line-by-line verbatim grounding against filed IRDAI policy documents.
          </p>
        </div>

        {/* Interactive Evidence Terminal */}
        <SpotlightCard className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8 shadow-sm">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
                POLICY CONTRACT &bull; STAR COMPREHENSIVE FLOATER V.24
              </span>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5">
                Evidence Inspector: Acute Coronary Stent & Consumables
              </h3>
            </div>

            {/* Trap Injection Simulator Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-600 font-semibold">
                Planted Trap Test:
              </span>
              <button
                type="button"
                onClick={() => setTrapInjected(!trapInjected)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 btn-tactile ${
                  trapInjected
                    ? "bg-rose-600 text-white shadow-sm ring-2 ring-rose-300"
                    : "bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-100 shadow-2xs"
                }`}
              >
                {trapInjected ? (
                  <>
                    <AlertOctagon className="w-3.5 h-3.5 text-white animate-pulse" />
                    <span>TRAP ACTIVE (SIMULATED TPA DEDUCTION)</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5 text-neutral-500" />
                    <span>INJECT FAKE EXCLUSION TRAP</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Inspection Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
            {/* Left Column: Verbatim Policy Snippet */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-2xl bg-neutral-950 text-white border border-neutral-800 shadow-sm relative overflow-hidden">
                {trapInjected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-laser-scan" />
                )}
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pb-2 mb-3 border-b border-neutral-800">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-[#00baf2]" />
                    <span>OFFICIAL POLICY EXTRACT &bull; PAGE 22, SECTION 12.3</span>
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-bold text-[10px]">
                    VERIFIED EVIDENCE
                  </span>
                </div>
                <blockquote className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-serif italic border-l-2 border-[#00baf2] pl-4 my-2">
                  &ldquo;12.3 Proportional Deduction Limitation: Where the insured occupies a room category higher than the eligible limit, proportionate deductions shall apply exclusively to associate medical expenses (doctor fees, nursing, operation theatre charges).
                  <strong className="text-amber-200 not-italic bg-amber-950/60 border border-amber-800/50 px-1 mx-0.5 font-sans font-bold">
                    Under no circumstances shall proportionate deductions be applied to the cost of medicines, pharmaceuticals, implants, consumables, or medical devices.
                  </strong>&rdquo;
                </blockquote>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-3 mt-3 border-t border-neutral-800">
                  <span>CITING: IRDAI MASTER CIRCULAR 2024</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyCitation}
                      className="inline-flex items-center gap-1 text-[10px] text-neutral-400 hover:text-white transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copied!" : "Copy Citation"}</span>
                    </button>
                    <span className="text-[#00baf2]">SHA-256: 8f4b2...c91a</span>
                  </div>
                </div>
              </div>

              {/* Trap Evaluation Result Card */}
              {trapInjected ? (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="text-sm font-bold text-rose-950 flex items-center gap-2">
                        <span>PLANTED REGULATORY TRAP DETECTED & NEUTRALIZED</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-semibold">
                          ZERO HALLUCINATION
                        </span>
                      </h4>
                      <p className="text-xs text-rose-900 mt-1 leading-relaxed">
                        TPA desk cited fictitious &ldquo;Clause 99.4: Stent Balloon Catheter Consumables Co-pay (₹38,000)&rdquo;.
                        LifeEvent AI cross-checked the policy index and confirmed Clause 99.4 does not exist.
                        The family was issued an instant statutory objection citing IRDAI Master Circular Clause 12.3.
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs font-mono font-bold text-rose-700 bg-white p-2.5 rounded-xl border border-rose-200 shadow-2xs">
                        <span>FAMILY SAVINGS DEFENDED:</span>
                        <span className="text-emerald-700 font-black text-sm">+₹38,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                        <span>CLEAN EVIDENCE AUDIT PASSED</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-200 text-emerald-900 font-semibold">
                          100% GROUNDED
                        </span>
                      </h4>
                      <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                        All billed items matched against filed IRDAI policy terms. No arbitrary non-payable deductions detected in pre-authorization draft.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Comparative AI Defense Matrix */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-3 font-semibold">
                  ARCHITECTURE BENCHMARK
                </span>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                      <span>Naive LLM Chatbot (ChatGPT)</span>
                      <span className="text-rose-600 text-[10px] font-mono font-bold">FAILS TRAP</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      Agrees with fake TPA exclusions and suggests patient pay ₹38,000 out of pocket. Hallucinates non-existent IRDAI guidelines.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-900 mb-1">
                      <span>Hospital TPA Legacy Desk</span>
                      <span className="text-amber-600 text-[10px] font-mono font-bold">PASSIVE ACCEPTANCE</span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      Accepts insurer deductions without challenging. Hospital passes arbitrary deductions directly to family discharge bill.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-[#002970]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#002970] mb-1">
                      <span>LifeEvent AI Grounding Engine</span>
                      <span className="text-emerald-700 text-[10px] font-mono font-bold">DETERMINISTIC PASS</span>
                    </div>
                    <p className="text-[11px] text-blue-900/80 leading-snug">
                      Requires exact document coordinates, page numbers, and SHA-256 cryptographic hashes before any deduction is deemed valid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500">
                  Verification Speed: 3.8s
                </span>
                <Link
                  href="/journey/demo-journey-cardiac-01/coverage"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002970] hover:text-[#00baf2] transition-colors btn-tactile"
                >
                  <span>Explore Policy Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}