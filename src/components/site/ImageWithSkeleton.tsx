import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
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
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const srcKey = typeof img.src === "string" ? img.src : undefined;

  useEffect(() => {
    setLoaded(false);
    const node = imgRef.current;
    if (!node) return;

    if (node.complete && node.naturalWidth > 0) {
      setLoaded(true);
      return;
    }

    const id = window.setTimeout(() => {
      const current = imgRef.current;
      if (current?.complete && current.naturalWidth > 0) {
        setLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(id);
  }, [srcKey]);

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
        ref={imgRef}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          img.onError?.(e);
        }}
        className={cn(
          "relative z-[1] opacity-100 transition-opacity duration-500",
          className,
        )}
      />
    </div>
  );
}
