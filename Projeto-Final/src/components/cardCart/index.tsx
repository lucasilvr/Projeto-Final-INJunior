import React, { useState, useEffect } from "react"; // ...ALTERADO: importei useEffect
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import useCartStore from "../../stores/cartStore";
import X from "../../assets/X.svg";
import Menos from "../../assets/Menos.svg";
import Mais from "../../assets/Mais.svg";
import PijamaIMG from "../../assets/PijamaIMG.png"
import useCartMath from "../../stores/somaCart";

type CartItemType = {
  id: string;
  name: string;
  image?: string;
  price: number;
  onSale: boolean;
  salePercent?: number;
  quantity?: number;
  selectedSize?: string;
  sizes?: { id: string; stockQuantity: number; size: string }[];
};

export default function CardCart({ id , name, price, quantity, onSale, salePercent, selectedSize, sizes }: CartItemType) {
  const removeFromCart = useCartStore((state) => state.removeItem);
  const adicionarValor = useCartMath((s) => s.adicionarValor)
  const somarValor = useCartMath((s) => s.somarValor);
  const subtrairValor = useCartMath((s) => s.subtrairValor);
  const [qnt, setQnt] = useState<number>(quantity ?? 1);
  const estoque = sizes?.find((size) => size.size === selectedSize)?.stockQuantity;

  const rawSale = typeof salePercent === "number" ? salePercent : 0;
  let percent = onSale ? (rawSale > 1 ? rawSale / 100 : rawSale) : 0;
  percent = Math.min(Math.max(percent, 0), 1);

  const desconto = +(price * (1 - percent));

  useEffect(() => {
    const inicial = desconto * (quantity ?? 1);
    adicionarValor(inicial);
    return () => {
      subtrairValor(inicial);
    };
  },);

  function handleQuantidadeMais(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    if(!estoque) return;
    if (qnt < estoque) {    
      setQnt((prev) => prev + 1);
      somarValor(desconto)
    }
  };

  function handleQuantidadeMenos(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    setQnt((prev) => Math.max(prev - 1, 1));
    if (qnt > 1) {
      subtrairValor(desconto);
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const key = selectedSize ? `${id}:${selectedSize}` : String(id);
    removeFromCart(key);
  };

  return (
    <div className={styles.Card} key={id + (selectedSize ?? "")}>
      <Link to={`/pijama/${id}`} className={styles.Left}>
        <img src={PijamaIMG} alt={name} />
        <div className={styles.Card_Item_Info}>
          <div>
            <h2>{name}</h2>
            <h3>Ref: {id}</h3>
          </div>
          <h4>{selectedSize}</h4>
        </div>
      </Link>

      <div className={styles.Right}>
        <div className={styles.Qnt}>
          <h6>Quantidade:</h6>
          <div className={styles.Bar}>
            <button type="button" onClick={(e) => handleQuantidadeMenos(e)}>
              <img src={Menos} alt="Remover" />
            </button>
            <span>{qnt}</span>
            <button type="button" onClick={(e) => handleQuantidadeMais(e)}>
              <img src={Mais} alt="Adicionar" />
            </button>
          </div>
        </div>
        <div>
          {onSale ? (
            <p className={styles.Valor}> R$ {(desconto * qnt).toFixed(2).replace(".", ",")}</p>
          ) : (  
            <p className={styles.Valor}> R$ {(price * qnt).toFixed(2).replace(".", ",")}</p>
          )}
        </div>
        <div className={styles.Delete}>
          <button type="button" className={styles.Remove_Button} onClick={(e) => handleRemove(e)}>
            <img className={styles.Trash} src={X} alt="Remover" />
          </button>
        </div>
      </div>
    </div>
  );
}

