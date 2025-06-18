import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import BackButton from "../../../components/common/BackButton";
import Button from "../../../components/common/Button";
import Icon from "../../../components/common/Icon";
import { showWarnToast } from "../../../components/common/ShowToast";
import InputBirthDate from "../../../components/signup/InputBirthDate";
import ProfileImgUpload from "../../../components/signup/ProfileImgUpload";
import SignupInput from "../../../components/signup/SignupInput";
import useCheckNickname from "../../../hooks/useCheckNickname";
import useSignupValidation from "../../../hooks/useSignupValidation";
import { useSignUpStore } from "../../../stores/signUpStore";
import supabase from "../../../utils/supabase";

export default function SignUpSoloStep1Page() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ id: string; email: string }>({
    id: "",
    email: "",
  });

  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPwTouched, setIsPwTouched] = useState(false);
  const [isPwConfirmTouched, setIsPwConfirmTouched] = useState(false);

  const { mainImgFile, subImgFile, data, updateData, setId } = useSignUpStore();
  const nickname = data.nickname;

  const { isDuplicate } = useCheckNickname(nickname);

  const {
    email,
    pw,
    pwConfirm,
    isEmailValid,
    isEmailDuplicate,
    isPwValid,
    isPwConfirmValid,
    handleEmailChange,
    handlePwChange,
    handlePwConfirmChange,
  } = useSignupValidation();

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mainImgFile || !subImgFile) {
      showWarnToast("이미지를 추가해주세요.");
      return;
    }

    if (!nickname) {
      showWarnToast("닉네임을 입력해주세요.");
      return;
    }

    if (nickname.length < 2) {
      showWarnToast("닉네임을 2글자 이상 입력해주세요.");
      return;
    }

    if (isDuplicate) {
      showWarnToast("중복된 닉네임입니다.");
      return;
    }

    if (data.age === 0 || data.gender === undefined) {
      showWarnToast("올바른 주민등록번호를 입력해주세요.");
      return;
    }

    console.log(profile);

    if (profile.id === "" && profile.email === "") {
      if (!email) {
        showWarnToast("이메일을 입력해주세요.");
        return;
      }

      if (!isEmailValid) {
        showWarnToast("올바른 이메일 형식이 아닙니다.");
        return;
      }

      if (isEmailDuplicate) {
        showWarnToast("중복된 이메일입니다.");
        return;
      }

      if (!isPwValid) {
        showWarnToast(
          "비밀번호는 6자 이상, 영문과 숫자, 특수문자를 포함해야 합니다."
        );
        return;
      }

      if (pw !== pwConfirm) {
        showWarnToast("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    navigate("/auth/signup/solo/2");
  };

  const getUserData = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const { user } = session;
      setProfile({ id: user.id, email: user.user_metadata.email });
      setId(user.id);
    }
  }, [setId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <>
      <div className="flex w-full h-full flex-col justify-center">
        <BackButton className="ml-20" />

        <div className="flex flex-col items-center">
          <p className="text-[36px] cursor-default mb-9">
            Welcome to SomePick!
          </p>

          <form onSubmit={handleNext} className="w-[600px] h-[770px]">
            <div
              className={twMerge(
                "flex gap-12 justify-center items-center mb-6",
                profile.id && "mb-12"
              )}
            >
              <div className="flex flex-col justify-center items-center gap-3.5">
                <p>메인 이미지</p>
                <ProfileImgUpload type="main" />
              </div>

              <div className="flex flex-col justify-center items-center gap-3.5">
                <p>서브 이미지</p>
                <ProfileImgUpload type="sub" />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="relative">
                <SignupInput
                  label="닉네임"
                  type="text"
                  name="userName"
                  value={nickname}
                  onChange={(e) => {
                    updateData({ nickname: e.target.value });
                    setIsNicknameTouched(true);
                  }}
                  className="w-[290px]"
                  isError={
                    isNicknameTouched && (nickname.length < 2 || isDuplicate)
                  }
                  errorMessage={
                    !isNicknameTouched
                      ? ""
                      : nickname.length < 2
                      ? "(2글자 이상 작성해주세요.)"
                      : isDuplicate
                      ? "(중복된 닉네임입니다.)"
                      : ""
                  }
                />
                {isNicknameTouched && (
                  <>
                    {isDuplicate === false && nickname.length >= 2 && (
                      <div className="absolute left-18 top-1">
                        <Icon
                          width="16px"
                          height="12px"
                          left="-929px"
                          top="-762px"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>

              <InputBirthDate className="w-[290px]" />
            </div>
            <div className={twMerge("relative", profile.id && "hidden")}>
              <SignupInput
                label="이메일"
                type="email"
                name="email"
                placeholder="user@email.com"
                value={email}
                onChange={(e) => {
                  handleEmailChange(e);
                  setIsEmailTouched(true);
                }}
                isError={
                  (isEmailTouched && !isEmailValid) ||
                  (isEmailTouched && isEmailDuplicate)
                }
                errorMessage={
                  isEmailTouched && !isEmailValid
                    ? "(올바른 이메일 형식이 아닙니다.)"
                    : isEmailTouched && isEmailDuplicate
                    ? "(중복된 이메일입니다.)"
                    : ""
                }
              />
              {isEmailTouched && (
                <div className="absolute left-17.5 top-1">
                  {isEmailValid && !isEmailDuplicate && (
                    <Icon
                      width="16px"
                      height="12px"
                      left="-929px"
                      top="-762px"
                    />
                  )}
                </div>
              )}
            </div>
            <SignupInput
              label="비밀번호"
              type="password"
              name="password"
              value={pw}
              onChange={(e) => {
                handlePwChange(e);
                setIsPwTouched(true);
              }}
              isError={isPwTouched && !isPwValid}
              errorMessage={
                isPwTouched && !isPwValid
                  ? "(6자 이상, 영문·숫자·특수문자를 포함해야 합니다.)"
                  : ""
              }
              className={profile.id && "hidden"}
            />
            <SignupInput
              label="비밀번호 확인"
              type="password"
              name="confirmPw"
              value={pwConfirm}
              onChange={(e) => {
                handlePwConfirmChange(e);
                setIsPwConfirmTouched(true);
              }}
              isError={isPwConfirmTouched && !isPwConfirmValid}
              errorMessage={
                isPwConfirmTouched && !isPwConfirmValid
                  ? "(비밀번호가 일치하지 않습니다.)"
                  : ""
              }
              className={profile.id && "hidden"}
            />

            <Button
              type="submit"
              className="mt-9 w-full h-12.5 rounded-full dark:text-[var(--dark-black)]"
            >
              다음
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
