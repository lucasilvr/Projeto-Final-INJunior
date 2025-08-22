import { useRef, useState, useEffect } from "react";
import type { Pijama } from "../../type/Pijama";
import useCartStore from "../../stores/cartStore";
import pijamaIMG from "../../assets/PijamaIMG.png";
import axios from "axios";
import vermelho from "../../assets/Coracao-Vermelho.svg";
import transparente from "../../assets/Coracao-Transparente.svg";
import styles from "./styles.module.css";

type CarouselProps = { pijamas: Pijama[] };

export default function PijamasCarousel({ pijamas }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Atualiza estados de início/fim (opcional, só pra desabilitar setas no limite)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 0);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByViewport = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth; // rola 1 viewport do trilho
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
        ‹
      </button>

      <div ref={trackRef} className={styles.track}>
        {pijamas.map((p) => (
          <CardPijamaInline key={p.id} pijama={p} />
        ))}
      </div>

      <button
        className={`${styles.navBtn} ${styles.right}`}
        onClick={() => scrollByViewport("right")}
        disabled={atEnd}
        aria-label="Próximo"
      >
        ›
      </button>
    </section>
  );
}

function CardPijamaInline({ pijama }: { pijama: Pijama }) {
  const [curtida, setCurtida] = useState<boolean>(!!pijama.favorite);
  const percent = pijama.onSale && typeof pijama.salePercent === "number" ? pijama.salePercent / 100 : 0;
  const precoComDesconto = +(pijama.price * (1 - percent));

  const handleToggle = () => {
    const novoFavorito = !curtida;
    setCurtida(novoFavorito);
    axios.patch(`http://localhost:3333/pajamas/${pijama.id}`, { favorite: novoFavorito }).catch(console.error);
  };

  return (
    <article className={styles.card}>
      <div className={styles.thumbWrap}>
        <img className={styles.thumb} src={pijamaIMG} alt={pijama.name} />

        {/* like no topo direito da imagem */}
        <button
          className={styles.likeBtnImg}
          onClick={handleToggle}
          aria-label="Favoritar"
        >
          <img src={curtida ? vermelho : transparente} alt="Coração" width={20} height={20} />
        </button>
      </div>

      <h3 className={styles.cardTitle}>{pijama.name}</h3>
      <p className={styles.price}>R$ {precoComDesconto.toFixed(2)}</p>
    </article>
  );
}
