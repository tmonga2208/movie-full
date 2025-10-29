interface MovieCardProps {
  imgURL: string;
  title: string;
  releaseDate: string;
  rating?: number;
}

function MovieCard({ imgURL, title, releaseDate, rating }: MovieCardProps) {
  return (
    <>
      <style>{`
        .card {
          width: 100%;
          width: 150px;
          aspect-ratio: 195 / 285;
          background: #313131;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          transition: 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          transition: 0.3s ease-in-out;
          z-index: 1;
        }

        .textBox {
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          text-align: center;
          transition: 0.3s ease-in-out;
          z-index: 2;
          padding: 1rem;
        }

        .textBox > .text {
          font-weight: bold;
        }

        .textBox > .head {
          font-size: 1.1rem;
        }

        .textBox > .price {
          font-size: 0.95rem;
        }

        .textBox > span {
          font-size: 0.8rem;
          color: lightgrey;
        }

        .card:hover > .textBox {
          opacity: 1;
        }

        .card:hover > .img {
          filter: blur(7px);
          transform: scale(1.1);
          animation: anim 3s infinite;
        }

        @keyframes anim {
          0% {
            transform: translateY(0) scale(1.1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
          100% {
            transform: translateY(0) scale(1.1);
          }
        }

        .card:hover {
          transform: scale(1.04) rotate(-1deg);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .card {
            max-width: 150px;
            aspect-ratio: 150 / 220;
          }

          .textBox > .head {
            font-size: 1rem;
          }

          .textBox > .price {
            font-size: 0.85rem;
          }

          .textBox > span {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            max-width: 130px;
            aspect-ratio: 130 / 200;
          }

          .textBox > .head {
            font-size: 0.9rem;
          }

          .textBox > .price {
            font-size: 0.75rem;
          }
        }
      `}</style>

      <div className="card">
        <img src={imgURL} alt={title} className="img" />
        <div className="textBox">
          <p className="text head">{title}</p>
          {rating && <span>⭐ {rating}</span>}
          <p className="text price">{releaseDate}</p>
        </div>
      </div>
    </>
  );
}

export default MovieCard;