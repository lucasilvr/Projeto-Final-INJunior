import { useEffect, useState } from "react";
import axios from "axios";
import type { Pijama } from "../type/Pijama";

interface Params {
  id?: number;
  page?: number;
  limit?: number;
}

interface ResultadoPijamas {
  pijamas: Pijama[];
  total: number;
}

export default function useGetPijamas({ id, page, limit }: Params = {}): ResultadoPijamas {
  const [pijamas, setPijamas] = useState<Pijama[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let url = "http://localhost:3000/pijamas";
    if (id !== undefined) {
      url += `/${id}`;
      axios
        .get(url)
        .then((response) => {
          setPijamas([response.data]);
          setTotal(1);
        })
        .catch((error) => console.error("Erro ao buscar pijama:", error));
    } else if (page !== undefined && limit !== undefined) {
      url += `?_page=${page}&_limit=${limit}`;
      axios
        .get(url)
        .then((response) => {
          setPijamas(response.data);
          const totalCount = parseInt(response.headers["x-total-count"] || "0");
          setTotal(totalCount);
        })
        .catch((error) => console.error("Erro ao buscar pijamas:", error));
    } else {
      axios
        .get(url)
        .then((response) => {
          setPijamas(response.data);
          setTotal(response.data.length);
        })
        .catch((error) => console.error("Erro ao buscar todos pijamas:", error));
    }
  }, [id, page, limit]);

  return { pijamas, total };
}

// Exemplo de uso:
// const { pijamas, total } = useGetPijamas();
// const { pijamas: pijama } = useGetPijamas({ id: 5 });
// const { pijamas, total } = useGetPijamas({ page: 1, limit: 9 });