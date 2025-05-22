import WixImage from "@/components/WixImage";
import { cn } from "@/lib/utils";
import { products } from "@wix/stores";
import { PlayIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ProductMediaProps {
  media: products.MediaItem[] | undefined;
}

export default function ProductMedia({ media }: ProductMediaProps) {
  const [selectedMedia, setSelectedMedia] = useState(media?.[0]);

  useEffect(() => {
    setSelectedMedia(media?.[0]);
  }, [media]);

  if (!media?.length) return null;

  const selectedImage = selectedMedia?.image;
  const selectedVideo = selectedMedia?.video?.files?.[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col-reverse gap-4 lg:flex-row">
        {/* Thumbnail */}
        {media.length > 1 && (
          <div
            className="flex flex-row gap-4 lg:flex-col overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {media.map((mediaItem) => (
              <MediaPreview
                key={mediaItem._id}
                mediaItem={mediaItem}
                isSelected={mediaItem._id === selectedMedia?._id}
                onSelect={() => setSelectedMedia(mediaItem)}
              />
            ))}
          </div>
        )}

        {/* Main image */}
        <div className="bg-muted relative flex-1">
          {selectedImage?.url ? (
            <div className="relative h-full min-h-[600px] w-full">
              <WixImage
                mediaIdentifier={selectedImage.url}
                alt={selectedImage.altText}
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          ) : selectedVideo?.url ? (
            <div className="relative h-full min-h-[600px] w-full">
              <video
                controls
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source
                  src={selectedVideo.url}
                  type={`video/${selectedVideo.format}`}
                />
              </video>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface MediaPreviewProps {
  mediaItem: products.MediaItem;
  isSelected: boolean;
  onSelect: () => void;
}

function MediaPreview({ mediaItem, isSelected, onSelect }: MediaPreviewProps) {
  const imageUrl = mediaItem.image?.url;

  //eg: 11062b_e2fe3f2568f04c639727a838bce1d32cf002.jpg
  const stillFrameMediaId = mediaItem.video?.stillFrameMediaId;

  //eg: https://static.wixstatic.com/media/11062b_e2fe3f2568f04c639727a838bce1d32cf002.jpg/v1/fit/w_50,h_50,q_90/file.jpg
  const thumbnailUrl = mediaItem.thumbnail?.url;

  // video url
  const resolvedThumbnailUrl =
    stillFrameMediaId && thumbnailUrl
      ? thumbnailUrl.split(stillFrameMediaId)[0] + stillFrameMediaId
      : undefined;

  if (!imageUrl && !resolvedThumbnailUrl) return null;

  return (
    /* Thumbnails sidebar */
    <div
      className={cn(
        "bg-muted relative cursor-pointer",
        isSelected && "border-primary border",
      )}
    >
      <div className="bg-muted relative h-24 w-24 cursor-pointer">
        <WixImage
          mediaIdentifier={imageUrl || resolvedThumbnailUrl}
          alt={mediaItem.image?.altText || mediaItem.video?.files?.[0].altText}
          className="object-cover"
          scaleToFill={true}
          width={96}
          height={96}
          onMouseEnter={onSelect}
        />
        {resolvedThumbnailUrl && (
          <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40">
            <PlayIcon className="size-5 text-white/60" />
          </span>
        )}
      </div>
    </div>
  );
}
