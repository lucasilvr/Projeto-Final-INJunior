import selo from "../../assets/Promocao.svg";
import banner2 from "../../assets/BannerPromocao.png";
import bannerCarrossel2 from "../../assets/bannerCarrossel2.png";
import bannerCarrosel3 from "../../assets/bannerCarrossel3.png";
import pijamaIMG from "../../assets/PijamaIMG.png";
import pijamaVantagens from "../../assets/Women's Pajama.png";
import frete from "../../assets/frete.png";
import familia from "../../assets/usuarios.png";
import logoPreta from "../../assets/logoPreta.png";
import banerImg from "../../assets/VectorCover (16).png";
import styles from "./styles.module.css";
import useGetPijamas from "../../hooks/useGetPijama";
import FeedbackCarousel from "../../components/FeedbacksCarrossel";
import BannerCarousel from "../../components/BannerCarrosel";
import { Link } from "react-router-dom";

export default function Home() {
  const pijamas = useGetPijamas();

  return (
    <>
      {/* Banner */}
      <section className={styles.banner}>
        <img className={styles.fundo} src={banerImg} alt="Imagem do Banner" />
        <div className={styles.conteudo}>
          <img
            className={styles.logo}
            src={logoPreta}
            alt="Logo Pijam[IN]lha"
          />
          <h1 className={styles.titulo}>Pijam{`{IN}`}lha</h1>
          <p className={styles.subtitulo}>
            Se os lobos soubessem desse conforto, <br />
            nem sopravam casas, iam dormir!
          </p>
        </div>
      </section>

      {/* Banner Promoção*/}
      <BannerCarousel
        images={[banner2, bannerCarrossel2, bannerCarrosel3]}
        interval={4000}
        className={styles.bannerPromocao}
      />

      <main>
        {/*Vantagens*/}
        <section className={styles.vantagens}>
          <div className={styles.item}>
            <img src={pijamaVantagens} alt="Pijama confortável" />
            <p>
              Pijamas confortáveis <br /> e com tecnologia
            </p>
          </div>

          <div className={styles.item} id={styles.familia}>
            <img src={familia} alt="Modelos para todas as idades" />
            <p>
              Modelos para todas as <br /> idades e tamanhos
            </p>
          </div>

          <div className={styles.item}>
            <img src={frete} alt="Frete grátis" />
            <p>
              Frete grátis em todo o <br /> Brasil e exterior
            </p>
          </div>
        </section>

       // {/* Promoções */}
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
            <img src={pijamaIMG} alt="" />
            <img src={selo} alt="" />

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

        <FeedbackCarousel />
      </main>
    </>
  );
}
