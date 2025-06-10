import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import logoImage from "../../assets/images/headerlogo.png";
import Icon from "../../components/common/Icon";
import HeaderModal from "../../components/modals/HeaderModal";
import Notifications from "../../components/modals/Notifications";
import { useAuthStore } from "../../stores/authstore";

export default function Header() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const outsideRef = useRef<HTMLDivElement | null>(null);

  const isLogin = useAuthStore((state) => state.isLogin);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isNotificationOpen || (isModalOpen && outsideRef.current)) {
        e.preventDefault();
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
      <div className="flex justify-center items-center bg-white border-b-2 border-b-[var(--primary-pink)] fixed w-full z-100 h-[66px]">
        <div className="w-[1350px] flex items-center justify-between">
          <img
            src={logoImage}
            alt="로고 이미지"
            onClick={() => navigate("/")}
            className="cursor-pointer"
          />
          <div className="relative flex items-center gap-[65px] ">
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
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  "relative header-menu",
                  isActive && "header-menu__active text-black"
                )
              }
              to={"/matching"}
            >
              소개팅
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                twMerge(
                  "relative header-menu",
                  isActive && "header-menu__active text-black"
                )
              }
              to={"/todayfortune"}
            >
              오늘의 운세
            </NavLink>
          </div>
          <div className="flex gap-[35px] text-[var(--gray-700)] w-[150px]">
            <Link to={"/message"}>
              <Icon
                width="27px"
                height="27px"
                left="-361px"
                top="-228px"
                className="cursor-pointer"
              />
            </Link>
            <div>
              <Icon
                width="28px"
                height="27px"
                left="-436px"
                top="-228px"
                className="cursor-pointer"
                onClick={() => setIsNotificationOpen((state) => !state)}
              />
              {isNotificationOpen && (
                <div ref={outsideRef}>
                  <Notifications />
                </div>
              )}
            </div>
            {isLogin && (
              <div>
                <Icon
                  width="23px"
                  height="28px"
                  left="-516px"
                  top="-225px"
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen((state) => !state)}
                />
                {isModalOpen && (
                  <div ref={outsideRef}>
                    <HeaderModal />
                  </div>
                )}
              </div>
            )}
            {!isLogin && (
              <NavLink
                className={({ isActive }) =>
                  twMerge(
                    "relative header-menu",
                    isActive && "header-menu__active text-black"
                  )
                }
                to={"/auth/login"}
              >
                로그인/회원가입
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[66px]" />
    </>
  );
}
