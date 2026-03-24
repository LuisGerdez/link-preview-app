import type { MetaTags } from "../../types/meta";
import MetaRow from "./MetaRow";

const META_LABELS: { key: keyof MetaTags; label: string }[] = [
  { key: "og_title", label: "og:title" },
  { key: "og_description", label: "og:description" },
  { key: "og_image", label: "og:image" },
  { key: "og_url", label: "og:url" },
  { key: "twitter_card", label: "twitter:card" },
  { key: "twitter_title", label: "twitter:title" },
  { key: "twitter_description", label: "twitter:description" },
  { key: "twitter_image", label: "twitter:image" },
  { key: "html_title", label: "title" },
  { key: "meta_description", label: "meta:description" },
  { key: "site", label: "site" },
];

interface MetaTagsPanelProps {
  meta: MetaTags;
}

export default function MetaTagsPanel({ meta }: MetaTagsPanelProps) {
  const found = META_LABELS.filter(({ key }) => meta[key] !== null);
  const notFound = META_LABELS.filter(({ key }) => meta[key] === null);

  return (
    <aside className="w-full max-w-sm flex flex-col gap-2">
      <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
        Meta Tags ({found.length}/{META_LABELS.length})
      </h2>

      {found.map(({ key, label }) => (
        <MetaRow key={key} label={label} value={meta[key]} />
      ))}

      {notFound.length > 0 && (
        <>
          <h3 className="text-xs font-semibold text-red-400 dark:text-red-500 uppercase tracking-widest mt-3 mb-1">
            Not Found ({notFound.length})
          </h3>
          {notFound.map(({ key, label }) => (
            <MetaRow key={key} label={label} value={meta[key]} />
          ))}
        </>
      )}
    </aside>
  );
}
