import { useState } from "react";
import useBirthInfo from "../../hooks/useBirthInfo";

export default function InputBirthDate({ className }: { className?: string }) {
  const { birthDate, genderNum, isValid, setBirthDate, setGenderNum } =
    useBirthInfo();

  const [isTouched, setIsTouched] = useState(false);

  return (
    <>
      <div className={className}>
        <div className="flex gap-1 ml-5 mb-1">
          <span>*주민등록번호</span>
          {isTouched && !isValid && (
            <p className="text-[var(--red)]">(입력값을 확인해주세요.)</p>
          )}
        </div>
        <div
          className={`flex pl-5 items-center border rounded-full h-[50px] dark:bg-[var(--dark-bg-secondary)] group focus-within:shadow-[0_0_10px_rgba(0,0,0,0.5)] focus-within:shadow-(color:--primary-pink-tone) ${
            isTouched
              ? isValid
                ? "border-[var(--primary-pink)]"
                : "border-[var(--red)] border-2"
              : "border-[var(--primary-pink)]"
          }`}
        >
          <input
            id="birthDate"
            type="text"
            maxLength={6}
            placeholder="YYMMDD"
            inputMode="numeric"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
              setIsTouched(true);
            }}
            className="w-[80px] pr-1 outline-none bg-transparent text-center
                      focus:border-none"
          />

          <span className="mx-1 text-xl">-</span>

          <input
            id="genderNum"
            type="text"
            maxLength={1}
            placeholder="•"
            inputMode="numeric"
            value={genderNum}
            onChange={(e) => {
              setGenderNum(e.target.value);
              setIsTouched(true);
            }}
            className="w-[25px] px-1 outline-none bg-transparent text-center
                     focus:border-none placeholder:text-xl"
          />

          <span className="text-xl cursor-default select-none">
            • • • • • •
          </span>
        </div>
      </div>
    </>
  );
}
