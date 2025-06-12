import { useState, useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{6,}$/;

export default function useSignupValidation() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [pw, setPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(true);

  const [pwConfirm, setPwConfirm] = useState("");
  const [isPwConfirmValid, setIsPwConfirmValid] = useState(true);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(EMAIL_REGEX.test(value));
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPw(value);
    setIsPwValid(PASSWORD_REGEX.test(value));
  };

  const handlePwConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwConfirm(value);
  };

  useEffect(() => {
    setIsPwConfirmValid(pw === pwConfirm);
  }, [pw, pwConfirm]);

  return {
    email,
    pw,
    pwConfirm,
    isEmailValid,
    isPwValid,
    isPwConfirmValid,
    handleEmailChange,
    handlePwChange,
    handlePwConfirmChange,
  };
}
