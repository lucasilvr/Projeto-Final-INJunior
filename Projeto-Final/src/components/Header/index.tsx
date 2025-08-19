import { Link } from "react-router-dom";
import compras from "../../assets/Compras.png";
import favorito from "../../assets/Favorito.png";
import usuario from "../../assets/User.png";
import logo from "../../assets/Logo (1).png";
import styles from "./styles.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/pijamas">PIJAMAS</Link>
          </li>
          <li>
            <Link to="/pijamas?genero=feminino">FEMININO</Link>
          </li>
          <li>
            <Link to="/pijamas?genero=masculino">MASCULINO</Link>
          </li>
          <li>
            <Link to="/pijamas?genero=infantil">INFANTIL</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.icones}>
        <ul className={styles.iconList}>
          <li>
            <Link to="/cart">
              <img src={compras} alt="Carrinho" />
            </Link>
          </li>
          <li>
            <Link to="/favoritos">
              <img src={favorito} alt="Favoritos" />
            </Link>
          </li>
        </ul>
        <ul className={styles.iconList}>
          <li>
            <Link to="/login">
              <img src={usuario} alt="Usuário" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
