import styles from "./styles.module.css";

export default function Pagamento() {
  return (
    <>
      <div className={styles.modalBackground}>
        <div className={styles.background}>
          <h1>Pagamento</h1>
          <div className={styles.form}>
            <form>
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
                <button>{"< VOLTAR"}</button>
                <button>ENVIAR</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
