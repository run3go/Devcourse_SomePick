import { useNavigate } from "react-router";
import Icon from "./Icon";
import { useSignUpStore } from "../../stores/signupStore";

export default function BackButton({
  className,
  type,
}: {
  className?: string;
  type?: string;
}) {
  const navigate = useNavigate();
  const { data, resetData, updateData } = useSignUpStore();
  const soloData = data as SoloOptions;

  const handleButtonClick = () => {
    if (type && type === "solo3") {
      updateData({
        keywords: "",
        interests: "",
        ideal_types: "",
        job: "",
        height: 0,
        location: "",
        mbti: "",
        ...(soloData.description ? { description: "" } : {}),
      });
    }

    if (!type) {
      resetData();
    }

    navigate(-1);
  };

  return (
    <>
      <div className={`${className}`}>
        <button
          className="flex justify-center items-center gap-1.5 cursor-pointer"
          onClick={handleButtonClick}
        >
          <Icon width="12px" height="10px" left="-277px" top="-765px" />
          Back
        </button>
      </div>
    </>
  );
}
