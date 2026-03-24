interface RecentUrlsProps {
  urls: string[];
  onSelect: (url: string) => void;
}

export default function RecentUrls({ urls, onSelect }: RecentUrlsProps) {
  if (urls.length === 0) return null;

  return (
    <div className="w-full max-w-md mb-2 mt-4">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Recent</p>
      <ul className="flex flex-col gap-0.5">
        {urls.map((url) => (
          <li key={url}>
            <button
              onClick={() => onSelect(url)}
              className="w-full text-left text-sm text-blue-500 hover:underline truncate px-2 py-1 rounded hover:bg-gray-50"
            >
              {url}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}