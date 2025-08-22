import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export type BannerCarouselProps = {

  images: string[];
  interval?: number;
  className?: string;
   ariaLabel?: string;
};

export default function BannerCarousel({
  images,
  interval = 4000,
  className,
  ariaLabel = "Carrossel de banners",
}: BannerCarouselProps) {
  const [current, setCurrent] = useState(0);
  const pauseRef = useRef(false);
  const total = images?.length || 0;

  const next = () => setCurrent((s) => (s + 1) % total);
  const prev = () => setCurrent((s) => (s - 1 + total) % total);
  const goTo = (i: number) => { if (total) setCurrent(i % total); };

  useEffect(() => {
    if (!total) return;
    if (pauseRef.current) return;
    const id = window.setInterval(next, interval);
    return () => window.clearInterval(id);
  }, [current, interval, total]);

  if (!total) return null;

  return (
    <section className={className} aria-roledescription="carousel" aria-label={ariaLabel}>
      <div
        className={styles.carousel}
        onMouseEnter={() => (pauseRef.current = true)}
        onMouseLeave={() => (pauseRef.current = false)}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Banner ${i + 1}`}
            className={`${styles.slide} ${i === current ? styles.active : ""}`}
            aria-hidden={i === current ? "false" : "true"}
          />
        ))}

        {/* Controles */}
        <button
          type="button"
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={prev}
          aria-label="Banner anterior"
        >
          ‹
        </button>
        <button
          type="button"
          className={`${styles.navBtn} ${styles.next}`}
          onClick={next}
          aria-label="Próximo banner"
        >
          ›
        </button>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Seleção de banner">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${idx === current ? styles.dotActive : ""}`}
              onClick={() => goTo(idx)}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Ir para o banner ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
