import { NavLink, useNavigate } from "react-router";
import logoImage from "../../assets/images/logoImage.png";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center bg-white fixed w-full">
      <div className="w-[1350px] h-[157px] flex items-center justify-between">
        <img
          src={logoImage}
          alt="로고 이미지"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
        <div className="relative flex gap-[65px] top-[-10px]">
          <NavLink to={"/post/dating"}>연애백과</NavLink>
          <NavLink to={"/post/free"}>자유 게시판</NavLink>
          <NavLink to={"/matching"}>소개팅</NavLink>
          <NavLink to={"/todayfortune"}>오늘의 운세</NavLink>
          {/* 비로그인일 경우 */}
          {/* <NavLink to={"/auth/login"}>로그인/회원가입</NavLink> */}
          <div className="flex gap-[35px]">
            {/* 솔로인 경우 */}
            {/* <div className="w-[30px] h-[30px] border"></div> */}
            <div className="w-[30px] h-[30px] border"></div>
            <div className="relative w-[30px] h-[30px] border">
              {/* 모달 버튼 */}
              {/* <ul className="flex flex-col text-[var(--sub-gray-color)] absolute top-[30px] w-[130px] h-[104px] border border-[var(--sub-pink-color)] rounded-[20px] bg-white">
                <li
                  className={twMerge(
                    "basis-1/3 flex justify-center items-center border-b border-[var(--sub-pink-color)]",
                    "rounded-t-[20px] hover:text-black cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-(color:--hover-pink-color)"
                  )}
                >
                  마이 페이지
                </li>
                <li
                  className={twMerge(
                    "basis-1/3 flex justify-center items-center border-b border-[var(--sub-pink-color)]",
                    "hover:text-black cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-(color:--hover-pink-color)"
                  )}
                >
                  로그아웃
                </li>
                <li
                  className={twMerge(
                    "basis-1/3 flex justify-center items-center",
                    "rounded-b-[20px] hover:text-black cursor-pointer hover:shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-(color:--hover-pink-color)"
                  )}
                >
                  다크모드
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
