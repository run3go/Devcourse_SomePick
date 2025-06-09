import BackButton from "../../components/common/BackButton";
import DefaultButton from "../../components/common/DefaultButton";
import SelectBox from "../../components/signup/SelectBox";
import SignupInput from "../../components/signup/SignupInput";
import TagGroup from "../../components/signup/TagGroup";

export default function SignUpSoloStep2Page() {
  return (
    <>
      <div className="flex w-full h-full flex-col justify-center items-center">
        <p className="text-[36px] font-medium cursor-default mb-9">
          Welcome to SomePick!
        </p>

        <div className="w-[490px]">
          <BackButton className="mb-7" />
        </div>

        <div className="flex flex-row gap-10 mb-5">
          {/* <div className="flex justify-center items-center mb-4 gap-19"> */}
          <SelectBox type="job" />
          <SelectBox type="location" />
          {/* </div> */}

          {/* <div className="flex justify-center items-center mb-4 gap-19"> */}
          <SignupInput
            label="키"
            type="number"
            name="height"
            className="w-[150px] mb-0"
          />
          <SelectBox type="mbti" />
          {/* </div> */}
        </div>

        <SignupInput
          label="한줄소개 (최대30자)"
          type="text"
          name="intro"
          className="w-[696px]"
        />

        <div className="flex gap-15 mt-5">
          <TagGroup title="나를 표현하는 키워드" tagName="personality" />
          <TagGroup title="나의 관심사" tagName="interest" />
          <TagGroup title="나의 이상형" tagName="personality" />
        </div>

        <DefaultButton
          text="이제 소개팅 할 준비가 다 되었어요!"
          className="w-[490px]"
        />
      </div>
    </>
  );
}
