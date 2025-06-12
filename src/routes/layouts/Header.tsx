import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import logoImage from "../../assets/images/headerlogo.png";
import Icon from "../../components/common/Icon";
import HeaderModal from "../../components/modals/HeaderModal";
import Notifications from "../../components/modals/Notifications";
import { useAuthStore } from "../../stores/authstore";
import Alert from "../../components/common/Alert";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const outsideRef = useRef<HTMLDivElement | null>(null);

  const isLogin = useAuthStore((state) => state.isLogin);
  const session = useAuthStore((state) => state.session);
  const couple = session?.user.user_metadata.status;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        outsideRef.current &&
        !outsideRef.current.contains(e.target as Node)
      ) {
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
      <div className="flex justify-center items-center bg-white border-b-2 border-b-[var(--primary-pink)] fixed w-full z-40 h-[66px]">
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
            <div className="flex items-center">
              {couple === "couple" ? (
                <div>
                  <button
                    onClick={() => {
                      if (!isLogin) {
                        setIsAlertOpen(true);
                        return;
                      }
                      navigate("/calendar");
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
                      if (!isLogin) {
                        setIsAlertOpen(true);
                        return;
                      }
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

              {isAlertOpen && (
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
              )}
              <button
                onClick={() => {
                  if (!isLogin) {
                    setIsAlertOpen(true);
                    return;
                  }
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
                {couple !== "couple" && (
                  <Link to={"/message"}>
                    <Icon
                      width="27px"
                      height="27px"
                      left="-361px"
                      top="-228px"
                      className="cursor-pointer"
                    />
                  </Link>
                )}
                <div className="relative">
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
                <div className="relative">
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
          </div>
        </div>
      </div>
      <div className="w-full h-[66px]" />
    </>
  );
}
