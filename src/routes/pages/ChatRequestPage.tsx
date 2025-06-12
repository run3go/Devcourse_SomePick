import { useNavigate, useParams } from "react-router";
import ChatRequest from "../../components/message/ChatRequest";

export default function ChatRequestPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleAccept = () => {
    navigate(`/message/${id}/room`);
    console.log("userId:", id);
  };
  return (
    <>
      <ChatRequest onAccept={handleAccept} userId={id} />
    </>
  );
}
