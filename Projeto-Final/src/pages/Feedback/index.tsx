import styles from "./styles.module.css";
import { useState } from "react";
import type { Feedback } from "../../Type/Feedback"; 
import axios from "axios";
import starEmpty from "../../assets/starEmpty.png";
import starFilled from "../../assets/starFilled.png";

export default function Feedback() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [estrelas, setEstrelas] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  const submit = async () => {
    if (!nome.trim() || !descricao.trim() || estrelas === 0) {
      alert("Insira todas as informações e selecione sua avaliação, por favor!");
      return;
    }

    try {
      const feedBackData: Feedback = { nome, descricao, estrelas };
      await axios.post("http://localhost:3333/users", feedBackData);
      setNome("");
      setDescricao("");
      setEstrelas(0);
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <textarea
              placeholder="Descrição Detalhada"
              className={styles.secondInput}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <img
                key={n}
                src={n <= estrelas ? starFilled : starEmpty}
                onClick={() => setEstrelas(n)}
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