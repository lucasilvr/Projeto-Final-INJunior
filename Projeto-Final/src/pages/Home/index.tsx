import logoPreta from "../../assets/logoPreta.png"
import banerImg from "../../assets/VectorCover (16).png"
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

type Promocao = {
  id: number;
  nome: string;
  preco: number;
  
};

type Feedback = {
  id: number;
  nome: string;
  estrelas: number;
  comentario: string;
 
};

export default function Home() {
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3333/pijamas?promocao=true")
      .then(res => setPromocoes(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:3333/feedbacks")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
     { /* Banner */}
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


      {/* Promoções */}
      <section className={styles.promocoes}>
        <h2>Nossas últimas promoções!</h2>
        <div className={styles.grid}>
          {promocoes.map(p => (
            <article key={p.id} className={styles.card}>
              <div className={styles.imgFake}></div>
              <h3>{p.nome}</h3>
              <p>R$ {Number(p.preco).toFixed(2)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Feedbacks */}
      <section className={styles.feedbacks}>
        <h2>Feedbacks</h2>
        <div className={styles.grid}>
          {feedbacks.map(f => (
            <div key={f.id} className={styles.card}>
              <strong>{f.nome}</strong>
              <p>{"⭐".repeat(f.estrelas)}</p>
              <p>{f.comentario}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
