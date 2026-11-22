"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { STATIC_BOOK_COVER } from "@/lib/constants";
import { canUseNextImage } from "@/lib/image-hosts";

type BookCoverImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function BookCoverImage({ src, alt, className, sizes, priority }: BookCoverImageProps) {
  const [useFallback, setUseFallback] = useState(false);

  const display = useMemo(() => {
    if (useFallback || !src?.trim()) {
      return { mode: "local" as const, url: STATIC_BOOK_COVER };
    }
    if (canUseNextImage(src)) {
      return { mode: "next" as const, url: src };
    }
    return { mode: "native" as const, url: src };
  }, [src, useFallback]);

  const wrapperClass = cn("relative overflow-hidden bg-card", className);

  if (display.mode === "native") {
    return (
      <div className={wrapperClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={display.url}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setUseFallback(true)}
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <Image
        src={display.url}
        alt={alt}
        fill
        className="object-cover"
        sizes={sizes ?? "(max-width:768px) 100vw, 33vw"}
        priority={priority}
        onError={() => setUseFallback(true)}
      />
    </div>
  );
}
