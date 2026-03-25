"use client";

import { useRef, useState } from "react";

interface PreviewFormProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
}

export default function PreviewForm({ url, onUrlChange, onSubmit, loading }: PreviewFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(url);
    inputRef.current?.focus();
  };

  return (
    <form className="w-full max-w-md flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        required
        placeholder="Type or paste your URL here..."
        className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        ref={inputRef}
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        {loading ? "Loading..." : "Preview"}
      </button>
    </form>
  );
}