import MiniProfilecard from "../../components/webboard/MiniProfilecard";
import Postcard from "../../components/webboard/PostCard";
import SearchBar from "../../components/webboard/SearchBar";
import SortDropdown from "../../components/webboard/SortDropdown";
import WriteButton from "../../components/webboard/WriteButton";

export default function PostsPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-[1370px] px-4 py-6">
        <div className="flex items-center space-x-4">
          <SortDropdown />
          <SearchBar />
        </div>
        <WriteButton />
      </div>

      <div className="space-y-6">
        <Postcard />
        <Postcard />
        <Postcard />
        <MiniProfilecard />
      </div>
    </div>
  );
}
