export default function ProfileTags({
  title,
  list,
}: {
  title: string;
  list: string[];
}) {
  return (
    <li className="flex flex-col items-start gap-5">
      <span className="user-info w-50!">{title}</span>
      <ul className="flex gap-4">
        {list.map((item) => (
          <li
            key={item}
            className="flex px-3 py-[9px] border border-[var(--primary-pink)] rounded-[50px]"
          >
            <span className="inline-block text-[var(--gray-50)] leading-[1]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </li>
  );
}
