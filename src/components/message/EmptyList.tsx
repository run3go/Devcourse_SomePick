export default function EmptyList({ message }: { message: string }) {
  return (
    <div className="border-1 border-[var(--primary-pink)] rounded-2xl p-5 my-3 h-[300px] justify-center items-center flex text-[14px] dark:bg-[var(--dark-white)]/27 ">
      <span className="text-[#969696] dark:text-[var(--dark-gray-700)]">
        {message}
      </span>
    </div>
  );
}
