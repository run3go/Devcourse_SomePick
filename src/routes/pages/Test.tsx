import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion"; // ← AnimateSharedLayout → LayoutGroup
import MatchingCard from "../../components/MatchingPage/MatchingCard";
import LeftBtn from "../../assets/images/Left.png";
import RightBtn from "../../assets/images/right.png";
import { fetchMatchedUsers } from "../../apis/matching";
import type { Database } from "../../types/supabase";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function MatchingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchedProfiles, setMatchedProfiles] = useState<Profiles[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const myGender: "male" | "female" = "male";

  useEffect(() => {
    (async () => {
      const list = await fetchMatchedUsers(myGender);
      if (list) setMatchedProfiles(list);
    })();
  }, [myGender]);

  const len = matchedProfiles.length;
  const prevIndex = (currentIndex - 1 + len) % len;
  const nextIndex = (currentIndex + 1) % len;

  const handlePrev = () => {
    if (len > 0) setCurrentIndex((prev) => (prev - 1 + len) % len);
  };
  const handleNext = () => {
    if (len > 0) setCurrentIndex((prev) => (prev + 1) % len);
  };

  const slots = [
    { idx: prevIndex, position: "side" },
    { idx: currentIndex, position: "center" },
    { idx: nextIndex, position: "side" },
  ] as const;

  return (
    <LayoutGroup>
      <div className="flex flex-col items-center justify-center space-y-8 p-6">
        <div className="flex items-center justify-center space-x-8 relative">
          <button onClick={handlePrev} className="absolute left-[-50px] z-10">
            <img src={LeftBtn} alt="이전" className="cursor-pointer" />
          </button>

          {len > 0 &&
            slots.map(({ idx, position }) => {
              const profile = matchedProfiles[idx];
              const isCenter = position === "center";
              return (
                // layoutId를 주면 언마운트/마운트 간 애니메이션도 자연스럽게 처리됩니다.
                <motion.div
                  key={profile.id}
                  layout // 레이아웃 변화에 애니메이션
                  layoutId={profile.id.toString()}
                  initial={false} // 첫 마운트 시 깜빡임 방지
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`
                    transform filter
                    ${
                      isCenter
                        ? "scale-100 blur-0 w-[600px] h-[800px]"
                        : "scale-100 blur-lg w-[300px] h-[450px]"
                    }
                  `}
                >
                  <MatchingCard
                    profile={profile}
                    width="w-full"
                    height="h-full"
                    imageWidth="w-full"
                    imageHeight="h-full"
                    text="text-[18px]"
                    disableFlip={!isCenter}
                    onClick={isCenter ? () => setIsModalOpen(true) : undefined}
                  />
                </motion.div>
              );
            })}

          <button onClick={handleNext} className="absolute right-[-50px] z-10">
            <img src={RightBtn} alt="다음" className="cursor-pointer" />
          </button>
        </div>
      </div>
    </LayoutGroup>
  );
}
