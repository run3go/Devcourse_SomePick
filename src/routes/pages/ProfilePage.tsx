import { useNavigate } from "react-router";
import profileImage from "../../assets/images/profile_image.png";
import profileImage2 from "../../assets/images/profile_image2.png";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import PostCard from "../../components/common/PostCard";
import ProfileCard from "../../components/profile/ProfileCard";

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <main className="relative flex justify-center mb-[150px]">
      {/* 팔로우 모달창 */}
      {/* <div className="fixed inset-0 bg-black opacity-30 z-50" />
      <FollowModal /> */}
      <div className="flex items-center flex-col w-270">
        <div className="w-full bg-[var(--main-gray-color)] text-center py-[18px]">
          <h2 className="font-bold text-2xl">
            {/* 나의 프로필일 경우 */}
            {/* My Profile */}
            <span className="text-[var(--main-pink-color)]">차은우</span>
            님의 Profile
          </h2>
        </div>
        {/* 솔로인 경우 */}
        {/* <div className="mt-16 flex gap-[68px]">
          <ProfileCard nickname="차은우" image={profileImage} />
          <ProfileCard nickname="차은우" image={profileImage} />
        </div> */}
        <div className="mt-16 flex gap-[45px]">
          <ProfileCard nickname="차은우" image={profileImage} />
          <Icon
            width="76px"
            height="70px"
            left="-330px"
            top="-449px"
            className="self-center"
          />
          <ProfileCard
            nickname="고윤정"
            image={profileImage2}
            isPartner={true}
          />
        </div>
        {/* 솔로인 경우 */}
        {/* <div className="flex flex-col items-center gap-[18px] mt-[42px]">
          <div className="flex items-center gap-2">
            <Icon width="10px" height="9px" left="-49px" top="-405px" />
            <span className="font-semibold text-[var(--main-pink-color)]">
              한줄 소개
            </span>
          </div>
          <div className="w-[730px] py-[23px] border-3 border-[var(--main-gray-color)] rounded-[20px] text-center text-xl">
            저랑 잘맞는 분을 찾아요
          </div>
        </div> */}
        <div className="mb-[141px] flex flex-col items-center">
          <div className="flex gap-[29px] mt-[38px] font-semibold text-xl">
            <div className="flex gap-2">
              <span>팔로워</span>
              <span className="text-[var(--main-pink-color)]">19</span>
            </div>
            <div className="flex gap-2">
              <span>팔로잉</span>
              <span className="text-[var(--main-pink-color)]">19</span>
            </div>
          </div>
          <div className="flex gap-7 mt-[22px]">
            <Button className="w-[177px] h-[38px] gap-2">
              <Icon width="24px" height="23px" left="-67px" top="-398px" />
              <span className="inline-block leading-[1]">팔로우하기</span>
            </Button>
            <Button
              className="w-[177px] h-[38px]"
              onClick={() => navigate("/profile/edit")}
            >
              <span className="leading-[1]">프로필 정보 변경</span>
            </Button>
            {/* 솔로인 경우 */}
            {/* <Button className="w-[177px] h-[38px] gap-2">
              <Icon width="23px" height="21px" left="-99px" top="-399px" />
              <span className="inline-block leading-[1]">하트 보내기</span>
            </Button> */}
          </div>
        </div>
        {/* 솔로인 경우 */}
        {/* <div className="flex flex-col w-full mb-[137px]">
          <h3 className="mb-[55px] text-2xl font-bold border-l-8 border-[var(--sub-pink-color)] px-4 py-[10px]">
            차은우님의 정보
          </h3>
          <div className="flex gap-[76px] p-10 border-3 border-[var(--main-gray-color)] rounded-[20px]">
            <ul className="flex flex-col gap-7">
              <li className="flex items-center gap-8">
                <span className="w-[131px] text-center py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  닉네임
                </span>
                <span>차은우</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="w-[131px] text-center py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  나이
                </span>
                <span>만 27세</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="w-[131px] text-center py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  직업
                </span>
                <span>트레이너</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="w-[131px] text-center py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  지역
                </span>
                <span>서울</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="w-[131px] text-center py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  키
                </span>
                <span>180cm</span>
              </li>
              <li className="flex items-center gap-8">
                <span className="w-[131px] text-center py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  MBTI
                </span>
                <span>ISTP</span>
              </li>
            </ul>
            <ul className="flex flex-col gap-[38px] border-l border-[var(--sub-gray-color)] px-8">
              <li className="flex flex-col items-start gap-5">
                <span className="block px-[25px] py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  나를 표현하는 키워드
                </span>
                <ul className="flex gap-4">
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 잘생김
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 듬직한
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 감성적인
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 패셔니스타
                    </span>
                  </li>
                </ul>
              </li>
              <li className="flex flex-col items-start gap-5">
                <span className="block px-[25px] py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  나의 관심사
                </span>
                <ul className="flex gap-4">
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 사진
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 음식
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 패션
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 공부
                    </span>
                  </li>
                </ul>
              </li>
              <li className="flex flex-col items-start gap-5">
                <span className="block px-[25px] py-[10px] bg-[var(--main-gray-color)] rounded-2xl">
                  나의 이상형
                </span>
                <ul className="flex gap-4">
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 잘생김
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 귀여움
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 성격 좋음
                    </span>
                  </li>
                  <li className="flex pl-3 pr-10 py-[9px] border border-[var(--sub-pink-color)] rounded-[50px]">
                    <span className="inline-block text-[var(--sub-gray-color)] leading-[1]">
                      # 패셔니스타
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Button className="w-[264px] h-[38px] self-end mt-8">
            <span className="leading-[1]">프로필 정보 변경</span>
          </Button>
        </div> */}
        <div className="w-full flex flex-col gap-[55px]">
          <h3 className="text-2xl font-bold border-l-8 border-[var(--sub-pink-color)] px-4 py-[10px]">
            차은우님이 쓴 게시물
          </h3>
          <PostCard />
          <PostCard />
        </div>
      </div>
    </main>
  );
}
