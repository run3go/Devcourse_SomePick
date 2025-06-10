import Profile from "../../assets/images/profile_image2.png";
import Button from "../common/Button";
import Icon from "../common/Icon";
import ChatCard from "./ChatCard";
export default function ChatWaiting() {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full mx-5 box-shadow-custom rounded-2xl flex items-center justify-center bg-[#FFC7ED]/29">
          <div className="w-[661px] h-[700px] border-[3px] rounded-2xl border-[#FFC7ED] bg-white px-[62px] py-9">
            <div className="flex flex-col items-center gap-2.5">
              <Icon width="63px" height="55px" left="-51px" top="-1054px" />
              <div className="flex flex-col items-center font-semibold gap-3">
                <span>설렘 전송중 ...</span>
                <span>
                  <span className="text-[#FF66B3]">고윤정</span>님께 하트를
                  보냈어요!
                </span>
              </div>
            </div>
            <ChatCard
              profileImg={Profile}
              name="고윤정"
              age="만 28세"
              message="안녕하세요 작부탁드립니다 반갑습니다"
              items={["168cm", "서울", "모델", "ISTP"]}
            />
            <div className="flex flex-col items-center gap-6">
              <Button className="w-[359px] h-[51px] bg-[#d9d9d9] cursor-auto hover:bg-[#d9d9d9]">
                아직 상대가 하트를 받지 않았어요!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
