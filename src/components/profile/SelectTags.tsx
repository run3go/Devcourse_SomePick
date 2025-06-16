import { useController, useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export default function SelectTags({
  type,
  list,
  name,
}: {
  type: string;
  list: string[];
  name: string;
}) {
  const limit = 8;
  const { control } = useFormContext();
  const { field } = useController({ name, control, defaultValue: [] });
  const selectTag = (tag: string) => {
    const values = field.value as string[];
    if (values.includes(tag))
      field.onChange(values.filter((value) => value !== tag));
    else if (values.length < limit) field.onChange([...values, tag]);
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
              field.value.some((value: string) => value === item) &&
                "bg-[var(--primary-pink)] dark:text-[var(--dark-bg-primary)]"
            )}
          >
            <span className="text-xs">{item}</span>
          </li>
        ))}
        <span className="absolute right-[22px] bottom-[13px] text-sm">
          {field.value.length} / {limit}
        </span>
      </ul>
    </li>
  );
}
