import { useQuery } from "@tanstack/react-query";
import { Star, Trophy } from "lucide-react";
import axiosInstance from "../utils/api/axios.jsx";

const Leaderboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/public/leaderboard");
      return res.data.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Loading leaderboard...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-600 dark:text-red-400">
          Failed to load leaderboard. Please try again later.
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy size={40} className="text-yellow-500 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-white">
            Leaderboard
          </h1>
          <Trophy size={40} className="text-yellow-500 animate-bounce" />
        </div>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Top Contest Winners & Champions
        </p>
      </div>

      {/* Top 3 Podium - Desktop */}
      <div className="hidden md:grid grid-cols-3 gap-8 mb-12 h-80">
        {/* Second Place (Left) */}
        {data && data[1] && (
          <div className="flex flex-col items-center justify-end">
            <div className="bg-gradient-to-b from-slate-300 to-slate-400 rounded-lg p-6 w-full text-center mb-4">
              <img
                src={data[1].photo || "https://via.placeholder.com/80"}
                alt={data[1].name}
                className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-slate-500 object-cover"
              />
              <h3 className="font-bold text-lg text-slate-900">
                {data[1].name}
              </h3>
              <div className="text-sm text-slate-700 mt-2">
                <p className="font-semibold">{data[1].wins} Wins</p>
                <p className="text-slate-600">
                  ₹{(data[1].totalPrize || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-slate-500 text-white font-bold text-3xl w-16 h-16 rounded-full flex items-center justify-center">
              2
            </div>
          </div>
        )}

        {/* First Place (Center) */}
        {data && data[0] && (
          <div className="flex flex-col items-center justify-end">
            <div className="bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 rounded-lg p-6 w-full text-center mb-4 shadow-lg transform scale-105">
              <img
                src={data[0].photo || "https://via.placeholder.com/90"}
                alt={data[0].name}
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-yellow-700 object-cover"
              />
              <h3 className="font-bold text-xl text-yellow-900">
                {data[0].name}
              </h3>
              <div className="text-sm text-yellow-800 mt-2">
                <p className="font-semibold">{data[0].wins} Wins</p>
                <p>₹{(data[0].totalPrize || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-yellow-500 text-white font-bold text-4xl w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
              🏆
            </div>
          </div>
        )}

        {/* Third Place (Right) */}
        {data && data[2] && (
          <div className="flex flex-col items-center justify-end">
            <div className="bg-gradient-to-b from-orange-300 to-orange-400 rounded-lg p-6 w-full text-center mb-4">
              <img
                src={data[2].photo || "https://via.placeholder.com/80"}
                alt={data[2].name}
                className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-orange-600 object-cover"
              />
              <h3 className="font-bold text-lg text-orange-900">
                {data[2].name}
              </h3>
              <div className="text-sm text-orange-800 mt-2">
                <p className="font-semibold">{data[2].wins} Wins</p>
                <p className="text-orange-700">
                  ₹{(data[2].totalPrize || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-orange-500 text-white font-bold text-3xl w-16 h-16 rounded-full flex items-center justify-center">
              3
            </div>
          </div>
        )}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <th className="px-6 py-4 text-left font-semibold">Rank</th>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-center font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <Trophy size={18} />
                    Wins
                  </div>
                </th>
                <th className="px-6 py-4 text-center font-semibold">
                  Prize Money
                </th>
                <th className="px-6 py-4 text-center font-semibold">
                  Win Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, idx) => {
                const winRate =
                  user.totalContests > 0
                    ? ((user.wins / user.totalContests) * 100).toFixed(1)
                    : 0;
                return (
                  <tr
                    key={user._id || idx}
                    className={`border-b border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-zinc-700 transition ${
                      idx === 0
                        ? "bg-yellow-50 dark:bg-yellow-900/20"
                        : idx === 1
                        ? "bg-slate-50 dark:bg-slate-900/20"
                        : idx === 2
                        ? "bg-orange-50 dark:bg-orange-900/20"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {idx === 0 && <div className="text-2xl">🥇</div>}
                        {idx === 1 && <div className="text-2xl">🥈</div>}
                        {idx === 2 && <div className="text-2xl">🥉</div>}
                        {idx > 2 && (
                          <span className="font-bold text-lg text-zinc-600 dark:text-zinc-400">
                            #{idx + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photo || "https://via.placeholder.com/48"}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                        />
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-white">
                            {user.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Member
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Star size={16} className="text-yellow-500" />
                        <span className="font-bold text-lg">{user.wins}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        ₹{(user.totalPrize || 0).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {winRate}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Data State */}
      {(!data || data.length === 0) && (
        <div className="text-center py-12">
          <Trophy size={48} className="mx-auto text-zinc-400 mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400">
            No winners yet. Be the first!
          </p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
