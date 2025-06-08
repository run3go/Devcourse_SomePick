import BackButton from "../../components/common/BackButton";
import DefaultButton from "../../components/common/DefaultButton";
import SelectBox from "../../components/signup/SelectBox";
import SignupInput from "../../components/signup/SignupInput";
import SignupSteps from "../../components/signup/SignupSteps";
import TagGroup from "../../components/signup/TagGroup";

export default function SignUpSoloStep2Page() {
  return (
    <>
      <div className="relative h-screen">
        <BackButton className="absolute left-65 top-32.5" />
        <p className="absolute left-171 top-20">Step3</p>

        <div className="flex w-full h-full flex-col justify-center items-center">
          <p className="text-[36px] font-medium cursor-default mb-9">
            Welcome to SomePick!
          </p>

          <SignupSteps totalSteps={3} currentStep={3} className="mb-10" />

          <div className="flex justify-center items-center mb-4 gap-19">
            <SelectBox type="job" />
            <SelectBox type="location" />
          </div>

          <div className="flex justify-center items-center mb-4 gap-19">
            <SignupInput
              label="키"
              type="number"
              name="height"
              className="w-[304px] mb-0"
            />
            <SelectBox type="mbti" />
          </div>

          <SignupInput
            label="한줄소개 (최대30자)"
            type="text"
            name="intro"
            className="w-[688px]"
          />

          <div className="flex gap-15">
            <TagGroup title="나를 표현하는 키워드" tagName="personality" />
            <TagGroup title="나의 관심사" tagName="interest" />
            <TagGroup title="나의 이상형" tagName="personality" />
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
