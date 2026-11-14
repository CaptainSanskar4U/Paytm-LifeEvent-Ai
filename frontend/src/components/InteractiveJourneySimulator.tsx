"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Lock,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  RotateCw
} from "lucide-react";

export function InteractiveJourneySimulator() {
  // Interactive Simulation State
  const [roomType, setRoomType] = useState<"standard" | "deluxe">("deluxe");
  const [tpaQueryResolved, setTpaQueryResolved] = useState<boolean>(false);
  const [depositDisbursed, setDepositDisbursed] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Dynamic calculated liabilities
  const totalBilledEstimate = 350000;
  const baseTpaApproved = 240000;
  const penaltyAmount = roomType === "deluxe" ? 56000 : 0;
  const isPenaltyActive = roomType === "deluxe";
  const netTpaCashless = baseTpaApproved - penaltyAmount;
  const cautionDepositRequired = 50000;

  let outOfPocketGap = totalBilledEstimate - netTpaCashless;
  if (depositDisbursed) {
    outOfPocketGap -= cautionDepositRequired;
  }

  const handleSimulate = (action: () => void) => {
    setIsProcessing(true);
    setTimeout(() => {
      action();
      setIsProcessing(false);
    }, 280);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-neutral-800 bg-black">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono uppercase text-paytm-cyan font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-paytm-cyan animate-pulse" />
            <span>Signature Architecture // Dynamic Financial Graph</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The Living Journey Line: Interactive State Machine
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Real hospital emergencies evolve constantly. Test how our reactive state engine recalculates out-of-pocket liabilities, handles room-rent penalties, and dynamically updates action priorities.
          </p>
        </div>

        {/* Live Simulator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Simulation Controls & Timeline */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Control Panel */}
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                <span className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
                  Test Reactive State Transitions
                </span>
                <span className="text-[11px] font-mono text-paytm-cyan font-semibold">
                  ENGINE: ACTIVE SSE STREAM
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Control 1: Room category toggle */}
                <button
                  type="button"
                  onClick={() =>
                    handleSimulate(() =>
                      setRoomType(roomType === "deluxe" ? "standard" : "deluxe")
                    )
                  }
                  disabled={isProcessing}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-mono ${
                    roomType === "deluxe"
                      ? "bg-amber-950/30 border-amber-800/60 text-amber-200"
                      : "bg-emerald-950/30 border-emerald-800/60 text-emerald-200"
                  }`}
                >
                  <span className="block text-[10px] text-neutral-400 uppercase">
                    1. Room Category
                  </span>
                  <span className="block font-bold text-sm mt-0.5 text-white">
                    {roomType === "deluxe" ? "Deluxe (₹8.5k/d)" : "Standard (₹5k/d)"}
                  </span>
                  <span className="block text-[10px] mt-1 text-neutral-400">
                    {roomType === "deluxe"
                      ? "⚠️ 41.2% Penalty Active"
                      : "✓ 0% Proportion Penalty"}
                  </span>
                </button>

                {/* Control 2: TPA query resolution */}
                <button
                  type="button"
                  onClick={() =>
                    handleSimulate(() => setTpaQueryResolved(!tpaQueryResolved))
                  }
                  disabled={isProcessing}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-mono ${
                    tpaQueryResolved
                      ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-200"
                      : "bg-neutral-900 border-neutral-800 text-neutral-200"
                  }`}
                >
                  <span className="block text-[10px] text-neutral-400 uppercase">
                    2. Insurer Query
                  </span>
                  <span className="block font-bold text-sm mt-0.5 text-white">
                    {tpaQueryResolved ? "Resolved (Part B Done)" : "Pending TPA Query"}
                  </span>
                  <span className="block text-[10px] mt-1 text-neutral-400">
                    {tpaQueryResolved
                      ? "✓ Auto-unblocks pre-auth"
                      : "Click to clear query"}
                  </span>
                </button>

                {/* Control 3: Emergency caution deposit */}
                <button
                  type="button"
                  onClick={() =>
                    handleSimulate(() => setDepositDisbursed(!depositDisbursed))
                  }
                  disabled={isProcessing}
                  className={`p-3 rounded-xl border text-left transition-all text-xs font-mono ${
                    depositDisbursed
                      ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-200"
                      : "bg-neutral-900 border-neutral-800 text-neutral-200"
                  }`}
                >
                  <span className="block text-[10px] text-neutral-400 uppercase">
                    3. Caution Deposit
                  </span>
                  <span className="block font-bold text-sm mt-0.5 text-white">
                    {depositDisbursed ? "Paid ₹50,000 (UPI)" : "Pending Caution"}
                  </span>
                  <span className="block text-[10px] mt-1 text-neutral-400">
                    {depositDisbursed
                      ? "✓ Reconciled Counter #4"
                      : "Click to simulate payout"}
                  </span>
                </button>
              </div>
            </div>

            {/* Living Journey Timeline Feed */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase">
                    Live Timeline Stream &bull; Ramesh Kumar (Cardiac Care)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  AUTO-SYNC WITH HIMS
                </span>
              </div>

              {/* Event 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center text-xs font-mono mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      Admission Ingested via Multilingual Voice
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">T+02m</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Patient admitted with acute angina. Aadhaar masked via Verhoeff algorithm. Sum Insured ₹5.00L confirmed.
                  </p>
                </div>
              </div>

              {/* Event 2 (Dynamic Room Rent) */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono mt-0.5 ${
                    isPenaltyActive
                      ? "bg-amber-950/60 border border-amber-800/60 text-amber-400"
                      : "bg-emerald-950/60 border border-emerald-800/60 text-emerald-400"
                  }`}
                >
                  {isPenaltyActive ? "!" : "✓"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {isPenaltyActive
                        ? "Proportional Deduction Triggered (Deluxe Room ₹8.5k/d)"
                        : "Room Category Normalized (Standard ₹5k/d Cap)"}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">T+08m</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {isPenaltyActive
                      ? "Admitted above policy ceiling (₹5,000/day). Calculated penalty: ₹56,000 across surgery and nursing fees."
                      : "Eligible for 100% admissible claim. Proportional penalty zeroed out."}
                  </p>
                </div>
              </div>

              {/* Event 3 (TPA Query) */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono mt-0.5 ${
                    tpaQueryResolved
                      ? "bg-emerald-950/60 border border-emerald-800/60 text-emerald-400"
                      : "bg-blue-950/60 border border-blue-800/60 text-blue-400"
                  }`}
                >
                  {tpaQueryResolved ? "✓" : "•"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {tpaQueryResolved
                        ? "TPA Query #1 Cleared: Form Part B Submitted"
                        : "TPA Action Required: Submit Signed Form Part B"}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">T+18m</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {tpaQueryResolved
                      ? "Form Part B signed by Dr. Kulkarni and verified against hospital estimate schedule."
                      : "Insurer TPA requested signed Form Part B at Counter #4 before issuing cashless sanction."}
                  </p>
                </div>
              </div>

              {/* Event 4 (Caution Deposit) */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono mt-0.5 ${
                    depositDisbursed
                      ? "bg-emerald-950/60 border border-emerald-800/60 text-emerald-400"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-500"
                  }`}
                >
                  {depositDisbursed ? "✓" : "○"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {depositDisbursed
                        ? "₹50,000 Instant UPI Caution Deposit Reconciled"
                        : "Awaiting Emergency Caution Deposit (Cath Lab Admission)"}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">T+25m</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {depositDisbursed
                      ? "Transaction PAYTM-88492019 confirmed via UPI. Digital voucher delivered to hospital billing counter."
                      : "Hospital requires initial caution deposit before moving patient to emergency cath lab."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mathematical Financial Gap Console */}
          <div className="lg:col-span-5 bg-neutral-950 rounded-2xl border border-neutral-800 shadow-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-paytm-cyan font-bold uppercase tracking-wider">
                    Deterministic Financial Engine
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Live Gap Breakdown
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    TOTAL ESTIMATE
                  </span>
                  <span className="text-lg font-black text-white font-mono">
                    ₹3,50,000
                  </span>
                </div>
              </div>

              {/* Patient Admission Unit Photo */}
              <div className="relative w-full h-36 rounded-xl overflow-hidden mb-6 border border-neutral-800 shadow-md">
                <Image
                  src="/images/emergency-care.jpg"
                  alt="Cardiac Intensive Care Unit"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold text-[11px]">
                    CITY HEART INSTITUTE &bull; ICU-BED #04
                  </span>
                  <span className="text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-800/60">
                    ADMITTED
                  </span>
                </div>
              </div>

              {/* Financial Ledger Items */}
              <div className="space-y-3 font-mono text-xs mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-400">Total Sum Insured</span>
                  <span className="font-bold text-white">₹5,00,000</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <span className="text-emerald-300">TPA Approved Cashless</span>
                  <span className="font-bold text-emerald-400">
                    +₹{netTpaCashless.toLocaleString("en-IN")}
                  </span>
                </div>

                {isPenaltyActive && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-950/30 border border-amber-900/50 text-amber-200">
                    <div>
                      <span className="block font-bold">Room Rent Penalty</span>
                      <span className="text-[10px] text-amber-300/80">
                        Proportionate (₹8.5k vs ₹5k cap)
                      </span>
                    </div>
                    <span className="font-bold text-amber-300">
                      -₹{penaltyAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900 border border-neutral-800">
                  <div>
                    <span className="block text-xs font-bold text-white">
                      Calculated Out-of-Pocket Gap
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      True Family Financial Burden
                    </span>
                  </div>
                  <span className="text-xl font-black text-white">
                    ₹{outOfPocketGap.toLocaleString("en-IN")}
                  </span>
                </div>

                {depositDisbursed && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-950/30 border border-blue-900/50 text-blue-200">
                    <div>
                      <span className="block font-bold">Paytm Caution Deposit Bridge</span>
                      <span className="text-[10px] text-neutral-400">
                        Paid via UPI &bull; Auto-Reconciles
                      </span>
                    </div>
                    <span className="font-bold text-paytm-cyan">
                      -₹{cautionDepositRequired.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Status Callout Box */}
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>IRDAI 2024 REGULATORY AUDIT:</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Medical consumables (₹38,000) and cardiac stent device (₹32,500) legally shielded from room-rent penalty deductions under Circular Ref CIR/HLT/2024/09.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-400">
                Live State: {isProcessing ? "RE-PLANNING..." : "SYNCHRONIZED"}
              </span>
              <Link
                href="/journey/demo-journey-cardiac-01"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-paytm-cyan hover:underline transition-colors"
              >
                <span>Launch Full Journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
