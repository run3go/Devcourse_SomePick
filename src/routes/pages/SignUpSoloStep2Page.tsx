import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import SelectBox from "../../components/signup/SelectBox";
import SignupInput from "../../components/signup/SignupInput";
import { useState } from "react";
import { useSignUpStore } from "../../stores/signupStore";
// import TagGroup from "../../components/signup/TagGroup";

export default function SignUpSoloStep2Page() {
  const navigate = useNavigate();

  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [height, setHeight] = useState("");
  const [mbti, setMbti] = useState("");
  const [intro, setIntro] = useState("");

  const [isTouched, setIsTouched] = useState(false);

  const heightNum = parseInt(height);
  const isValidHeight =
    !isNaN(heightNum) && heightNum >= 130 && heightNum <= 299;

  const { updateData } = useSignUpStore();

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!job) {
      alert("직업을 선택해주세요.");
      return;
    }

    if (!location) {
      alert("지역을 선택해주세요.");
      return;
    }

    if (!height) {
      alert("키를 입력해주세요");
    } else if (height && !isValidHeight) {
      alert("정확한 키를 입력해주세요.");
    }

    if (!mbti) {
      alert("MBTI를 선택해주세요.");
      return;
    }

    const fullPayload = {
      job,
      height: heightNum,
      location,
      mbti,
      ...(intro ? { description: intro } : {}),
    };

    updateData(fullPayload);

    navigate("/auth/signup/solo/3");
  };

  return (
    <>
      <div className="flex w-full h-full flex-col justify-center">
        <BackButton className="ml-20 mb-2" />
        <div className="flex flex-col items-center">
          <p className="text-[36px] cursor-default mb-7">
            Welcome to SomePick!
          </p>

          <form
            onSubmit={handleNext}
            className="w-[490px] h-[770px] flex flex-col justify-center"
          >
            <div className="flex justify-between mb-10">
              <SelectBox type="job" value={job} onChange={setJob} />
              <SelectBox
                type="location"
                value={location}
                onChange={setLocation}
              />
            </div>

            <div className="flex justify-between mb-10">
              <SignupInput
                label="키"
                type="text"
                name="height"
                className="w-[220px] mb-0"
                value={height}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) setHeight(value);
                  setIsTouched(true);
                }}
                isError={isTouched && !isValidHeight}
              />
              <SelectBox type="mbti" value={mbti} onChange={setMbti} />
            </div>

            <SignupInput
              label="한줄소개 (최대30자)"
              type="text"
              name="intro"
              placeholder="첫인상을 결정짓는 한 문장!"
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
            />

            <Button
              type="submit"
              className="mt-20 w-[490px] h-12.5 rounded-full"
            >
              다음
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
