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
  RotateCw,
  Sliders,
  Layers,
  Cpu
} from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

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
    }, 240);
  };

  const coordinationNodes = [
    { label: "1. Casualty Triage", status: "Active", complete: true },
    { label: "2. Verhoeff Redactor", status: "Zero-Knowledge", complete: true },
    { label: "3. IRDAI Policy Grounding", status: roomType === "deluxe" ? "Penalty Flagged" : "Shield Active", complete: true },
    { label: "4. TPA Pre-Auth Desk", status: tpaQueryResolved ? "Approved" : "Query Pending", complete: tpaQueryResolved },
    { label: "5. Paytm UPI Bridge", status: depositDisbursed ? "Disbursed" : "Standby", complete: depositDisbursed },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-200/80 bg-[#fcfcfd]">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-[11px] font-mono uppercase text-[#002970] font-semibold mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00baf2] animate-pulse" />
            <span>[ 02 // SIGNATURE ARCHITECTURE &bull; DYNAMIC FINANCIAL GRAPH ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            The Living Journey Line: Interactive State Machine
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Real hospital emergencies evolve constantly. Test how our reactive state engine recalculates out-of-pocket liabilities, handles room-rent penalties, and dynamically updates action priorities.
          </p>
        </div>

        {/* Multi-Node Coordination Rail */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs font-mono">
            <span className="text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#002970]" />
              <span>Multi-Agent Coordination Pipeline Status:</span>
            </span>
            <span className="text-[#002970] font-bold">
              {isProcessing ? "Recalculating Graph..." : "Deterministic Synced"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {coordinationNodes.map((node, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                  node.complete
                    ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500">STAGE 0{i + 1}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      node.complete ? "bg-emerald-500" : "bg-amber-400 animate-pulse"
                    }`}
                  />
                </div>
                <div className="font-bold text-[11px] truncate mt-1 text-slate-900">
                  {node.label}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {node.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Simulator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Simulation Controls & Timeline */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Control Panel */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#002970]" />
                  <span>Test Reactive State Transitions</span>
                </span>
                <span className="text-[11px] font-mono text-[#002970] font-semibold">
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
                  className={`p-3.5 rounded-xl border text-left transition-all text-xs font-mono btn-tactile ${
                    roomType === "deluxe"
                      ? "bg-amber-50/80 border-amber-300 text-amber-900 shadow-2xs"
                      : "bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs"
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">
                    1. Room Category
                  </span>
                  <span className="block font-bold text-sm mt-0.5">
                    {roomType === "deluxe" ? "Deluxe (₹8.5k/d)" : "Standard (₹5k/d)"}
                  </span>
                  <span className="block text-[10px] mt-1 text-slate-600">
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
                  className={`p-3.5 rounded-xl border text-left transition-all text-xs font-mono btn-tactile ${
                    tpaQueryResolved
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs"
                      : "bg-blue-50/80 border-blue-200 text-[#002970] shadow-2xs"
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">
                    2. Insurer Query
                  </span>
                  <span className="block font-bold text-sm mt-0.5">
                    {tpaQueryResolved ? "Resolved (Part B Done)" : "Pending TPA Query"}
                  </span>
                  <span className="block text-[10px] mt-1 text-slate-600">
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
                  className={`p-3.5 rounded-xl border text-left transition-all text-xs font-mono btn-tactile ${
                    depositDisbursed
                      ? "bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 shadow-2xs"
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 uppercase font-semibold">
                    3. Caution Deposit
                  </span>
                  <span className="block font-bold text-sm mt-0.5">
                    {depositDisbursed ? "Paid ₹50,000 (UPI)" : "Pending Caution"}
                  </span>
                  <span className="block text-[10px] mt-1 text-slate-600">
                    {depositDisbursed
                      ? "✓ Reconciled Counter #4"
                      : "Click to simulate payout"}
                  </span>
                </button>
              </div>
            </div>

            {/* Living Journey Timeline Feed */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-800 uppercase">
                    Live Timeline Stream &bull; Ramesh Kumar (Cardiac Care)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  AUTO-SYNC WITH HIMS
                </span>
              </div>

              {/* Event 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-xs font-mono mt-0.5">
                  ✓
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Admission Ingested via Multilingual Voice
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">T+02m</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Patient admitted with acute angina. Aadhaar masked via Verhoeff algorithm. Sum Insured ₹5.00L confirmed.
                  </p>
                </div>
              </div>

              {/* Event 2 (Dynamic Room Rent) */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono mt-0.5 transition-colors ${
                    isPenaltyActive
                      ? "bg-amber-50 border border-amber-200 text-amber-800"
                      : "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  }`}
                >
                  {isPenaltyActive ? "!" : "✓"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {isPenaltyActive
                        ? "Proportional Deduction Triggered (Deluxe Room ₹8.5k/d)"
                        : "Room Category Normalized (Standard ₹5k/d Cap)"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">T+08m</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {isPenaltyActive
                      ? "Admitted above policy ceiling (₹5,000/day). Calculated penalty: ₹56,000 across surgery and nursing fees."
                      : "Eligible for 100% admissible claim. Proportional penalty zeroed out."}
                  </p>
                </div>
              </div>

              {/* Event 3 (TPA Query) */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono mt-0.5 transition-colors ${
                    tpaQueryResolved
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                      : "bg-blue-50 border border-blue-200 text-[#002970]"
                  }`}
                >
                  {tpaQueryResolved ? "✓" : "•"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {tpaQueryResolved
                        ? "TPA Query #1 Cleared: Form Part B Submitted"
                        : "TPA Action Required: Submit Signed Form Part B"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">T+18m</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {tpaQueryResolved
                      ? "Form Part B signed by Dr. Kulkarni and verified against hospital estimate schedule."
                      : "Insurer TPA requested signed Form Part B at Counter #4 before issuing cashless sanction."}
                  </p>
                </div>
              </div>

              {/* Event 4 (Caution Deposit) */}
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono mt-0.5 transition-colors ${
                    depositDisbursed
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {depositDisbursed ? "✓" : "○"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      {depositDisbursed
                        ? "₹50,000 Instant UPI Caution Deposit Reconciled"
                        : "Awaiting Emergency Caution Deposit (Cath Lab Admission)"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">T+25m</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {depositDisbursed
                      ? "Transaction PAYTM-88492019 confirmed via UPI. Digital voucher delivered to hospital billing counter."
                      : "Hospital requires initial caution deposit before moving patient to emergency cath lab."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mathematical Financial Gap Console */}
          <div className="lg:col-span-5">
            <SpotlightCard className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-[#002970] font-bold uppercase tracking-wider">
                      Deterministic Financial Engine
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Live Gap Breakdown
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block">
                      TOTAL ESTIMATE
                    </span>
                    <span className="text-lg font-black text-slate-900 font-mono">
                      ₹3,50,000
                    </span>
                  </div>
                </div>

                {/* Patient Admission Unit Photo */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-6 border border-slate-200 shadow-xs">
                  <Image
                    src="/images/emergency-care.jpg"
                    alt="Cardiac Intensive Care Unit"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
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
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-600">Total Sum Insured</span>
                    <span className="font-bold text-slate-900">₹5,00,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-emerald-800">TPA Approved Cashless</span>
                    <span className="font-bold text-emerald-700">
                      +₹{netTpaCashless.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {isPenaltyActive && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900">
                      <div>
                        <span className="block font-bold">Room Rent Penalty</span>
                        <span className="text-[10px] text-amber-800">
                          Proportionate (₹8.5k vs ₹5k cap)
                        </span>
                      </div>
                      <span className="font-bold text-amber-900">
                        -₹{penaltyAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  {/* Calculated Gap: Subtle Dark Terminal Focus */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-950 text-white border border-neutral-800 shadow-md">
                    <div>
                      <span className="block text-xs font-bold text-white">
                        Calculated Out-of-Pocket Gap
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        True Family Financial Burden (IRDAI Defended)
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-[#00baf2] font-mono">
                      ₹{outOfPocketGap.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {depositDisbursed && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 border border-blue-200 text-[#002970]">
                      <div>
                        <span className="block font-bold">Paytm Caution Deposit Bridge</span>
                        <span className="text-[10px] text-slate-600">
                          Paid via UPI &bull; Auto-Reconciles
                        </span>
                      </div>
                      <span className="font-bold text-[#002970]">
                        -₹{cautionDepositRequired.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status Callout Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>IRDAI 2024 REGULATORY AUDIT:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Medical consumables (₹38,000) and cardiac stent device (₹32,500) legally shielded from room-rent penalty deductions under Circular Ref CIR/HLT/2024/09.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Live State: {isProcessing ? "RE-PLANNING..." : "SYNCHRONIZED"}
                </span>
                <Link
                  href="/journey/demo-journey-cardiac-01"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002970] hover:text-[#00baf2] transition-colors btn-tactile"
                >
                  <span>Launch Full Journey</span>
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