import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  skeletonClassName?: string;
  /** Tailwind bg class for the blurred placeholder tint. */
  placeholderClassName?: string;
};

/**
 * Image with a soft blurred cream/gold placeholder that fades away when the
 * image finishes loading. The placeholder is always visible so tiles never
 * appear blank while a large photo streams in.
 */
export function ImageWithSkeleton({
  wrapperClassName,
  skeletonClassName,
  placeholderClassName,
  className,
  onLoad,
  ...img
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-[color:var(--muted)]", wrapperClassName)}>
      {/* Warm blurred placeholder — visible immediately, fades out on load */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          "bg-gradient-to-br from-[color:var(--cream)] via-[color:var(--muted)] to-[color:var(--gold-soft)]/40",
          loaded ? "opacity-0" : "opacity-100",
          placeholderClassName,
          skeletonClassName,
        )}
        style={{ filter: "blur(12px)" }}
      />
      <img
        {...img}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          "relative transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}
