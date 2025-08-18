import styles from "./styles.module.css";
import { useState } from "react";
import type { Feedback } from "../../Type/Feedback";
import axios from "axios";

export default function Feedback() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  //const [estrelas, setEstrelas] = useState(0); falta fazer
  const [modalAberto, setModalAberto] = useState(false);

  const submit = async () => {
    if (!nome.trim() || !descricao.trim()) {
      alert("Insira todas as informações, por favor!");
      return;
    }

    try {
      const feedBackData: Feedback = { nome, descricao };
      await axios.post("http://localhost:3333/users", feedBackData);
      setNome("");
      setDescricao("");
      setModalAberto(true);
      //setEstrelas(0);
    } catch (error) {
      console.error("Erro ao enviar feedback:", error);
      alert("Erro ao enviar feedback");
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.cardContainer}>
          <h1>Feedback</h1>
          <h2>
            Fale um pouco sobre a sua<br></br>experiência com a nossa loja!
          </h2>
          <div className={styles.inputs}>
            <input
              type="text"
              placeholder="Nome Completo"
              className={styles.firstInput}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            ></input>
            <textarea
              placeholder="Descrição Detalhada"
              className={styles.secondInput}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.stars}></div>

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
