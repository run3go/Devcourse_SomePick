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
            <div className="relative w-[30px] h-[30px] border">
              {/* 알림 모달 */}
              {/* <Notifications /> */}
            </div>
            <div className="relative w-[30px] h-[30px] border">
              {/* 모달 버튼 */}
              {/* <HeaderModal /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
