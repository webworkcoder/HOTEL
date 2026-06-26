"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>

        <h1 className="text-2xl font-heading text-foreground">
          Something went wrong
        </h1>

        <p className="text-muted-foreground text-sm leading-relaxed">
          We encountered an unexpected issue while loading your luxury
          experience. Please try again.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-5 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
