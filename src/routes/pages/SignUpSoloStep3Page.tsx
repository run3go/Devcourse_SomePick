import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import TagGroup from "../../components/signup/TagGroup";
import { useSignUpStore } from "../../stores/signupStore";
import { signupUser } from "../../apis/auth";

export default function SignUpSoloStep3Page() {
  const navigate = useNavigate();
  const { data, email, pw } = useSignUpStore();

  function isSoloOptions(
    data: SoloOptions | CoupleOptions
  ): data is SoloOptions {
    return data.status === "solo";
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSoloOptions(data)) {
      if (
        !data.keywords ||
        data.keywords.length < 4 ||
        !data.interests ||
        data.interests.length < 4 ||
        !data.ideal_types ||
        data.ideal_types.length < 4
      ) {
        alert("각 항목에서 최소 4개 이상 선택해주세요.");
        return;
      }
    }

    console.log(data, email, pw);

    await signupUser(email, pw, data);
    navigate("/");
  };

  return (
    <>
      <div className="flex w-full h-full flex-col justify-center">
        <BackButton className="ml-20" type="solo3" />

        <div className="flex flex-col items-center">
          <p className="text-[36px] font-medium cursor-default mb-13">
            Welcome to SomePick!
          </p>

          <form
            onSubmit={handleSignup}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-10 justify-center">
              <TagGroup title="나를 표현하는 키워드" tagName="keywords" />
              <TagGroup title="나의 관심사" tagName="interests" />
              <TagGroup title="나의 이상형" tagName="ideal_types" />
            </div>

            <Button
              type="submit"
              className="mt-10 w-[490px] h-12.5 rounded-full"
            >
              이제 소개팅 할 준비가 다 되었어요!
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
