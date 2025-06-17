import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import {
  fetchFollowingList,
  followUser,
  unfollowUser,
} from "../../apis/follow";
import { notifyFollow } from "../../apis/notification";
import { useAuthStore } from "../../stores/authstore";
import Button from "../common/Button";
import Icon from "../common/Icon";
import FollowModal from "./FollowModal";
import ProfileCard from "./ProfileCard";

export default function CoupleProfile({
  coupleProfile,
  isMyProfile,
  scrollRef,
}: {
  coupleProfile: ProfileData;
  isMyProfile: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { session } = useAuthStore();
  const navigate = useNavigate();
  const { main_image, nickname, partner_nickname, couple, id, gender } =
    coupleProfile;
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
  const [isFollowing, setIsFollwing] = useState(
    followerList.some((user) => user.id === session?.user.id)
  );

  const partnerInfo = couple
    ? couple.user1.nickname === partner_nickname
      ? couple.user1
      : couple.user2
    : "";

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
      await notifyFollow(id);
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

  return (
    <div className="w-full bg-[#FFFBFB] dark:bg-[var(--dark-bg-secondary)] p-9 pb-[60px]">
      <AnimatePresence>
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
              setModalOpen={setIsFollowerModalOpen}
            />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
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
              setModalOpen={setIsFollowingModalOpen}
            />
          </>
        )}
      </AnimatePresence>
      <div className="w-full text-center">
        <h2 className="font-bold text-2xl dark:text-white">
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
      <div className="flex flex-col items-center">
        <div className="mt-8 flex gap-[45px]">
          <ProfileCard
            nickname={nickname}
            image={main_image}
            isCouple
            gender={gender}
          />
          <Icon
            width="76px"
            height="70px"
            left="-330px"
            top="-449px"
            className="self-center"
          />
          <ProfileCard
            onClick={() =>
              partnerInfo && navigate(`/profile/${partnerInfo.id}`)
            }
            nickname={partner_nickname!}
            image={partnerInfo && partnerInfo.main_image}
            isPartner
            isCouple
            gender={gender}
          />
        </div>
        <div className="flex flex-col gap-[70px] justify-center dark:text-white">
          <div className="flex flex-col items-center w-75">
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
            <div className="flex gap-7 mt-[22px]">
              {session &&
                !isMyProfile &&
                (isFollowing ? (
                  <Button
                    className={twMerge(
                      "w-[300px] h-[38px] gap-2 bg-[#d9d9d9] hover:bg-[#c2c2c2]",
                      "dark:bg-[var(--dark-bg-tertiary)] hover:dark:bg-[var(--dark-gray-300-50)]"
                    )}
                    onClick={handleUnfollowUser}
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
                    className="w-[300px] h-[38px] gap-2"
                    onClick={handleFollowUser}
                  >
                    <Icon
                      width="24px"
                      height="23px"
                      left="-67px"
                      top="-398px"
                    />
                    <span className="inline-block leading-[1]">팔로우</span>
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
