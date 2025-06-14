import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import {
  fetchFollowingList,
  followUser,
  unfollowUser,
} from "../../apis/follow";
import { sendHeart } from "../../apis/matching";
import { useAuthStore } from "../../stores/authStore";
import Alert from "../common/Alert";
import Button from "../common/Button";
import Icon from "../common/Icon";
import FollowModal from "./FollowModal";
import ProfileCard from "./ProfileCard";

export default function SoloProfile({
  soloProfile,
  isMyProfile,
  scrollRef,
}: {
  soloProfile: ProfileData;
  isMyProfile: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const navigate = useNavigate();
  const { description, main_image, sub_image, nickname, id } = soloProfile;
  const { session } = useAuthStore();
  const {
    posts,
    followers,
    followings,
  }: { posts: PostData[]; followers: UserData[]; followings: UserData[] } =
    useLoaderData();
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [followerList, setFollowerList] = useState(followers);
  const [myFollowings, setMyFollowings] = useState<string[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isFollowing, setIsFollwing] = useState(
    followerList.some((user) => user.id === session?.user.id)
  );

  const scrollToPosts = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFollowUser = async () => {
    try {
      if (!session) return;
      setIsFollwing(true);
      setFollowerList((list) => [
        ...list,
        {
          id: session?.user.id,
          main_image: session?.user.user_metadata.main_image,
          nickname: session?.user.user_metadata.nickname,
        },
      ]);
      await followUser(id);
    } catch (e) {
      console.error(e);
      setIsFollwing(false);
      setFollowerList((list) =>
        list.filter((item) => item.id !== session?.user.id)
      );
    }
  };

  const handleUnfollowUser = async () => {
    try {
      setIsFollwing(false);
      setFollowerList((list) =>
        list.filter((item) => item.id !== session?.user.id)
      );
      await unfollowUser(id);
    } catch (e) {
      if (!session) return;
      console.error(e);
      setIsFollwing(true);
      setFollowerList((list) => [
        ...list,
        {
          id: session.user.id,
          main_image: session.user.user_metadata.main_image,
          nickname: session.user.user_metadata.nickname,
        },
      ]);
    }
  };

  const handleSendHeart = async () => {
    const hasHeartAlready = await sendHeart(id);
    if (hasHeartAlready) {
      setIsAlertOpen(true);
    }
  };

  return (
    <div
      className={twMerge(
        "w-full bg-[#FFFBFB] p-9 pb-[60px] mb-[30px] dark:bg-[var(--dark-bg-secondary)]",
        "dark:text-[var(--dark-white)]"
      )}
    >
      {isAlertOpen && (
        <Alert
          title="이미 상대에게 전달받은 하트가 있습니다"
          subtitle="매칭 페이지로 이동하시겠습니까?"
          isOk="이동"
          isNotOk="취소"
          onClick={() => navigate("/message")}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
      {isFollowerModalOpen && (
        <>
          <div
            onClick={() => setIsFollowerModalOpen(false)}
            className="fixed inset-0 bg-black opacity-30 z-100"
          />
          <FollowModal
            users={followerList}
            type="팔로워"
            myFollowings={myFollowings}
            setMyFollowings={setMyFollowings}
          />
        </>
      )}
      {isFollowingModalOpen && (
        <>
          <div
            onClick={() => setIsFollowingModalOpen(false)}
            className="fixed inset-0 bg-black opacity-30 z-100"
          />
          <FollowModal
            users={followings}
            type="팔로잉"
            myFollowings={myFollowings}
            setMyFollowings={setMyFollowings}
          />
        </>
      )}
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl">
          {isMyProfile ? (
            "My Profile"
          ) : (
            <>
              <span className="text-[var(--primary-pink-tone)]">
                {nickname}
              </span>
              님의 Profile
            </>
          )}
        </h2>
      </div>
      <div className="flex justify-around">
        <div className="mt-16 flex gap-[32px] items-end">
          <ProfileCard image={main_image} isMain />
          <ProfileCard image={sub_image} />
        </div>
        <div className="flex flex-col gap-[40px] justify-center w-100">
          <div className="flex flex-col items-center">
            <div className="w-full flex justify-evenly gap-[29px] mt-[38px] font-semibold text-xl">
              <div
                onMouseDown={async () => {
                  if (session) {
                    const followings = await fetchFollowingList(
                      session.user.id
                    );
                    if (followings) {
                      setMyFollowings(
                        followings.map(({ following }) => following.id)
                      );
                    }
                  }
                  setIsFollowerModalOpen(true);
                }}
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <span className="group-hover:text-black dark:group-hover:text-[var(--dark-gray-300)]">
                  팔로워
                </span>
                <span className="text-[var(--primary-pink-tone)] group-hover:text-[var(--primary-pink-point)]">
                  {followerList.length}
                </span>
              </div>
              <div
                onMouseDown={async () => {
                  if (session) {
                    const followings = await fetchFollowingList(
                      session.user.id
                    );
                    if (followings) {
                      setMyFollowings(
                        followings.map(({ following }) => following.id)
                      );
                    }
                  }
                  setIsFollowingModalOpen(true);
                }}
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <span className="group-hover:text-black dark:group-hover:text-[var(--dark-gray-300)]">
                  팔로잉
                </span>
                <span className="text-[var(--primary-pink-tone)] group-hover:text-[var(--primary-pink-point)]">
                  {followings.length}
                </span>
              </div>
              <div
                onClick={scrollToPosts}
                className="group flex flex-col items-center gap-2 cursor-pointer"
              >
                <span className="group-hover:text-black dark:group-hover:text-[var(--dark-gray-300)]">
                  게시글
                </span>
                <span className="text-[var(--primary-pink-tone)] group-hover:text-[var(--primary-pink-point)]">
                  {posts.length}
                </span>
              </div>
            </div>
            {!isMyProfile && session?.user.user_metadata.status === "solo" && (
              <div className="flex gap-7 mt-[22px]">
                {isFollowing ? (
                  <Button
                    onClick={() => handleUnfollowUser()}
                    className="w-[177px] h-[38px] gap-2 bg-[#d9d9d9] hover:bg-[#c2c2c2]"
                  >
                    <Icon
                      width="24px"
                      height="23px"
                      left="-67px"
                      top="-398px"
                    />
                    <span className="inline-block leading-[1]">
                      팔로우 취소
                    </span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFollowUser()}
                    className="w-[177px] h-[38px] gap-2"
                  >
                    <Icon
                      width="24px"
                      height="23px"
                      left="-67px"
                      top="-398px"
                    />
                    <span className="inline-block leading-[1]">팔로우</span>
                  </Button>
                )}
                {
                  <Button
                    onClick={handleSendHeart}
                    className="w-[177px] h-[38px] gap-2"
                  >
                    <Icon
                      width="23px"
                      height="21px"
                      left="-99px"
                      top="-399px"
                    />
                    <span className="inline-block leading-[1]">
                      하트 보내기
                    </span>
                  </Button>
                }
              </div>
            )}
          </div>
          <div className={twMerge("flex flex-col gap-[18px]")}>
            <div className="flex items-center gap-2">
              <Icon width="10px" height="9px" left="-49px" top="-405px" />
              <span className="font-semibold text-[var(--primary-pink-tone)]">
                한줄 소개
              </span>
            </div>
            <div className="dark:text-[var(--dark-bg-primary)] py-3 px-5 w-full border-3 border-[var(--gray-200)] rounded-[20px] bg-white">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
