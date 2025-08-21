import { useEffect, useState } from "react";
import axios from "axios";
import type { Pijama } from "../type/Pijama";

type Params = { id?: string | number };

export default function useGetPijamas({ id }: Params = {}): Pijama[] {
  const [pijamas, setPijamas] = useState<Pijama[]>([]);
  const base = "http://localhost:3333/pajamas";

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get<Pijama>(`${base}/${encodeURIComponent(String(id))}`)
        .then((res) => setPijamas(res.data ? [res.data] : []))
        .catch(() => setPijamas([]));
      return;
    }

    axios
      .get<Pijama[]>(base)
      .then((res) => setPijamas(res.data || []))
      .catch(() => setPijamas([]));
  }, [id]);

  return pijamas;
}

// Exemplo de uso:
// const { pijamas, total } = useGetPijamas();
// const { pijamas: pijama } = useGetPijamas({ id: 5 });