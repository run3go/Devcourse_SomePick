import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";
import DefaultButton from "../../components/common/DefaultButton";
import ProfileImgUpload from "../../components/signup/ProfileImgUpload";
import SignupInput from "../../components/signup/signupInput";
import SignupSteps from "../../components/signup/SignupSteps";

export default function SignUpSoloStep1Page() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative h-screen">
        <BackButton className="absolute left-87 top-40" />
        <p className="absolute left-144 top-26">Step2</p>

        <div className="flex w-full h-full flex-col justify-center items-center">
          <p className="text-[36px] font-medium cursor-default mb-9">
            Welcome to SomePick!
          </p>

          <SignupSteps totalSteps={3} currentStep={2} className="mb-10" />

          <div className="w-[490px]">
            <div className="flex gap-12 justify-center items-center mb-6">
              <div className="flex flex-col justify-center items-center gap-3.5">
                <p>메인 이미지</p>
                <ProfileImgUpload />
              </div>

              <div className="flex flex-col justify-center items-center gap-3.5">
                <p>서브 이미지</p>
                <ProfileImgUpload />
              </div>
            </div>

            <div className="flex gap-10">
              <SignupInput label="닉네임" type="text" name="userName" />
              <SignupInput label="생년월일" type="number" name="birthDate" />
            </div>
            <SignupInput label="이메일" type="email" name="email" />
            <SignupInput label="비밀번호" type="password" name="password" />
            <SignupInput
              label="비밀번호 확인"
              type="password"
              name="confirmPw"
            />

            <DefaultButton text="다음" className="w-full" onClick={() => navigate("solo/2")}/>
          </div>
        </div>
      </div>
    </>
  );
}
