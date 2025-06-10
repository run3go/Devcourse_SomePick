import { Outlet } from "react-router";
import ChatList from "../../components/message/ChatList";
import Icon from "../../components/common/Icon";
import EmptyList from "../../components/message/EmptyList";

export default function MessagePage() {
  return (
    <>
      <div className="w-[1150px] h-full mx-auto gap-10 flex my-[5vh]">
        <div className="w-[370px] h-full px-9 py-8 box-shadow-custom rounded-2xl">
          <div>
            <div className="flex gap-[29px] justify-center items-">
              <div className="flex items-center gap-2 cursor-pointer">
                <Icon width="26px" height="22px" left="-362px" top="-881px" />
                <span className="text-[13px]">받은 하트 목록</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer rounded-2xl p-2 border border-transparent hover:border-[var(--primary-pink)]">
                <Icon width="21px" height="18px" left="-316px" top="-883px" />
                <div className="text-[11px]">보낸 하트 목록</div>
              </div>
            </div>
            <ChatList />
          </div>
          <div>
            <div>
              <div className="flex items-center mt-10 ml-2 gap-2">
                <Icon width="23px" height="23px" left="-409px" top="-880px" />
                <span className="text-[14px]">연결 중</span>
              </div>
            </div>
            <EmptyList message="아직 연결중인 사람이 없어요!" />
          </div>
        </div>
        <div className="w-[878px] h-[817px] py-5 box-shadow-custom rounded-2xl items-center justify-center flex">
          {/* <div className="flex flex-col items-center gap-6">
            <Icon width="50px" height="50px" left="-50px" top="-941px" />
            <span className="text-[#969696]">DM을 확인해보세요!</span>
          </div> */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
