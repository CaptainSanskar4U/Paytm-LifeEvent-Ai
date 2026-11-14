"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Receipt,
  Play,
  RotateCcw,
  Check
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

export function PaytmBridgeShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(100);
  const [currentSimStage, setCurrentSimStage] = useState(4);

  const steps = [
    {
      num: "01",
      time: "8 Seconds",
      badge: "Instant Approval",
      title: "Immediate Admission Clearance",
      desc: "Emergency counter demands ₹50,000 caution deposit before transferring patient to ICU. Paytm UPI authorizes payment instantly without family debt stress.",
    },
    {
      num: "02",
      time: "Zero Interest",
      badge: "Subvention Partner",
      title: "30-Day Floating Liquidity",
      desc: "Zero-cost bridge financing while the insurer TPA processes formal pre-authorization. Zero fees if cleared upon claim settlement.",
    },
    {
      num: "03",
      time: "Automated",
      badge: "Counter #4 HIMS",
      title: "Direct Hospital Ledger Reconciliation",
      desc: "Digital receipt and UTR automatically transmitted to Sample City Hospital insurance desk, eliminating physical paper slips at 2:00 AM.",
    },
    {
      num: "04",
      time: "DPDP 2023",
      badge: "100% Redacted",
      title: "Zero-Knowledge Credit Check",
      desc: "Aadhaar number verified on device using Verhoeff check-digit without persisting unmasked identity documents or storing biometric data.",
    },
  ];

  const simStages = [
    { label: "1. Policy Verification", time: "T+0.8s", detail: "Sum Insured ₹5.00L verified against Star Health policy" },
    { label: "2. Hospital VPA Handshake", time: "T+2.1s", detail: "Merchant apollo.emergency@paytm validated via UPI directory" },
    { label: "3. Subvention Bridge Locked", time: "T+4.5s", detail: "30-Day 0% interest floating credit authorized" },
    { label: "4. Disbursal Complete", time: "T+7.8s", detail: "UTR PYTM-2026-9812-74 transmitted to hospital billing counter" },
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationProgress(10);
    setCurrentSimStage(0);

    const t1 = setTimeout(() => {
      setSimulationProgress(35);
      setCurrentSimStage(1);
    }, 800);

    const t2 = setTimeout(() => {
      setSimulationProgress(70);
      setCurrentSimStage(2);
    }, 2100);

    const t3 = setTimeout(() => {
      setSimulationProgress(100);
      setCurrentSimStage(3);
      setIsSimulating(false);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200/80 bg-white">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-[11px] font-mono uppercase text-[#002970] font-semibold mb-3 shadow-2xs">
            <CreditCard className="w-3.5 h-3.5 text-[#00baf2]" />
            <span>[ 04 // PAYTM EMERGENCY LIQUIDITY RAIL ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Instant Caution Deposit & Emergency Bridge
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Hospitals routinely demand caution deposits before ICU bed allocation. LifeEvent AI integrates directly with Paytm UPI to bridge initial out-of-pocket liabilities in under 10 seconds.
          </p>
        </div>

        {/* 4-Step Interactive Narrative Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 4-Stage Step Stack */}
          <div className="lg:col-span-6 space-y-3">
            {steps.map((s, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer btn-tactile ${
                    isSelected
                      ? "bg-white border-[#002970] shadow-md ring-2 ring-[#002970]/10 -translate-y-0.5"
                      : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                    <span className="text-[#002970] font-bold">{s.num} &bull; {s.time}</span>
                    <span className="bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded text-slate-700 font-semibold text-[10px]">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}

            {/* Interactive Disbursal Trigger */}
            <div className="p-4 rounded-2xl bg-neutral-900 text-white border border-neutral-800 shadow-sm mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-[#00baf2] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Interactive 8-Sec Disbursal Test</span>
                </span>
                <button
                  type="button"
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="px-3 py-1.5 rounded-lg bg-[#00baf2] text-[#002970] text-xs font-mono font-bold hover:bg-white transition-all btn-tactile flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw className="w-3 h-3 animate-spin" />
                      <span>Simulating...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      <span>Re-Test 8s Rail</span>
                    </>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#002970] via-[#00baf2] to-emerald-400 transition-all duration-300"
                  style={{ width: `${simulationProgress}%` }}
                />
              </div>

              {/* Simulation Stage Status */}
              <div className="text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="font-bold">{simStages[currentSimStage]?.label}</span>
                  <span className="text-[#00baf2]">{simStages[currentSimStage]?.time}</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {simStages[currentSimStage]?.detail}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Luminous Paytm UPI Transaction Mockup */}
          <div className="lg:col-span-6">
            <SpotlightCard className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Receipt Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#002970] to-[#001744] flex items-center justify-center font-bold text-white text-xs shadow-2xs">
                      P
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Paytm Emergency Caution Bridge
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        TXN ID: PYTM-2026-9812-74
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>DISBURSED (7.8s)</span>
                  </div>
                </div>

                {/* Amount Display with Holographic Laser Scan Effect */}
                <div className="relative p-5 rounded-xl bg-slate-50 border border-slate-200 text-center mb-6 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00baf2] to-transparent animate-laser-scan" />
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                    DISBURSED EMERGENCY AMOUNT
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono mt-1 block">
                    ₹1,20,000.00
                  </span>
                  <span className="text-[11px] text-emerald-700 mt-1 block font-mono font-semibold">
                    &bull; 0% Interest for 30 Days &bull; Backed by Verified Policy
                  </span>
                </div>

                {/* Interactive QR Visual with Laser Bar */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-950 text-white border border-neutral-800 mb-6 relative overflow-hidden">
                  <div className="relative w-16 h-16 bg-white rounded-lg p-1.5 flex-shrink-0 flex items-center justify-center">
                    <QrCode className="w-full h-full text-neutral-900" />
                    <div className="absolute inset-x-0 h-0.5 bg-[#00baf2] animate-laser-scan shadow-[0_0_8px_#00baf2]" />
                  </div>
                  <div className="flex-1 min-w-0 font-mono text-xs">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                      HOSPITAL VPA MERCHANT QR
                    </span>
                    <span className="text-white font-bold block truncate">
                      apollo.emergency@paytm
                    </span>
                    <span className="text-[#00baf2] text-[10px] block mt-0.5">
                      DYNAMIC UTR SYNC &bull; COUNTER #4
                    </span>
                  </div>
                </div>

                {/* Breakdown Details */}
                <div className="space-y-2.5 text-xs font-mono mb-6">
                  <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-slate-100">
                    <span>Beneficiary Hospital</span>
                    <span className="text-slate-900 font-bold">Apollo Hospitals Main ER</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-slate-100">
                    <span>Merchant UPI VPA</span>
                    <span className="text-slate-900 font-mono">apollo.emergency@paytm</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 pb-2 border-b border-slate-100">
                    <span>Patient Admission #</span>
                    <span className="text-slate-900">IPD-2026-CARD-084</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Reconciliation Policy</span>
                    <span className="text-[#002970] font-bold">Auto-Return at TPA Final Clearance</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Direct Integration via Paytm UPI Gateway
                </span>
                <Link
                  href="/journey/demo-journey-cardiac-01/funding"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002970] hover:text-[#00baf2] transition-colors btn-tactile"
                >
                  <span>Simulate UPI Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}