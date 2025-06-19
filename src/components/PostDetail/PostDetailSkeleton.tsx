export default function PostDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-1">
      <div className="h-7 bg-[var(--gray-300-59)] dark:bg-[var(--dark-bg-tertiary)] rounded w-1/3" />
      <div className="h-4 bg-[var(--gray-300-59)] dark:bg-[var(--dark-bg-tertiary)] rounded w-1/4 mb-[30px]" />
      <div className="flex items-center mt-2 mb-5 gap-2.5">
        <div className="size-[30px] bg-[var(--gray-300-59)] dark:bg-[var(--dark-bg-tertiary)] rounded-full" />
        <div className="w-[80px] h-[24px] bg-[var(--gray-300-59)] dark:bg-[var(--dark-bg-tertiary)] rounded" />
      </div>
      <div className="h-[200px] bg-[var(--gray-300-59)] dark:bg-[var(--dark-bg-tertiary)] rounded-2xl" />
      <div className="h-16 bg-[var(--gray-300-59)] dark:bg-[var(--dark-bg-tertiary)] rounded-2xl mt-5" />
    </div>
  );
}
