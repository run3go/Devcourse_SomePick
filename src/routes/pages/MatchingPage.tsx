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
import { useAuthStore } from "../../stores/authstore";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const mbtiPairs: Record<string, string[]> = {
  ENFJ: ["INFP", "ISTP"],
  INFP: ["ENFJ", "ENTJ"],
  ISTJ: ["ESFP", "ENFP"],
  ESFP: ["ISTJ", "INTJ"],
  INTJ: ["ENFP", "ESFP"],
  ENFP: ["INTJ", "ISTJ"],
  ISFJ: ["ESTP", "ENTP"],
  ESTP: ["ISFJ", "INFJ"],
  INFJ: ["ESTP", "ENTP"],
  ENTP: ["ISFJ", "INFJ"],
  ENTJ: ["INFP", "ISFP"],
  ISFP: ["ENTJ", "ESFJ"],
  ESFJ: ["ISFP", "ISTP"],
  ISTP: ["ESFJ", "ENFJ"],
};

export default function MatchingPage() {
  const [selectedProfile, setSelectedProfile] = useState<Profiles | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matchedProfiles, setMatchedProfiles] = useState<Profiles[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const session = useAuthStore((state) => state.session);
  const name = session!.user.user_metadata?.nickname;
  const gender = session!.user.user_metadata?.gender;
  const mylocation = session!.user.user_metadata?.location;
  const interests: string[] = session!.user.user_metadata?.interests || [];
  const myMbti: string = session!.user.user_metadata?.mbti || "";
  const [filterByLocation, setFilterByLocation] = useState(false);
  const [filterByInterest, setFilterByInterest] = useState(false);
  const [filterByMbti, setFilterByMbti] = useState(false);
  console.log(myMbti);

  useEffect(() => {
    (async () => {
      const list = await fetchMatchedUsers(gender);
      if (list) {
        setMatchedProfiles(list);
        // location만 따로 뽑아서 로그
        const locations = list.map((profile) => profile.location);
        console.log("Locations:", locations);
      }
    })();
  }, [gender]);

  //추천카드모달 나올시 스크롤 안되게
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // 변경: 필터링된 프로필 배열 계산 (지역 & 관심사)
  let displayedProfiles = matchedProfiles;
  if (filterByLocation || filterByInterest || filterByMbti) {
    displayedProfiles = matchedProfiles.filter((profile) => {
      if (filterByLocation && profile.location !== mylocation) return false;
      if (filterByInterest && !profile.interests?.some((i) => interests.includes(i))) return false;
      if (filterByMbti && !mbtiPairs[myMbti]?.includes(profile.mbti || "")) return false;
      return true;
    });
  }

  const len = displayedProfiles.length;
  const prevIndex = (currentIndex - 1 + len) % len;
  const nextIndex = (currentIndex + 1) % len;

  // 변경: 필터 토글 시 인덱스 초기화
  const toggleLocationFilter = () => {
    setFilterByLocation((prev) => !prev);
    setCurrentIndex(0);
  };
  const toggleInterestFilter = () => {
    setFilterByInterest((prev) => !prev);
    setCurrentIndex(0);
  };
  const toggleMbtiFilter = () => {
    setFilterByMbti((prev) => !prev);
    setCurrentIndex(0);
  };

  const handlePrev = () => {
    if (len > 0) setCurrentIndex((prev) => (prev - 1 + len) % len);
  };
  const handleNext = () => {
    if (len > 0) setCurrentIndex((prev) => (prev + 1) % len);
  };

  let slots: readonly { idx: number; position: "side" | "center" }[];
  if (len >= 3) {
    slots = [
      { idx: prevIndex, position: "side" },
      { idx: currentIndex, position: "center" },
      { idx: nextIndex, position: "side" },
    ] as const;
  } else if (len === 2) {
    // 프로필 2개면 center + side 1개만
    slots = [
      { idx: currentIndex, position: "center" },
      { idx: nextIndex, position: "side" },
    ] as const;
  } else {
    // 프로필 1개면 center 1개만
    slots = [{ idx: currentIndex, position: "center" }] as const;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-8 p-6">
        {/* 소개팅 이미지 */}
        <img src={MatchingImage} alt="소개팅소개이미지" />

        {/* 제목 */}
        <div className="text-[32px] font-bold">
          <span className="text-[#FFC7ED]">{name}</span>님이 원하시는 소개팅 상대를 찾았어요!
        </div>

        {/* 필터 버튼 그룹 */}
        <div className="flex space-x-8">
          <Button
            className={`w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium ${
              filterByInterest ? "bg-[#E7E6F9]" : "bg-[var(--primary-pink)]"
            }`}
            onClick={toggleInterestFilter}
          >
            <span className="inline-block leading-[1]">관심사</span>
          </Button>
          <Button
            className={`w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium ${
              filterByLocation ? "bg-[#E7E6F9]" : "bg-[var(--primary-pink)]"
            }`}
            onClick={toggleLocationFilter}
          >
            <span className="inline-block leading-[1]">지역</span>
          </Button>
          <Button
            className={`w-[300px] h-[50px] text-[20px] rounded-[100px] gap-2 text-sm font-medium ${
              filterByMbti ? "bg-[#E7E6F9]" : "bg-[var(--primary-pink)]"
            }`}
            onClick={toggleMbtiFilter}
          >
            <span className="inline-block leading-[1]">MBTI</span>
          </Button>
        </div>

        {displayedProfiles.length > 0 && (
          <LayoutGroup>
            <div className="flex flex-col items-center justify-center space-y-8 p-6">
              <div className="flex items-center justify-center space-x-8 relative">
                <button onClick={handlePrev} className="absolute left-[-50px] z-10">
                  <img src={LeftBtn} alt="이전" className="cursor-pointer" />
                </button>

                {slots.map(({ idx, position }) => {
                  const profile = displayedProfiles[idx];
                  const isCenter = position === "center";
                  return (
                    <motion.div
                      key={profile.id}
                      layout
                      layoutId={profile.id.toString()}
                      initial={false}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`transform filter ${
                        isCenter
                          ? "scale-100 blur-0 w-[600px] h-[800px]"
                          : "scale-100 blur-lg w-[300px] h-[450px]"
                      }`}
                    >
                      <MatchingCard
                        profile={profile}
                        width="w-full"
                        height="h-full"
                        imageWidth="w-full"
                        imageHeight="h-full"
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
        )}

        {/* 필터 결과 없을 때 메시지 */}
        {displayedProfiles.length === 0 && (
          <div className="text-center text-[20px] text-[#999] mt-12">
            😥 조건에 맞는 상대가 없어요. <br /> 아래에서 더 찾아볼까요?
          </div>
        )}

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
              text="text-[16px]"
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
