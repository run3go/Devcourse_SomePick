import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { followUser, unfollowUser } from "../../apis/follow";
import { notifyFollow } from "../../apis/notification";
import { useAuthStore } from "../../stores/authStore";
import Button from "../common/Button";
import Icon from "../common/Icon";

export default function FollowModal({
  users,
  type,
  myFollowings,
  setMyFollowings,
  setModalOpen,
}: {
  users: UserData[];
  type: string;
  myFollowings: string[];
  setMyFollowings: React.Dispatch<React.SetStateAction<string[]>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const { session } = useAuthStore();
  const isFollwingUser = (userId: string) => {
    return myFollowings.some((followingId) => followingId === userId);
  };

  const handleFollowUser = async (userId: string) => {
    try {
      setMyFollowings((state) => [...state, userId]);
      await followUser(userId);
      await notifyFollow(userId);
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className={twMerge(
        "fixed left-1/2 -translate-x-1/2 z-100 bg-white p-6 flex flex-col w-[400px] h-[600px] shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] rounded-[10px]",
        "dark:bg-[var(--dark-bg-primary)] dark:text-[var(--dark-gray-200)]"
      )}
    >
      <Icon
        onClick={() => setModalOpen(false)}
        className="absolute right-6 cursor-pointer"
        width="17px"
        height="17px"
        left="-463px"
        top="-729px"
      />
      <span className="text-center text-lg pb-[10px] w-full border-b border-[var(--primary-pink)]">
        {type}
      </span>
      <ul className="flex flex-col overflow-y-scroll scrollbar-hide">
        {users.length ? (
          users.map((user) => (
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
                <div className="group-hover:text-black group-hover:dark:text-[var(--dark-gray-300-59)]">
                  {user.nickname}
                  {session?.user.id === user.id ? (
                    <span className="text-[var(--dark-gray-700)] text-xs group-hover:dark:text-[var(--dark-gray-300-59)]">
                      {" "}
                      (나)
                    </span>
                  ) : (
                    <span className="text-[var(--dark-gray-700)] text-xs group-hover:dark:text-[var(--dark-gray-300-59)]">
                      {user.status === "solo" ? " (솔로)" : " (커플)"}
                    </span>
                  )}
                </div>
              </div>
              {session &&
                session.user.id !== user.id &&
                (isFollwingUser(user.id) ? (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnfollowUser(user.id);
                    }}
                    className={twMerge(
                      "w-[94px] h-[33px] bg-[#d9d9d9] hover:bg-[#c2c2c2] text-sm",
                      "dark:bg-[var(--dark-bg-tertiary)] dark:hover:bg-[var(--dark-gray-300-59)]"
                    )}
                  >
                    팔로우 취소
                  </Button>
                ) : (
                  <Button
                    className="w-[94px] h-[33px] text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFollowUser(user.id);
                    }}
                  >
                    팔로우
                  </Button>
                ))}
            </li>
          ))
        ) : (
          <span className="text-center mt-55 text-xl text-[var(--gray-300)] dark:text-[var(--dark-bg-tertiary)]">
            {type} 유저가 없습니다
          </span>
        )}
      </ul>
    </motion.div>
  );
}
