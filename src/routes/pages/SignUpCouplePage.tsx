import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import ProfileImgUpload from "../../components/signup/ProfileImgUpload";
import SignupInput from "../../components/signup/SignupInput";
import { useSignUpStore } from "../../stores/signupStore";
import useCheckNickname from "../../hooks/useCheckNickname";
// import LoadingSpinner from "../../components/signup/LoadingSpinner";
import Icon from "../../components/common/Icon";
import InputBirthDate from "../../components/signup/InputBirthDate";
import { signupUser } from "../../apis/auth";
import { useNavigate } from "react-router";
import useSignupValidation from "../../hooks/useSignupValidation";
import { storeImage } from "../../apis/util";

export default function SignUpCouplePage() {
  const navigate = useNavigate();
  const { data, updateData, imageFile, resetData } = useSignUpStore();

  const [nickname, setNickname] = useState("");
  const [partner, setPartner] = useState("");

  const [isTouched, setIsTouched] = useState(false);

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

  const handleSignUp = async () => {
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

    const imgUrl = imageFile && (await storeImage(imageFile, "main_image"));

    // updateData(updated);

    const fullPayload = {
      ...data,
      nickname,
      ...(imgUrl ? { main_image: imgUrl } : {}),
      ...(partner ? { partner_nickname: partner } : {}),
    };

    console.log(fullPayload);

    try {
      await signupUser(email, pw, fullPayload);
      navigate("/");
      resetData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col justify-center ">
        <BackButton className="ml-20 mb-5" type="couple" />

        <div className="flex flex-col items-center">
          <p className="text-[36px] cursor-default mb-9">
            Welcome to SomePick!
          </p>

          <div className="w-[490px]">
            <div className="flex gap-6 items-center mb-6">
              <ProfileImgUpload />

              <div className="w-76">
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
                    className={`mb-5 ${
                      isDuplicate ? "border-[var(--red)]" : ""
                    }`}
                  />
                  {isTouched && (
                    <div className="absolute right-5 top-1.5">
                      {/* {loading && <LoadingSpinner />} */}
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

            <SignupInput
              label="이메일"
              type="email"
              name="email"
              placeholder="user@email.com"
              value={email}
              onChange={handleEmailChange}
              className={`${isEmailValid ? "" : "border-[var(--red)]"}`}
            />
            <SignupInput
              label="비밀번호"
              type="password"
              name="password"
              value={pw}
              onChange={handlePwChange}
              className={`${isPwValid ? "" : "border-[var(--red)]"}`}
            />
            <SignupInput
              label="비밀번호 확인"
              type="password"
              name="confirmPw"
              value={pwConfirm}
              onChange={handlePwConfirmChange}
              className={`${isPwConfirmValid ? "" : "border-[var(--red)]"}`}
            />
            <SignupInput
              label="내 연인의 닉네임 (선택)"
              type="text"
              name="loverNickname"
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
            />

            <Button
              className="mt-9 w-full h-12.5 rounded-full"
              onClick={handleSignUp}
            >
              가입 완료
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
