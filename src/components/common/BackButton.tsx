import { useNavigate } from "react-router";

export default function BackButton({ className }: { className?: string }) {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${className}`}>
        <button
          className="flex justify-center items-center gap-1.5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <div className="sprite-back-icon" />
          Back
        </button>
      </div>
    </>
  );
}
