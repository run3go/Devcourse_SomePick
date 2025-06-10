// import email from "../../assets/icons/email.png";
import { useNavigate } from "react-router";
import google from "../../assets/images/google-login.png";
import LoginInput from "../../components/login/LoginInput";
import Button from "../../components/common/Button";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[41%] flex items-center flex-col">
          <div className=" mb-10 cursor-default text-center w-[600px]">
            <div className="text-[36px]">Welcome Back!</div>
            <div className="text-[24px]">
              오늘은 왠지 좋은 일이 생길 것 같아요😉
            </div>
          </div>

          <LoginInput type="email" placeholder="Email" className="mb-3" />

          <LoginInput type="password" placeholder="Password" />

          <Button className="w-full h-12.5 rounded-full mt-9">Login</Button>

          <div className="flex items-center justify-between my-6 w-full">
            <hr className="w-[219px] border-[var(--gray-500)]" />
            <span className="inline-block align-middle text-[var(--gray-500)]">
              or
            </span>
            <hr className="w-[219px] border-[var(--gray-500)]" />
          </div>

          <div className="cursor-pointer">
            <img
              src={google}
              alt="구글 로그인"
              className="h-12.5  object-cover"
            />
          </div>

          <div className="flex gap-2.5 mt-10 cursor-default text-[var(--gray-500)]">
            Dont't have an account?
            <div
              className="text-[var(--primary-pink-point)] font-bold cursor-pointer"
              onClick={() => navigate("/auth/signup")}
            >
              Sign Up now
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
