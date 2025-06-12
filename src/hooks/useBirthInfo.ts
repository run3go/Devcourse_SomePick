import { useEffect, useState } from "react";
import { useSignUpStore } from "../stores/signupStore";

export default function useBirthInfo() {
  const { updateData } = useSignUpStore();

  const [birthDate, setBirthDate] = useState("");
  const [genderNum, setGenderNum] = useState("");
  // const [gender, setGender] = useState("");

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!["1", "2", "3", "4"].includes(genderNum)) {
      // 에러메세지
      setIsValid(false);
      return;
    }

    setIsValid(true);

    const gender = ["2", "4"].includes(genderNum) ? "female" : "male";
    updateData({ gender });
  }, [genderNum, updateData]);

  useEffect(() => {
    if (birthDate.length !== 6 || !/^\d{6}$/.test(birthDate)) {
      setIsValid(false);
      return;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDate = now.getDate();

    const year = parseInt(birthDate.slice(0, 2), 10);
    const month = parseInt(birthDate.slice(2, 4), 10);
    const date = parseInt(birthDate.slice(4, 6), 10);

    if (month < 1 || month > 12 || date < 1 || date > 31) {
      setIsValid(false);
      return;
    }

    const birthYear = (["1", "2"].includes(genderNum) ? 1900 : 2000) + year;
    let ageNum = currentYear - birthYear;

    if (
      currentMonth < month ||
      (currentMonth === month && currentDate < date)
    ) {
      ageNum--;
    }

    updateData({ age: ageNum });
    setIsValid(true);
  }, [birthDate, genderNum, updateData]);

  return {
    birthDate,
    genderNum,
    isValid,
    setBirthDate,
    setGenderNum,
  };
}
