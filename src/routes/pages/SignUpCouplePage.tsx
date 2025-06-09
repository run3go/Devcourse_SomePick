import BackButton from "../../components/common/BackButton";
import DefaultButton from "../../components/common/DefaultButton";
import ProfileImgUpload from "../../components/signup/ProfileImgUpload";
import SignupInput from "../../components/signup/SignupInput";

export default function SignUpCouplePage() {
  return (
    <>
      <div className="flex h-full flex-col justify-center items-center">
        <p className="text-[36px] font-medium cursor-default mb-9">
          Welcome to SomePick!
        </p>

        <div className="w-[490px]">
          <BackButton className="mb-10" />

          <div className="flex gap-6 items-center mb-6">
            <ProfileImgUpload />

            <div className="w-76">
              <SignupInput label="닉네임" type="text" name="userName" />
              <SignupInput label="생년월일" type="number" name="birthDate" />
            </div>
          </div>

          <SignupInput label="이메일" type="email" name="email" />
          <SignupInput label="비밀번호" type="password" name="password" />
          <SignupInput label="비밀번호 확인" type="password" name="confirmPw" />
          <SignupInput
            label="내 연인의 이메일 (선택)"
            type="email"
            name="loverEmail"
          />

          <DefaultButton text="가입 완료" />
        </div>
      </div>
    </>
  );
}
