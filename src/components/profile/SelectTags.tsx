import { twMerge } from "tailwind-merge";

export default function SelectTags({
  type,
  list,
  values,
  setValues,
}: {
  type: string;
  list: string[];
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const limit = 8;
  const selectTag = (tag: string) => {
    setValues((values) => {
      if (values.includes(tag)) return values.filter((value) => value !== tag);
      else if (values.length >= 8) return values;
      return [...values, tag];
    });
  };
  return (
    <li className="flex flex-col items-start gap-5">
      <span className="user-info w-50!">{type}</span>
      <ul className="relative flex gap-[10px] items-center flex-wrap px-[26px] py-5 border border-[var(--primary-pink)] rounded-[30px] pr-12">
        {list.map((item) => (
          <li
            onClick={() => selectTag(item)}
            key={item}
            className={twMerge(
              "hover:border-[var(--primary-pink-point)] cursor-pointer flex px-[13px] py-[5px] border border-[var(--primary-pink)] rounded-[50px]",
              values.some((value) => value === item) &&
                "bg-[var(--primary-pink)]"
            )}
          >
            <span className="text-xs">{item}</span>
          </li>
        ))}
        <span className="absolute right-[22px] bottom-[13px] text-sm">
          {values.length} / {limit}
        </span>
      </ul>
    </li>
  );
}
