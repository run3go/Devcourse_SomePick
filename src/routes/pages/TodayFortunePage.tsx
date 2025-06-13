import { useEffect } from "react";
import FortuneCards from "../../components/fortune/FortuneCards";
import FortuneInfo from "../../components/fortune/FortuneInfo";
import ShareButton from "../../components/fortune/ShareButton";
import { useAuthStore } from "../../stores/authstore";
import { GoogleGenAI } from "@google/genai";

export default function TodayFortunePage() {
  const user = useAuthStore((state) => state.session?.user.user_metadata);
  const userName = user?.nickname;
  const isCouple = user?.status;

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
          "date": "${new Date().toISOString().split("T")[0]}",
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
          return null;
        }

        console.log("AI 응답:", responseText);
        const jsonResponseText = responseText
          .replace("```json", "")
          .replace("```", "")
          .trim();
        return JSON.parse(jsonResponseText);
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    }

    main();
  }, []);

  return (
    <>
      <FortuneInfo />
      <FortuneCards />
      <ShareButton />
    </>
  );
}
