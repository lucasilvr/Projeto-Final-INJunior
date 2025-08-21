import { useEffect, useRef, useState } from "react";
import CardPijama from '../../components/cardPijama';
import useGetPijamas from '../../hooks/useGetPijama';
import type { Pijama } from '../../type/Pijama';
import styles from './styles.module.css';
import Inverno from '../../assets/Inverno.svg';
import Verão from '../../assets/Verão.svg';
import Masculino from '../../assets/Masculino.svg';
import Feminino from '../../assets/Feminino.svg';
import Família from '../../assets/Família.svg';
import Unissex from '../../assets/Unissex.svg';
import Adulto from '../../assets/Adulto.svg';
import Infantil from '../../assets/Infantil.svg';
import Ambos from '../../assets/Ambos.svg';

export default function Pijama() {
  const [pijama, setPijama] = useState<Pijama | null>(null);
  const [fetched, setFetched] = useState(false);

  const id = String(window.location.pathname.split("/").pop() || "");
  const resultado = useGetPijamas({ id });
  const prevRef = useRef<Pijama[] | null>(null);

  useEffect(() => {
    if (prevRef.current !== resultado) {
      prevRef.current = resultado;
      setFetched(true);
    }

    if (Array.isArray(resultado) && resultado.length > 0) {
      setPijama(resultado[0]);
    } else if (fetched) {
      setPijama(null);
    }
  }, [resultado, fetched]);

  if (!fetched) return <p style={{ color: 'rgba(184, 41, 53, 1)', fontSize: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Carregando pijama...</p>;
  if (!pijama) return <p style={{ color: 'rgba(184, 41, 53, 1)', fontSize: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Pijama não encontrado</p>;

  return (
    <div className={styles.Regions}>
      <CardPijama {...pijama} />
      <div className={styles.PijamaInfo}>
        {pijama.season === 'Inverno' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Inverno} alt="Inverno" />
          </div>
        )}
        
        {pijama.season === 'Verao' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Verão} alt="Verão" />
          </div>
        )}

        {pijama.gender === 'Unissex' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Unissex} alt="Unissex" />
          </div>
        )}

        {pijama.gender === 'Masculino' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Masculino} alt="Masculino" />
          </div>
        )}

        {pijama.gender === 'Feminino' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Feminino} alt="Feminino" />
          </div>
        )}

        {pijama.gender === 'Familia' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Família} alt="Família" />
          </div>
        )}

        {pijama.type === 'Adulto' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Adulto} alt="Adulto" />
          </div>
        )}

        {pijama.type === 'Infantil' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Infantil} alt="Infantil" />
          </div>
        )}

        {pijama.type === 'Ambos' && (
          <div className={styles.PijamaType}>
            <img className={styles.PijamaTypeIMG} src={Ambos} alt="Ambos" />
          </div>
        )}
      </div>
      <div className={styles.Marca}>
        <h1>SOBRE NOSSO PIJAMA</h1>
        <h3>Esse pijama é perfeito para as noites mais frias do inverno, isso graças ao seu tecido que é de alta qualidade, feito com o mais puro algodão da Suécia. Além disso, sua cor sofisticada traz a sensação de fineza e conforto, o que reflete a alta costura da peça.</h3>
        <h2>Contém:</h2>
        <ol>
          <li>Uma blusa de mangas longas na cor azul petróleo com estampa poá branca</li>
          <li>Uma calça na cor azul petróleo com estampa poá branca</li>
        </ol>
        <h2>Composição:</h2>
        <ol>
          <li>100% algodão</li>
        </ol>
      </div>
    </div>
  );
}