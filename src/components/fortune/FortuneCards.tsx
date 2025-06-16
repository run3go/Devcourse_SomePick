import { useState } from "react";
import firstCard from "../../assets/images/card1.png";
import secondCard from "../../assets/images/card2.png";
import lastCard from "../../assets/images/card3.png";
import firstDarkCard from "../../assets/images/darkcard1.png";
import secondDarkCard from "../../assets/images/darkcard2.png";
import lastDarkCard from "../../assets/images/darkcard3.png";
import styles from "../../styles/FortuneCards.module.css";
import { AnimatePresence } from "framer-motion";
import FortuneModal from "./FortuneModal";
// import { IoSpeedometer } from "react-icons/io5";
// import ShareButton from "./ShareButton";

interface FortuneData {
  userName?: string | null;
  status: string | null;
  loveTitle: string | null;
  loveDescription: string | null;
  loveAdvice: string;
}

interface Props {
  fortuneData: FortuneData | null;
  onModal?: boolean;
}

export default function FortuneCards({ fortuneData, onModal = true }: Props) {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const frontCards = [firstCard, secondCard, lastCard];
  const backCards = [firstDarkCard, secondDarkCard, lastDarkCard];

  // 운세 모달
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const flipHandler = (index: number) => {
    if (flipped.some((flip) => flip)) return;

    setFlipped((prev) => prev.map((flip, i) => (i === index ? !flip : flip)));
    setSelectedCard(index);

    setTimeout(() => {
      setShowModal(true);
    }, 500);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCard(null);
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
              <div
                className="flex flex-col w-[350px] h-[526px] justify-center item-center text-white p-2"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  backgroundImage: `url(${backCards[idx]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {fortuneData ? (
                  <div className="text-center px-4 py-4">
                    <p>
                      {new Date().getFullYear()}년 {new Date().getMonth() + 1}월{" "}
                      {new Date().getDate()}일
                    </p>
                    <p className="text-[16px] mt-[10px]">
                      {fortuneData.loveTitle}
                    </p>
                    <p className="text-[14px] mt-[10px] leading-relaxed">
                      {fortuneData.loveDescription}
                    </p>
                    <p className="text-[14px] mt-[10px] italic leading-relaxed">
                      💡 {fortuneData.loveAdvice}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>운세를 불러오는 중..</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {onModal && showModal && selectedCard !== null && (
          <FortuneModal
            isOpen={showModal}
            onClose={closeModal}
            cardIndex={selectedCard}
            backGroundImage={
              selectedCard !== null ? backCards[selectedCard] : ""
            }
            fortuneData={fortuneData}
          />
        )}
      </AnimatePresence>
    </>
  );
}
