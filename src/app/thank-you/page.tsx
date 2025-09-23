"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const ref = searchParams?.get('ref') || undefined;
  const firstName = searchParams?.get('name') || undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 lg:px-8 py-12">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 lg:p-10 shadow-lg">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-amber-300 text-sm">
          <span aria-hidden>⚡</span> Request received
        </div>

        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Thank you{firstName ? `, ${firstName}` : ""}!
        </h1>

        <p className="mt-3 text-neutral-300">
          We&apos;ve received your details. Our consultant will contact you within{" "}
          <strong>10–15 minutes</strong> to confirm your car details and share the next steps.
        </p>

        {ref && (
          <p className="mt-2 text-sm text-neutral-400">
            Reference: <span className="font-mono">{ref}</span>
          </p>
        )}

        <div className="mt-8 grid gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4">
            <h2 className="font-semibold text-white">What happens next?</h2>
            <ul className="mt-2 list-disc pl-5 text-neutral-300 text-sm space-y-1">
              <li>Quick phone confirmation of car details and ownership.</li>
              <li>Online inspection (video walk-around, VIN, odometer).</li>
              <li>Same-day payout & paperwork, handled anywhere in the UAE.</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 font-semibold text-white">
              Back to Home
            </Link>
            <a href="#contact" className="inline-flex items-center justify-center rounded-xl border border-neutral-700 px-5 py-3 font-semibold text-white/90">
              Contact Support
            </a>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            KYC may be required under UAE AML/CFT. Final price confirmed after inspection.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <main className="mx-auto max-w-3xl px-4 lg:px-8 py-12">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 lg:p-10 shadow-lg">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-700 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-neutral-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-neutral-700 rounded w-3/4"></div>
          </div>
        </div>
      </main>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
