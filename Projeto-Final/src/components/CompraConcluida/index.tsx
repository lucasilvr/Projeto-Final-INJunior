import { useState } from "react";
import styles from "./styles.module.css";

export default function CompraConcluida() {
  const [visivel, setVisivel] = useState(true);

  const close = () => {
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.background}>
        <button className={styles.closeButton} onClick={close}>×</button>
        <h1>Sua compra foi concluída!</h1>
        <h2>Obrigado por comprar conosco!</h2>
      </div>
    </div>
  );
}
