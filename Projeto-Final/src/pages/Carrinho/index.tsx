import "./styles.module.css";
import useCartStore from "../../stores/cartStore";

export default function Cart() {
  const cart = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeItem);

  return (
    <div className="Main">
      <div>
        {/* <img></img> */}
        <h1>Carrinho</h1>
      </div>
      <div>
        {/* <img></img> */}
        <h1>Favoritos</h1>
      </div>
      <div className="Cart">
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="Cart_Item">
                <img src={item.image} alt={item.name} />
                <div className="Cart_Item_Info">
                  <h2>{item.name}</h2>
                  <h3>{item.id}</h3>
                  {/* <h4>{item.sizes.size}</h4> */}
                </div>
                <div>
                  {/* <p>{item.sizes.size}</p> */}
                  <p>R$ {item.price.toFixed(2).replace(".", ",")}</p>
                  <button
                    className="Remove_Button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    {/* <img className="Trash" src={Trash} alt="Remover" /> */}
                    </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <button className="Comprar">COMPRE TUDO</button>
    </div>
  );
}
