import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import cart from "../../assets/cart.png";
import favorite from "../../assets/favorite.png";

export default function favoriteoritos() {
  return (
    <div className={styles.background}>
      <div className={styles.top}>
        <div className={styles.icons}>
          <Link to="/cart">
            <img src={cart} />
          </Link>

          <Link to="/favoritos">
            <img src={favorite} />
          </Link>
        </div>
      </div>
    </div>
  );
}
