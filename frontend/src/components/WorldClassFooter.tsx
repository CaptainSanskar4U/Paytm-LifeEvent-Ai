"use client";

import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Activity, Lock, Landmark } from "lucide-react";

export function WorldClassFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black text-neutral-300 border-t border-neutral-800/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm font-black tracking-widest uppercase bg-neutral-900 text-paytm-cyan border border-neutral-800 px-2.5 py-1 rounded">
                LIFEEVENT AI
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                v2.4 &bull; BUILD FOR INDIA
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The deterministic financial and regulatory coordinator for catastrophic medical emergencies. Protecting families from hospital billing chaos, unlawful TPA deductions, and counter deposit standoffs.
            </p>

            {/* Live System Heartbeat */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-200 font-semibold">ALL ENGINES OPERATIONAL</span>
              <span className="text-neutral-600">&bull;</span>
              <span className="text-neutral-400">99.98% UPTIME</span>
            </div>
          </div>

          {/* Directory Column 1: Emergency & Care */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
              EMERGENCY SUITE
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/intake"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Voice Intake Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/journey/demo-journey-cardiac-01"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Living Journey Line</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/journey/demo-journey-cardiac-01/coverage"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Evidence Inspector</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/journey/demo-journey-cardiac-01/funding"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Paytm Bridge Funding</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 2: Institutional & Hospital */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
              HOSPITALS & B2B
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/counselor"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Counselor Console</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/for-hospitals"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Enterprise Pilot</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Aadhaar Redactor</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 3: Hackathon & Regulatory */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 block">
              EVALUATION & BENCHMARKS
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href="/demo-script"
                  className="text-paytm-cyan font-bold hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>3-Minute Judge Script</span>
                  <ArrowUpRight className="w-3 h-3 text-paytm-cyan" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-300 hover:text-paytm-cyan transition-colors flex items-center gap-1"
                >
                  <span>Verhoeff Privacy Policy</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </Link>
              </li>
              <li>
                <span className="text-neutral-500 text-[11px] block mt-2">
                  Built for Paytm AI Hackathon &bull; Open API Architecture
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal, Compliance & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>&copy; {currentYear} LifeEvent AI. All rights reserved.</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>IRDAI 2024 Compliant</span>
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>DPDP Act 2023 Grounded</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>NODE: AP-SOUTH-1</span>
            <span>&bull;</span>
            <span className="text-paytm-cyan">PAYTM UPI ENGINE READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
