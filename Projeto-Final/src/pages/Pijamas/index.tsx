import './styles.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import Paginacao from '../../components/Paginação';


export default function Pijamas() {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const limitePorPagina = 12;

  useEffect(() => {
    axios
      .get('http://localhost:3000/products?_limit=1')
      .then(response => {
        const total = parseInt(response.headers['x-total-count'] || "0");
        setTotalPaginas(Math.ceil(total / limitePorPagina));
      });
  }, []);

  return (
    <div>
      <h1>Pijamas</h1>
      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        onChange={setPaginaAtual}
      />
    </div>
  );
}