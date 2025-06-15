import Lottie from "lottie-react";
import { twMerge } from "tailwind-merge";
import loadingAnimation from "../../assets/images/loadingImage.json";
export default function LoadingPage() {
  return (
    <div className="realtive">
      <Lottie
        className={twMerge(
          "w-22 h-22 absolute top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
        animationData={loadingAnimation}
        loop={false}
      />
    </div>
  );
}
