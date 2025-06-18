export default function MatchingCardSkeleton() {
  return (
    <div className="w-[600px] h-[800px] rounded-2xl bg-gray-200 animate-pulse dark:bg-[var(--dark-bg-secondary)] shadow-md">
      <div className="w-full h-[70%] bg-gray-300 rounded-t-2xl dark:bg-[var(--dark-gray-400)]" />
      <div className="p-4 space-y-4">
        <div className="w-1/2 h-6 bg-gray-300 rounded dark:bg-[var(--dark-gray-400)]" />
        <div className="w-3/4 h-5 bg-gray-300 rounded dark:bg-[var(--dark-gray-400)]" />
        <div className="w-full h-4 bg-gray-300 rounded dark:bg-[var(--dark-gray-400)]" />
      </div>
    </div>
  );
}
