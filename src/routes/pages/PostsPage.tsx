import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import MiniProfilecard from "../../components/webboard/MiniProfilecard";
import Postcard from "../../components/webboard/PostCard";
import SearchBar from "../../components/webboard/SearchBar";
import SortDropdown from "../../components/webboard/SortDropdown";
import WriteButton from "../../components/webboard/WriteButton";
import { fetchPostsByChannelName } from "../../apis/posts/fetchPosts";

type ChannelName = "free" | "dating";

export default function PostsPage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [offset, setOffset] = useState(0);
  const [sortRule, setSortRule] = useState<"created_at" | "likes">("created_at");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<Selected | null>(null);
  const navigate = useNavigate();

  const { channelName } = useParams<{ channelName: string }>();
  const safeChannel = channelName! as ChannelName;

  // 무한 스크롤 관찰용 레퍼런스
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 채널/정렬/검색어 변경 시 초기화
  useEffect(() => {
    setOffset(0);
    setPosts([]);
  }, [safeChannel, sortRule, keyword]);

  // 게시물 페치 및 append 로직
  useEffect(() => {
    (async () => {
      const result = await fetchPostsByChannelName(safeChannel, offset, sortRule, keyword);
      if (!result) return;
      setPosts((prev) => (offset === 0 ? result : [...prev, ...result]));
    })();
  }, [safeChannel, offset, sortRule, keyword]);

  // IntersectionObserver 콜백: loader가 보이면 offset 증가
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOffset((prev) => prev + 1);
    }
  }, []);

  // IntersectionObserver 세팅
  useEffect(() => {
    const options = { root: null, rootMargin: "20px", threshold: 0.1 };
    const observer = new IntersectionObserver(handleObserver, options);
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [handleObserver]);

  return (
    <div className="relative flex flex-col items-center">
      {/* MiniProfilecard 팝업 */}
      {selected && (
        <div
          className="fixed z-50"
          style={{ top: selected.anchor.y - 50, left: selected.anchor.x - 250 }}
        >
          <MiniProfilecard user={selected.user} onClose={() => setSelected(null)} />
        </div>
      )}

      {/* 검색 / 정렬 / 글쓰기 */}
      <div className="flex justify-between items-center w-full max-w-[1370px] px-4 py-6">
        <div className="flex items-center space-x-4">
          <SortDropdown
            sortRule={sortRule}
            onChange={(newRule) => {
              setSortRule(newRule);
            }}
          />
          <SearchBar
            value={keyword}
            onSearch={(kw) => {
              setKeyword(kw);
            }}
          />
        </div>
        <WriteButton onClick={() => navigate(`/post/create`)} />
      </div>

      {/* 게시물 리스트 */}
      <div className="space-y-6 w-full max-w-[1370px] px-4">
        {posts.map((post) => (
          <Postcard
            key={post.id}
            post={post}
            onProfileClick={(author, e) => {
              e.stopPropagation();
              setSelected({ user: author, anchor: { x: e.clientX, y: e.clientY } });
            }}
          />
        ))}

        {/* 관찰용 엘리먼트 (무한 스크롤 트리거) */}
        <div ref={loaderRef} className="h-1" />
      </div>
    </div>
  );
}
