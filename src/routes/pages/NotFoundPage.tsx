import { useNavigate } from "react-router";
import SomepickLanding from "../../components/main/SomepickLanding";
export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <SomepickLanding
        title="404"
        subtitle="페이지를 찾을 수 없어요!"
        button="홈으로 돌아가기"
        onClick={() => navigate("/")}
        className="bg-gradient-to-br from-[#1a1a1a] to-[#333333]"
      />
    </>
  );
}
