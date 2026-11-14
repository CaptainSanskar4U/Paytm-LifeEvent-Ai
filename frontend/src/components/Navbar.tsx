"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Shield,
  Activity,
  Menu,
  X,
  ArrowRight,
  Zap,
  Lock,
  Building2,
  FileText,
  Sparkles,
  Trophy,
  Scale,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface NavbarProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function Navbar({ currentLang = "en", onLanguageChange }: NavbarProps) {
  const [lang, setLang] = useState<Language>(currentLang);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    setLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLangSelect = (newLang: Language) => {
    setLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  // Curated, uncluttered primary navigation
  const primaryLinks = [
    { href: "/intake", label: "Emergency Intake" },
    { href: "/journey/demo-journey-cardiac-01", label: "Living Journey" },
    { href: "/journey/demo-journey-cardiac-01/coverage", label: "Evidence Auditor" },
    { href: "/journey/demo-journey-cardiac-01/funding", label: "Paytm Bridge" },
    { href: "/counselor", label: "Hospital Desk" },
  ];

  const drawerSections = [
    {
      title: "Patient & Family Flow",
      links: [
        { href: "/intake", label: "Emergency Crisis Intake", desc: "Voice or text plain-language triage with zero-knowledge Aadhaar masking" },
        { href: "/journey/demo-journey-cardiac-01", label: "Living Journey State Machine", desc: "Real-time task sequencing, SSE live updates & honest IRDAI gap range" },
        { href: "/journey/demo-journey-cardiac-01/coverage", label: "Forensic Evidence Chamber", desc: "Verbatim policy clause proof with character-by-character SHA-256 checks" },
        { href: "/journey/demo-journey-cardiac-01/funding", label: "Paytm UPI Caution Deposit", desc: "Instant 8-second caution money bridge directly to hospital Counter #4" },
      ]
    },
    {
      title: "Hospital & Institutional Network",
      links: [
        { href: "/counselor", label: "Hospital Counselor Cockpit", desc: "B2B emergency admission triage queue & TPA clearance telemetry" },
        { href: "/for-hospitals", label: "Institutional Pilot Partnership", desc: "45-min cashless approval SLA & zero counter friction onboarding" },
        { href: "/how-it-works", label: "System Architecture Blueprint", desc: "5-stage deterministic pipeline & LangGraph state machine flow" },
      ]
    },
    {
      title: "Compliance, Privacy & Evaluation",
      links: [
        { href: "/documents", label: "Document Ingestion & Redactor Lab", desc: "Dihedral D5 Verhoeff algorithm playground & ABDM corpus" },
        { href: "/privacy", label: "DPDP 2023 Data Sovereignty Charter", desc: "Zero raw image storage & one-click hard-purge verification" },
        { href: "/demo-script", label: "Judge 3-Minute Presentation Script", desc: "Live stage teleprompter with direct feature launchers" },
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.5)] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logotype */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#002970] to-[#001744] flex items-center justify-center text-white font-black text-sm shadow-sm border border-blue-500/30 group-hover:shadow-md transition-all">
              <span className="text-[#00baf2] font-mono text-sm sm:text-base">L</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                LifeEvent AI
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[11px] font-medium text-neutral-400 -mt-0.5 hidden sm:inline">
                Medical Financial Coordination
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean, Uncluttered, Spaced) */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-[13px] font-medium text-neutral-300">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-paytm-cyan transition-colors py-1 relative hover:font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Utility Group */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Minimalist Pill Language Switcher */}
            <div className="flex items-center bg-neutral-900 p-0.5 rounded-lg border border-neutral-800 text-[11px] sm:text-xs font-mono font-medium">
              <button
                type="button"
                onClick={() => handleLangSelect("en")}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all ${
                  lang === "en"
                    ? "bg-neutral-800 text-paytm-cyan font-bold shadow-xs border border-neutral-700"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLangSelect("hi")}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all ${
                  lang === "hi"
                    ? "bg-neutral-800 text-paytm-cyan font-bold shadow-xs border border-neutral-700"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                हिं
              </button>
              <button
                type="button"
                onClick={() => handleLangSelect("mr")}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md transition-all ${
                  lang === "mr"
                    ? "bg-neutral-800 text-paytm-cyan font-bold shadow-xs border border-neutral-700"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                मरा
              </button>
            </div>

            {/* Primary Action Button */}
            <Link
              href="/intake"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-paytm-cyan text-paytm-navy font-bold text-xs hover:bg-white transition-all shadow-sm hover:shadow active:scale-98"
            >
              <Zap className="w-3.5 h-3.5 text-paytm-navy" />
              <span>Start Intake</span>
            </Link>

            {/* Menu Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors border border-neutral-800"
              aria-label="Open Navigation Directory"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Full Route Directory Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-neutral-950 text-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200 border-l border-neutral-800">
            {/* Drawer Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#002970] border border-blue-500/30 flex items-center justify-center text-white font-bold text-xs">
                  L
                </div>
                <span className="font-extrabold text-sm text-white">LifeEvent AI Navigation</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 space-y-6 flex-grow">
              {drawerSections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold px-2">
                    {sec.title}
                  </h3>
                  <div className="space-y-1">
                    {sec.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex flex-col p-2.5 rounded-xl hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-800"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white group-hover:text-paytm-cyan transition-colors">
                            {link.label}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-paytm-cyan group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <span className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                          {link.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Drawer Footer CTA */}
            <div className="p-5 border-t border-neutral-800 bg-neutral-900/60">
              <Link
                href="/intake"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-paytm-cyan text-paytm-navy text-xs font-bold shadow-sm hover:bg-white transition-colors"
              >
                <Zap className="w-4 h-4 text-paytm-navy" />
                <span>Launch Emergency Intake</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
