import { useNavigate } from "react-router";
import Icon from "./Icon";

export default function BackButton({ className }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${className}`}>
        <button
          className="flex justify-center items-center gap-1.5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <Icon width="12px" height="10px" left="-277px" top="-765px" />
          Back
        </button>
      </div>
    </>
  );
}
