import setaEsq from "../../assets/anterior.png";
import setaDir from "../../assets/proximo.png";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Pijama } from "../../type/Pijama";
import axios from "axios";
import vermelho from "../../assets/Coracao-Vermelho.svg";
import transparente from "../../assets/Coracao-Transparente.svg";
import styles from "./styles.module.css";

type CarouselProps = { pijamas: Pijama[] };

export default function PijamasCarousel({ pijamas }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEnds = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => updateEnds();
    const onResize = () => updateEnds();

    el.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => requestAnimationFrame(updateEnds));
    ro.observe(el);

    const imgs = Array.from(el.querySelectorAll("img"));
    const onImgLoad = () => requestAnimationFrame(updateEnds);
    imgs.forEach(img => {
      if (img.complete) return;
      img.addEventListener("load", onImgLoad);
      img.addEventListener("error", onImgLoad);
    });

    requestAnimationFrame(updateEnds);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      imgs.forEach(img => {
        img.removeEventListener("load", onImgLoad);
        img.removeEventListener("error", onImgLoad);
      });
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(updateEnds));
  }, [pijamas]);

  const scrollByViewport = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className={styles.wrap} aria-label="Carrossel de pijamas">
      <button
        className={`${styles.navBtn} ${styles.left}`}
        onClick={() => scrollByViewport("left")}
        disabled={atStart}
        aria-label="Anterior"
      >
        <img src={setaEsq} alt="Anterior" />
      </button>

      <div ref={trackRef} className={styles.track}>
        {pijamas.map((p) => (
          <CardPijamaLinkado key={p.id} pijama={p} />
        ))}
      </div>

      <button
        className={`${styles.navBtn} ${styles.right}`}
        onClick={() => scrollByViewport("right")}
        disabled={atEnd}
        aria-label="Próximo"
      >
        <img src={setaDir} alt="Próximo" />
      </button>
    </section>
  );
}

function CardPijamaLinkado({ pijama }: { pijama: Pijama }) {
  const [curtida, setCurtida] = useState<boolean>(!!pijama.favorite);
  const percent =
    pijama.onSale && typeof pijama.salePercent === "number"
      ? pijama.salePercent / 100
      : 0;
  const precoComDesconto = +(pijama.price * (1 - percent));

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const novoFavorito = !curtida;
    setCurtida(novoFavorito);
    axios
      .patch(`http://localhost:3333/pajamas/${pijama.id}`, { favorite: novoFavorito })
      .catch(console.error);
  };

  return (
    <Link to={`/pijama/${pijama.id}`} className={styles.card}>
      <div className={styles.thumbWrap}>
        <img className={styles.thumb} src={pijama.image} alt={pijama.name} />

        <button
          className={styles.likeBtnImg}
          onClick={handleToggle}
          aria-label={curtida ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          <img
            src={curtida ? vermelho : transparente}
            alt="Coração"
            width={20}
            height={20}
          />
        </button>
      </div>

      <h3 className={styles.cardTitle}>{pijama.name}</h3>
      <p className={styles.price}>R$ {precoComDesconto.toFixed(2)}</p>
    </Link>
  );
}
