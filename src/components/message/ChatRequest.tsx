import { useNavigate } from "react-router";
import Profile from "../../assets/images/profile_image.png";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ChatCard from "./ChatCard";
export default function ChatRequest() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-[783px] h-[818px] box-shadow-custom rounded-2xl flex items-center justify-center bg-[var(--primary-pink)]/29">
          <div className="w-[691px] h-[720px] border-[3px] rounded-2xl border-[var(--primary-pink)] bg-white px-[62px] py-9">
            <div className="flex flex-col items-center gap-2.5">
              <Icon width="63px" height="55px" left="-155px" top="-1054px" />
              <div className="flex flex-col items-center font-semibold gap-3">
                <span>설렘도착</span>
                <span>
                  <span className="text-[var(--primary-pink-point)]">
                    차은우
                  </span>
                  님이 하트를 보냈어요!
                </span>
              </div>
            </div>
            <ChatCard
              profileImg={Profile}
              name="차은우"
              age="만 27세"
              message="안녕하세요 잘부탁드립니다 반갑습니다"
              items={["180cm", "서울", "트레이너", "ISTP"]}
            />
            <div className="flex flex-col items-center gap-6">
              <span>차은우님과 연결하시겠습니까?</span>
              <div className="flex gap-[67px]">
                <Button
                  className="w-[157px] h-[51px]"
                  onClick={() => navigate("/message/:id")}
                >
                  연결할래요
                </Button>
                <Button
                  className="w-[157px] h-[51px] bg-[var(--gray-300)] hover:bg-[var(--gray-500)]/70"
                  onClick={() => navigate("/message")}
                >
                  다음에요
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
