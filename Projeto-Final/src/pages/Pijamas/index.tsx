import useGetPijamas from "../../hooks/useGetPijama";
import CardListaPijamas from "../../components/cardListaPijamas";
import styles from "./styles.module.css";

export default function Pijamas() {
  const pijamas = useGetPijamas();

  return (
    <div>
      <h1>Pijamas</h1>

      <div className={styles.ListaPijamas}>
        {pijamas?.length
          ? pijamas.map((p) => (
              <CardListaPijamas key={p.id} {...p} />
            ))
          : <p>Nenhum pijama encontrado.</p>}
      </div>
    </div>
  );
}