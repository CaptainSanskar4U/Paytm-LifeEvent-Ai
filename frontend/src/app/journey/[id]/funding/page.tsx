"use client";

import { useState, use } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { Language, translations } from "@/lib/translations";
import { formatINR } from "@/lib/utils";
import {
  CreditCard,
  QrCode,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Building2,
  Lock,
  ArrowRight
} from "lucide-react";

export default function FundingPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const journeyId = resolvedParams.id;

  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const [simulatedPaymentDone, setSimulatedPaymentDone] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>("offer-paytm-credit");

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-grow">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <NextLink
            href={`/journey/${journeyId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-paytm-navy hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Living Journey Dashboard</span>
          </NextLink>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-0.5 rounded text-xs font-bold uppercase mb-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Demo Partner Integration &bull; Illustrative Terms</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-paytm-navy">
                Emergency Funding & Hospital Deposit Plan
              </h1>
              <p className="text-xs sm:text-sm text-paytm-muted mt-1">
                Bridge the estimated <strong className="text-paytm-navy">₹1,60,000 out-of-pocket gap</strong> and deposit initial caution money without delaying emergency triage.
              </p>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Payment Options & Instant UPI Caution Deposit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vetted Emergency Credit Options */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-lg font-bold text-paytm-navy flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-paytm-cyan" />
              <span>Emergency Bridge Financing Options</span>
            </h2>

            {/* Plan 1: Paytm Emergency Care Credit */}
            <div
              onClick={() => setSelectedPlan("offer-paytm-credit")}
              className={`bg-white rounded-lg p-5 border-2 transition-all cursor-pointer shadow-sm relative ${
                selectedPlan === "offer-paytm-credit"
                  ? "border-paytm-navy ring-2 ring-paytm-cyan/30"
                  : "border-paytm-border hover:border-gray-300"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-paytm-navy flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-paytm-cyan" />
                  <span>Paytm Emergency Care Credit (Direct to Hospital)</span>
                </span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                  Demo Partner, illustrative terms, not a real offer
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-3 p-3 bg-paytm-sky rounded border border-blue-100 text-center">
                <div>
                  <span className="text-[11px] text-paytm-muted block">Credit Limit</span>
                  <span className="text-sm sm:text-base font-extrabold text-paytm-navy">{formatINR(150000)}</span>
                </div>
                <div>
                  <span className="text-[11px] text-paytm-muted block">Tenure</span>
                  <span className="text-sm sm:text-base font-extrabold text-paytm-navy">6 Months</span>
                </div>
                <div>
                  <span className="text-[11px] text-paytm-muted block">Monthly EMI</span>
                  <span className="text-sm sm:text-base font-extrabold text-paytm-navy">{formatINR(25000)}</span>
                </div>
              </div>

              <p className="text-xs text-paytm-muted leading-relaxed">
                Emergency direct disbursement to Sample City Hospital billing desk within 10 minutes upon KYC. Protects family savings during acute admission.
              </p>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-paytm-navy" />
                  <span>Disbursal speed: ~10 minutes</span>
                </span>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded text-xs font-bold bg-paytm-navy text-white hover:bg-opacity-95"
                >
                  Select & Request Disbursal
                </button>
              </div>
            </div>

            {/* Plan 2: Hospital Subvention EMI */}
            <div
              onClick={() => setSelectedPlan("offer-subvention-emi")}
              className={`bg-white rounded-lg p-5 border-2 transition-all cursor-pointer shadow-sm relative ${
                selectedPlan === "offer-subvention-emi"
                  ? "border-paytm-navy ring-2 ring-paytm-cyan/30"
                  : "border-paytm-border hover:border-gray-300"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-paytm-navy flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-paytm-cyan" />
                  <span>Sample City Hospital Care Subvention Plan</span>
                </span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                  Demo Partner, illustrative terms, not a real offer
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-3 p-3 bg-paytm-sky rounded border border-blue-100 text-center">
                <div>
                  <span className="text-[11px] text-paytm-muted block">Credit Limit</span>
                  <span className="text-sm sm:text-base font-extrabold text-paytm-navy">{formatINR(100000)}</span>
                </div>
                <div>
                  <span className="text-[11px] text-paytm-muted block">Tenure</span>
                  <span className="text-sm sm:text-base font-extrabold text-paytm-navy">3 Months</span>
                </div>
                <div>
                  <span className="text-[11px] text-paytm-muted block">Monthly EMI</span>
                  <span className="text-sm sm:text-base font-extrabold text-paytm-navy">{formatINR(33333)}</span>
                </div>
              </div>

              <p className="text-xs text-paytm-muted leading-relaxed">
                Hospital-supported emergency line covering non-payable surgical disposables and stent accessories.
              </p>
            </div>
          </div>

          {/* Right Column: Simulated Instant UPI Caution Deposit */}
          <div className="lg:col-span-5 bg-white rounded-lg p-6 border border-paytm-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-paytm-navy flex items-center gap-2">
                <QrCode className="w-5 h-5 text-paytm-cyan" />
                <span>Immediate Caution Deposit</span>
              </h3>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Required for ICU Bed
              </span>
            </div>

            <p className="text-xs text-paytm-muted mb-4">
              Hospital requires an initial caution deposit of <strong className="text-paytm-navy">₹50,000</strong> before moving patient to the Cath Lab. Pay directly via Paytm UPI.
            </p>

            {simulatedPaymentDone ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-3 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-emerald-900">₹50,000 Deposit Acknowledged</h4>
                <p className="text-xs text-emerald-800">
                  Transaction ID: <span className="font-mono font-semibold">PAYTM-TXN-88492019</span>
                  <br />
                  Digital receipt automatically transmitted to Sample City Hospital Counter #4.
                </p>
                <div className="pt-2">
                  <NextLink
                    href={`/journey/${journeyId}`}
                    className="inline-flex items-center gap-2 bg-paytm-navy text-white text-xs font-bold px-4 py-2 rounded"
                  >
                    <span>Return to Journey Line</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-paytm-sky rounded-lg border border-blue-100 text-center">
                  {/* Stylized QR Code Graphic */}
                  <div className="w-36 h-36 bg-white border-2 border-paytm-navy p-2 mx-auto rounded flex flex-col items-center justify-center shadow-inner relative">
                    <div className="grid grid-cols-4 gap-1 w-full h-full p-1 opacity-80">
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-paytm-cyan rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-paytm-cyan rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-white rounded-sm"></div>
                      <div className="bg-paytm-cyan rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-white rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-paytm-cyan rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                      <div className="bg-paytm-cyan rounded-sm"></div>
                      <div className="bg-paytm-navy rounded-sm"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-paytm-navy block mt-2">
                    UPI ID: hospital.tpa@samplebank
                  </span>
                  <span className="text-xs font-extrabold text-paytm-navy block mt-0.5">
                    Amount: ₹50,000.00
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSimulatedPaymentDone(true)}
                  className="w-full bg-paytm-cyan text-paytm-navy hover:brightness-105 font-bold py-3 px-4 rounded text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Simulate Instant UPI Deposit (₹50,000)</span>
                </button>

                <p className="text-[11px] text-center text-paytm-muted">
                  Demo sandbox: Simulates instant payment confirmation and auto-receipt generation.
                </p>
              </div>
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
