import { useState } from "react";
import firstCard from "../../assets/images/card1.png";
import secondCard from "../../assets/images/card2.png";
import lastCard from "../../assets/images/card3.png";
import firstDarkCard from "../../assets/images/darkcard1.png";
import secondDarkCard from "../../assets/images/darkcard2.png";
import lastDarkCard from "../../assets/images/darkcard3.png";
import styles from "../../styles/FortuneCards.module.css";
import { motion, AnimatePresence } from "framer-motion";
// import ShareButton from "./ShareButton";

interface FortuneData {
  date: string | null;
  userName: string | null;
  status: string | null;
  loveTitle: string | null;
  loveDescription: string | null;
  loveAdvice: string;
}

interface Props {
  fortuneData: FortuneData | null;
}

export default function FortuneCards({ fortuneData }: Props) {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const frontCards = [firstCard, secondCard, lastCard];
  const backCards = [firstDarkCard, secondDarkCard, lastDarkCard];

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
                    <p>{fortuneData.date}</p>
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

      {/* modal */}
      <AnimatePresence>
        {showModal && selectedCard !== null && (
          <motion.div
            className="fixed inset-0 bg-[rgba(0,0,0,0.9)] flex flex-col items-center justify-center z-50"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="transition-transform duration-300 ease-in-out w-[500px] h-[751px] relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
            >
              <div
                className="w-full h-full flex flex-col justify-center text-white p-5"
                style={{
                  backgroundImage: `url(${backCards[selectedCard]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-[30px] right-[20px] text-white text-2xl hover:text-gray-500 z-10"
                >
                  X
                </button>

                {fortuneData ? (
                  <motion.div
                    className="text-center px-4 py-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 1 }}
                  >
                    <p className="text-[18px]">{fortuneData.date}</p>
                    <p className="text-[20px] font-bold mt-[10px] mb-6">
                      {fortuneData.loveTitle}
                    </p>
                    <p className="text-[16px] mt-[10px] mb-4 leading-relaxed">
                      {fortuneData.loveDescription}
                    </p>
                    <p className="text-[16px] mt-[10px] italic leading-relaxed">
                      💡 {fortuneData.loveAdvice}
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <p>운세를 불러오는 중..</p>
                  </div>
                )}
              </div>
            </motion.div>
            <div>{/* <ShareButton /> */}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
