import { useEffect, useState } from "react";
import { checkEmail } from "../apis/auth";
import { useSignUpStore } from "../stores/signupStore";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6,}$/;

export default function useSignupValidation() {
  const { email, pw, setEmail, setPw } = useSignUpStore();

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isPwValid, setIsPwValid] = useState(true);
  const [pwConfirm, setPwConfirm] = useState("");
  const [isPwConfirmValid, setIsPwConfirmValid] = useState(true);

  useEffect(() => {
    const valid = EMAIL_REGEX.test(email);
    setIsEmailValid(valid);

    if (valid) {
      const check = async () => {
        const res = await checkEmail(email);
        console.log(res);
        if (res?.email && !res.nickname) {
          setIsEmailDuplicate(false);
          return;
        }
        if (res) {
          setIsEmailDuplicate(true);
        } else setIsEmailDuplicate(false);
      };
      check();
    } else {
      setIsEmailDuplicate(false);
    }
  }, [email]);

  useEffect(() => {
    setIsPwValid(PASSWORD_REGEX.test(pw));
  }, [pw]);

  useEffect(() => {
    setIsPwConfirmValid(pw === pwConfirm);
  }, [pw, pwConfirm]);

  return {
    email,
    pw,
    pwConfirm,
    isEmailValid,
    isEmailDuplicate,
    isPwValid,
    isPwConfirmValid,
    setIsEmailDuplicate,
    setIsPwConfirmValid,
    setPwConfirm,
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value),
    handlePwChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPw(e.target.value),
    handlePwConfirmChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPwConfirm(e.target.value),
  };
}
