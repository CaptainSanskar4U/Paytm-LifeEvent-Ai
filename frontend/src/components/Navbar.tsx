"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Shield, Globe, FileText, Building2, HelpCircle } from "lucide-react";
import { Language, translations } from "@/lib/translations";

interface NavbarProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function Navbar({ currentLang = "en", onLanguageChange }: NavbarProps) {
  const [lang, setLang] = useState<Language>(currentLang);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    setLang(currentLang);
  }, [currentLang]);

  const handleLangSelect = (newLang: Language) => {
    setLang(newLang);
    if (onLanguageChange) {
      onLanguageChange(newLang);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-paytm-navy text-white shadow-md border-b border-paytm-navyDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded bg-paytm-cyan flex items-center justify-center text-paytm-navy font-black text-lg shadow-sm">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight flex items-center gap-1.5 text-white">
              LifeEvent AI
              <span className="text-[10px] bg-paytm-cyan text-paytm-navy font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                Paytm Hackathon
              </span>
            </span>
            <span className="text-[11px] text-slate-300 -mt-1 font-medium hidden md:inline">
              Financial journeys in medical emergencies
            </span>
          </div>
        </Link>

        {/* Navigation & Utilities */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/how-it-works"
            className="text-xs text-slate-200 hover:text-white font-medium transition-colors hidden sm:inline"
          >
            How It Works
          </Link>

          <Link
            href="/documents"
            className="text-xs text-slate-200 hover:text-white font-medium transition-colors hidden md:inline"
          >
            Documents
          </Link>

          <Link
            href="/counselor"
            className="text-xs text-slate-200 hover:text-white font-medium flex items-center gap-1 transition-colors hidden sm:flex"
          >
            <Shield className="w-3.5 h-3.5 text-paytm-cyan" />
            <span>Counselor</span>
          </Link>

          <Link
            href="/for-hospitals"
            className="text-xs text-slate-200 hover:text-white font-medium transition-colors hidden lg:inline"
          >
            For Hospitals
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center bg-paytm-navyDark/80 p-0.5 rounded border border-slate-700">
            <button
              type="button"
              onClick={() => handleLangSelect("en")}
              className={`px-2 py-0.5 text-xs font-semibold rounded ${
                lang === "en" ? "bg-paytm-cyan text-paytm-navy font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => handleLangSelect("hi")}
              className={`px-2 py-0.5 text-xs font-semibold rounded ${
                lang === "hi" ? "bg-paytm-cyan text-paytm-navy font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              हिं
            </button>
            <button
              type="button"
              onClick={() => handleLangSelect("mr")}
              className={`px-2 py-0.5 text-xs font-semibold rounded ${
                lang === "mr" ? "bg-paytm-cyan text-paytm-navy font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              मरा
            </button>
          </div>

          {/* Primary Action Button */}
          <Link
            href="/intake"
            className="bg-paytm-cyan text-paytm-navy font-bold text-xs px-3 py-2 rounded shadow hover:bg-white transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Emergency Intake</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
