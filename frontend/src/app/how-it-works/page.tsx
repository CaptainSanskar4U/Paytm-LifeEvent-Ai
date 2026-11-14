"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { Language, translations } from "@/lib/translations";
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
  Lock
} from "lucide-react";

export default function HowItWorksPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const steps = [
    {
      num: "01",
      icon: <Mic className="w-6 h-6 text-paytm-cyan" />,
      title: "Speak or Dictate in Plain Language",
      description: "When an emergency strikes, nobody has time to fill 40-field forms. Family attendants simply speak their situation in English, Hindi, or Marathi. LifeEvent AI extracts the hospital, patient condition, and urgency."
    },
    {
      num: "02",
      icon: <Lock className="w-6 h-6 text-paytm-cyan" />,
      title: "Zero-Knowledge Aadhaar Redaction",
      description: "Before policy schedules and pre-auth estimates are parsed, our mathematical Verhoeff check-digit redactor masks Indian Aadhaar numbers on-device. Identity document photos are discarded immediately."
    },
    {
      num: "03",
      icon: <FileSearch className="w-6 h-6 text-paytm-cyan" />,
      title: "Anti-Hallucination Citation Verification",
      description: "Every coverage calculation is verified string-by-string against the exact text extracted from the policy PDF. If an LLM hallucination cannot be matched directly in the document page, it is flagged as unverified."
    },
    {
      num: "04",
      icon: <Calculator className="w-6 h-6 text-paytm-cyan" />,
      title: "Honest Out-of-Pocket Range Estimation",
      description: "We never claim an 'exact liability' figure. We calculate an honest range factoring in room rent proportional deduction penalties, IRDAI non-payable consumables (10%), and co-pay rules."
    },
    {
      num: "05",
      icon: <GitBranch className="w-6 h-6 text-paytm-cyan" />,
      title: "The Living Journey Line & Dynamic Re-planning",
      description: "An emergency is not a static chatbot conversation. When new documents arrive—such as an insurer TPA query for an admission ECG—the living timeline automatically adapts, re-prioritizing tasks."
    }
  ];

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-grow">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-paytm-navy px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-paytm-cyan" />
            <span>Architecture & Technology // PS-2 Financial Journeys</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-paytm-navy tracking-tight">
            How LifeEvent AI Connects the Financial Dots
          </h1>
          <p className="text-sm sm:text-base text-paytm-muted mt-3">
            From panicky hospital intake to verified cashless discharge: Explore the 5 pillars powering our cross-domain emergency engine.
          </p>
        </div>

        {/* 5 Steps Vertical Flow */}
        <div className="space-y-6 mb-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 border border-paytm-border shadow-sm flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="flex-shrink-0 flex items-center gap-3">
                <span className="text-2xl font-mono font-extrabold text-gray-300">{step.num}</span>
                <div className="p-3 bg-paytm-sky rounded-lg text-paytm-navy">{step.icon}</div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-paytm-navy mb-1.5">{step.title}</h3>
                <p className="text-xs sm:text-sm text-paytm-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Engine Banner */}
        <div className="bg-paytm-navy text-white rounded-lg p-6 sm:p-8 border-l-8 border-paytm-cyan shadow-md mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-paytm-cyan uppercase tracking-wider block mb-1">
                Venue Wi-Fi Immunity // Dual Engine Architecture
              </span>
              <h2 className="text-xl font-bold">Live Gemini 2.0 Multimodal + Offline Deterministic Shield</h2>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl leading-relaxed">
                LifeEvent AI connects directly to Google Gemini via the official <code className="text-paytm-cyan font-mono">google-genai</code> SDK for live policy reading. In the event of venue connectivity drops, our deterministic LangGraph fixture shield guarantees 100% uninterrupted judging demonstration.
              </p>
            </div>

            <NextLink
              href="/intake"
              className="inline-flex items-center gap-2 bg-paytm-cyan text-paytm-navy font-bold px-5 py-3 rounded text-sm hover:brightness-105 transition-all flex-shrink-0 self-start md:self-center"
            >
              <span>Test Live Intake</span>
              <ArrowRight className="w-4 h-4" />
            </NextLink>
          </div>
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
