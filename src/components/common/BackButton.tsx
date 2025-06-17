import { useNavigate } from "react-router";
import { logoutUser } from "../../apis/auth";
import { useAuthStore } from "../../stores/authtore";
import Icon from "./Icon";
// import { useSignUpStore } from "../../stores/signUpStore";

export default function BackButton({
  className,
  type,
}: {
  className?: string;
  type?: string;
}) {
  const navigate = useNavigate();
  const { setLogout } = useAuthStore();
  // const { data, resetData, updateData } = useSignUpStore();
  // const soloData = data as SoloOptions;

  const handleButtonClick = async () => {
    if (type && type === "solo3") {
      // updateData({
      //   keywords: "",
      //   interests: "",
      //   ideal_types: "",
      //   job: "",
      //   height: 0,
      //   location: "",
      //   mbti: "",
      //   ...(soloData.description ? { description: "" } : {}),
      // });
    }

    if (type == "google") {
      await logoutUser();
      setLogout();
      navigate("/auth/login");
      return;
    }

    if (!type) {
      // resetData();
    }

    navigate(-1);
  };

  return (
    <>
      <div className={`${className}`}>
        <button
          className="flex justify-center items-center gap-1.5 cursor-pointer dark:text-[var(--dark-gray-700)]"
          onClick={handleButtonClick}
        >
          <Icon
            width="12px"
            height="10px"
            left="-277px"
            top="-765px"
            className="dark:hidden"
          />
          <Icon
            width="12px"
            height="10px"
            left="-277px"
            top="-790px"
            className="hidden dark:block"
          />
          Back
        </button>
      </div>
    </>
  );
}
