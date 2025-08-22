import { useState } from "react";
import CardCart from "../../components/cardCart";
import useCartStore from "../../stores/cartStore";
import cartRed from "../../assets/Compra-red.svg";
import useCartMath from "../../stores/somaCart";
import Dados from "../../components/Dados";
import Pagamento from "../../components/Pagamento";
import CompraConcluida from "../../components/CompraConcluida";

type EtapaModal = "fechado" | "dados" | "pagamento" | "concluido";

export default function Cart() {
  const cart = useCartStore((state) => state.items);
  const soma = useCartMath((s) => s.soma);
  const hasItems = Array.isArray(cart) && cart.length > 0;

  const [etapaModal, setEtapaModal] = useState<EtapaModal>("fechado");

  const irParaPagamento = () => setEtapaModal("pagamento");
  const irParaConcluido = () => setEtapaModal("concluido");
  const voltarParaDados = () => setEtapaModal("dados");
  const fecharTudo = () => setEtapaModal("fechado");

  return (
    <div style={{ padding: "50px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={cartRed} alt="carrinho" />
          <h1 style={{ color: "rgba(163, 22, 33, 1)", fontSize: "40px" }}>
            Carrinho
          </h1>
        </div>
      </div>

      {hasItems ? (
        <>
          <div>
            {cart.map((item) => (
              <CardCart
                key={`${item.id}:${item.selectedSize ?? "none"}`}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                selectedSize={item.selectedSize}
                sizes={item.sizes}
                onSale={item.onSale}
                salePercent={item.salePercent}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 24,
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <h1 style={{ fontSize: "48px", fontWeight: 700 }}>
                TOTAL: R$ {soma.toFixed(2).replace(".", ",")}
              </h1>
              <button
                onClick={() => setEtapaModal("dados")}
                style={{
                  width: "300px",
                  height: "100px",
                  backgroundColor: "rgba(114, 168, 193, 1)",
                  color: "rgba(252, 247, 248, 1)",
                  fontSize: "32px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                COMPRE TUDO
              </button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", margin: "60px 0"}}>
          <p style={{ fontSize: "44px", color: "rgba(163, 22, 33, 1)" }}>
            Seu carrinho está vazio.{" "}
          </p>
        </div>
      )}

      {etapaModal === "dados" && (
        <Dados proximoPasso={irParaPagamento} fechar={fecharTudo} />
      )}
      {etapaModal === "pagamento" && (
        <Pagamento
          proximoPasso={irParaConcluido}
          passoAnterior={voltarParaDados}
        />
      )}
      {etapaModal === "concluido" && <CompraConcluida fechar={fecharTudo} />}
    </div>
  );
}