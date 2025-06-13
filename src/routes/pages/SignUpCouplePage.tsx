import { useCallback, useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import ProfileImgUpload from "../../components/signup/ProfileImgUpload";
import SignupInput from "../../components/signup/SignupInput";
import useCheckNickname from "../../hooks/useCheckNickname";
import { useSignUpStore } from "../../stores/signupStore";
// import LoadingSpinner from "../../components/signup/LoadingSpinner";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { signupUser } from "../../apis/auth";
import { updateProfile } from "../../apis/user";
import { storeImage } from "../../apis/util";
import Icon from "../../components/common/Icon";
import InputBirthDate from "../../components/signup/InputBirthDate";
import useSignupValidation from "../../hooks/useSignupValidation";
import supabase from "../../utils/supabase";

export default function SignUpCouplePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ id: string; email: string }>({
    id: "",
    email: "",
  });
  const { data, mainImgFile, resetData, updateData, setId } = useSignUpStore();
  const coupleData = data as CoupleOptions;
  const { nickname, partner_nickname: partner } = coupleData;

  const [isTouched, setIsTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPwTouched, setIsPwTouched] = useState(false);

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

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainImgFile) {
      alert("이미지를 추가해주세요.");
      return;
    }
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (isDuplicate) {
      alert("중복된 닉네임입니다.");
      return;
    }

    if (data.age === 0 || data.gender === undefined) {
      alert("주민등록번호를 입력해주세요.");
      return;
    }
    const imgUrl = mainImgFile && (await storeImage(mainImgFile, "main_image"));
    const fullPayload: ProfileUpdatePayload = {
      main_image: imgUrl || "",
      nickname: data.nickname,
      age: data.age,
      gender: data.gender,
      status: data.status,
      partner_nickname: partner,
    };
    await updateProfile(fullPayload);
    navigate("/");
    resetData();
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mainImgFile) {
      alert("이미지를 추가해주세요.");
      return;
    }

    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    if (isDuplicate) {
      alert("중복된 닉네임입니다.");
      return;
    }

    if (data.age === 0 || data.gender === undefined) {
      alert("주민등록번호를 입력해주세요.");
      return;
    }

    if (!isEmailValid) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (isEmailDuplicate) {
      alert("중복된 이메일입니다.");
      return;
    }

    if (!isPwValid) {
      alert("비밀번호는 6자 이상, 영문과 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    if (pw !== pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const imgUrl = mainImgFile && (await storeImage(mainImgFile, "main_image"));

    const fullPayload = {
      ...data,
      ...(imgUrl ? { main_image: imgUrl } : {}),
    };

    console.log(fullPayload);

    await signupUser(email, pw, fullPayload);
    navigate("/");
    resetData();
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
      <div className="flex h-full flex-col justify-center ">
        <BackButton className="ml-20" />

        <div className="flex flex-col items-center">
          <p className="text-[36px] cursor-default mb-20">
            Welcome to SomePick!
          </p>

          <form
            onSubmit={profile.id ? handleUpdateProfile : handleSignUp}
            className="w-[490px] h-[727px]"
          >
            <div
              className={twMerge(
                "flex gap-6 items-center mb-6",
                profile && "mb-12"
              )}
            >
              <ProfileImgUpload type="main" />

              <div className="w-76">
                <div className="relative">
                  <SignupInput
                    label="닉네임"
                    type="text"
                    name="userName"
                    value={nickname}
                    onChange={(e) => {
                      updateData({ nickname: e.target.value });
                      setIsTouched(true);
                    }}
                    className="mb-5"
                    isError={isDuplicate}
                  />
                  {isTouched && (
                    <div className="absolute right-54 top-1">
                      {isDuplicate === true && (
                        <Icon
                          width="20px"
                          height="20px"
                          left="-889px"
                          top="-760px"
                        />
                      )}
                      {isDuplicate === false && (
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

                <InputBirthDate />
              </div>
            </div>

            <div className={twMerge("relative", profile && "hidden")}>
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
                // className={`${isEmailValid ? "" : "border-[var(--red)]"}`}
              />
              {isEmailTouched && (
                <div className="absolute left-17.5 top-1">
                  {isEmailDuplicate === true && (
                    <Icon
                      width="20px"
                      height="20px"
                      left="-889px"
                      top="-760px"
                    />
                  )}
                  {isEmailDuplicate === false && (
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
              className={twMerge(profile && "hidden")}
              // className={`${isPwValid ? "" : "border-[var(--red)]"}`}
            />
            <SignupInput
              label="비밀번호 확인"
              type="password"
              name="confirmPw"
              value={pwConfirm}
              onChange={handlePwConfirmChange}
              isError={!isPwConfirmValid}
              className={twMerge(profile && "hidden")}
              // className={`${isPwConfirmValid ? "" : "border-[var(--red)]"}`}
            />
            <SignupInput
              label="내 연인의 닉네임 (선택)"
              type="text"
              name="loverNickname"
              value={partner || ""}
              onChange={(e) => updateData({ partner_nickname: e.target.value })}
            />

            <Button type="submit" className="mt-9 w-full h-12.5 rounded-full">
              가입 완료
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
