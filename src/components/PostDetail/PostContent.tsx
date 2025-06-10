import Icon from "../common/Icon";
import CommentForm from "./CommentForm";

export default function PostContent({ postImg }: { postImg: string }) {
  return (
    <>
      <section>
        <div className="rounded-2xl bg-white mb-[30px] p-[20px]">
          <div className="">
            <p className="whitespace-pre-line mb-[26px] text-[16px]">
              어제 드디어 첫 데이트 했어요!
              <br />
              처음엔 서로 엄청 어색했는데, 버블티 좋아한다는 얘기 나오자마자
              갑자기 대화 풀림ㅋㅋ
              <br />
              같이 산책하면서 이런저런 얘기했는데, 생각보다 너무 잘 맞는 거
              있죠?
              <br />
              약간 어색+설렘 조합이라 심장 바쁜 하루였어요ㅠ
              <br />
              다음 약속도 잡았는데… 지금부터 또 설레는 중입니당 💗
            </p>
            <img className="w-[178.67px] h-[268px] mb-12" src={postImg} />
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Icon
                width="18px"
                height="16px"
                left="-415px"
                top="-762px"
                className="cursor-pointer"
              />
              <span className="ml-1 text-[14px]">90</span>
            </div>
            <span className="text-[14px]">2개의 댓글</span>
          </div>
        </div>
        <CommentForm isReply={false} />
      </section>
    </>
  );
}
