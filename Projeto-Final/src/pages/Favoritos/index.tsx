// src/pages/Favoritos/index.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CardPijama from "../../components/cardListaPijamas"; // ajuste o caminho se precisar
import type { Pijama } from "../../type/Pijama";

import styles from "./styles.module.css";
import cart from "../../assets/cart.png";
import favorite from "../../assets/favorite.png";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<Pijama[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string>("");

  useEffect(() => {
    let cancel = false;

    (async () => {
      try {
        setLoading(true);
        setErro("");
        // Se seu back aceita query, ótimo; caso contrário filtramos no front
        const { data } = await axios.get<Pijama[]>(
          "http://localhost:3333/pajamas?favorite=true"
        );

        const apenasFavoritos = Array.isArray(data)
          ? data.filter(p => !!p.favorite)
          : [];

        if (!cancel) setFavoritos(apenasFavoritos);
      } catch (e) {
        console.error(e);
        if (!cancel) setErro("Não foi possível carregar seus favoritos.");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <Link to="/cart">
            <img src={cart} alt="Carrinho" />
          </Link>

          <Link to="/favoritos">
            <img src={favorite} alt="Favoritos" />
          </Link>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {erro && <p style={{ color: "#b91c1c" }}>{erro}</p>}
      {!loading && !erro && favoritos.length === 0 && (
        <p>Você ainda não favoritou nenhum pijama.</p>
      )}

      {/* Grid de cards — se já tiver .grid no seu CSS, reutiliza;
          senão, crie uma classe .grid simples neste mesmo CSS */}
      <div className={styles.grid}>
        {favoritos.map((p) => (
          <CardPijama key={String(p.id)} {...p} />
        ))}
      </div>
    </div>
  );
}
