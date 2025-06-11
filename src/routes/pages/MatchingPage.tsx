import { useEffect, useState } from "react";
import MatchingCard from "../../components/MatchingPage/MatchingCard";
import MatchingImage from "../../assets/images/MatchingImage.png";
import Button from "../../components/common/Button";
import LeftBtn from "../../assets/images/Left.png";
import RightBtn from "../../assets/images/right.png";
import MatchingCardInfo from "../../components/MatchingPage/MatchingCardInfo";
import { fetchMatchedUsers } from "../../apis/matching";
import type { Database } from "../../types/supabase";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function MatchingPage() {
  const [selectedProfile, setSelectedProfile] = useState<Profiles | null>(null);
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
    <>
      <div className="flex flex-col items-center justify-center space-y-8 p-6">
        {/* 소개팅 이미지 */}
        <img src={MatchingImage} alt="소개팅소개이미지" />

        {/* 제목 */}
        <div className="text-[32px] font-bold">
          <span className="text-[#FFC7ED]">지유</span>님이 원하시는 소개팅 상대를 찾았어요!
        </div>

        {/* 필터 버튼 그룹 */}
        <div className="flex space-x-8">
          <Button className="w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium">
            <span className="inline-block leading-[1]">관심사</span>
          </Button>
          <Button className="w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium">
            <span className="inline-block leading-[1]">지역</span>
          </Button>
          <Button className="w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium">
            <span className="inline-block leading-[1]">MBTI</span>
          </Button>
        </div>

        {/* 캐러셀 카드 리스트 */}
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
                    <motion.div
                      key={profile.id}
                      layout
                      layoutId={profile.id.toString()}
                      initial={false}
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

        {/* 하단 안내 텍스트 */}
        <h2 className="text-[32px] font-bold text-center flex flex-col my-[100px] text-black">
          <span className="text-[#969696] text-[24px]">추천 상대가 마음에 안드신다면,</span>
          다른 소개팅 상대들도 만나보세요!
        </h2>

        {/* 추천 카드 */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 w-[1500px]">
          {matchedProfiles.map((profile) => (
            <MatchingCard
              key={profile.id}
              profile={profile}
              width="w-[300px]"
              height="h-[450px]"
              imageWidth="w-full"
              imageHeight="h-full"
              text="text-[17px]"
              disableFlip={true}
              onClick={() => {
                setSelectedProfile(profile);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* 추천카드 모달 */}
      <AnimatePresence>
        {isModalOpen && selectedProfile && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            style={{ top: "63px", right: "140px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="relative z-10 max-w-md w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <MatchingCardInfo profile={selectedProfile} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
