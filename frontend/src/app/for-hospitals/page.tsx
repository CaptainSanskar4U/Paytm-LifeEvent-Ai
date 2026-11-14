"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { Language, translations } from "@/lib/translations";
import {
  Building2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Send,
  Zap,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function ForHospitalsPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const [hospitalName, setHospitalName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bedCount, setBedCount] = useState("150-300");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/pilot-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hospital_name: hospitalName,
          contact_name: contactName,
          email,
          phone,
          bed_count: bedCount,
        }),
      });
      setSubmitted(true);
    } catch (e) {
      // Offline fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full flex-grow">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-paytm-navy px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
            <Building2 className="w-3.5 h-3.5 text-paytm-cyan" />
            <span>Hospital Pilot Program // Pune & Maharashtra</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-paytm-navy tracking-tight">
            Eliminate Hospital Counter Friction. Accelerate Cashless Approvals.
          </h1>
          <p className="text-sm sm:text-base text-paytm-muted mt-3">
            LifeEvent AI equips your hospital billing and TPA desks with real-time patient readiness tracking, automated Aadhaar redaction, and instant payment reconciliation.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg border border-paytm-border shadow-sm">
            <div className="w-10 h-10 rounded-md bg-paytm-sky text-paytm-navy flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-paytm-cyan" />
            </div>
            <h3 className="text-base font-bold text-paytm-navy mb-1.5">45-Minute Cashless Approvals</h3>
            <p className="text-xs text-paytm-muted leading-relaxed">
              Family arrives with 100% of required pre-auth documents pre-checked and ready. Cuts back-and-forth TPA queries by up to 60%.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-paytm-border shadow-sm">
            <div className="w-10 h-10 rounded-md bg-paytm-sky text-paytm-navy flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-paytm-cyan" />
            </div>
            <h3 className="text-base font-bold text-paytm-navy mb-1.5">Zero Counter Disputes</h3>
            <p className="text-xs text-paytm-muted leading-relaxed">
              Transparent clause-backed explanations of room-rent penalties and non-payable items set expectations before admission rather than at discharge.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-paytm-border shadow-sm">
            <div className="w-10 h-10 rounded-md bg-paytm-sky text-paytm-navy flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5 text-paytm-cyan" />
            </div>
            <h3 className="text-base font-bold text-paytm-navy mb-1.5">Direct Deposit Reconciliation</h3>
            <p className="text-xs text-paytm-muted leading-relaxed">
              Instant UPI and emergency care credit rails disburse caution money straight to your hospital bank account without delay.
            </p>
          </div>
        </div>

        {/* Pricing & Pilot Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Transparent Pilot Pricing */}
          <div className="lg:col-span-5 bg-white rounded-lg p-6 border border-paytm-border shadow-sm">
            <span className="text-xs font-bold text-paytm-navy uppercase tracking-wider block mb-1">
              Pilot Program Tier
            </span>
            <div className="text-3xl font-extrabold text-paytm-navy">
              ₹25,000 <span className="text-sm font-normal text-paytm-muted">/ month per desk</span>
            </div>
            <p className="text-xs text-paytm-muted mt-2">
              Comprehensive 90-day hospital pilot deployment including staff onboarding and TPA desk integration.
            </p>

            <ul className="space-y-2.5 my-6 text-xs text-paytm-navy border-t border-b border-gray-100 py-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Unlimited Patient Emergency Intake Sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Hospital Counselor Dashboard with Live Queue</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>On-device Indian Verhoeff Aadhaar Redaction</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Paytm Emergency Credit & UPI Integration</span>
              </li>
            </ul>

            <div className="p-3 bg-paytm-sky rounded border border-blue-100 text-xs text-paytm-navy">
              <span className="font-bold">Pilot Guarantee: </span>
              <span>If your admission time is not cut by at least 30 minutes in 30 days, pilot fee is fully refunded.</span>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="lg:col-span-7 bg-white rounded-lg p-6 sm:p-8 border border-paytm-border shadow-sm">
            <h3 className="text-lg font-bold text-paytm-navy mb-1">Request a 14-Day Hospital Trial</h3>
            <p className="text-xs text-paytm-muted mb-6">
              Fill out your details to receive an instant trial sandbox deployment for your hospital billing team.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">Trial Request Received</h4>
                <p className="text-xs text-emerald-800">
                  Thank you! Our clinical solutions team will set up your dedicated hospital counselor instance within 2 hours.
                </p>
                <div className="pt-2">
                  <NextLink
                    href="/counselor"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-paytm-navy underline"
                  >
                    <span>Preview Counselor Console in the meantime</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-paytm-navy block mb-1">Hospital Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune City Multi-Speciality"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-paytm-cyan"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-paytm-navy block mb-1">Contact Person Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma (Medical Supt.)"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-paytm-cyan"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-paytm-navy block mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. billing@hospital.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-paytm-cyan"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-paytm-navy block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98220 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-paytm-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-paytm-navy block mb-1">Bed Capacity</label>
                  <select
                    value={bedCount}
                    onChange={(e) => setBedCount(e.target.value)}
                    className="w-full text-xs p-2.5 rounded border border-gray-300 focus:outline-none focus:border-paytm-cyan bg-white"
                  >
                    <option value="50-150">50 &ndash; 150 Beds</option>
                    <option value="150-300">150 &ndash; 300 Beds</option>
                    <option value="300+">300+ Beds (Multi-Speciality)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-paytm-navy text-white hover:bg-opacity-95 font-bold py-3 px-4 rounded text-xs transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-3.5 h-3.5 text-paytm-cyan" />
                  <span>{isSubmitting ? "Submitting Request..." : "Request Pilot Sandbox Access"}</span>
                </button>
              </form>
            )}
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

