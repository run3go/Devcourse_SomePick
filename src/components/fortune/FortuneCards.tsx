import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  createFortuneTelling,
  updateFortuneTelling,
} from "../../apis/fortuneTelling";
import firstCard from "../../assets/images/card1.png";
import secondCard from "../../assets/images/card2.png";
import lastCard from "../../assets/images/card3.png";
import firstDarkCard from "../../assets/images/darkcard1.png";
import secondDarkCard from "../../assets/images/darkcard2.png";
import lastDarkCard from "../../assets/images/darkcard3.png";
import { useAuthStore } from "../../stores/authtore";
import styles from "../../styles/FortuneCards.module.css";
import FortuneModal from "./FortuneModal";
// import { IoSpeedometer } from "react-icons/io5";
// import ShareButton from "./ShareButton";

interface FortuneData {
  userName?: string | null;
  status?: string | null;
  love_title: string | null;
  love_description: string | null;
  love_advice: string;
  created_at?: string;
  id?: string;
  used_at: string;
}

interface Props {
  fortuneData: FortuneData | null;
  onModal?: boolean;
  isTodayChecked?: boolean;
}

export default function FortuneCards({
  fortuneData,
  onModal = true,
  isTodayChecked = false,
}: Props) {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  // const [flippedIndex, setFlippedIndex] = useState<number|null>(null)
  const frontCards = [firstCard, secondCard, lastCard];
  const backCards = [firstDarkCard, secondDarkCard, lastDarkCard];
  const session = useAuthStore((state) => state.session);

  useEffect(() => {
    if (isTodayChecked) {
      setFlipped([false, true, false]);
    }
  }, [isTodayChecked]);

  useEffect(() => {
    const fortuneDay = async () => {
      try {
        if (!session?.user.user_metadata.fortune_telling_id) {
          const data = await createFortuneTelling();
          console.log(data);
        } else {
          const data = session?.user.user_metadata.fortune_telling_id;
          console.log(data);
        }
      } catch (e) {
        console.log("운세 로딩 실패", e);
      }
    };
    fortuneDay();
  }, []);

  // 운세 모달
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const flipHandler = async (
    index: number,
    title: string,
    description: string,
    advice: string
  ) => {
    if (flipped.some((flip) => flip)) return;
    if (isTodayChecked) return;

    setFlipped((prev) => prev.map((flip, i) => (i === index ? !flip : flip)));
    setSelectedCard(index);

    await updateFortuneTelling(title, advice, description);

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
            onClick={() =>
              flipHandler(
                idx,
                fortuneData?.love_title ?? "",
                fortuneData?.love_advice ?? "",
                fortuneData?.love_description ?? ""
              )
            }
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
                      {fortuneData.love_title}
                    </p>
                    <p className="text-[14px] mt-[10px] leading-relaxed">
                      {fortuneData.love_description}
                    </p>
                    <p className="text-[14px] mt-[10px] italic leading-relaxed">
                      💡 {fortuneData.love_advice}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 text-sm font-semibold text-yellow-300">
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
