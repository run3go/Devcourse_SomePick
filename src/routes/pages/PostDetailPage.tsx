import Profile from "../../assets/images/profile_image.png";
import PostImg from "../../assets/images/post_image.png";
import Icon from "../../components/common/Icon";
import CommentForm from "../../components/PostDetail/CommentForm";
import CommentList from "../../components/PostDetail/CommentList";
import PostHeader from "../../components/PostDetail/PostHeader";
import PostContent from "../../components/PostDetail/PostContent";

export default function PostDetailPage() {
  return (
    <>
      <div className="mx-auto w-[1080px] pt-[2vh] pb-[5vh]">
        <div className="flex mb-[18px] mx-[7px] items-center cursor-pointer">
          <Icon
            width="12px"
            height="10px"
            left="-277px"
            top="-765px"
            className="mr-[5px]"
          />
          <a className="text-[18px]">Back</a>
        </div>
        <article className="border w-[1080px] h-full rounded-2xl border-[#FFC7ED] bg-[#FFC7ED]/24 px-[50px] py-[30px]">
          <PostHeader profileImg={Profile} />
          <PostContent postImg={PostImg} />
          <section className="mt-[12px]">
            <article>
              <CommentList
                profileImg={Profile}
                name="김지원"
                time="2025.06.04 18:05"
                content="헉 버블티로 대화 풀리는 거 넘 귀엽다ㅋㅋㅋ 첫 데이트 이렇게
                    달달해도 되나~? 다음 데이트 후기 꼭 알려줘요💘"
              />
              <CommentForm isReply={true} />
            </article>
            <article>
              <CommentList
                isReply={false}
                profileImg={Profile}
                name="고윤정"
                time="2025.06.04 18:05 (수정됨)"
                content="보기만 해도 기분 좋아지는 후기다ㅠㅠ 약간 그 어색한 기류에
                    심장 쿵쾅거리는 느낌… 넘 알죠ㅋㅋ 두 분 잘 되시길~!!"
              />
              <CommentList
                isReply={true}
                profileImg={Profile}
                name="김지원"
                time="2025.06.04 18:05 (수정됨)"
                content="제가 다 설레네요ㅋㅋㅋㅋ"
              />
            </article>
          </section>
        </article>
      </div>
    </>
  );
}
