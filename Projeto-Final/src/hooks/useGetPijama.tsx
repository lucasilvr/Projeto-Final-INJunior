import { useEffect, useState } from "react";
import axios from "axios";
import type { Pajama } from "../Type/Pijama";

interface Params {
  id?: number;
  page?: number;
  limit?: number;
}

export default function useGetPijamas({ id, page, limit }: Params = {}) {
  const [pijamas, setPijamas] = useState<Pajama[]>([]);

  useEffect(() => {
    let url = "http://localhost:3000/pijamas";
    if (id !== undefined) {
      url += `/${id}`;
      axios
        .get(url)
        .then((response) => setPijamas([response.data]))
        .catch((error) => console.error("Erro ao buscar pijama por id:", error));
    } else if (page !== undefined && limit !== undefined) {
      url += `?_page=${page}&_limit=${limit}`;
      axios
        .get(url)
        .then((response) => setPijamas(response.data))
        .catch((error) => console.error("Erro ao buscar pijamas:", error));
    } else {
      axios
        .get(url)
        .then((response) => setPijamas(response.data))
        .catch((error) => console.error("Erro ao buscar todos pijamas:", error));
    }
  }, [id, page, limit]);

  return pijamas;
}

// Exemplo de uso:
// const pijamas = useGetPijamas();
// const pijama = useGetPijamas({ id: 5 });
// const pijamas = useGetPijamas({ page: 1, limit: 9 });