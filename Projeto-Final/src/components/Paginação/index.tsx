import React from "react";

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

export default function Paginacao({ paginaAtual, totalPaginas, onChange }: PaginacaoProps) {
  function getIntervaloPaginas() {
    let start, end;
    if (totalPaginas <= 5) {
      start = 1;
      end = totalPaginas;
    } else if (paginaAtual <= 3) {
      start = 1;
      end = 5;
    } else if (paginaAtual >= totalPaginas - 2) {
      start = totalPaginas - 4;
      end = totalPaginas;
    } else {
      start = paginaAtual - 2;
      end = paginaAtual + 2;
    }
    return { start, end };
  }

  const { start, end } = getIntervaloPaginas();

  return (
    <div className="Bar">
      <button
        id="btnTras"
        disabled={paginaAtual === 1}
        onClick={() => onChange(paginaAtual - 1)}
      >
        &lt;
      </button>
      {Array.from({ length: end - start + 1 }, (_, idx) => {
        const i = start + idx;
        return (
          <button
            key={i}
            className="Pagina"
            style={{
              backgroundColor: i === paginaAtual ? "#72A8C1" : undefined,
              color: i === paginaAtual ? "#fff" : undefined,
            }}
            onClick={() => onChange(i)}
          >
            {i}
          </button>
        );
      })}
      <button
        id="btnProx"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onChange(paginaAtual + 1)}
      >
        &gt;
      </button>
    </div>
  );
}