import { Outlet, useNavigate } from "react-router";

import bg from "../../assets/images/auth-bg.png";
// import logo from "../../assets/images/logo.png";

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
          />
          <p
            className="absolute top-5 left-5 font-bold text-[36px] cursor-pointer"
            onClick={() => navigate("/")}
          >
            somepick
          </p>
          {/* <img src={logo} className="absolute top-5 left-5 h-14" /> */}
        </div>

        <div className="bg-[var(--grey-100)] w-[62%]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
