import { useNavigate } from "react-router";
import { signupUser } from "../../../apis/auth";
import { updateProfile } from "../../../apis/user";
import { storeImage } from "../../../apis/util";
import BackButton from "../../../components/common/BackButton";
import Button from "../../../components/common/Button";
import { showWarnToast } from "../../../components/common/ShowToast";
import TagGroup from "../../../components/signup/TagGroup";
import { useSignUpStore } from "../../../stores/signUpStore";

export default function SignUpSoloStep3Page() {
  const navigate = useNavigate();
  const { data, email, pw, mainImgFile, subImgFile, resetData, id } =
    useSignUpStore();

  const soloData = data as SoloOptions;

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !soloData.keywords ||
      soloData.keywords.split(",").length < 4 ||
      !soloData.interests ||
      soloData.interests.split(",").length < 4 ||
      !soloData.ideal_types ||
      soloData.ideal_types.split(",").length < 4
    ) {
      showWarnToast("각 항목에서 최소 4개 이상 선택해주세요.");
      return;
    }

    const mainImgUrl =
      mainImgFile && (await storeImage(mainImgFile, "main_image"));

    const subImgUrl = subImgFile && (await storeImage(subImgFile, "sub_image"));

    const fullPayload = {
      ...data,
      ...(mainImgUrl ? { main_image: mainImgUrl } : {}),
      ...(subImgUrl ? { sub_image: subImgUrl } : {}),
    };
    if (id) {
      await updateProfile({
        ...fullPayload,
        ideal_types: soloData.ideal_types.split(","),
        keywords: soloData.keywords.split(","),
        interests: soloData.interests.split(","),
      });
    } else {
      await signupUser(email, pw, fullPayload);
    }
    navigate("/");
    resetData();
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
              className="mt-10 w-[490px] h-12.5 rounded-full dark:text-[var(--dark-black)]"
            >
              이제 소개팅 할 준비가 다 되었어요!
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
