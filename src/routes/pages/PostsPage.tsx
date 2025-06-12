import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MiniProfilecard from "../../components/webboard/MiniProfilecard";
import Postcard from "../../components/webboard/PostCard";
import SearchBar from "../../components/webboard/SearchBar";
import SortDropdown from "../../components/webboard/SortDropdown";
import WriteButton from "../../components/webboard/WriteButton";
import { fetchPostsByChannelName } from "../../apis/posts/fetchPosts";

export default function PostsPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [offset, setOffset] = useState(0);
  const [sortRule, setSortRule] = useState<"created_at" | "likes">("created_at");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<Selected | null>(null);
  const navigate = useNavigate();

  const channelName: "free" | "dating" = "free";

  // 게시물 불러오기
  useEffect(() => {
    (async () => {
      const result = await fetchPostsByChannelName(channelName, offset, sortRule, keyword);
      if (result) setPosts(result);
    })();
  }, [channelName, offset, sortRule, keyword]);

  return (
    <div className="relative flex flex-col items-center">
      {/*  클릭한 위치에 MiniProfilecard 띄우기 */}
      {selected && (
        <div
          className="fixed z-50"
          style={{
            top: selected.anchor.y - 50,
            left: selected.anchor.x - 250,
          }}
        >
          <MiniProfilecard user={selected.user} onClose={() => setSelected(null)} />
        </div>
      )}

      {/*  검색/정렬/글쓰기 */}
      <div className="flex justify-between items-center w-full max-w-[1370px] px-4 py-6">
        <div className="flex items-center space-x-4">
          <SortDropdown
            sortRule={sortRule}
            onChange={(newRule) => {
              setSortRule(newRule);
              setOffset(0);
            }}
          />
          <SearchBar
            value={keyword}
            onSearch={(kw) => {
              setKeyword(kw);
              setOffset(0);
            }}
          />
        </div>
        <WriteButton onClick={() => navigate(`/post/create`)}></WriteButton>
      </div>

      {/*  게시물 리스트 */}
      <div className="space-y-6 w-full max-w-[1370px] px-4">
        {posts.map((post) => (
          <Postcard
            key={post.id}
            post={post}
            onProfileClick={(author, e) => {
              e.stopPropagation();
              setSelected({
                user: author,
                anchor: { x: e.clientX, y: e.clientY },
              });
            }}
          />
        ))}

        {/* 더 불러오기 */}
        {posts.length > 0 && (
          <div className="flex justify-center">
            <button
              className="px-4 py-2 rounded-md bg-pink-200 hover:bg-pink-300 transition"
              onClick={() => setOffset((prev) => prev + 1)}
            >
              더 불러오기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
