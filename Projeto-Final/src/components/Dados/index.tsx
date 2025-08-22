import styles from "./styles.module.css";

export default function Dados() {
  return (
    <>
      <div className={styles.modalBackground}>
        
        <div className={styles.background}>
          <h1>Dados</h1>
          <div className={styles.container}>
            <form>
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
              <button>ENVIAR</button>
            </form>
          </div>
        </div>
        
      </div>
    </>
  );
}