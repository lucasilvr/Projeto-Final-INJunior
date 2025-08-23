import vermelho from '../../assets/Coracao-Vermelho.svg'
import transparente from '../../assets/Coracao-Transparente.svg';
import promocao from '../../assets/Promocao.svg';
import { useState } from 'react';
import type { Pijama } from '../../type/Pijama';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default function CardListaPijamas(pijama: Pijama) {
  const [curtida, setCurtida] = useState<boolean>(!!pijama.favorite);
  const percent = pijama.onSale && typeof pijama.salePercent === 'number' ? pijama.salePercent / 100 : 0;
  const desconto = +(pijama.price * (1 - percent));

  function handleToggle() {
    const novoFavorito = !curtida;
    setCurtida(novoFavorito);

    axios
      .patch(`http://localhost:3333/pajamas/${pijama.id}`, { favorite: novoFavorito })
      .then(() => {
      })
      .catch((error) => {
        console.error('Erro ao atualizar favorito:', error);
      });
  }

  return (
    <Link to={`/pijama/${pijama.id}`} className={styles.CardLink}>
      <div className={styles.CardPijamas}>
        <div className={styles.ImgContainer}>
          <button className={styles.BotaoFavorito}>
          <img
            className={styles.HeartIcon}
            src={curtida ? vermelho : transparente}
            alt="Coração"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleToggle();
            }}
          />
          </button>
          {pijama.onSale && (
            <img
              className={styles.PromocaoIcon}
              src={promocao}
              alt="Promoção"
            />
          )}
          <img
            className={styles.ProductImg}
            style={{objectFit: "cover"}}
            src={pijama.image}
            alt={pijama.name}
          />
          
        </div>

        <div className={styles.InfoContainer}>
          <div>
            <h3 className={styles.PijamaName}>{pijama.name}</h3>
          </div>
          <>
            {pijama.onSale ? (
              <div className={styles.PromoContainer}>
                <h3>R$ {pijama.price.toFixed(2).replace('.', ',')}</h3>
                <h2>R$ {(desconto).toFixed(2).replace('.', ',')}</h2>
                <p>6x de R$ <span>{((desconto) / 6).toFixed(2).replace('.', ',')}</span></p>
              </div>
            ) : (
              <div className={styles.NormalPriceContainer}>
                <h2>R$ {pijama.price.toFixed(2).replace('.', ',')}</h2>
                <p>6x de R$ <span>{(pijama.price / 6).toFixed(2).replace('.', ',')}</span></p>
              </div>
            )}
          </>
        </div>
      </div>
    </Link>
  );
}