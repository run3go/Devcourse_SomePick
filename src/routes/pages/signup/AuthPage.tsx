import { Outlet, useNavigate } from "react-router";

import bg from "../../../assets/images/auth-bg.png";
import logo from "../../../assets/images/new_logo.png";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen w-screen">
        <div className="relative w-[38%]">
          <img
            src={bg}
            alt="배경 이미지"
            className="h-full w-full object-cover"
            draggable="false"
          />
          {/* <p
            className="absolute top-5 left-5 font-bold text-[36px] cursor-pointer text-[var(--black)]"
            onClick={() => navigate("/")}
          >
            somepick
          </p> */}
          <img
            src={logo}
            alt="로고"
            className="absolute top-3 left-7 w-45 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="bg-[var(--white)] dark:bg-[var(--dark-bg-primary)] dark:text-[var(--dark-gray-700)] w-[62%]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
