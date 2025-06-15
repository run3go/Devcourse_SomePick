// import Profile from "../../assets/images/profile_image.png";
// import CommentForm from "../../components/PostDetail/CommentForm";
import CommentList from "../../components/PostDetail/CommentList";
import PostHeader from "../../components/PostDetail/PostHeader";
import PostContent from "../../components/PostDetail/PostContent";
import BackButton from "../../components/common/BackButton";
import { useEffect, useState } from "react";
import { fetchPostByPostId } from "../../apis/posts/postCrud";
import { useParams } from "react-router";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  // const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  // const [replyTargetId, setReplyTargetId] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;
      const data = await fetchPostByPostId(postId);
      if (data) {
        setPost(data);
        console.log("hello");
      }
    };
    loadPost();
  }, [postId]);

  return (
    <>
      <div className="mx-auto w-[1080px] pt-[2vh] pb-[5vh]">
        <BackButton className="mb-[18px] text-[18px]" />
        <article className="border w-[1080px] h-full rounded-2xl border-[#FFC7ED] bg-[#FFC7ED]/24 px-[50px] py-[30px]">
          {post && <PostHeader post={post} postId={postId} />}
          {post && <PostContent post={post} postId={postId} />}
          <section className="mt-[12px]">
            <article>
              {post && (
                <CommentList post={post} />
                // <CommentList
                //   profileImg={Profile}
                //   name="김지원"
                //   time="2025.06.04 18:05"
                //   content="헉 버블티로 대화 풀리는 거 넘 귀엽다ㅋㅋㅋ 첫 데이트 이렇게
                //     달달해도 되나~? 다음 데이트 후기 꼭 알려줘요💘"
                //   onReplyClick={setReplyTargetId}
                // />
              )}
              {/* <CommentForm isReply={true} replyTargetId={replyTargetId} /> */}
            </article>
            <article>
              {/* <CommentList
                isReply={false}
                profileImg={Profile}
                name="고윤정"
                time="2025.06.04 18:05 (수정됨)"
                content="보기만 해도 기분 좋아지는 후기다ㅠㅠ 약간 그 어색한 기류에
                    심장 쿵쾅거리는 느낌… 넘 알죠ㅋㅋ 두 분 잘 되시길~!!"
                onReplyClick={setReplyTargetId}
              /> */}
              {/* <CommentForm isReply={true} replyTargetId={replyTargetId} /> */}
              {/* <CommentList
                isReply={true}
                profileImg={Profile}
                name="김지원"
                time="2025.06.04 18:05 (수정됨)"
                content="제가 다 설레네요ㅋㅋㅋㅋ"
                onReplyClick={setReplyTargetId}
              /> */}
            </article>
          </section>
        </article>
      </div>
    </>
  );
}
