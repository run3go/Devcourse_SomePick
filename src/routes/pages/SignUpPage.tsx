import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BackButton from "../../components/common/BackButton";
import { useSignUpStore } from "../../stores/signupStore";
import supabase from "../../utils/supabase";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { resetData } = useSignUpStore();

  const [hasProfile, setHasProfile] = useState(false);

  const getUserData = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setHasProfile(true);
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return (
    <>
      <div className="flex h-full flex-col justify-center">
        {hasProfile ? (
          <BackButton className="ml-20" type="google" />
        ) : (
          <BackButton className="ml-20" />
        )}

        <div className="flex flex-col items-center justify-center h-[861px]">
          <p className="text-[36px] cursor-default mb-9">
            Welcome to SomePick!
          </p>

          <div className="flex flex-col items-center">
            <div>
              <p className="text-[24px] font-medium mb-12">
                당신은 현재 커플인가요, 솔로인가요?
              </p>
            </div>

            <div
              className="text-[20px] mb-5 flex justify-center items-center w-74 h-19 bg-[var(--white)] border border-[var(--primary-pink-point)] rounded-[75px] hover:bg-[var(--primary-pink-tone)] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] hover:shadow-(color:--primary-pink-point) hover:border-0 cursor-pointer dark:bg-[var(--dark-primary-pink)] dark:text-[var(--dark-black)] dark:border-0"
              onClick={() => {
                // updateData({ status: "couple" });
                resetData("couple");
                navigate("couple");
              }}
            >
              커플
            </div>

            <div
              className="text-[20px] flex justify-center items-center w-74 h-19 bg-[var(--white)]  border border-[var(--primary-pink-point)] rounded-[75px] hover:bg-[var(--primary-pink-tone)] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] hover:shadow-(color:--primary-pink-point) hover:border-0 cursor-pointer dark:bg-[var(--dark-primary-pink)] dark:text-[var(--dark-black)] dark:border-0"
              onClick={() => {
                // updateData({ status: "solo" });
                resetData("solo");
                navigate("solo/1");
              }}
            >
              솔로
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
