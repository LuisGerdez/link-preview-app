"use client";

import type { Platform } from "../types/platform";

interface PlatformTabsProps {
  platform: Platform;
  onChange: (platform: Platform) => void;
}

const TABS: { value: Platform; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter / X" },
  { value: "slack", label: "Slack" },
];

export default function PlatformTabs({ platform, onChange }: PlatformTabsProps) {
  return (
    <div className="flex gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded font-semibold text-sm cursor-pointer ${
            platform === tab.value
              ? "bg-blue-500 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}