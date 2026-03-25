import { useState, useEffect } from "react";
import type { MetaTags } from "../types/meta";
import type { Platform } from "../types/platform";

import FacebookPreviewCard from "./PreviewCard/FacebookPreviewCard";
import TwitterPreviewCard from "./PreviewCard/TwitterPreviewCard";
import SlackPreviewCard from "./PreviewCard/SlackPreviewCard";

interface PlatformPreviewProps {
  meta: MetaTags;
  platform: Platform;
}

export default function PlatformPreview({ meta, platform }: PlatformPreviewProps) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [meta]);

  const onImgError = () => setImgError(true);

  return (
    <div className="w-full max-w-md px-4 sm:px-0">
      {platform === "facebook" && <FacebookPreviewCard meta={meta} imgError={imgError} onImgError={onImgError} />}
      {platform === "twitter" && <TwitterPreviewCard meta={meta} imgError={imgError} onImgError={onImgError} />}
      {platform === "slack" && <SlackPreviewCard meta={meta} imgError={imgError} onImgError={onImgError} />}
    </div>
  );
}