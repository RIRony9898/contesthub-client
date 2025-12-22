import { useQuery } from "@tanstack/react-query";
import { Calendar, DollarSign, Users } from "lucide-react";
import { useState } from "react";
import useAuth from "../../../hook/UseAuth";
import axiosInstance from "../../../utils/api/axios";
import Pagination from "../../../utils/Pagination";

const ParticipatedContests = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["participatedContests", user?.uid, page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/users/${user?.uid}/participated?page=${page}&limit=${pageSize}`
      );
      return res.data;
    },
    enabled: !!user?.uid,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Loading your contests...
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-800 dark:text-white mb-2">
          My Participated Contests
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          You have participated in{" "}
          <span className="font-semibold">{data?.total || 0}</span> contests
        </p>
      </div>

      {/* Contests List */}
      {contests.length === 0 ? (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-12 text-center">
          <Users size={48} className="mx-auto text-zinc-400 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400">
            You haven't participated in any contests yet.
          </p>
          <a
            href="/all-contests"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore Contests
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contests.map((contest) => (
            <div
              key={contest._id}
              className="bg-white dark:bg-zinc-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-zinc-200 dark:border-zinc-700"
            >
              {/* Image */}
              <img
                src={contest.image || "https://via.placeholder.com/400x200"}
                alt={contest.name}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-zinc-800 dark:text-white mb-2 line-clamp-2">
                  {contest.name}
                </h3>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <DollarSign size={16} className="text-green-600" />
                    <span>${contest.prize || "0"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                    <Users size={16} className="text-blue-600" />
                    <span>{contest.participants || "0"} joined</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 col-span-2">
                    <Calendar size={16} className="text-orange-600" />
                    <span>
                      {new Date(contest.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      new Date(contest.deadline) > new Date()
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {new Date(contest.deadline) > new Date()
                      ? "Active"
                      : "Ended"}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    Paid: ₹{contest.price || "0"}
                  </span>
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

export default ParticipatedContests;
