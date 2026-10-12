"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Play, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getTestimonialVideos } from "@/lib/content";
import type { TestimonialVideo } from "@konark/shared";

function VideoCard({ poster, onPlay }: { poster: string; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label="Play patient testimonial video"
      className="group relative aspect-square w-[220px] shrink-0 snap-start overflow-hidden rounded-xl2 bg-ink-950 shadow-card sm:w-[260px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-0 bg-ink-950/20 transition-colors group-hover:bg-ink-950/30" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-600 shadow-floating">
          <Play size={22} fill="currentColor" className="translate-x-0.5" />
        </span>
      </span>
    </button>
  );
}

function VideoLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 p-4" onClick={onClose}>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <X size={20} />
      </button>
      <video autoPlay controls playsInline className="max-h-[85vh] max-w-full rounded-xl2 shadow-floating" onClick={(e) => e.stopPropagation()}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

export function TestimonialVideos({
  initialItems,
  initialCursor,
}: {
  initialItems: TestimonialVideo[];
  initialCursor: string | null;
}) {
  const [videos, setVideos] = useState(initialItems);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursor) return;
    const container = scrollRef.current;
    const sentinel = sentinelRef.current;
    if (!container || !sentinel) return;

    // Horizontal infinite scroll: load the next page of videos only once the sentinel at the
    // end of the row is about to enter view — this is what keeps the gallery cheap even if
    // the collection grows to hundreds of thousands of entries, since only loaded pages exist in the DOM.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          getTestimonialVideos(12, cursor)
            .then(({ items, nextCursor }) => {
              setVideos((prev) => [...prev, ...items]);
              setCursor(nextCursor);
            })
            .finally(() => setLoading(false));
        }
      },
      { root: container, rootMargin: "0px 400px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [cursor, loading]);

  if (videos.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Patient Stories</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink-950 sm:text-3xl">Hear From Our Patients</h2>

        <div ref={scrollRef} className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6">
          {videos.map((v) => (
            <VideoCard key={v.id} poster={v.posterUrl} onPlay={() => setActive(v.videoUrl)} />
          ))}

          {cursor && (
            <div ref={sentinelRef} className="flex w-10 shrink-0 items-center justify-center">
              {loading && <Loader2 size={20} className="animate-spin text-brand-400" />}
            </div>
          )}
        </div>
      </Container>

      {active && <VideoLightbox src={active} onClose={() => setActive(null)} />}
    </section>
  );
}
