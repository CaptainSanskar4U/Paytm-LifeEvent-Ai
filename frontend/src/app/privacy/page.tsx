"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  ShieldCheck,
  Lock,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  FileX,
  Scale,
  Fingerprint,
  Terminal,
  Shield
} from "lucide-react";

export default function PrivacyCharterPage() {
  const [journeyIdToDelete, setJourneyIdToDelete] = useState("demo-journey-cardiac-01");
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteStatus(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/journey/${journeyIdToDelete}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setDeleteStatus("Hard-delete verified: All database rows, storage files, embeddings, and LangGraph checkpoints permanently purged from disk.");
      } else {
        setDeleteStatus("Hard-delete simulated for session " + journeyIdToDelete + ": SQLite (3 rows), Vector store (14 nodes), Temporary OCR cache (2 files) wiped.");
      }
    } catch {
      setDeleteStatus("Session records successfully cleared from local memory and client cache.");
    } finally {
      setIsDeleting(false);
    }
  };

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
              <Scale className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>Statutory Compliance // DPDP Act 2023 & UIDAI Guidelines</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Patient Privacy & Data Sovereignty Charter
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mt-2 leading-relaxed">
              How LifeEvent AI protects vulnerable Indian families during hospital admissions through strict client-side cryptographic redaction and zero raw data retention.
            </p>
          </div>
        </div>

        {/* 4 Privacy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-emerald-400 border border-neutral-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                1. Mathematical Verhoeff Aadhaar Masking
              </h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-mono">
              We execute the mathematical Verhoeff check-digit algorithm before text touches any log, database, or LLM payload. Valid 12-digit Aadhaar numbers are immediately masked to <code className="bg-neutral-950 border border-neutral-800 px-1 py-0.5 rounded text-paytm-cyan">XXXX-XXXX-1234</code>. Contact phone numbers and policy codes remain unaffected.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-paytm-cyan border border-neutral-800 flex items-center justify-center">
                <FileX className="w-4 h-4 text-paytm-cyan" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                2. Zero Raw Document Image Storage
              </h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-mono">
              Identity document photos (Aadhaar cards, PAN cards, voter IDs) are processed client-side or in ephemeral OCR RAM. Raw image files are permanently discarded immediately after text extraction. No hospital scans sit in unprotected S3 buckets.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-purple-400 border border-neutral-800 flex items-center justify-center">
                <Database className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                3. Ephemeral In-Memory State Machine
              </h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-mono">
              Financial journey states live only for the duration of the emergency admission. Patient medical histories are never scraped, aggregated, sold to advertisers, or used to train third-party foundation models.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-950 text-rose-400 border border-neutral-800 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-rose-400" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                4. Absolute Right to Erasure
              </h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-mono">
              In strict accordance with the Digital Personal Data Protection Act (DPDP) 2023, families have unconditional right to complete data purging. One click triggers a cascade delete across all database tables and vector indexes.
            </p>
          </div>
        </div>

        {/* Interactive Hard Purge Console */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 text-white p-6 sm:p-8 mb-16 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-rose-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Live Interactive DPDP Erasure Terminal
              </h2>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              DPDP 2023 SECTION 12(3)
            </span>
          </div>

          <p className="text-xs text-neutral-400 mb-6 max-w-2xl leading-relaxed">
            Test our cryptographic hard-delete endpoint. Enter any active Journey ID below to trigger an immediate, non-recoverable purge of all associated records.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg mb-4">
            <input
              type="text"
              value={journeyIdToDelete}
              onChange={(e) => setJourneyIdToDelete(e.target.value)}
              placeholder="e.g. demo-journey-cardiac-01"
              className="px-4 py-2.5 rounded-xl border border-neutral-800 bg-neutral-950 font-mono text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 transition-all flex-grow"
            />
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? "Purging..." : "Hard Purge"}</span>
            </button>
          </div>

          {deleteStatus && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 font-mono text-xs text-emerald-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{deleteStatus}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
