import { useParams } from "react-router";
import ChatWaiting from "../../components/message/ChatWaiting";

export default function ChatWaitingPage() {
  const { id } = useParams();

  return (
    <>
      <ChatWaiting userId={id} />
    </>
  );
}
