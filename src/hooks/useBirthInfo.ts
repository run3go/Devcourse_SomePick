import { useEffect, useState } from "react";
import { useSignUpStore } from "../stores/signUpStore";

export default function useBirthInfo() {
  const { updateData, birthDate, setBirthDate, genderNum, setGenderNum } =
    useSignUpStore();

  const [isValid, setIsValid] = useState(true);

  // useEffect(() => {
  //   if (!["1", "2", "3", "4"].includes(genderNum)) {
  //     // 에러메세지
  //     setIsValid(false);
  //     return;
  //   }

  //   setIsValid(true);

  //   const gender = ["2", "4"].includes(genderNum) ? "female" : "male";
  //   updateData({ gender });
  // }, [genderNum, updateData]);

  useEffect(() => {
    let valid = true;

    // 성별 유효성 검사
    if (!["1", "2", "3", "4"].includes(genderNum)) {
      valid = false;
    } else {
      const gender = ["2", "4"].includes(genderNum) ? "female" : "male";
      updateData({ gender });
    }

    // 생년월일 유효성 검사
    if (birthDate.length !== 6 || !/^\d{6}$/.test(birthDate)) {
      // setIsValid(false);
      valid = false;
      // return;
    } else {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      const currentDate = now.getDate();

      const year = parseInt(birthDate.slice(0, 2), 10);
      const month = parseInt(birthDate.slice(2, 4), 10);
      const date = parseInt(birthDate.slice(4, 6), 10);

      if (month < 1 || month > 12 || date < 1 || date > 31) {
        // setIsValid(false);
        // return;
        valid = false;
      } else {
        const birthYear = (["1", "2"].includes(genderNum) ? 1900 : 2000) + year;
        let ageNum = currentYear - birthYear;

        if (
          currentMonth < month ||
          (currentMonth === month && currentDate < date)
        ) {
          ageNum--;
        }

        updateData({ age: ageNum });
      }
    }

    setIsValid(valid);
  }, [birthDate, genderNum, updateData]);

  return {
    birthDate,
    genderNum,
    isValid,
    setBirthDate,
    setGenderNum,
  };
}
