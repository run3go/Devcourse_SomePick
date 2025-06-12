import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";
import ProfileImgUpload from "../../components/signup/ProfileImgUpload";
import SignupInput from "../../components/signup/SignupInput";
import Button from "../../components/common/Button";
import { useState } from "react";
import { useSignUpStore } from "../../stores/signupStore";
import useCheckNickname from "../../hooks/useCheckNickname";
import Icon from "../../components/common/Icon";
import InputBirthDate from "../../components/signup/InputBirthDate";
import useSignupValidation from "../../hooks/useSignupValidation";
import { storeImage } from "../../apis/util";

export default function SignUpSoloStep1Page() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const { mainImgFile, subImgFile, data, updateData, setEmail, setPw } =
    useSignUpStore();

  const { isDuplicate } = useCheckNickname(nickname);

  const {
    email,
    pw,
    pwConfirm,
    isEmailValid,
    isPwValid,
    isPwConfirmValid,
    handleEmailChange,
    handlePwChange,
    handlePwConfirmChange,
  } = useSignupValidation();

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!mainImgFile || !subImgFile) {
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

    if (!isPwValid) {
      alert("비밀번호는 6자 이상, 영문과 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    if (pw !== pwConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const mainImgUrl =
      mainImgFile && (await storeImage(mainImgFile, "main_image"));

    const subImgUrl =
      subImgFile && (await storeImage(subImgFile, "main_image"));

    const fullPayload = {
      ...data,
      nickname,
      ...(mainImgUrl ? { main_image: mainImgUrl } : {}),
      ...(subImgUrl ? { sub_image: subImgUrl } : {}),
    };

    setEmail(email);
    setPw(pw);
    updateData(fullPayload);

    navigate("/auth/signup/solo/2");
  };

  return (
    <>
      <div className="flex w-full h-full flex-col justify-center">
        <BackButton className="ml-20" />

        <div className="flex flex-col items-center">
          <p className="text-[36px] cursor-default mb-9">
            Welcome to SomePick!
          </p>

          <form onSubmit={handleNext} className="w-[490px] h-[770px]">
            <div className="flex gap-12 justify-center items-center mb-6">
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
                    setNickname(e.target.value);
                    setIsTouched(true);
                  }}
                  className="w-[223px]"
                  isError={isDuplicate}
                />
                {isTouched && (
                  <div className="absolute right-5 top-1.5">
                    {isDuplicate === true && (
                      <Icon
                        width="18px"
                        height="18px"
                        left="-888px"
                        top="-759px"
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

              <InputBirthDate className="w-[233px]" />
              {/* <SignupInput
                label="주민등록번호"
                type="number"
                name="birthDate"
                className="w-[223px]"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              /> */}
            </div>
            <SignupInput
              label="이메일"
              type="email"
              name="email"
              placeholder="user@email.com"
              value={email}
              onChange={handleEmailChange}
              isError={!isEmailValid}
              // className={`${isEmailValid ? "" : "border-[var(--red)]"}`}
            />
            <SignupInput
              label="비밀번호"
              type="password"
              name="password"
              value={pw}
              onChange={handlePwChange}
              isError={!isPwValid}
              // className={`${isPwValid ? "" : "border-[var(--red)]"}`}
            />
            <SignupInput
              label="비밀번호 확인"
              type="password"
              name="confirmPw"
              value={pwConfirm}
              onChange={handlePwConfirmChange}
              isError={!isPwConfirmValid}
              // className={`${isPwConfirmValid ? "" : "border-[var(--red)]"}`}
            />

            <Button type="submit" className="mt-9 w-full h-12.5 rounded-full">
              다음
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
