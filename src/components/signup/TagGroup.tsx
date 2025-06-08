import { useState } from "react";
import { personalityTags, interestTags } from "./data/tagData";

export default function TagGroup({
  title,
  tagName,
}: {
  title: string;
  tagName: string;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagGroup: { [key: string]: string[] } = {
    personality: personalityTags,
    interest: interestTags,
  };

  const tags = tagGroup[tagName] || [];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <>
      <div>
        <p>{title}</p>
        <p className="text-[var(--gray-500)] text-sm mb-3">4개~8개 선택</p>
        <div className="flex justify-center items-center w-19 h-7 border border-[var(--primary-pink)] border-dashed rounded-[50px]">
          <div className="sprite-pre-tag-icon"></div>
        </div>
        <div className="flex flex-wrap gap-2 w-77 h-57 mt-13 border border-[var(--primary-pink)] rounded-4xl p-4 overflow-y-auto scrollbar-hide">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`inline-block px-3 h-7 border rounded-[50px] text-center leading-7 hover:border-[var(--primary-pink-point)] cursor-pointer ${
                selectedTags.includes(tag)
                  ? "bg-[var(--primary-pink)] border-[var(--primary-pink)]"
                  : "border-[var(--primary-pink)]"
              }`}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
