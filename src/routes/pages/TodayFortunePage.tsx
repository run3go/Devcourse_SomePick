import { GoogleGenAI } from "@google/genai";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { updateFortuneTelling } from "../../apis/fortuneTelling";
import { fetchProfile } from "../../apis/user";
import FortuneCards from "../../components/fortune/FortuneCards";
import FortuneInfo from "../../components/fortune/FortuneInfo";
import { useAuthStore } from "../../stores/authStore";
interface FortuneData {
  userName?: string | null;
  status?: string | null;
  love_title: string | null;
  love_description: string | null;
  love_advice: string;
  created_at?: string;
  id?: string;
  used_at: string;
}

export default function TodayFortunePage() {
  const user = useAuthStore((state) => state.session?.user);
  const userName = user?.user_metadata.nickname;
  const isCouple = user?.user_metadata.status;
  const userId = user?.id;

  const [fortuneData, setFortuneData] = useState<FortuneData | null>(null);
  // const [isLoading, setIsLoading] = useState(true)

  const [isTodayChecked, setIsTodayChecked] = useState(false);
  // const [flippedCard, setFlippedCard] = useState<number|null>(null)

  useEffect(() => {
    async function main() {
      try {
        if (!userId) return;
        const profile = await fetchProfile(userId);
        console.log(profile);
        const fortune = profile?.fortuneData;
        const today = format(new Date(), "yyyy-MM-dd");
        const usedAt = fortune?.used_at
          ? format(new Date(fortune.used_at), "yyyy-MM-dd")
          : null;

        if (fortune && usedAt === today) {
          setFortuneData(fortune);
          setIsTodayChecked(true);

          // setFlippedCard(fortune.)
          return;
        }

        const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

        const ai = new GoogleGenAI({ apiKey: apiKey });
        const promptText = `${userName}님의 ${
          isCouple ? "커플" : "솔로"
        } 오늘의 연애운, 애정운을 생성해주세요.
        다음 JSON 형식으로 반환해주세요:
        {
          "status": "${isCouple ? "couple" : "solo"}",
          "love_title": "운세 제목",
          "love_description": "오늘의 연애운 상세 설명",
          "love_advice": "연애 조언",
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
        const jsonResponseText = responseText
          .replace("```json", "")
          .replace("```", "")
          .trim();
        const finalData = JSON.parse(jsonResponseText);
        console.log(finalData);

        await updateFortuneTelling(
          finalData.love_title,
          finalData.love_advice,
          finalData.love_description
        );
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
      <FortuneInfo isTodayChecked={isTodayChecked} />
      <FortuneCards fortuneData={fortuneData} isTodayChecked={isTodayChecked} />
    </>
  );
}
