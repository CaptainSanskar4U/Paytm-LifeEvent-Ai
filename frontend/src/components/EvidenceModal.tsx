"use client";

import { X, CheckCircle2, AlertTriangle, FileText, ExternalLink, ShieldCheck } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface ClaimEvidence {
  category: string;
  estimated_cost: number;
  likely_covered: number;
  out_of_pocket: number;
  confidence: string;
  evidence_doc: string;
  evidence_page: number;
  evidence_passage: string;
  clause_ref: string;
  is_verified: boolean;
}

interface EvidenceModalProps {
  claim: ClaimEvidence | null;
  onClose: () => void;
}

export function EvidenceModal({ claim, onClose }: EvidenceModalProps) {
  if (!claim) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-neutral-900 text-white rounded-xl shadow-2xl max-w-xl w-full border border-neutral-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-neutral-950 text-white p-4.5 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-neutral-900 rounded-md text-paytm-cyan border border-neutral-800">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-white">{claim.category}</h3>
              <p className="text-[11px] text-neutral-400">Evidence Verification & Clause Audit</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Numbers Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-center">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tight block">
                Billed Estimate
              </span>
              <span className="text-sm font-bold text-white">{formatINR(claim.estimated_cost)}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight block">
                Likely Covered
              </span>
              <span className="text-sm font-bold text-emerald-300">{formatINR(claim.likely_covered)}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-tight block">
                Out-of-Pocket
              </span>
              <span className="text-sm font-bold text-rose-300">{formatINR(claim.out_of_pocket)}</span>
            </div>
          </div>

          {/* Verification Status Badge */}
          <div
            className={`p-3.5 rounded-lg border flex items-start gap-2.5 ${
              claim.is_verified
                ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
                : "bg-amber-950/40 border-amber-800/60 text-amber-200"
            }`}
          >
            {claim.is_verified ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <span className="font-bold text-xs uppercase tracking-wider block">
                {claim.is_verified ? "Matches text read from your document" : "Needs TPA Confirmation"}
              </span>
              <p className="text-xs mt-0.5 leading-relaxed text-neutral-300">
                {claim.is_verified
                  ? "This coverage rule was directly matched against the policy excerpt provided."
                  : "This claim could not be verified in the uploaded pages. Confirm with your hospital insurance desk."}
              </p>
            </div>
          </div>

          {/* Cited Passage Box */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-paytm-cyan" />
                <span>Exact Cited Policy Excerpt</span>
              </span>
              <span className="text-neutral-400 font-mono">
                {claim.evidence_doc} (Page {claim.evidence_page})
              </span>
            </div>

            <div className="p-4 bg-neutral-950 rounded-lg border-l-4 border-paytm-cyan text-neutral-200 text-xs sm:text-sm font-mono leading-relaxed italic border border-neutral-800">
              "{claim.evidence_passage}"
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
              <span>Clause Identifier: {claim.clause_ref}</span>
              <span className="text-paytm-cyan">Audited via Anti-Hallucination Matcher</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-paytm-cyan text-paytm-navy text-xs font-bold rounded-lg hover:bg-cyan-300 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}

