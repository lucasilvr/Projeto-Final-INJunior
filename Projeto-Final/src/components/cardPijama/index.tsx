import { useState } from "react";
import type { Pijama } from "../../type/Pijama";
import useCartStore from "../../stores/cartStore";
import pijamaIMG from '../../assets/PijamaIMG.png';
import Menos from '../../assets/Menos.svg';
import Mais from '../../assets/Mais.svg';
import styles from './styles.module.css';
import axios from "axios";
import vermelho from '../../assets/Coracao-Vermelho.svg';
import transparente from '../../assets/Coracao-Transparente.svg';

export default function CardPijama( pijama : Pijama) {
  const addToCart = useCartStore((state) => state.addItem);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [curtida, setCurtida] = useState<boolean>(!!pijama.favorite);

  const percent = pijama.onSale && typeof pijama.salePercent === 'number' ? pijama.salePercent / 100 : 0;
  const desconto = +(pijama.price * (1 - percent));

  const handleQuantidadeMais = () => {
    const selected = pijama.sizes.find(s => s.id === selectedSizeId);
    if (!selected) {
      window.alert('Selecione um tamanho primeiro.');
      return;
    }

    setQuantidade(prev => {
      if (prev >= selected.stockQuantity) {
        return prev;
      }
      return prev + 1;
    });
  }
  const handleQuantidadeMenos = () => {
    setQuantidade(prev => Math.max(prev - 1, 1));
  }

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

  return(
    <div className={styles.Card}>
      <div>
        <img className={styles.Image} src={pijamaIMG} alt={pijama.name} />
      </div>
      <div className={styles.Info}>
        <div>
        <h2 className={styles.Nome}>{pijama.name}</h2>
        <h6 className={styles.Ref}>Ref: {pijama.id}</h6>
        </div>
        {pijama.onSale ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className={styles.PrecoContainer}>
              <h1>R$ {(desconto).toFixed(2)}</h1>
              <div className={styles.Parcelas}>
                <p>6x de <span style={{ fontWeight: 700 }}>{((desconto) / 6).toFixed(2)}</span></p>
              </div>
            </div>
            <p className={styles.Pix}>
              Ou por <span style={{ fontWeight: 700 }}>
                R${(desconto * 0.85).toFixed(2)}
              </span> no PIX
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className={styles.PrecoContainer}>
              <h1>R$ {pijama.price.toFixed(2)}</h1>
              <div className={styles.Parcelas}>
                <p>6x de <span style={{ fontWeight: 700 }}>{(pijama.price / 6).toFixed(2)}</span></p>
              </div>
            </div>
            <p className={styles.Pix}>
              Ou por <span style={{ fontWeight: 700 }}>
                R${(pijama.price * 0.85).toFixed(2)}
              </span> no PIX
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h5 className={styles.Tamanhos}>Tamanhos:</h5>
          <ul className={styles.TamanhosList}>
            {pijama.sizes.map((size) => {
              const selected = selectedSizeId === size.id;
              return (
                <li key={size.id}>
                  <button
                    type="button"
                    className={`${styles.SizeButton} ${selected ? styles.Selected : ''}`}
                    onClick={() => {
                      setSelectedSizeId(prev => (prev === size.id ? null : size.id));
                      setQuantidade(1);
                    }}
                    disabled={size.stockQuantity === 0}
                    aria-pressed={selected}
                  >
                    {size.size}
                  </button>
                </li>
              );
            })}
          </ul>
          {selectedSizeId && (() => {
            const s = pijama.sizes.find(x => x.id === selectedSizeId);
            return s ? <p className={styles.SizeInfo}>Ainda temos <span>{s.stockQuantity}</span> peças do tamanho {s.size} em nosso estoque!</p> : null;
          })()}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h5 className={styles.Quantidade}>Quantidade:</h5>
          <div className={styles.QuantidadeContainer}>
            <button onClick={handleQuantidadeMenos}><img src={Menos} alt="Remover" /></button>
            <span className={styles.QuantidadeValue}>{quantidade}</span>
            <button onClick={handleQuantidadeMais}><img src={Mais} alt="Adicionar" /></button>
          </div>
        </div>
        

        <div className={styles.ButtonsContainer}>
          <button
            className={styles.AddToCartButton}
            onClick={() => {
              if (!selectedSizeId) {
                window.alert('Selecione um tamanho antes de adicionar ao carrinho.');
                return;
              }
              addToCart({ ...pijama, id: String(pijama.id) });
              window.alert('Adicionado ao carrinho!');
            }}
            disabled={!pijama}
          >
            Adicionar ao Carrinho
          </button>
          <button className={styles.Like} onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggle(); }}>
            <img
              className={styles.HeartIcon}
              src={curtida ? vermelho : transparente}
              alt="Coração"
            />
          </button>
        </div>
      </div>
    </div>
  )
}