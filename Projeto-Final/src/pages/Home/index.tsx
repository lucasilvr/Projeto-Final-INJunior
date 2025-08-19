import pijamaVantagens from "../../assets/Women's Pajama.png"
import frete from "../../assets/frete.png"
import familia from "../../assets/usuarios.png"
import banner2 from "../../assets/BannerPromocao.png"
import logoPreta from "../../assets/logoPreta.png";
import banerImg from "../../assets/VectorCover (16).png";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import Pijama from "../Pijama";

// Tipos iguais ao back-end
type Pijama = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  season: string;
  type: string;
  gender: string;
  favorite: boolean;
  onSale: boolean;
  salePercent?: number | null;
};

type Feedback = {
  id: string;
  name: string;
  description: string;
  rating: number;
};

export default function Home() {
  const [promocoes, setPromocoes] = useState<Pijama[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Pijamas em promoção
    axios
      .get<Pijama[]>("http://localhost:3333/pajamas", { params: { onSale: true } })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        // Fallback: garante somente itens onSale
        setPromocoes(data.filter((p) => p.onSale === true));
      })
      .catch((err) => console.error(err));

    // Feedbacks
    axios
      .get<Feedback[]>("http://localhost:3333/feedbacks")
      .then((res) => setFeedbacks(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {/* Banner */}
      <section className={styles.banner}>
        <img className={styles.fundo} src={banerImg} alt="Imagem do Banner" />

        <div className={styles.conteudo}>
          <img className={styles.logo} src={logoPreta} alt="Logo Pijam[IN]lha" />
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
      
      <main >
       {/*Vantagens*/} 
        <section className={styles.vantagens}>
  <div className={styles.item}>
    <img src={pijamaVantagens} alt="Pijama confortável" />
    <p>Pijamas confortáveis <br /> e com tecnologia</p>
  </div>

  <div className={styles.item} id={styles.familia}>
    <img src={familia} alt="Modelos para todas as idades" />
    <p>Modelos para todas as <br /> idades e tamanhos</p>
  </div>

  <div className={styles.item}>
    <img src={frete} alt="Frete grátis" />
    <p>Frete grátis em todo o <br /> Brasil e exterior</p>
  </div>
</section>
        
        {/* Promoções */}
      <section className={styles.promocoes}>
        <h2>Nossas últimas promoções!</h2>
        <div className={styles.grid}>
          {promocoes.map((p) => (
            <article key={p.id} className={styles.card}>
              <div className={styles.imgFake}></div>
              <h3>{p.name}</h3>
              <p>R$ {Number(p.price).toFixed(2)}</p>
              {p.salePercent ? <small>{p.salePercent}% OFF</small> : null}
            </article>
          ))}
        </div>
      </section>

      {/* Feedbacks */}
      <section className={styles.feedbacks}>
        <h2>Feedbacks</h2>
        <div className={styles.grid}>
          {feedbacks.map((f) => (
            <div key={f.id} className={styles.card}>
              <strong>{f.name}</strong>
              <p>{"⭐".repeat(Math.round(f.rating))}</p>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}

      
      
      