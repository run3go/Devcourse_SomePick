import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { checkNickname } from "../apis/auth";

export default function useCheckNickname(nickname: string) {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const debouncedNickname = useDebounce(nickname, 300);

  useEffect(() => {
    if (!debouncedNickname.trim()) {
      setIsDuplicate(false);
      return;
    }

    const check = async () => {
      try {
        const res = await checkNickname(debouncedNickname);
        if (typeof res === "boolean") setIsDuplicate(res);
      } catch (error) {
        console.error(error);
      }
    };

    check();
  }, [debouncedNickname]);

  return { isDuplicate };
}
