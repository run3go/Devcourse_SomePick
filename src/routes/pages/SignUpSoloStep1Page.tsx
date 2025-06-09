import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";
import ProfileImgUpload from "../../components/signup/ProfileImgUpload";
import SignupInput from "../../components/signup/SignupInput";
import Button from "../../components/common/Button";

export default function SignUpSoloStep1Page() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full h-full flex-col justify-center items-center">
        <p className="text-[36px] font-medium cursor-default mb-9">
          Welcome to SomePick!
        </p>

        <div className="w-[490px]">
          <BackButton className="mb-7" />

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

          <div className="flex justify-between items-end">
            <SignupInput
              label="닉네임"
              type="text"
              name="userName"
              className="w-[223px]"
            />
            <SignupInput
              label="생년월일"
              type="number"
              name="birthDate"
              className="w-[223px]"
            />
          </div>
          <SignupInput label="이메일" type="email" name="email" />
          <SignupInput label="비밀번호" type="password" name="password" />
          <SignupInput label="비밀번호 확인" type="password" name="confirmPw" />

          <Button
            className="mt-9 w-full h-12.5 rounded-full"
            onClick={() => navigate("/auth/signup/solo/2")}
          >
            다음
          </Button>
        </div>
      </div>
    </>
  );
}
