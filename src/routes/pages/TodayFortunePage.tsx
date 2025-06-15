import { useEffect, useState } from "react";
import FortuneCards from "../../components/fortune/FortuneCards";
import FortuneInfo from "../../components/fortune/FortuneInfo";
import { useAuthStore } from "../../stores/authstore";
import { GoogleGenAI } from "@google/genai";

interface FortuneData {
  date: string | null;
  userName: string | null;
  status: string | null;
  loveTitle: string | null;
  loveDescription: string | null;
  loveAdvice: string;
}

export default function TodayFortunePage() {
  const user = useAuthStore((state) => state.session?.user.user_metadata);
  const userName = user?.nickname;
  const isCouple = user?.status;

  const [fortuneData, setFortuneData] = useState<FortuneData | null>(null);
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function main() {
      try {
        const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

        const ai = new GoogleGenAI({ apiKey: apiKey });
        const promptText = `${userName}님의 ${
          isCouple ? "커플" : "솔로"
        } 오늘의 연애운, 애정운을 생성해주세요.
  
        다음 JSON 형식으로 반환해주세요:
        {
          "date": "${new Date().getFullYear()}년 ${
          new Date().getMonth() + 1
        }월 ${new Date().getDate()}일",
          "userName": "${userName}",
          "status": "${isCouple ? "couple" : "solo"}",
          "loveTitle": "운세 제목",
          "loveDescription": "오늘의 연애운 상세 설명",
          "loveAdvice": "연애 조언",
        }`;
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash-001",
          contents: promptText,
        });

        const responseText = response.text;

        if (!responseText) {
          // setIsLoading(false)
          return null;
        }

        console.log("AI 응답:", responseText);
        console.log(
          `${new Date().getFullYear()}년 ${
            new Date().getMonth() + 1
          }월 ${new Date().getDate()}일`
        );
        const jsonResponseText = responseText
          .replace("```json", "")
          .replace("```", "")
          .trim();
        const finalData = JSON.parse(jsonResponseText);
        setFortuneData(finalData);
        // setIsLoading(false)
      } catch (error) {
        console.error("API 호출 에러:", error);
        // setIsLoading(false)
      }
    }

    main();
  }, []);

  return (
    <>
      <FortuneInfo />
      <FortuneCards fortuneData={fortuneData} />
    </>
  );
}
