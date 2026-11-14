"use client";

import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  Mic,
  FileSearch,
  CheckCircle2,
  Calculator,
  GitBranch,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      icon: <Mic className="w-5 h-5 text-[#00baf2]" />,
      title: "Multilingual Plain-Language Emergency Intake",
      tag: "Input Layer",
      description:
        "When an emergency strikes at 2:00 AM, family members cannot navigate 40-field hospital portals. Attendants speak or type in everyday English, Hindi, or Marathi. LifeEvent AI extracts patient vitals, admission reason, and hospital counter context without conversational fluff.",
      link: "/intake",
      linkText: "Test Intake Form"
    },
    {
      num: "02",
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: "Client-Side Verhoeff Aadhaar Cryptographic Redactor",
      tag: "Privacy & DPDP",
      description:
        "Before text touches any network socket, database, or LLM context, our client-side parser runs the mathematical Dihedral Group D5 Verhoeff checksum algorithm. Valid 12-digit Aadhaar numbers are converted to XXXX-XXXX-XXXX while contact phone numbers and policy codes remain intact.",
      link: "/documents",
      linkText: "Test Redactor Lab"
    },
    {
      num: "03",
      icon: <Calculator className="w-5 h-5 text-[#00baf2]" />,
      title: "Deterministic IRDAI 2024 Math Engine",
      tag: "Calculation Engine",
      description:
        "We never ask an LLM to guess billing math. A deterministic Python engine calculates the honest out-of-pocket range: factoring in IRDAI non-payable consumables (gloves, sanitizers), proportionate room-rent penalties, and policy co-pays. The result is an honest range: Low, Expected, High.",
      link: "/journey/demo-journey-cardiac-01",
      linkText: "View Honest Range Card"
    },
    {
      num: "04",
      icon: <FileSearch className="w-5 h-5 text-purple-400" />,
      title: "Anti-Hallucination Citation Grounding Gate",
      tag: "Verification Protocol",
      description:
        "Every rupee of eligible coverage is matched string-by-string against the ingested insurer policy PDF. If an adversarial prompt or hallucination suggests unverified benefits (e.g. VIP suite upgrades), our citation gate flags it immediately and drops covered liability to ₹0.",
      link: "/journey/demo-journey-cardiac-01/coverage",
      linkText: "Inspect Forensic Chamber"
    },
    {
      num: "05",
      icon: <GitBranch className="w-5 h-5 text-emerald-400" />,
      title: "Living Financial State Machine & Live SSE Re-planning",
      tag: "State Machine",
      description:
        "Real hospital emergencies are continuous lifecycles, not static chatbot transcripts. When an insurer TPA queries for a baseline ECG strip, the LangGraph journey state machine updates dynamically via Server-Sent Events, re-prioritizing the family's Next Best Action on mobile in sub-second time.",
      link: "/counselor",
      linkText: "Open Counselor Cockpit"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <NextLink
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-paytm-cyan transition-colors group mb-4"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Overview</span>
          </NextLink>

          <div className="pb-6 border-b border-neutral-800">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono uppercase text-paytm-cyan font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>Architecture Specification // PS-2 Cross-Domain Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              How LifeEvent AI Connects the Financial Dots
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mt-2 leading-relaxed">
              From panic-driven hospital emergency intake to verified cashless discharge:
              Explore the five architectural pillars powering our zero-hallucination healthcare financial engine.
            </p>
          </div>
        </div>

        {/* 5 Sequential Architecture Cards */}
        <div className="space-y-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/70 hover:border-neutral-700 hover:bg-neutral-900 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-950 text-paytm-cyan border border-neutral-800 flex items-center justify-center font-mono font-bold text-sm">
                    {step.num}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-paytm-cyan font-bold block">
                      {step.tag}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <NextLink
                  href={step.link}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-paytm-cyan hover:text-cyan-300 group self-start sm:self-auto"
                >
                  <span>{step.linkText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </NextLink>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl pl-0 sm:pl-13">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
