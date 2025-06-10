import { useLoaderData, useNavigate } from "react-router";
import Button from "../../components/common/Button";
import CoupleProfile from "../../components/profile/CoupleProfile";
import ProfileTags from "../../components/profile/ProfileTags";
import SoloProfile from "../../components/profile/SoloProfile";
import { default as PostCard } from "../../components/webboard/PostCard";
import { useAuthStore } from "../../stores/authstore";

export default function ProfilePage() {
  const {
    userProfile,
    posts,
  }: { userProfile: ProfileData; posts: PostData[] } = useLoaderData();
  const session = useAuthStore((state) => state.session);
  const navigate = useNavigate();
  const isMyProfile = session?.user.id === userProfile.id;

  const {
    nickname,
    age,
    height,
    job,
    location,
    mbti,
    status,
    keywords,
    interests,
    ideal_types,
  } = userProfile;

  const info = [
    ["닉네임", nickname],
    ["나이", age],
    ["직업", job],
    ["지역", location],
    ["키", height],
    ["MBTI", mbti],
  ];

  return (
    <main className="relative flex justify-center mb-[150px] mt-[50px]">
      {/* 팔로우 모달창 */}
      {/* <div className="fixed inset-0 bg-black opacity-30 z-50" />
      <FollowModal /> */}
      <div className="flex items-center flex-col w-270">
        {status === "couple" ? (
          <CoupleProfile
            coupleProfile={userProfile}
            isMyProfile={isMyProfile}
          />
        ) : (
          <SoloProfile soloProfile={userProfile} isMyProfile={isMyProfile} />
        )}
        {status === "solo" && (
          <div className="flex flex-col w-full">
            <h3 className="mb-[55px] text-xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]">
              <span className="text-[var(--primary-pink-tone)]">
                {nickname}
              </span>
              님의 정보
            </h3>
            <div className="flex gap-[76px] p-10 border-3 border-[var(--gray-200)] rounded-[20px]">
              <ul className="flex flex-col justify-around">
                {info.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="user-info">{item[0]}</span>
                    <span>{item[1]}</span>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-[38px] border-l border-[var(--gray-50)] px-8 text-[var(--gray-500)]">
                <ProfileTags title="나를 표현하는 키워드" list={keywords!} />
                <ProfileTags title="나의 관심사" list={interests!} />
                <ProfileTags title="나의 이상형" list={ideal_types!} />
              </ul>
            </div>
          </div>
        )}
        {isMyProfile && (
          <Button
            onClick={() => navigate("/profile/edit")}
            className="w-[264px] h-[38px] self-end mt-8"
          >
            <span className="leading-[1]">프로필 정보 변경</span>
          </Button>
        )}
        <div className="w-full flex flex-col gap-[40px] mt-[127px]">
          <h3 className="text-xl font-bold border-l-8 border-[var(--primary-pink)] px-4 py-[10px]">
            <span className="text-[var(--primary-pink-tone)]">{nickname}</span>
            님이 쓴 게시물
          </h3>
          {posts.map((post) => (
            <PostCard key={post.id} className="w-full" post={post} isProfile />
          ))}
        </div>
      </div>
    </main>
  );
}
