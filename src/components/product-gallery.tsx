"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

export function ProductGallery({
  images,
  name,
  children,
}: {
  images: string[];
  name: string;
  /** Laid over the main image. */
  children?: ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  const image = images[selected];

  return (
    <div>
      <div className="relative aspect-[3/4] rounded-sm border border-stone-200 bg-white">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(min-width: 1024px) 380px, 100vw"
            className="object-contain p-10"
          />
        ) : (
          <p className="absolute inset-0 grid place-items-center font-mono text-[10px] tracking-widest text-stone-400 uppercase">
            Image coming soon
          </p>
        )}
        {children}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
              className={`relative size-20 rounded-sm bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950 ${
                index === selected ? "border-2 border-stone-950" : "border border-stone-200 hover:border-stone-400"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
