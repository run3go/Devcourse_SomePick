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
        backGround="linear-gradient(to bottom right, #1a1a1a, #333333)"
      />
    </>
  );
}
