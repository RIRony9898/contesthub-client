import { useQuery } from "@tanstack/react-query";
import { Award, Trophy, Zap } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hook/UseAuth";
import axiosInstance from "../../../utils/api/axios";
import Pagination from "../../../utils/Pagination";

const WinningContests = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["winningContests", user?.uid, page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/users/${user?.uid}/winning?page=${page}&limit=${pageSize}`
      );
      return res.data;
    },
    enabled: !!user?.uid,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Loading your wins...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
        Failed to load contests. Please try again.
      </div>
    );

  const contests = data?.data || [];
  const totalPrize = contests.reduce((sum, c) => sum + (c.prize || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-4 flex items-center gap-2">
          <Trophy size={32} className="text-yellow-500" />
          My Winning Contests
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} className="text-yellow-600" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400 font-semibold">
                Total Wins
              </p>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {data?.total || 0}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={20} className="text-green-600" />
              <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                Prize Money
              </p>
            </div>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalPrize.toLocaleString()}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={20} className="text-blue-600" />
              <p className="text-sm text-blue-700 dark:text-blue-400 font-semibold">
                Avg Prize
              </p>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              ₹
              {contests.length > 0
                ? Math.floor(totalPrize / contests.length).toLocaleString()
                : "0"}
            </p>
          </div>
        </div>
      </div>

      {/* Contests List */}
      {contests.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-12 text-center">
          <Trophy size={48} className="mx-auto text-zinc-400 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            You haven't won any contests yet.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
            Keep participating and you might just become our next champion!
          </p>
          <a
            href="/all-contests"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Participate in Contests
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, index) => (
            <div
              key={contest._id}
              className="relative bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-zinc-200 dark:border-zinc-700"
            >
              {/* Medal Badge */}
              <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg z-10">
                #{index + 1}
              </div>

              {/* Image */}
              <img
                src={contest.image || "https://via.placeholder.com/300x200"}
                alt={contest.name}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-2 line-clamp-2">
                  {contest.name}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                  {contest.description}
                </p>

                {/* Prize and Date */}
                <div className="space-y-2 pb-4 border-b border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Prize Money
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ₹{contest.prize || "0"}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-500">
                    Won on:{" "}
                    {new Date(
                      contest.winDate || contest.deadline
                    ).toLocaleDateString()}
                  </div>
                </div>

                {/* Winner Badge */}
                <div className="mt-4 flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold text-sm">
                  <Trophy size={16} />
                  Champion 🏆
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {contests.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={data?.pages || 1}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default WinningContests;
