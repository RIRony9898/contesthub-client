import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ContestsCard from "../../ui/ContestCard";
import axiosInstance from "../../utils/api/axios.jsx";
import ContestCardSkeleton from "../loader/ContestCardSkeleton";

function ContestCard({ activeTab }) {
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["public-contests", activeTab, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeTab && activeTab !== "All") params.set("type", activeTab);
      params.set("page", String(page));
      params.set("limit", String(pageSize));
      params.set("sort", "participants");
      const res = await axiosInstance.get(
        `/api/public/contests?${params.toString()}`
      );
      return res.data;
    }
  });

  const contests = data?.data || [];
  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-600 dark:text-red-400">
          Failed to load contests. Please try again.
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Skeleton Loaders
          Array.from({ length: 12 }).map((_, i) => (
            <ContestCardSkeleton key={i} />
          ))
        ) : contests.length > 0 ? (
          contests.map((contest, index) => {
            const normalized = { ...contest, id: contest._id || contest.id };
            return (
              <ContestsCard
                key={String(normalized.id)}
                contest={normalized}
                index={index}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-semibold">
              No contests found
            </p>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-2">
              Try changing your filter or come back later
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-blue-700 transition font-semibold"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    page === pageNum
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && (
              <span className="px-2 text-zinc-600 dark:text-zinc-400">...</span>
            )}
          </div>

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed hover:bg-blue-700 transition font-semibold"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ContestCard;
