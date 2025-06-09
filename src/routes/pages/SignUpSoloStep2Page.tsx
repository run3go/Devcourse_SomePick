import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import SelectBox from "../../components/signup/SelectBox";
import SignupInput from "../../components/signup/SignupInput";
// import TagGroup from "../../components/signup/TagGroup";

export default function SignUpSoloStep2Page() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex w-full h-full flex-col justify-center items-center">
        <p className="text-[36px] cursor-default mb-9">Welcome to SomePick!</p>

        <BackButton className="mb-7 w-[490px]" />

        <div className="w-[490px] h-[646px] flex flex-col justify-center">
          <div className="flex justify-between mb-10">
            <SelectBox type="job" />
            <SelectBox type="location" />
          </div>

          <div className="flex justify-between mb-10">
            <SignupInput
              label="키"
              type="number"
              name="height"
              className="w-[220px] mb-0"
            />
            <SelectBox type="mbti" />
          </div>

          <SignupInput
            label="한줄소개 (최대30자)"
            type="text"
            name="intro"
            placeholder="첫인상을 결정짓는 한 문장!"
          />
        </div>
        <Button
          className="mt-9 w-[490px] h-12.5 rounded-full"
          onClick={() => navigate("/auth/signup/solo/3")}
        >
          다음
        </Button>
      </div>
    </>
  );
}
