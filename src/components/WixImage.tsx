/* eslint-disable @next/next/no-img-element */
import { media as wixMedia } from "@wix/sdk";
import { ImgHTMLAttributes } from "react";

// Define specific types for scale-to-fill and non-scale-to-fill props
interface ScaleToFillProps {
  scaleToFill?: true; // Optional, as it's implied true when width and height are provided
  width: number;
  height: number;
}

interface NonScaleToFillProps {
  scaleToFill: false;
  width?: never; // Prevent width when scaleToFill is false
  height?: never; // Prevent height when scaleToFill is false
}

type WixImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "width" | "height" | "alt"
> & {
  mediaIdentifier?: string;
  placeholder?: string;
  alt?: string | null;
} & (ScaleToFillProps | NonScaleToFillProps);

export default function WixImage({
  mediaIdentifier,
  placeholder = "/placeholder.svg",
  alt = "",
  scaleToFill,
  width,
  height,
  ...imgProps
}: WixImageProps) {
  // Determine if scaling should be applied (true if width and height are provided or scaleToFill is explicitly true)
  const isScaled = width !== undefined && height !== undefined;

  // Determine image URL based on scaling condition
  const imageUrl = mediaIdentifier
    ? isScaled || scaleToFill
      ? wixMedia.getScaledToFillImageUrl(mediaIdentifier, width, height, {})
      : wixMedia.getImageUrl(mediaIdentifier).url
    : placeholder;

  console.log(mediaIdentifier);

  return (
    <img
      src={imageUrl}
      alt={alt ?? "Aurawear Image"}
      width={width}
      height={height}
      {...imgProps}
    />
  );
}
