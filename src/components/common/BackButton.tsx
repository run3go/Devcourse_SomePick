import { useNavigate } from "react-router";
import { logoutUser } from "../../apis/auth";
import { useAuthStore } from "../../stores/authStore";
import Icon from "./Icon";

export default function BackButton({
  className,
  type,
}: {
  className?: string;
  type?: string;
}) {
  const navigate = useNavigate();
  const { setLogout } = useAuthStore();

  const handleButtonClick = async () => {
    if (type == "google") {
      await logoutUser();
      setLogout();
      navigate("/auth/login");
      return;
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
