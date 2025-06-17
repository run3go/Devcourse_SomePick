// import { useEffect, useState } from "react";
import { personalityTags, interestTags } from "../../constants/data/tagData";
import Icon from "../common/Icon";
import { useSignUpStore } from "../../stores/signupStore";
import { showWarnToast } from "../common/ShowToast";

export default function TagGroup({
  title,
  tagName,
}: {
  title: string;
  tagName: "keywords" | "interests" | "ideal_types";
}) {
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { data, updateData } = useSignUpStore();
  const soloData = data as SoloOptions;

  const tagGroup: { [key: string]: string[] } = {
    keywords: personalityTags,
    interests: interestTags,
    ideal_types: personalityTags,
  };

  const tags = tagGroup[tagName] || [];
  // const selectedTags = soloData[tagName];
  const selectedTags = soloData[tagName] ? soloData[tagName].split(",") : [];

  const toggleTag = (tag: string) => {
    const isSelected = selectedTags.includes(tag);

    if (!isSelected && selectedTags.length >= 8) {
      // alert("최대 8개까지 선택할 수 있어요.");
      showWarnToast("최대 8개까지 선택할 수 있어요.");
      return;
    }

    const newTags = isSelected
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    updateData({ [tagName]: newTags.join(",") });
  };

  // useEffect(() => {
  //   updateData({ [tagName]: selectedTags.join(",") });
  // }, [selectedTags, tagName, updateData]);

  return (
    <>
      <div className="flex gap-8">
        <div className="w-[320px] h-[138px]">
          <div>
            <p>{title}</p>
            <p className="text-[var(--gray-500)] text-sm mb-3">4개~8개 선택</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.length === 0 ? (
              <div className="flex justify-center items-center w-20 h-7 border border-[var(--primary-pink)] border-dashed rounded-[50px]">
                <Icon width="12px" height="12px" left="-759px" top="-764px" />
              </div>
            ) : (
              <>
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`inline-block px-3 h-7 border border-[var(--primary-pink)] rounded-[50px] text-center leading-7 hover:border-[var(--primary-pink-point)] cursor-pointer`}
                  >
                    {tag}
                  </div>
                ))}
                {selectedTags.length < 8 && (
                  <div className="flex justify-center items-center w-20 h-7 border border-[var(--primary-pink)] border-dashed rounded-[50px]">
                    <Icon
                      width="12px"
                      height="12px"
                      left="-759px"
                      top="-764px"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-90 h-48 border border-[var(--primary-pink)] rounded-4xl p-4 overflow-y-auto scrollbar-hide">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`inline-block px-3 h-7 border rounded-[50px] text-center leading-7 hover:border-[var(--primary-pink-point)] cursor-pointer ${
                selectedTags.includes(tag)
                  ? "bg-[var(--primary-pink)] border-[var(--primary-pink)] dark:text-[var(--black)]"
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
