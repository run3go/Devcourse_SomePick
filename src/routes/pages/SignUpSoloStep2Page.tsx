import BackButton from "../../components/common/BackButton";
import DefaultButton from "../../components/common/DefaultButton";
import SignupInput from "../../components/signup/SignupInput";
import SignupSteps from "../../components/signup/SignupSteps";
import TagGroup from "../../components/signup/TagGroup";

export default function SignUpSoloStep2Page() {
  return (
    <>
      <div className="relative h-screen">
        <BackButton className="absolute left-65 top-32.5" />
        <p className="absolute left-171 top-23">Step3</p>

        <div className="flex w-full h-full flex-col justify-center items-center">
          <p className="text-[36px] font-medium cursor-default mb-9">
            Welcome to SomePick!
          </p>

          <SignupSteps totalSteps={3} currentStep={3} className="mb-10" />

          <div className="flex justify-center items-center mb-6 gap-19">
            <div className="flex flex-col justify-center">
              <p className="ml-1.5">직업</p>
              <div className="relative w-76 h-[50px]">
                <div className="absolute sprite-selectbox-icon right-4 top-1/2 transform -translate-y-1/2 z-100" />
                <div className="w-full h-full bg-[var(--white)] border border-[var(--primary-pink)] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="ml-1.5">사는 지역</p>
              <div className="relative w-76 h-[50px]">
                <div className="absolute sprite-selectbox-icon right-4 top-1/2 transform -translate-y-1/2 z-100" />
                <div className="w-full h-full bg-[var(--white)] border border-[var(--primary-pink)] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mb-6 gap-19">
            <div className="flex flex-col justify-center">
              <p className="ml-1.5">키</p>
              <div className="relative w-76 h-[50px]">
                <div className="absolute sprite-selectbox-icon right-4 top-1/2 transform -translate-y-1/2 z-100" />
                <div className="w-full h-full bg-[var(--white)] border border-[var(--primary-pink)] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="ml-1.5">MBTI</p>
              <div className="relative w-76 h-[50px]">
                <div className="absolute sprite-selectbox-icon right-4 top-1/2 transform -translate-y-1/2 z-100" />
                <div className="w-full h-full bg-[var(--white)] border border-[var(--primary-pink)] rounded-full"></div>
              </div>
            </div>
          </div>

          <SignupInput
            label="한줄소개(최대30자)"
            type="text"
            name="intro"
            className="w-[688px]"
          />

          <div className="flex gap-15">
            <TagGroup title="나를 표현하는 키워드" />
            <TagGroup title="나의 관심사" />
            <TagGroup title="나의 이상형" />
          </div>

          <DefaultButton
            text="이제 소개팅 할 준비가 다 되었어요!"
            className="w-[490px]"
          />
        </div>
      </div>
    </>
  );
}
