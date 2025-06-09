import { useNavigate } from "react-router";
import Button from "../../components/common/Button";
import PostCard from "../../components/common/PostCard";
import SoloProfile from "../../components/profile/SoloProfile";

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <main className="relative flex justify-center mb-[150px] mt-[50px]">
      {/* 팔로우 모달창 */}
      {/* <div className="fixed inset-0 bg-black opacity-30 z-50" />
      <FollowModal /> */}
      <div className="flex items-center flex-col w-270">
        <SoloProfile />
        {/* <CoupleProfile /> */}
        {/* 솔로인 경우 */}
        <div className="flex flex-col w-full">
          <h3 className="mb-[55px] text-xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]">
            <span className="text-[var(--primary-pink-tone)]">차은우</span>
            님의 정보
          </h3>
          <div className="flex gap-[76px] p-10 border-3 border-[var(--gray-200)] rounded-[20px]">
            <ul className="flex flex-col justify-around">
              <li className="flex items-center">
                <span className="user-info">닉네임</span>
                <span>차은우</span>
              </li>
              <li className="flex items-center">
                <span className="user-info">나이</span>
                <span>만 27세</span>
              </li>
              <li className="flex items-center">
                <span className="user-info">직업</span>
                <span>트레이너</span>
              </li>
              <li className="flex items-center">
                <span className="user-info">지역</span>
                <span>서울</span>
              </li>
              <li className="flex items-center">
                <span className="user-info">키</span>
                <span>180cm</span>
              </li>
              <li className="flex items-center">
                <span className="user-info">MBTI</span>
                <span>ISTP</span>
              </li>
            </ul>
            <ul className="flex flex-col gap-[38px] border-l border-[var(--gray-50)] px-8 text-[var(--gray-500)]">
              <li className="flex flex-col items-start gap-5">
                <span className="user-info w-50!">나를 표현하는 키워드</span>
                <ul className="flex gap-4">
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      잘생김
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      듬직한
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      감성적인
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      패셔니스타
                    </span>
                  </li>
                </ul>
              </li>
              <li className="flex flex-col items-start gap-5">
                <span className="user-info w-50!">나의 관심사</span>
                <ul className="flex gap-4">
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      사진
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      음식
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      패션
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      공부
                    </span>
                  </li>
                </ul>
              </li>
              <li className="flex flex-col items-start gap-5">
                <span className="user-info w-50!">나의 이상형</span>
                <ul className="flex gap-4">
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      잘생김
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      귀여움
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      성격 좋음
                    </span>
                  </li>
                  <li className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]">
                    <span className="inline-block text-[var(--gray-50)] leading-[1]">
                      패셔니스타
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <Button
          onClick={() => navigate("/profile/edit")}
          className="w-[264px] h-[38px] self-end mt-8 mb-[127px]"
        >
          <span className="leading-[1]">프로필 정보 변경</span>
        </Button>
        <div className="w-full flex flex-col gap-[55px]">
          <h3 className="text-xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]">
            <span className="text-[var(--primary-pink-tone)]">차은우</span>
            님이 쓴 게시물
          </h3>
          <PostCard />
          <PostCard />
        </div>
      </div>
    </main>
  );
}
