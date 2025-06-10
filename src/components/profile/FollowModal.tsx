import { useCallback, useEffect, useState, useTransition } from "react";
import { useNavigate } from "react-router";
import {
  fetchFollowingList,
  followUser,
  unfollowUser,
} from "../../apis/follow";
import { useAuthStore } from "../../stores/authstore";
import Button from "../common/Button";

export default function FollowModal({
  users,
  type,
}: {
  users: UserData[];
  type: string;
}) {
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const [myFollowings, setMyFollowings] = useState<string[]>([]);

  const isFollwingUser = (userId: string) => {
    return myFollowings.some((followingId) => followingId === userId);
  };

  const getMyFollowings = useCallback(async () => {
    if (!session) return;
    const followings = await fetchFollowingList(session.user.id);
    if (followings) {
      setMyFollowings(followings.map((user) => user.following.id));
    }
  }, [session]);

  const handleFollowUser = async (userId: string) => {
    try {
      setMyFollowings((state) => [...state, userId]);
      await followUser(userId);
    } catch (e) {
      console.error(e);
      setMyFollowings((state) => state.filter((id) => id !== userId));
    }
  };

  const handleUnfollowUser = async (userId: string) => {
    try {
      setMyFollowings((state) => state.filter((id) => id !== userId));
      await unfollowUser(userId);
    } catch (e) {
      console.error(e);
      setMyFollowings((state) => [...state, userId]);
    }
  };

  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve("");
        }, 500)
      );
      getMyFollowings();
    });
  }, [getMyFollowings]);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 z-100 bg-white p-6 flex flex-col w-[400px] h-[600px] shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] rounded-[10px]">
      <span className="text-center text-lg pb-[10px] w-full border-b border-[var(--primary-pink)]">
        {type}
      </span>
      {isPending ? (
        <ul className="flex flex-col">
          {Array(users.length)
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className="group cursor-pointer flex justify-between mt-5 pb-[10px] items-center border-b border-[var(--primary-pink)]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-[45px] h-[45px] rounded-full bg-[var(--gray-300-50)] animate-pulse" />
                  <span className="h-6 w-[100px] bg-[var(--gray-300-50)] animate-pulse"></span>
                </div>
                <div className="w-[94px] h-[33px] bg-[var(--gray-300-50)] rounded-2xl animate-pulse"></div>
              </li>
            ))}
        </ul>
      ) : (
        <ul className="flex flex-col">
          {users.map((user) => (
            <li
              onClick={() => navigate(`/profile/${user.id}`)}
              key={user.id}
              className="group cursor-pointer flex justify-between mt-5 pb-[10px] items-center border-b border-[var(--primary-pink)]"
            >
              <div className="flex items-center gap-5">
                <img
                  src={user.main_image!}
                  alt="프로필 이미지"
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
                <span className="group-hover:text-black">{user.nickname}</span>
              </div>
              {session?.user.id !== user.id &&
                (isFollwingUser(user.id) ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnfollowUser(user.id);
                    }}
                    className="w-[94px] h-[33px] bg-[#d9d9d9] hover:bg-[#c2c2c2]"
                  >
                    팔로우 취소
                  </Button>
                ) : (
                  <Button
                    className="w-[94px] h-[33px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowUser(user.id);
                    }}
                  >
                    팔로우
                  </Button>
                ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
