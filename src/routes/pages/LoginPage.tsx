// import email from "../../assets/icons/email.png";
import { useNavigate } from "react-router";
import google from "../../assets/images/google-login.png";
import LoginInput from "../../components/login/LoginInput";
import Button from "../../components/common/Button";
import { useState } from "react";
import supabase from "../../utils/supabase";
import { toast } from "react-toastify";
// import { showErrorToast } from "../../components/common/Toast";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      // showErrorToast("이메일과 비밀번호를 모두 입력해주세요.");
      toast.warn("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("로그인 실패: " + error.message);
      console.log("로그인 실패: " + error.message);
    } else {
      toast.success("로그인 성공!");
      console.log(data);
      navigate("/");
    }
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

            <Button className="w-full h-12.5 rounded-full mt-9">Login</Button>
          </form>

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
