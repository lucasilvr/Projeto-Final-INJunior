import styles from "./styles.module.css";
import React from "react";
interface DadosProps {
  proximoPasso: () => void;
  fechar: () => void;
}

export default function Dados({ proximoPasso, fechar }: DadosProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    proximoPasso();
  };

  return (
    <>
      <div className={styles.modalBackground} onClick={fechar}>
        <div
          className={styles.background}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <h1>Dados</h1>
          <div className={styles.container}>
            <form onSubmit={handleSubmit}>
              <div className={styles.input1}>
                <input type="text" placeholder="Nome Completo"></input>
                <input type="number" placeholder="CPF"></input>
                <input type="number" placeholder="CEP"></input>
                <input type="text" placeholder="Logradouro"></input>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.input2}>
                  <input type="text" placeholder="UF"></input>
                  <input type="number" placeholder="Número"></input>
                </div>
                <div className={styles.input3}>
                  <input type="text" placeholder="Bairro"></input>
                  <input type="text" placeholder="Cidade"></input>
                </div>
              </div>
              <button type="submit">ENVIAR</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
