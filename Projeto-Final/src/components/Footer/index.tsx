import styles from "./styles.module.css";
import logoInsta from "../../assets/mdi_instagram (1).png";
import logoFace from "../../assets/ri_facebook-fill.png";
import logoLi from "../../assets/ri_linkedin-fill.png";
import logo from "../../assets/Logo (1).png";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.contato}>
          <div className={styles.endereco}>
            <h4>Endereço</h4>
            <ul>
              <li>Av. Milton Tavares de Souza, 5</li>
              <li>s/n - Sala 115 B - Boa Viagem</li>
              <li>Niterói - RJ</li>
              <li>CEP: 24210-315</li>
            </ul>
          </div>

          <div className={styles.faleConosco}>
            <h4>Fale conosco</h4>
            <ul>
              <li>contato@injunior.com.br</li>
            </ul>
          </div>

          <div className={styles.redesSociais}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src={logoInsta} alt="Instagram" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src={logoFace} alt="Facebook" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src={logoLi} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className={styles.logoFooter}>
          <img src={logo} alt="Logo IN Junior" />
          <p className={styles.slogan}>Pijam&#123;IN&#125;ha</p>
        </div>

        <div className={styles.IFrame}>
          <iframe
            title="Mapa IN Junior - UFF"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={
              "https://www.google.com/maps?q=" +
              encodeURIComponent(
                "IN Junior - Empresa Junior de Informática, UFF - Campus Praia Vermelha, Instituto de Computação, Av. Milton Tavares de Souza, s/n - Sala 115 B - Boa Viagem, Niterói - RJ, 24210-315"
              ) +
              "&output=embed"
            }
          />
        </div>
      </footer>

      <div className={styles.copy}>
        © Copyright 2025. IN Junior. Todos os direitos reservados. Niterói, Brasil.
      </div>
    </>
  );
}
