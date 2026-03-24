"use client";

import { useState } from "react";

interface MetaRowProps {
  label: string;
  value: string | null;
}

export default function MetaRow({ label, value }: MetaRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const hasValue = Boolean(value);

  return (
    <div
      onClick={handleCopy}
      title={hasValue ? "Click to copy" : "Not found"}
      className={`group relative flex flex-col gap-0.5 px-3 py-2 rounded-lg border text-sm transition-colors ${
        hasValue
          ? "cursor-pointer border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          : "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950"
      }`}
    >
      {hasValue && (
        <div className="absolute top-2 right-2 flex items-center gap-1">
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-xs text-green-500 font-medium">Copied</span>
            </>
          ) : (
            <svg
              className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        {hasValue ? (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
          {label}
        </span>
      </div>
      {hasValue && (
        <span className="text-gray-800 dark:text-gray-200 break-all leading-snug pl-6">
          {value}
        </span>
      )}
    </div>
  );
}
