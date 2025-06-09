import { useState } from "react";
import firstCard from "../../assets/images/card1.png";
import secondCard from "../../assets/images/card2.png";
import lastCard from "../../assets/images/card3.png";
import firstDarkCard from "../../assets/images/darkcard1.png";
import secondDarkCard from "../../assets/images/darkcard2.png";
import lastDarkCard from "../../assets/images/darkcard3.png";
import styles from "../../styles/FortuneCards.module.css";

export default function FortuneCards() {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const frontCards = [firstCard, secondCard, lastCard];
  const backCards = [firstDarkCard, secondDarkCard, lastDarkCard];

  const flipHandler = (index: number) => {
    if (flipped.some((flip) => flip)) return;

    setFlipped((prev) => prev.map((flip, i) => (i === index ? !flip : flip)));
  };
  return (
    <>
      <div className="flex justify-center space-x-4 mt-[30px]">
        {frontCards.map((front, idx) => (
          <div
            key={idx}
            className={`relative cursor-pointer w-[350px] h-[526px] ${styles["fade-up"]}
            transition-transform duration-300 ease-in-out hover:-translate-y-6`}
            style={{ perspective: "1000px" }}
            onClick={() => flipHandler(idx)}
          >
            <div
              className="relative duration-1000"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped[idx] ? "rotateY(180deg)" : "rotateY(0deg)",
                transitionProperty: "transform",
              }}
            >
              <img
                src={front}
                alt={`타로카드 ${idx + 1}번`}
                className="absolute inset-0"
                style={{ backfaceVisibility: "hidden" }}
              />
              <img
                src={backCards[idx]}
                alt={`타로카드 ${idx + 1}번 뒷면`}
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
