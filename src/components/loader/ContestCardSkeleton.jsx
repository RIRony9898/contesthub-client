const ContestCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-2xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-zinc-300 dark:bg-zinc-700"></div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
          <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-5/6"></div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-2/3"></div>
          <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-zinc-300 dark:bg-zinc-700 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ContestCardSkeleton;
