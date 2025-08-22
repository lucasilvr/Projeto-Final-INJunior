import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import selo from "../../assets/Promocao.svg";
import pijamaIMG from "../../assets/PijamaIMG.png";
import useGetPijamas from "../../hooks/useGetPijama";

const PAGE_SIZE = 3;

export default function Promocoes() {
  const pijamas = useGetPijamas();
  const [page, setPage] = useState(0);

  // filtra promoções e prepara paginação
  const emPromocao = useMemo(
    () => (pijamas || []).filter((p) => p.onSale),
    [pijamas]
  );

  const totalPages = Math.max(1, Math.ceil(emPromocao.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1); // evita ficar fora do range
  const start = currentPage * PAGE_SIZE;
  const visible = emPromocao.slice(start, start + PAGE_SIZE);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <section className={styles.promocoes}>
      <h2>Nossas últimas promoções!</h2>

      <div className={styles.nav}>
        <button
          className={styles.navBtn}
          onClick={prev}
          disabled={currentPage === 0}
          aria-label="Página anterior"
        >
          ◀
        </button>

        <div className={styles.gridPromo}>
          {visible.map((p) => {
            const precoOriginal = Number(p.price) || 0;
            const temDesconto = !!p.salePercent && p.onSale;
            const precoFinal = temDesconto
              ? precoOriginal * (1 - Number(p.salePercent) / 100)
              : precoOriginal;
            const parcela6x = precoFinal / 6;

            return (
              <Link key={p.id} to={`/pijama/${p.id}`} className={styles.card}>
                <div className={styles.imgBox}>
                  <img className={styles.produto} src={pijamaIMG} alt="" />
                  <img className={styles.selo} src={selo} alt="Promoção" />
                </div>

                <h3 className={styles.nome}>{p.name}</h3>

                {temDesconto && (
                  <span className={styles.precoOriginal}>
                    R$ {precoOriginal.toFixed(2)}
                  </span>
                )}

                <strong className={styles.precoAtual}>
                  R$ {precoFinal.toFixed(2)}
                </strong>

                <small className={styles.parcelamento}>
                  6x de <b>R$ {parcela6x.toFixed(2)}</b>
                </small>
              </Link>
            );
          })}
        </div>

        <button
          className={styles.navBtn}
          onClick={next}
          disabled={currentPage >= totalPages - 1}
          aria-label="Próxima página"
        >
          ▶
        </button>
      </div>

      {emPromocao.length > 0 && (
        <div className={styles.dots} aria-label="Paginação">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`${styles.dot} ${i === currentPage ? styles.dotAtivo : ""}`}
              aria-label={`Ir para página ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
