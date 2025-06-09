import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";

export default function SignUpPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative h-screen">
        <p className="absolute text-[36px] cursor-default left-1/2 transform -translate-x-1/2 top-24">
          Welcome to SomePick!
        </p>

        <div className="flex h-full flex-col justify-center items-center">
          <div>
            <BackButton className="mb-10" />
            <p className="text-[24px] font-medium mb-12">
              당신은 현재 커플인가요, 솔로인가요?
            </p>
          </div>

          <div
            className="text-[20px] mb-5 flex justify-center items-center w-74 h-19 bg-[var(--white)] border border-[var(--primary-pink-point)] rounded-[75px] hover:bg-[var(--primary-pink-tone)] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] hover:shadow-(color:--primary-pink-point) hover:border-0 cursor-pointer"
            onClick={() => navigate("couple")}
          >
            커플
          </div>

          <div
            className="text-[20px] flex justify-center items-center w-74 h-19 bg-[var(--white)] border border-[var(--primary-pink-point)] rounded-[75px] hover:bg-[var(--primary-pink-tone)] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] hover:shadow-(color:--primary-pink-point) hover:border-0 cursor-pointer"
            onClick={() => navigate("solo/1")}
          >
            솔로
          </div>
        </div>
      </div>
    </>
  );
}
