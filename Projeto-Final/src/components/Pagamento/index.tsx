import styles from "./styles.module.css";
import React from "react";
interface PagamentoProps {
  proximoPasso: () => void;
  passoAnterior: () => void;
}

export default function Pagamento({
  proximoPasso,
  passoAnterior,
}: PagamentoProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    proximoPasso();
  };

  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.background}>
          <h1>Pagamento</h1>
          <div className={styles.form}>
            <form onSubmit={handleSubmit}>
              <select defaultValue="">
                <option value="" disabled>
                  Forma de pagamento
                </option>
                <option value="Pix">Pix</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Boleto">Boleto</option>
              </select>

              <select defaultValue="">
                <option value="" disabled>
                  Selecione a quantidade de parcelas
                </option>
                <option value="1">Sem parcelamento</option>
                <option value="2">Parcela em 2 vezes</option>
                <option value="3">Parcela em 3 vezes</option>
                <option value="4">Parcela em 4 vezes</option>
                <option value="5">Parcela em 5 vezes</option>
              </select>
              <input type="text" placeholder="Número do Cartão" />

              <div>
                <button type="button" onClick={passoAnterior}>
                  {"< VOLTAR"}
                </button>
                <button type="submit">ENVIAR</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
