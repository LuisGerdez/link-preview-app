"use client";

import { useRef, useState } from "react";

interface PreviewFormProps {
  onSubmit: (url: string) => Promise<void>;
  loading: boolean;
}

export default function PreviewForm({ onSubmit, loading }: PreviewFormProps) {
  const [url, setUrl] = useState("");
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
        className="flex-1 border rounded px-3 py-2 text-base"
        ref={inputRef}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
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