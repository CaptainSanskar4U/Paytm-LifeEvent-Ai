"use client";

import { useState } from "react";
import Link from "next/link";
import { MonumentalHero } from "@/components/MonumentalHero";
import { Language, translations } from "@/lib/translations";
import {
  ArrowRight,
  ShieldCheck,
  FileSearch,
  IndianRupee,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  Lock,
  Building2,
  AlertCircle
} from "lucide-react";

export default function LandingPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const fiveQuestions = [
    {
      num: "01",
      question: t.q1,
      answer: t.q1_answer,
      icon: <ShieldCheck className="w-5 h-5 text-paytm-cyan" />,
      tag: "Coverage Intelligence",
    },
    {
      num: "02",
      question: t.q2,
      answer: t.q2_answer,
      icon: <FileSearch className="w-5 h-5 text-blue-400" />,
      tag: "Pre-Auth Coordination",
    },
    {
      num: "03",
      question: t.q3,
      answer: t.q3_answer,
      icon: <IndianRupee className="w-5 h-5 text-emerald-400" />,
      tag: "Honest Gap Modeling",
    },
    {
      num: "04",
      question: t.q4,
      answer: t.q4_answer,
      icon: <Activity className="w-5 h-5 text-amber-400" />,
      tag: "Vetted Funding Options",
    },
    {
      num: "05",
      question: t.q5,
      answer: t.q5_answer,
      icon: <Clock className="w-5 h-5 text-purple-400" />,
      tag: "Living Progress Tracker",
    },
  ];

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col">
      {/* Monumental Hero Section (Reverse-engineered high-impact design inspired by noth.in) */}
      <MonumentalHero currentLang={lang} onLanguageChange={setLang} />

      {/* The 5 Urgent Questions Section */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-paytm-navy">
            {t.hospitalCounterHeader}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-3">
            Five questions hit you at once. Here is how LifeEvent AI answers them.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t.hospitalCounterSubtitle}
          </p>
        </div>

        {/* 5 Questions Story Arc */}
        <div className="space-y-4">
          {fiveQuestions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-paytm-cyan transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <span className="text-xl sm:text-2xl font-black text-slate-300 font-mono mt-0.5">
                  {item.num}
                </span>
                <div>
                  <span className="inline-block text-[11px] font-bold text-paytm-navy uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded mb-1">
                    {item.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {item.question}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {item.answer}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 self-end md:self-center">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Living Journey Line Demonstration Preview */}
      <section className="py-16 bg-white border-y border-slate-200 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-paytm-navy">
              Signature Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-2">
              The Living Journey Line
            </h2>
            <p className="text-sm text-slate-600">
              Not a static checklist. A living financial coordinator that re-plans dynamically as TPA replies and estimates arrive.
            </p>
          </div>

          <div className="bg-paytm-sky rounded-xl p-6 border border-blue-100 shadow-inner">
            <div className="flex items-center justify-between border-b border-blue-200 pb-3 mb-4">
              <span className="text-xs font-bold text-paytm-navy uppercase">
                Active Live Preview: Cardiac Case (Sample City Hospital)
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
                Live State
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Emergency Situation Ingested (Multilingual Voice)</h4>
                  <p className="text-xs text-slate-600">Patient admitted with acute coronary syndrome. Aadhaar identifiers masked.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Hospital Estimate & Policy Verified</h4>
                  <p className="text-xs text-slate-600">Room rent proportional deduction calculated (₹5,000/day allowed vs ₹8,500/day billed).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-paytm-cyan text-paytm-navy flex items-center justify-center text-xs font-bold mt-0.5 animate-pulse">
                  ●
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Pre-Authorization Cashless Form Coordination</h4>
                  <p className="text-xs text-slate-600">Next Action: Have treating cardiologist sign Section C at hospital insurance desk.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200 flex justify-end">
              <Link
                href="/journey/demo-journey-cardiac-01"
                className="text-xs font-bold text-paytm-navy hover:text-paytm-cyan transition-colors flex items-center gap-1"
              >
                <span>Open full interactive journey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Hospitals & Trust Callout */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="bg-paytm-navy text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-paytm-cyan">
              For Hospitals & Healthcare Institutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">
              Reduce counter friction and pre-authorization denials.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Empower your financial counselors with instant document-readiness scores and automated cashless coordination.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-paytm-cyan" /> Free for Families
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-paytm-cyan" /> SaaS for Hospitals
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-paytm-cyan" /> TPA Integration Layer
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/for-hospitals"
              className="px-6 py-3.5 bg-paytm-cyan text-paytm-navy font-bold rounded-lg text-sm hover:bg-white transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-paytm-navy" />
              <span>Explore Hospital Pilot</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="mt-auto py-10 bg-white border-t border-paytm-border text-xs text-paytm-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <h5 className="font-bold text-paytm-navy uppercase tracking-wider text-[11px] mb-2.5">The Product</h5>
              <ul className="space-y-1.5">
                <li><Link href="/intake" className="hover:text-paytm-navy">Emergency Intake</Link></li>
                <li><Link href="/journey/demo-journey-cardiac-01" className="hover:text-paytm-navy">Cardiac Case Demo</Link></li>
                <li><Link href="/how-it-works" className="hover:text-paytm-navy">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-paytm-navy uppercase tracking-wider text-[11px] mb-2.5">Evidence & Trust</h5>
              <ul className="space-y-1.5">
                <li><Link href="/documents" className="hover:text-paytm-navy">Document Hub</Link></li>
                <li><Link href="/journey/demo-journey-cardiac-01/coverage" className="hover:text-paytm-navy">Clause Inspector</Link></li>
                <li><Link href="/privacy" className="hover:text-paytm-navy">Privacy & Aadhaar Masking</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-paytm-navy uppercase tracking-wider text-[11px] mb-2.5">Healthcare Providers</h5>
              <ul className="space-y-1.5">
                <li><Link href="/counselor" className="hover:text-paytm-navy">Counselor Console</Link></li>
                <li><Link href="/for-hospitals" className="hover:text-paytm-navy">Hospital Pilot SaaS</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-paytm-navy uppercase tracking-wider text-[11px] mb-2.5">Hackathon Entry</h5>
              <p className="text-[11px] text-paytm-muted leading-relaxed">
                Paytm AI Hackathon (Build for India), Pune. PS-2: AI-Powered Financial Journeys.
              </p>
              <p className="text-[11px] font-semibold text-paytm-navy mt-1">
                Team Crazy Coders (Sarang Chaudhari, Sumit Kalr, Sanskar Thorat)
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <p>{t.disclaimer}</p>
            <p className="text-gray-400 font-mono">Build v2.1 &bull; 100% Offline Capable</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
