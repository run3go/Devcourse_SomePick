import BackButton from "../../components/common/BackButton";
import Button from "../../components/common/Button";
import TagGroup from "../../components/signup/TagGroup";

export default function SignUpSoloStep2Page() {
  return (
    <>
      <div className="flex w-full h-full flex-col justify-center items-center">
        <p className="text-[36px] font-medium cursor-default mb-2.5">
          Welcome to SomePick!
        </p>

        <BackButton className="mb-10 w-[712px]" />

        <div className="flex flex-col gap-10 justify-center">
          <TagGroup title="나를 표현하는 키워드" tagName="personality" />
          <TagGroup title="나의 관심사" tagName="interest" />
          <TagGroup title="나의 이상형" tagName="personality" />
        </div>

        <Button className="mt-10 w-[490px] h-12.5 rounded-full">
          이제 소개팅 할 준비가 다 되었어요!
        </Button>
      </div>
    </>
  );
}
