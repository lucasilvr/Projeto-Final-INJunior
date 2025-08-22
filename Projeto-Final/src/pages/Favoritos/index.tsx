import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import fundoPreto from "../../assets/VectorCover (16).png"
import type { Pijama } from "../../type/Pijama";
import coracao from "../../assets/Coracao-Vermelho.svg"
import styles from "./styles.module.css";

import PijamasCarousel from "../../components/pijamaFavCarrossel";

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

        const { data } = await axios.get<Pijama[]>(
          "http://localhost:3333/pajamas?favorite=true"
        );

        const apenasFavoritos = Array.isArray(data)
          ? data.filter((p) => !!p.favorite)
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
    <div style={{ backgroundImage: fundoPreto }}>
      <header >
        <Link
          style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          to={"/favoritos"}
        > <div className={styles.fav}>
            <img style={{ width: "44px" }} src={coracao} />
          <p style={{ fontSize: "40px", color: "#A31621" }}>
            Favoritos
          </p>
        </div>
          
        </Link>
      </header>
        <main>
          {loading && <p>Carregando...</p>}
          {erro && <p style={{ color: "#b91c1c" }}>{erro}</p>}
          {!loading && !erro && favoritos.length === 0 && (
            <p>Você ainda não favoritou nenhum pijama.</p>
          )}
          <div style={{ width: "100%" }}>
            <PijamasCarousel pijamas={favoritos} />
          </div>
        </main>
      </div>
  );
}
