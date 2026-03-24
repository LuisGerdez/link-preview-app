"use client";

import { useRef, useState } from "react";

import type { MetaTags } from "./types/meta";


export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState<MetaTags | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");

      setMeta(data.meta);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error fetching preview");
      setMeta(null);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">

      <h1 className="mb-4 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Link Preview Studio</h1>
      <p className="mb-6 text-lg text-gray-600 font-normal text-body lg:text-xl sm:px-16 xl:px-48">
        A web tool to preview how your links look when shared on social media platforms!
      </p>

      <form className="w-full max-w-md flex gap-2 mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Type or paste your URL here..."
          className="flex-1 border rounded px-3 py-2 text-base"
          ref={inputRef}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Preview
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}
      {meta && (
        <div className="w-full max-w-md border rounded px-3 py-2 text-base">
          <pre>{JSON.stringify(meta, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}