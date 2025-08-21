import styles from "./styles.module.css";
import { useState } from "react";
import type { Feedback } from "../../Type/Feedback"; 
import axios from "axios";
import starEmpty from "../../assets/starEmpty.png";
import starFilled from "../../assets/starFilled.png";

export default function Feedback() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  const submit = async () => {
    if (!name.trim() || !description.trim() || rating === 0) {
      alert("Insira todas as informações e selecione sua avaliação, por favor!");
      return;
    }

    try {
      const feedBackData: Feedback = { name, description, rating };
      await axios.post("http://localhost:3333/feedbacks", feedBackData);
      setName("");
      setDescription("");
      setRating(0);
      setModalAberto(true);
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      alert("Ocorreu um erro ao enviar seu feedback. Tente novamente.");
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.cardContainer}>
          <h1>Feedback</h1>
          <h2>
            Fale um pouco sobre a sua<br />
            experiência com a nossa loja!
          </h2>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="Nome Completo"
              className={styles.firstInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Descrição Detalhada"
              className={styles.secondInput}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={n <= rating ? starFilled : starEmpty}
                onClick={() => setRating(n)}
                className={styles.starImage}
              />
            ))}
          </div>

          <button className={styles.button} onClick={submit}>
            ENVIAR
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Sucesso!</h2>
            <p>Seu feedback foi enviado.</p>
            <button onClick={() => setModalAberto(false)}>Fechar</button>
          </div>
        </div>
      )}
    </>
  );
}