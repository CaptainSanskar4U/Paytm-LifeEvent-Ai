"use client";

import { useRef, useEffect } from "react";
import { Activity, ShieldCheck, Zap, Lock, Landmark, CheckCircle2, Cpu } from "lucide-react";

export function InfiniteMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  const networks = [
    { name: "Apollo Hospitals", tag: "Cashless Desk Active", type: "hospital" },
    { name: "Star Health & Allied", tag: "Auto-Clause Parser", type: "tpa" },
    { name: "Fortis Healthcare", tag: "Fast-track Empaneled", type: "hospital" },
    { name: "HDFC ERGO", tag: "Direct API Bridge", type: "tpa" },
    { name: "Max Super Speciality", tag: "Direct HIMS Hook", type: "hospital" },
    { name: "ICICI Lombard", tag: "ABDM Compliant", type: "tpa" },
    { name: "Manipal Hospitals", tag: "E-PreAuth Live", type: "hospital" },
    { name: "Care Health Insurance", tag: "IRDAI 2024 Rules", type: "tpa" },
    { name: "Narayana Health", tag: "Cardiac Unit Vetted", type: "hospital" },
    { name: "Medi Assist TPA", tag: "Instant Clearance", type: "tpa" },
    { name: "Medanta The Medicity", tag: "Zero-Deposit Node", type: "hospital" },
    { name: "Vidal Health TPA", tag: "Live Bridge Gateway", type: "tpa" },
  ];

  const guarantees = [
    { label: "PRIVACY GUARANTEE", text: "100% Client-Side Verhoeff Masking for Aadhaar & Clinical PII", icon: Lock },
    { label: "REGULATORY COMPLIANCE", text: "IRDAI Master Circular 2024 Mandatory Clause Enforcement", icon: ShieldCheck },
    { label: "MATHEMATICAL RIGOR", text: "Deterministic Room-Rent Proportion Penalty Calculation Engine", icon: Landmark },
    { label: "INSTANT LIQUIDITY", text: "Sub-Second Paytm UPI Emergency Hospital Caution Deposit Rail", icon: Zap },
    { label: "ANTI-HALLUCINATION", text: "Planted Regulatory Trap Defense (Zero Fictitious Insurer Exclusions)", icon: CheckCircle2 },
    { label: "NATIONAL INTEROPERABILITY", text: "ABDM Milestone 1-3 & National Health Claims Exchange (NHCX) Standard", icon: Activity },
  ];

  const doubleNetworks = [...networks, ...networks];
  const doubleGuarantees = [...guarantees, ...guarantees];

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-white border-y border-neutral-200/90 overflow-hidden py-8 sm:py-10 select-none transition-colors"
    >
      {/* Top micro telemetry bar with live heartbeat */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-5 flex flex-wrap items-center justify-between text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-neutral-600">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-950 font-black">LIVE INTEGRATION MESH</span>
          <span className="text-neutral-300">|</span>
          <span className="hidden sm:inline text-neutral-600 font-semibold">Tier-1 Hospital HIMS & TPA Gateways</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-neutral-500 font-semibold text-xs">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-paytm-navy" />
            <span>LATENCY: &lt;140ms</span>
          </span>
          <span>&bull;</span>
          <span>UPTIME: 99.98%</span>
          <span>&bull;</span>
          <span className="text-paytm-navy font-bold tracking-widest bg-blue-50/80 px-2.5 py-0.5 rounded border border-blue-200/80 shadow-2xs">
            PAYTM UPI ENGINE READY
          </span>
        </div>
      </div>

      {/* Track 1: Networks & TPAs (Leftwards Infinite - Crisp, tactile hover elevation) */}
      <div className="marquee-mask relative overflow-hidden py-2.5">
        <div className="animate-marquee gap-5 flex items-center">
          {doubleNetworks.map((item, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-paytm-navy hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default group"
            >
              <span
                className={`w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-200 group-hover:scale-125 ${
                  item.type === "hospital" ? "bg-paytm-navy" : "bg-[#00baf2]"
                }`}
              />
              <span className="text-base sm:text-lg font-black text-neutral-900 whitespace-nowrap tracking-tight">
                {item.name}
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 bg-neutral-100 group-hover:bg-blue-50 group-hover:text-paytm-navy transition-colors px-3 py-1 rounded-full border border-neutral-200 whitespace-nowrap">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Track 2: Guarantees & Engine Specs (Rightwards Infinite - Dark Luxury Contrast) */}
      <div className="marquee-mask relative overflow-hidden pt-4 pb-2">
        <div className="animate-marquee-reverse gap-5 flex items-center">
          {doubleGuarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-[#001744] text-white border border-blue-900/60 hover:border-[#00baf2] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-default group"
              >
                <Icon className="w-4 h-4 text-[#00baf2] flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#00baf2]">
                  {item.label}
                </span>
                <span className="text-xs sm:text-sm font-medium text-neutral-200 whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
