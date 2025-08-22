import styles from "./styles.module.css";
interface CompraConcluidaProps {
  fechar: () => void;
}

export default function CompraConcluida({ fechar }: CompraConcluidaProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.background}>
        <button className={styles.closeButton} onClick={fechar}>
          ×
        </button>
        <h1>Sua compra foi concluída!</h1>
        <h2>Obrigado por comprar conosco!</h2>
      </div>
    </div>
  );
}
