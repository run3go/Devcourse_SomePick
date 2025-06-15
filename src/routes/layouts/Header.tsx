import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { TbMessageHeart } from "react-icons/tb";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import {
  fetchNotifications,
  subscribeNotification,
} from "../../apis/notification";
import logoImage from "../../assets/images/headerlogo.png";
import HeaderModal from "../../components/modals/HeaderModal";
import Notifications from "../../components/modals/Notifications";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuthStore } from "../../stores/authStore";

export default function Header() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  // const [isAlertOpen, setIsAlertOpen] = useState(false);
  const outsideRef = useRef<HTMLDivElement | null>(null);

  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const isLogin = useAuthStore((state) => state.isLogin);
  const session = useAuthStore((state) => state.session);

  const couple = session?.user.user_metadata.status;

  // 초기 알림 데이터
  useEffect(() => {
    const loadNotifications = async () => {
      if (!isLogin) return;

      try {
        const data = await fetchNotifications();
        if (data) {
          setNotifications(data);
          setHasUnreadNotifications(data.length > 0);
        }
      } catch (error) {
        console.error("알림 로드 에러:", error);
      }
    };

    loadNotifications();
  }, [isLogin]);

  // 실시간 알림 구독
  useEffect(() => {
    if (!isLogin) return;

    let channel: RealtimeChannel | null = null;

    const subscribe = async () => {
      const res = await subscribeNotification(addNotification);
      channel = res ?? null;
    };

    subscribe();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [isLogin]);

  // 헤더에서는 상태 업데이트
  const addNotification = (newNotification: NotificationData) => {
    setNotifications((prev) => [newNotification, ...prev]);
    setHasUnreadNotifications(true);
  };

  const updateNotifications = (updatedNotifications: NotificationData[]) => {
    setNotifications(updatedNotifications);
    setHasUnreadNotifications(updatedNotifications.length > 0);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        outsideRef.current &&
        !outsideRef.current.contains(e.target as Node)
      ) {
        setIsNotificationOpen(false);
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen, isModalOpen]);

  return (
    <>
      <div className="flex justify-center items-center bg-white dark:bg-[var(--dark-bg-primary)] border-b-2 border-b-[var(--primary-pink)] fixed w-full z-40 h-[66px]">
        <div className="w-[1350px] flex items-center justify-between">
          <img
            src={logoImage}
            alt="로고 이미지"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          <div className="relative flex items-center gap-[65px] dark:text-[var(--dark-gray-700)]">
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  "relative header-menu",
                  isActive && "header-menu__active text-black"
                )
              }
              to={"/post/dating"}
            >
              연애백과
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  "relative header-menu",
                  isActive && "header-menu__active text-black"
                )
              }
              to={"/post/free"}
            >
              자유 게시판
            </NavLink>
            <div className="flex items-center">
              {couple === "couple" ? (
                <div>
                  <button
                    onClick={() => {
                      navigate("/couplecalendar");
                    }}
                    className={twMerge(
                      "relative flex header-menu cursor-pointer mr-[65px]",
                      location.pathname === "/calendar" &&
                        "header-menu__active text-black"
                    )}
                  >
                    커플 캘린더
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      navigate("/matching");
                    }}
                    className={twMerge(
                      "relative header-menu cursor-pointer mr-[65px]",
                      location.pathname === "/couplecalendar" &&
                        "header-menu__active text-black"
                    )}
                  >
                    소개팅
                  </button>
                </div>
              )}

              {/* {isAlertOpen && (
                <Alert
                  title="로그인이 필요해요!"
                  isOk="로그인하러 가기"
                  isNotOk="취소"
                  onClick={() => {
                    navigate("/auth/login");
                    setIsAlertOpen(false);
                  }}
                  onCancel={() => setIsAlertOpen(false)}
                ></Alert>
              )} */}
              <button
                onClick={() => {
                  navigate("/todayfortune");
                }}
                className={twMerge(
                  "relative header-menu cursor-pointer",
                  location.pathname === "/todayfortune" &&
                    "header-menu__active text-black"
                )}
              >
                오늘의 운세
              </button>
            </div>
          </div>
          <div className="flex items-center gap-[35px] text-[var(--gray-700)]">
            {isLogin && (
              <>
                <Link to={"/message"}>
                  <TbMessageHeart size={25} />
                </Link>
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    setIsNotificationOpen((state) => !state);
                  }}
                >
                  <IoNotifications size={25} />
                  {/* 알림 뱃지 표시 */}
                  {hasUnreadNotifications && (
                    <span className="absolute top-[-7px] right-[-2px] text-[var(--red)] text-[18px]">
                      ●
                    </span>
                  )}
                  {isNotificationOpen && (
                    <div ref={outsideRef}>
                      <Notifications
                        notifications={notifications}
                        onNotificationsChange={updateNotifications}
                      />
                    </div>
                  )}
                </div>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setIsModalOpen((state) => !state)}
                >
                  <FaUser size={23} />
                  {isModalOpen && (
                    <div ref={outsideRef}>
                      <HeaderModal onClose={() => setIsModalOpen(false)} />
                    </div>
                  )}
                </div>
              </>
            )}
            {!isLogin && (
              <NavLink
                className={({ isActive }) =>
                  twMerge(
                    "relative header-menu inline-block whitespace-nowrap",
                    isActive && "header-menu__active text-black"
                  )
                }
                to={"/auth/login"}
              >
                로그인/회원가입
              </NavLink>
            )}
            <>
              <button onClick={toggleDarkMode}>
                {isDark ? (
                  <div className="cursor-pointer">
                    <MdOutlineLightMode size={28} />
                  </div>
                ) : (
                  <div className="cursor-pointer">
                    <MdOutlineNightlight size={28} />
                  </div>
                )}
              </button>
            </>
          </div>
        </div>
      </div>
      <div className="w-full h-[66px]" />
    </>
  );
}
