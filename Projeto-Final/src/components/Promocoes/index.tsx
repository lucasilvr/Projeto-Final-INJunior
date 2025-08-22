import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import selo from "../../assets/Promocao.svg";
import pijamaIMG from "../../assets/PijamaIMG.png";
import useGetPijamas from "../../hooks/useGetPijama";
import heartOn from "../../assets/Coracao-Vermelho.svg";
import heartOff from "../../assets/Coracao-Transparente.svg";

type FavMap = Record<string, boolean>;
const LS_KEY = "promocoes:favs";

function loadFavs(): FavMap {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveFavs(next: FavMap) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {}
}

export default function Promocoes() {
  const pijamas = useGetPijamas();

  const visiveis = useMemo(
    () => (pijamas || []).filter((p) => p.onSale).slice(0, 3),
    [pijamas]
  );


  const [favMap, setFavMap] = useState<FavMap>(() => loadFavs());
  const seededRef = useRef(false);

 
  useEffect(() => {
    if (seededRef.current) return;
    if (!Array.isArray(pijamas) || pijamas.length === 0) return;

    const local = loadFavs();
    let changed = false;

    for (const p of pijamas) {
      const id = String(p.id);
      if (local[id] === undefined && p.favorite) {
        local[id] = true;
        changed = true;
      }
    }

    if (changed) {
      setFavMap(local);
      saveFavs(local);
    }
    seededRef.current = true;
  }, [pijamas]);

  function setFavLocal(id: string, on: boolean) {
    setFavMap((old) => {
      const next = { ...old, [id]: on };
      saveFavs(next);
      return next;
    });
  }

  async function toggleFavorite(e: React.MouseEvent, id: string) {
    e.preventDefault();  
    e.stopPropagation(); 

    const was = !!favMap[id];
    const next = !was;

    
    setFavLocal(id, next);

    try {
      await axios.patch(`http://localhost:3333/pijamas/${id}`, {
        favorite: next,
      });
    } catch (err) {
      console.error("Erro ao sincronizar favorito:", err);
    }
  }

  return (
    <section className={styles.promocoes}>
      <h2>Nossas últimas promoções!</h2>

      <div className={styles.gridPromo}>
        {visiveis.map((p) => {
          const id = String(p.id);
          const isFav = !!favMap[id];

          const precoOriginal = Number(p.price) || 0;
          const temDesconto = !!p.salePercent && p.onSale;
          const precoFinal = temDesconto
            ? precoOriginal * (1 - Number(p.salePercent) / 100)
            : precoOriginal;
          const parcela6x = precoFinal / 6;

          return (
            <article key={id} className={styles.card}>
              
              <button
                className={styles.favBtn}
                onClick={(e) => toggleFavorite(e, id)}
                aria-label={isFav ? "Remover dos favoritos (visual)" : "Adicionar aos favoritos"}
                aria-pressed={isFav}
                type="button"
                title={isFav ? "Remover dos favoritos (visual)" : "Adicionar aos favoritos"}
              >
                <img
                  className={styles.favImg}
                  src={isFav ? heartOn : heartOff}
                  alt={isFav ? "Favorito" : "Não favorito"}
                  draggable={false}
                />
              </button>

             
              <Link to={`/pijama/${id}`} className={styles.cardLink}>
                <div className={styles.imgBox}>
                  <img className={styles.produto} src={pijamaIMG} alt={p.name} />
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
            </article>
          );
        })}
      </div>
    </section>
  );
}