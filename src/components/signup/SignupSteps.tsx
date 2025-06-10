interface StepProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export default function SignupSteps({
  totalSteps,
  currentStep,
  className,
}: StepProps) {
  if (totalSteps === 2) {
    return (
      <>
        <div className={`relative flex justify-center ${className}`}>
          <p className="absolute top-[-24px] left-[50%] translate-x-[-50%] text-sm text-gray-500">
            Step2
          </p>

          <div className={`flex gap-2.5 items-center`}>
            <div className="size-5 bg-[var(--gray-300)] rounded-full" />
            <hr className="w-[70px] border-[var(--gray-500)]" />
            <div
              className={`size-5  rounded-full ${
                currentStep === 2
                  ? "bg-[var(--primary-pink)]"
                  : "bg-[var(--gray-300)]"
              }`}
            />
          </div>
        </div>
      </>
    );
  } else if (totalSteps === 3) {
    return (
      <>
        <div className={`flex gap-2.5 items-center ${className}`}>
          <div className="size-5 bg-[var(--gray-300)] rounded-full" />
          <hr className="w-[70px] border-[var(--gray-500)]" />
          <div
            className={`size-5  rounded-full ${
              currentStep === 2
                ? "bg-[var(--primary-pink)]"
                : "bg-[var(--gray-300)]"
            }`}
          />
          <hr className="w-[70px] border-[var(--gray-500)]" />
          <div
            className={`size-5  rounded-full ${
              currentStep === 3
                ? "bg-[var(--primary-pink)]"
                : "bg-[var(--gray-300)]"
            }`}
          />
        </div>
      </>
    );
  } else return;
}
