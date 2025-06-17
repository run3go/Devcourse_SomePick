import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { fetchMatchedUsers } from "../../apis/matching";
import { fetchProfile } from "../../apis/user";
import LeftBtn from "../../assets/images/Left.png";
import MatchingImage from "../../assets/images/MatchingImage.png";
import RightBtn from "../../assets/images/right.png";
import Icon from "../../components/common/Icon";
import MatchingCard from "../../components/MatchingPage/MatchingCard";
import MatchingCardInfo from "../../components/MatchingPage/MatchingCardInfo";
import { useAuthStore } from "../../stores/authStore";
import type { Database } from "../../types/supabase";

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
  const [gender, setGender] = useState<string>();
  const [myMbti, setMyMbti] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  // const gender = session!.user.user_metadata?.gender;
  const [myLocation, setMyLocation] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  // const myMbti: string = session!.user.user_metadata?.mbti || "";
  const [idealTypes, setIdealTypes] = useState<string[]>([]);
  const [filterByLocation, setFilterByLocation] = useState(false);
  const [filterByInterest, setFilterByInterest] = useState(false);
  const [filterByMbti, setFilterByMbti] = useState(false);

  useEffect(() => {
    const fetchMyProfileData = async () => {
      if (!session) return;
      const profile = await fetchProfile(session.user.id);
      if (profile) {
        setName(profile.nickname ?? "");
        setGender(profile.gender ?? "");
        setMyMbti(profile.mbti ?? "");
        setMyLocation(profile.location ?? "");
        setInterests(profile.interests ?? []);
        setIdealTypes(profile.ideal_types ?? []);
      }
    };
    fetchMyProfileData();
  }, [session]);

  useEffect(() => {
    (async () => {
      const list = await fetchMatchedUsers(gender as "male" | "female");
      if (list) {
        setMatchedProfiles(list);

        const locations = list.map((profile) => profile.location);
        console.log("Locations:", locations);
      }
    })();
  }, [gender]);

  //추천카드모달 나올시 스크롤 안되게
  useEffect(() => {
    const header = document.querySelector(".header") as HTMLDivElement;
    if (isModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.offsetWidth;
      header.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      header.style.paddingRight = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      header.style.paddingRight = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isModalOpen]);
  // 매칭 퍼센트 계산 함수
  const calcMatchPercent = (matched: string[]) => {
    return idealTypes.length > 0
      ? Math.round((matched.length / idealTypes.length) * 100)
      : 0;
  };
  // 전체 프로필
  const mappedMatchedProfiles = matchedProfiles.map((profile) => {
    const matched = idealTypes.filter((type: string) =>
      profile.keywords?.includes(type)
    );
    const matchPercent = calcMatchPercent(matched);
    return { ...profile, matchPercent };
  });
  // 이상형 50%이상만
  const filteredMatchedProfiles = mappedMatchedProfiles.filter(
    (profile) => profile.matchPercent >= 50
  );

  const unfilteredMatchedProfiles = mappedMatchedProfiles
    .filter((profile) => profile.matchPercent < 50)
    .sort((a, b) => {
      const aMatched = idealTypes.filter((type: string) =>
        a.keywords?.includes(type)
      );
      const bMatched = idealTypes.filter((type: string) =>
        b.keywords?.includes(type)
      );
      return calcMatchPercent(bMatched) - calcMatchPercent(aMatched);
    });

  //  필터링된 프로필 배열 계산
  let displayedProfiles = filteredMatchedProfiles;

  if (filterByLocation || filterByInterest || filterByMbti) {
    displayedProfiles = filteredMatchedProfiles.filter((profile) => {
      if (filterByLocation && profile.location !== myLocation) return false;
      if (
        filterByInterest &&
        !profile.interests?.some((i) => interests.includes(i))
      )
        return false;
      if (filterByMbti && !mbtiPairs[myMbti!]?.includes(profile.mbti || ""))
        return false;
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
    slots = [
      { idx: currentIndex, position: "center" },
      { idx: nextIndex, position: "center" },
    ] as const;
  } else {
    slots = [{ idx: currentIndex, position: "center" }] as const;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-8 p-6">
        {/* 소개팅 이미지 */}
        <img src={MatchingImage} alt="소개팅소개이미지" />

        {/* 제목 */}
        <div className="text-[32px] font-bold dark:text-white">
          <span className="text-[#FFC7ED]">{name}</span>님이 원하시는 소개팅
          상대를 찾았어요!
        </div>

        {/* 필터 버튼 그룹 */}
        <div className="flex space-x-8">
          <button
            className={twMerge(
              "bg-white relative cursor-pointer w-[150px] h-[50px] rounded-full text-sm transition-all duration-300",
              "border-2 border-[var(--primary-pink)] shadow-[5px_10px_10px_rgba(0,0,0,0.2)]",
              filterByInterest
                ? "hover:scale-[1.0] hover:bg-[var(--primary-pink-point)] bg-[var(--primary-pink-tone)] text-white border-transparent shadow-[0_4px_14px_var(--primary-pink)] dark:shadow-none scale-[1.05]"
                : "hover:border-[var(--primary-pink-tone)] hover:shadow-[0_2px_12px_var(--primary-pink)] hover:scale-[1.03] dark:hover:shadow-[0_2px_12px_var(--dark-primary-pink-point-50)]"
            )}
            onClick={toggleInterestFilter}
          >
            <span>관심사</span>
          </button>
          <button
            className={twMerge(
              "bg-white relative cursor-pointer w-[150px] h-[50px] rounded-full text-sm transition-all duration-300",
              "border-2 border-[var(--primary-pink)] shadow-[5px_10px_10px_rgba(0,0,0,0.2)]",
              filterByLocation
                ? "hover:scale-[1.0] hover:bg-[var(--primary-pink-point)] bg-[var(--primary-pink-tone)] text-white border-transparent shadow-[0_4px_14px_var(--primary-pink)] dark:shadow-none scale-[1.05]"
                : "hover:border-[var(--primary-pink-tone)] hover:shadow-[0_2px_12px_var(--primary-pink)] hover:scale-[1.03] dark:hover:shadow-[0_2px_12px_var(--dark-primary-pink-point-50)]"
            )}
            onClick={toggleLocationFilter}
          >
            <span className="inline-block leading-[1]">지역</span>
          </button>
          <button
            className={twMerge(
              "bg-white relative cursor-pointer w-[150px] h-[50px] rounded-full text-sm transition-all duration-300",
              "border-2 border-[var(--primary-pink)] shadow-[5px_10px_10px_rgba(0,0,0,0.2)]",
              filterByMbti
                ? "hover:scale-[1.0] hover:bg-[var(--primary-pink-point)] bg-[var(--primary-pink-tone)] text-white border-transparent shadow-[0_4px_14px_var(--primary-pink)] dark:shadow-none scale-[1.05]"
                : "hover:border-[var(--primary-pink-tone)] hover:shadow-[0_2px_12px_var(--primary-pink)] hover:scale-[1.03] dark:hover:shadow-[0_2px_12px_var(--dark-primary-pink-point-50)]"
            )}
            onClick={toggleMbtiFilter}
          >
            <span className="inline-block leading-[1]">MBTI</span>
          </button>
        </div>
        {/* 추천카드 */}
        {displayedProfiles.length > 0 && (
          <LayoutGroup>
            <div className="flex flex-col items-center justify-center space-y-8 p-6">
              <div className="flex items-center justify-center space-x-8 relative">
                {len >= 3 && (
                  <button
                    onClick={handlePrev}
                    className="absolute left-[-50px] z-10"
                  >
                    <img src={LeftBtn} alt="이전" className="cursor-pointer" />
                  </button>
                )}

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
                        onClick={
                          isCenter ? () => setIsModalOpen(true) : undefined
                        }
                      />
                    </motion.div>
                  );
                })}

                {len >= 3 && (
                  <button
                    onClick={handleNext}
                    className="absolute right-[-50px] z-10"
                  >
                    <img src={RightBtn} alt="다음" className="cursor-pointer" />
                  </button>
                )}
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
        <h2 className="text-[32px] font-bold text-center flex flex-col my-[100px] text-black dark:text-[#FFC7ED]">
          <span className="text-[#969696] text-[24px] dark:text-white">
            추천 상대가 마음에 안드신다면,
          </span>
          다른 소개팅 상대들도 만나보세요!
        </h2>

        {/* 추천 카드 전체*/}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 w-[1500px]">
          {unfilteredMatchedProfiles.map((profile) => (
            <MatchingCard
              key={profile.id}
              profile={profile}
              width="w-[320px]"
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
              {/* 닫기 버튼 */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 left-140 cursor-pointer"
              >
                <Icon width="17px" height="17px" left="-463px" top="-729px" />
              </button>
              <MatchingCardInfo profile={selectedProfile} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
