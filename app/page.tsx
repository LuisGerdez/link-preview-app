"use client";

import { useRef, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      setHtmlContent(data.html);
      
    } catch (error) {
      console.error("Error fetching preview:", error);
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

      <textarea className="w-full max-w-md border rounded px-3 py-2 text-base" readOnly value={htmlContent}></textarea>
    </div>
  );
}