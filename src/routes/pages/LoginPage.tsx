// import email from "../../assets/icons/email.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser, loginUserByGoogle } from "../../apis/auth";
import google from "../../assets/images/google-login.png";
import Button from "../../components/common/Button";
import LoginInput from "../../components/login/LoginInput";
import {
  showErrorToast,
  showWarnToast,
} from "../../components/common/ShowToast";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      showWarnToast("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const login = await loginUser(email, password);

      if (login) {
        navigate("/");
      } else {
        showErrorToast("이메일/비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    await loginUserByGoogle();
  };

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

          <form onSubmit={LoginHandler} className="w-full">
            <LoginInput
              type="email"
              placeholder="Email"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <LoginInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="w-full h-12.5 rounded-full mt-9 dark:text-[var(--dark-black)]">
              Login
            </Button>
          </form>

          <div className="flex items-center justify-between my-6 w-full">
            <hr className="w-[219px] border-[var(--gray-500)]" />
            <span className="inline-block align-middle text-[var(--gray-500)]">
              or
            </span>
            <hr className="w-[219px] border-[var(--gray-500)]" />
          </div>

          <div onClick={handleGoogleLogin} className="cursor-pointer">
            <img
              src={google}
              alt="구글 로그인"
              className="h-12.5  object-cover"
              draggable="false"
            />
          </div>

          <div className="flex gap-2.5 mt-10 cursor-default text-[var(--gray-500)] dark:text-[var(--dark-gray-100)]">
            계정이 없으신가요?
            <div
              className="text-[var(--primary-pink-point)] font-bold cursor-pointer"
              onClick={() => navigate("/auth/signup")}
            >
              회원가입 하러가기
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
