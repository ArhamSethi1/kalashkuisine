import { useState, type ImgHTMLAttributes } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  wrapperClassName?: string;
  skeletonClassName?: string;
};

/**
 * Image that renders a subtle skeleton until the file has loaded.
 * Uses a timer so the skeleton only shows if load takes > 0.8s.
 */
export function ImageWithSkeleton({
  wrapperClassName,
  skeletonClassName,
  className,
  onLoad,
  ...img
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative", wrapperClassName)}>
      {!loaded && (
        <Skeleton
          className={cn(
            "absolute inset-0 h-full w-full rounded-none opacity-0 [animation-delay:0.8s] [animation-fill-mode:forwards]",
            "animate-[fade-in_0.3s_ease-out_0.8s_forwards]",
            skeletonClassName,
          )}
        />
      )}
      <img
        {...img}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          className,
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
