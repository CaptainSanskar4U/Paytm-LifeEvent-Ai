"use client";

import { useState } from "react";
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
  Receipt
} from "lucide-react";

export function PaytmBridgeShowcase() {
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-neutral-800 bg-neutral-950">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono uppercase text-paytm-cyan font-semibold mb-3">
            <CreditCard className="w-3.5 h-3.5 text-paytm-cyan" />
            <span>Paytm Emergency Liquidity Rail</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Instant Caution Deposit & Emergency Bridge
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Hospitals routinely demand caution deposits before ICU bed allocation. LifeEvent AI integrates directly with Paytm UPI to bridge initial out-of-pocket liabilities in under 10 seconds.
          </p>
        </div>

        {/* 4-Step Interactive Narrative Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive 4-Stage Step Stack */}
          <div className="lg:col-span-6 space-y-3">
            {steps.map((s, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={s.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 border-paytm-cyan text-white shadow-lg ring-1 ring-paytm-cyan/30"
                      : "bg-neutral-900/40 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/70"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                    <span className="text-paytm-cyan font-bold">{s.num} &bull; {s.time}</span>
                    <span className="bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300 font-semibold">
                      {s.badge}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Luminous Paytm UPI Transaction Mockup */}
          <div className="lg:col-span-6 bg-neutral-950 rounded-2xl border border-neutral-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Receipt Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#002970] to-[#001744] flex items-center justify-center font-bold text-white text-xs shadow-xs border border-blue-500/30">
                    P
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Paytm Emergency Caution Bridge
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      TXN ID: PYTM-2026-9812-74
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DISBURSED (8.2s)</span>
                </div>
              </div>

              {/* Amount Display */}
              <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center mb-6">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                  DISBURSED EMERGENCY AMOUNT
                </span>
                <span className="text-3xl sm:text-4xl font-black text-white font-mono mt-1 block">
                  ₹1,20,000.00
                </span>
                <span className="text-[11px] text-emerald-400 mt-1 block font-mono font-semibold">
                  &bull; 0% Interest for 30 Days &bull; Backed by Verified Policy
                </span>
              </div>

              {/* Breakdown Details */}
              <div className="space-y-2.5 text-xs font-mono mb-6">
                <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800/80">
                  <span>Beneficiary Hospital</span>
                  <span className="text-white font-bold">Apollo Hospitals Main ER</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800/80">
                  <span>Merchant UPI VPA</span>
                  <span className="text-white font-mono">apollo.emergency@paytm</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-800/80">
                  <span>Patient Admission #</span>
                  <span className="text-white">IPD-2026-CARD-084</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Reconciliation Policy</span>
                  <span className="text-paytm-cyan font-bold">Auto-Return at TPA Final Clearance</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-neutral-400">
                Direct Integration via Paytm UPI Gateway
              </span>
              <Link
                href="/journey/demo-journey-cardiac-01/funding"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-paytm-cyan hover:underline transition-colors"
              >
                <span>Simulate UPI Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
