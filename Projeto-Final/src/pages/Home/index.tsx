import pijamaIMG from "../../assets/PijamaIMG.png";
import pijamaVantagens from "../../assets/Women's Pajama.png";
import frete from "../../assets/frete.png";
import familia from "../../assets/usuarios.png";
import banner2 from "../../assets/BannerPromocao.png";
import logoPreta from "../../assets/logoPreta.png";
import banerImg from "../../assets/VectorCover (16).png";
import styles from "./styles.module.css";
import useGetPijamas from "../../hooks/useGetPijama";
import FeedbackCarousel from "../../components/FeedbacksHome";


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

      {/* Banner Promoão*/}
      <section className={styles.bannerPromocao}>
        <img src={banner2} alt="" />
      </section>

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

        {/* Promoções */}
        <section className={styles.promocoes}>
          <h2>Nossas últimas promoções!</h2>
          <div className={styles.gridPromo}>
            {pijamas
              .filter((p) => p.onSale)
              .map((p) => (
                <article key={p.id} className={styles.card}>
                  <img src={pijamaIMG} alt="" />
                  <h3>{p.name}</h3>
                  <p>R$ {Number(p.price).toFixed(2)}</p>
                  {p.salePercent ? <small>{p.salePercent}% OFF</small> : null}
                </article>
              ))}
          </div>
        </section>

        <FeedbackCarousel/>
      
      </main>
    </>
  );
}
