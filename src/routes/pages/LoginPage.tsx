// import email from "../../assets/icons/email.png";
import { useNavigate } from "react-router";
import google from "../../assets/images/google-login.png";
import DefaultButton from "../../components/common/DefaultButton";
import LoginInput from "../../components/login/LoginInput";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-[41%] flex items-center flex-col">
          <p className="text-[36px] font-medium mb-10 cursor-default">
            Welcome Back!
          </p>

          <LoginInput
            icon="sprite-email-icon"
            type="email"
            placeholder="Email"
            className="mb-3"
          />

          <LoginInput
            icon="sprite-lock-icon"
            type="password"
            placeholder="Password"
          />

          <DefaultButton text="Login" />

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

          <div className="flex gap-2.5 mt-10 cursor-default">
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
