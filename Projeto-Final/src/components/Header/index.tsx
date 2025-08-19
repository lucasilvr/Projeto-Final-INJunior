import compras from "../../assets/Compras.png";
import favorito from "../../assets/Favorito.png";
import usuario from "../../assets/User.png";
import logo from "../../assets/Logo (1).png";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>

      <nav className={styles.nav}>
        <ul>
          <li><a href="#">PIJAMAS</a></li>
          <li><a href="#">FEMININO</a></li>
          <li><a href="#">MASCULINO</a></li>
          <li><a href="#">INFANTIL</a></li>
        </ul>
      </nav>

      <div className={styles.icones}>
        <ul className={styles.iconList}>
          <li><img src={compras} alt="Carrinho" /></li>
          <li><img src={favorito} alt="Favoritos" /></li>
        </ul>
        <ul className={styles.iconList}>
          <li><img src={usuario} alt="Usuário" /></li>
        </ul>
      </div>
    </header>
  );
}

