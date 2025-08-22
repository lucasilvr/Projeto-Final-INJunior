import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import selo from "../../assets/Promocao.svg";
import pijamaIMG from "../../assets/PijamaIMG.png";
import useGetPijamas from "../../hooks/useGetPijama";



export default function Promocoes() {
  const pijamas = useGetPijamas(); 

  return (
    <section className={styles.promocoes}>
      <h2>Nossas últimas promoções!</h2>

      <div className={styles.gridPromo}>
        {pijamas
          .filter((p) => p.onSale)
          .map((p) => {
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
    </section>
  );
}
