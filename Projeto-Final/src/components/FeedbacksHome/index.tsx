import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

import estrelaVazia from "../../assets/estrelaVazia.png";
import estrelaCheia from "../../assets/Star.png";

type Feedback = {
  id: string;
  name: string;
  description: string;
  rating: number;
};

export default function FeedbackCarousel() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [idx, setIdx] = useState(0);


  const visibleFeedbacks = feedbacks.slice(0, 3);

 
  useEffect(() => {
    if (idx >= visibleFeedbacks.length) setIdx(0);
  }, [visibleFeedbacks.length, idx]);

  const goNext = () => {
    if (!visibleFeedbacks.length) return;
    setIdx((i) => (i + 1) % visibleFeedbacks.length);
  };

  const goPrev = () => {
    if (!visibleFeedbacks.length) return;
    setIdx((i) => (i - 1 + visibleFeedbacks.length) % visibleFeedbacks.length);
  };

 
  
useEffect(() => {
  axios
    .get<Feedback[]>("http://localhost:3333/feedbacks")
    .then((res) =>
      setFeedbacks(
        Array.isArray(res.data) ? res.data.filter((f) => f.rating >= 4) : []
      )
    )
    .catch((err) => console.error(err));
}, []);


  return (
    <section className={styles.feedbacks}>
      <h2>Feedbacks</h2>

      <div
        className={styles.gridFeedbacks}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") goPrev();
          if (e.key === "ArrowRight") goNext();
        }}
       
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          justifyItems: "center", 
          gap: 12,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          aria-label="Anterior"
          style={{
            border: "none",
            background: "#f3f4f6",
            width: 40,
            height: 40,
            borderRadius: 999,
            fontSize: 24,
            cursor: "pointer",
          }}
          disabled={!visibleFeedbacks.length}
        >
          ‹
        </button>

        {visibleFeedbacks.length ? (
         
          <div
            style={{
              display: "flex",
              gap: 84,                 
              alignItems: "stretch",
              width: "max-content",   
              justifySelf: "center",  
            }}
          >
            {[0, 1, 2].slice(0, visibleFeedbacks.length).map((offset) => {
              const j = (idx + offset) % visibleFeedbacks.length;
              const f = visibleFeedbacks[j];
              return (
                <article key={f.id} className={styles.cardFeedbacks}>
                  <h3 className={styles.name}>{f.name}</h3>

                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        src={i < Math.round(f.rating) ? estrelaCheia : estrelaVazia}
                        alt="estrela"
                        className={styles.star}
                      />
                    ))}
                  </div>

                  {f.description && (
                    <p className={styles.description}>{f.description}</p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p>Nenhum feedback disponível.</p>
        )}

        <button
          type="button"
          onClick={goNext}
          aria-label="Próximo"
          style={{
            border: "none",
            background: "#f3f4f6",
            width: 40,
            height: 40,
            borderRadius: 999,
            fontSize: 24,
            cursor: "pointer",
          }}
          disabled={!visibleFeedbacks.length}
        >
          ›
        </button>
      </div>

      <div className={styles.wrapper}>
        <Link to="/feedback" className={styles.button}>
          Também quero dar um feedback!
        </Link>
      </div>
    </section>
  );
}
