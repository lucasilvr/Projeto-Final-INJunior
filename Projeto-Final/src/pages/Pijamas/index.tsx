import useGetPijamas from "../../hooks/useGetPijama";
import CardListaPijamas from "../../components/cardListaPijamas";
import styles from "./styles.module.css";
import Search from "../../assets/Search.svg";
import { useEffect, useState } from "react";
import type { Pijama } from "../../type/Pijama";
import { usePagination } from "../../components/Paginação/index";
import ant from "../../assets/anterior.png"
import prox from "../../assets/proximo.png"

export default function Pijamas() {
  const pijamas = useGetPijamas();

  const [pijamasSearch, setPijamasSearch] = useState<Pijama[]>([]);
  const [pijamasOriginais, setPijamasOriginais] = useState<Pijama[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fGenero, setFGenero] = useState("");
  const [fTipo, setFTipo] = useState("");
  const [fEstacao, setFEstacao] = useState("");

  const {
    actualPage,
    pages,
    getItemsPage,
    handleBackPage,
    handleNextPage,
    totalPages,
    gotoPage,
    setActualPage,
  } = usePagination(pijamasSearch, 12, 5);

  useEffect(() => {
    setPijamasOriginais(pijamas);
    setPijamasSearch(pijamas);
  }, [pijamas]);

  useEffect(() => {
    let resultado = pijamasOriginais;
    if (searchTerm.trim() !== "") {
      const termo = searchTerm.toLowerCase();
      resultado = resultado.filter((p) =>
        (p.name ?? "").toLowerCase().includes(termo)
      );
    }

    if (fGenero) {
      resultado = resultado.filter(
        (p) =>
          ((p.gender ?? "") as string).toLowerCase() === fGenero.toLowerCase()
      );
    }

    if (fTipo) {
      resultado = resultado.filter(
        (p) => ((p.type ?? "") as string).toLowerCase() === fTipo.toLowerCase()
      );
    }

    if (fEstacao) {
      resultado = resultado.filter(
        (p) =>
          ((p.season ?? "") as string).toLowerCase() === fEstacao.toLowerCase()
      );
    }

    setPijamasSearch(resultado);
    setActualPage(1);

  }, [pijamasOriginais, searchTerm, fGenero, fTipo, fEstacao, setActualPage]);

  return (
    <div>
      <div className={styles.top}>
        <div style={{ padding: "50px" }}>
          <div className={styles.Busca_Container}>
            <div className={styles.Busca}>
              <input
                type="text"
                placeholder="Buscar pijama"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
              <img src={Search} alt="Buscar" />
            </div>
          </div>
          <div className={styles.FilterBar}>
            <select className={styles.Filter}
              value={fGenero}
              onChange={(e) => setFGenero(e.target.value)}
            >
              <option className={styles.Filter} value="">Gênero</option>
              <option className={styles.Filter} value="Masculino">Masculino</option>
              <option className={styles.Filter} value="Feminino">Feminino</option>
              <option className={styles.Filter} value="Familia">Família</option>
              <option className={styles.Filter} value="Unissex">Unissex</option>
            </select>

            <select className={styles.Filter}
              value={fTipo} onChange={(e) => setFTipo(e.target.value)}>
              <option className={styles.Filter} value="">Tipo</option>
              <option className={styles.Filter} value="Adulto">Adulto</option>
              <option className={styles.Filter} value="Infantil">Infantil</option>
              <option className={styles.Filter} value="Ambos">Ambos</option>
            </select>

            <select className={styles.Filter}
              value={fEstacao}
              onChange={(e) => setFEstacao(e.target.value)}
            >
              <option className={styles.Filter} value="">Estação</option>
              <option className={styles.Filter} value="Verao">Verão</option>
              <option className={styles.Filter} value="Inverno">Inverno</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.Main}>
        <div className={styles.ListaPijamas}>
          {pijamasSearch.length ? (
            getItemsPage().map((p) => <CardListaPijamas key={p.id} {...p} />)
          ) : (
            <p>Nenhum pijama encontrado.</p>
          )}
        </div>
        <section className={styles.Pagination}>
          <button className={styles.Ant}
            type="button"
            onClick={handleBackPage}
            disabled={actualPage === 1}
          >
            <img src={ant}></img>
          </button>

          {pages.map((p) => (
            <button className={styles.Button}
              key={p}
              type="button"
              onClick={() => gotoPage(p)}
              aria-current={p === actualPage ? "page" : undefined}
              style={
                p === actualPage
                  ? { fontWeight: 700, textDecoration: "underline" }
                  : {}
              }
            >
              {p}
            </button>
          ))}

          <button className={styles.Prox}
            type="button"
            onClick={handleNextPage}
            disabled={actualPage === totalPages}
          >
            <img src={prox}></img>
          </button>
        </section>
      </div>
    </div>
  );
}
