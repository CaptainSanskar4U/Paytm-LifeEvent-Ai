"use client";

import { useState, use } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
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
  ArrowRight,
  ShieldCheck,
  Receipt,
  Download,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";

export default function FundingPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const journeyId = resolvedParams.id;

  const [simulatedPaymentDone, setSimulatedPaymentDone] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>("offer-paytm-credit");
  const [copiedUpi, setCopiedUpi] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText("hospital.tpa.apollo@paytm");
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <NextLink
              href={`/journey/${journeyId}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-paytm-cyan transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Return to Living Journey Dashboard</span>
            </NextLink>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-amber-300 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>DEMO PARTNER INTEGRATION // ILLUSTRATIVE TERMS</span>
            </div>
          </div>

          <div className="pb-6 border-b border-neutral-800">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono uppercase text-paytm-cyan font-semibold mb-2">
              <Zap className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>Zero-Admission-Delay Liquidity Bridge</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Emergency Caution Deposit & Liquidity Bridge
            </h1>
            <p className="text-sm text-neutral-400 max-w-2xl mt-1.5 leading-relaxed">
              Bridge the estimated <strong className="text-white">₹1,60,000 out-of-pocket gap</strong> and deposit initial hospital ICU caution money without delaying acute clinical triage.
            </p>
          </div>
        </div>

        {/* Two-Column Grid: Payment Options & Instant UPI Caution Deposit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Vetted Emergency Credit Options */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-paytm-cyan" />
                <span>Emergency Out-of-Pocket Bridge Financing</span>
              </h2>
              <span className="text-[11px] font-mono text-neutral-400">2 Options Available</span>
            </div>

            {/* Plan 1: Paytm Emergency Care Credit */}
            <div
              onClick={() => setSelectedPlan("offer-paytm-credit")}
              className={`rounded-2xl p-6 border transition-all cursor-pointer relative bg-neutral-900/80 ${
                selectedPlan === "offer-paytm-credit"
                  ? "border-paytm-cyan ring-1 ring-paytm-cyan/30 shadow-xl"
                  : "border-neutral-800 hover:border-neutral-700"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-950 border border-neutral-800 text-paytm-cyan flex items-center justify-center font-bold text-xs shadow-xs">
                    P
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Paytm Emergency Care Credit (Direct-to-Desk)</h3>
                    <span className="text-[11px] text-neutral-400 font-mono">Disbursed directly to hospital billing node</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-emerald-950/40 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  Instant Pre-Approved
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-center font-mono">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Credit Line</span>
                  <span className="text-base sm:text-lg font-black text-white">{formatINR(150000)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Tenure</span>
                  <span className="text-base sm:text-lg font-black text-white">6 Months</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Monthly EMI</span>
                  <span className="text-base sm:text-lg font-black text-paytm-cyan">{formatINR(25000)}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Emergency direct disbursement to hospital billing counter within 8 minutes upon Aadhaar KYC verification. Protects family savings during acute ICU admissions.
              </p>

              <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>SLA: ~8 min direct disbursement</span>
                </span>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider font-bold bg-paytm-cyan text-paytm-navy hover:bg-cyan-300 transition-colors"
                >
                  Select & Request Disbursal
                </button>
              </div>
            </div>

            {/* Plan 2: Hospital Subvention EMI */}
            <div
              onClick={() => setSelectedPlan("offer-subvention-emi")}
              className={`rounded-2xl p-6 border transition-all cursor-pointer relative bg-neutral-900/80 ${
                selectedPlan === "offer-subvention-emi"
                  ? "border-paytm-cyan ring-1 ring-paytm-cyan/30 shadow-xl"
                  : "border-neutral-800 hover:border-neutral-700"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-bold text-xs border border-neutral-800">
                    <Building2 className="w-4 h-4 text-paytm-cyan" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Hospital 0% Subvention Assistance Plan</h3>
                    <span className="text-[11px] text-neutral-400 font-mono">Consumables & non-payable surgical kits</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase bg-neutral-950 text-neutral-300 border border-neutral-800 px-2 py-0.5 rounded">
                  0% Interest
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-center font-mono">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Credit Line</span>
                  <span className="text-base sm:text-lg font-black text-white">{formatINR(100000)}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Tenure</span>
                  <span className="text-base sm:text-lg font-black text-white">3 Months</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">Monthly EMI</span>
                  <span className="text-base sm:text-lg font-black text-white">{formatINR(33333)}</span>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                Hospital-supported emergency line specifically targeted at high-cost disposable catheters, drug-eluting stent accessories, and surgical drapes.
              </p>
            </div>
          </div>

          {/* Right Column: Luminous, Clean High-Trust Payment Terminal */}
          <div className="lg:col-span-5 rounded-2xl bg-neutral-900 text-white p-6 sm:p-8 border border-neutral-800 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-neutral-950 text-paytm-cyan border border-neutral-800 flex items-center justify-center">
                  <QrCode className="w-4 h-4 text-paytm-cyan" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">Emergency Caution Terminal</h3>
                  <span className="text-[11px] font-mono text-neutral-400">Direct UPI Settlement Node</span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase text-rose-300 bg-rose-950/40 border border-rose-800 px-2 py-0.5 rounded">
                Required for ICU Bed
              </span>
            </div>

            <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
              Hospital requires an immediate caution deposit of <strong className="text-white font-mono">₹50,000.00</strong> to release cardiac cath lab prep team. Auto-reconciled with Counter #4 in real time.
            </p>

            {simulatedPaymentDone ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-800 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 bg-emerald-900/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-700">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">Payment Confirmed</span>
                  <h4 className="text-xl font-black text-white mt-1">₹50,000.00 Deposited</h4>
                  <p className="text-xs text-neutral-300 mt-1">
                    Auto-reconciled with Counter #4 Hospital Ledger
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800 text-left font-mono text-[11px] space-y-1.5 text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">PAYTM TXN ID:</span>
                    <span className="text-paytm-cyan font-bold">PTM-88492-9102</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">BANK UTR:</span>
                    <span className="text-white font-bold">428919028471</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">TIMESTAMP:</span>
                    <span className="text-neutral-300">14-Nov-2026 22:15:08 IST</span>
                  </div>
                </div>

                <div className="pt-2">
                  <NextLink
                    href={`/journey/${journeyId}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-paytm-cyan text-paytm-navy text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-cyan-300 transition-colors shadow-xs"
                  >
                    <span>Return to Journey</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </NextLink>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Visual QR Code Scanner Frame */}
                <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center relative overflow-hidden group">
                  {/* Subtle scan animation */}
                  <div className="absolute left-0 right-0 h-0.5 bg-[#00baf2] opacity-60 shadow-[0_0_8px_#00baf2] animate-pulse" style={{ top: "35%" }} />

                  {/* Stylized High-Density QR graphic */}
                  <div className="w-40 h-40 bg-white p-3 mx-auto rounded-xl border border-neutral-200 shadow-sm relative flex flex-col items-center justify-center">
                    <div className="grid grid-cols-6 gap-1 w-full h-full p-1 opacity-90">
                      <div className="bg-[#002970] rounded-xs col-span-2 row-span-2"></div>
                      <div className="bg-slate-300 rounded-xs"></div>
                      <div className="bg-[#00baf2] rounded-xs"></div>
                      <div className="bg-[#002970] rounded-xs col-span-2 row-span-2"></div>
                      <div className="bg-[#002970] rounded-xs"></div>
                      <div className="bg-slate-300 rounded-xs"></div>
                      <div className="bg-[#00baf2] rounded-xs"></div>
                      <div className="bg-slate-300 rounded-xs"></div>
                      <div className="bg-[#002970] rounded-xs"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-[#00baf2] rounded-xs"></div>
                      <div className="bg-[#002970] rounded-xs"></div>
                      <div className="bg-[#002970] rounded-xs col-span-2 row-span-2"></div>
                      <div className="bg-[#00baf2] rounded-xs"></div>
                      <div className="bg-slate-300 rounded-xs"></div>
                      <div className="bg-[#002970] rounded-xs col-span-2 row-span-2"></div>
                      <div className="bg-slate-300 rounded-xs"></div>
                      <div className="bg-[#00baf2] rounded-xs"></div>
                    </div>
                    {/* Center Paytm Logo Badge */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 rounded-md bg-[#002970] border-2 border-white flex items-center justify-center text-white font-black text-xs shadow-xs">
                        P
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-xs font-mono text-neutral-300">
                      hospital.tpa.apollo@paytm
                    </span>
                    <button
                      onClick={handleCopyUpi}
                      className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      title="Copy UPI ID"
                    >
                      {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="mt-1 text-xs font-mono text-neutral-400">
                    Exact Amount: <span className="text-white font-bold">₹50,000.00</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSimulatedPaymentDone(true)}
                  className="w-full bg-paytm-cyan hover:bg-cyan-300 text-paytm-navy font-black py-3.5 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <Lock className="w-4 h-4 text-paytm-navy" />
                  <span>Simulate Instant UPI Settlement (₹50,000)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-bit encrypted simulated gateway</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
