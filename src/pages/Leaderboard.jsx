import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/api/axios.jsx";

const Leaderboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/public/leaderboard");
      return res.data.data;
    },
  });

  if (isLoading) return <div className="p-6">Loading leaderboard…</div>;
  if (error)
    return <div className="p-6 text-red-600">Failed to load leaderboard</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      <div className="bg-white rounded shadow p-4">
        <ol className="list-decimal pl-6">
          {data.map((u, idx) => (
            <li key={u._id || idx} className="py-2 border-b last:border-b-0">
              <div className="flex items-center gap-4">
                <img
                  src={u.photo || "https://via.placeholder.com/48"}
                  alt={u.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{u.name || u._id}</div>
                  <div className="text-sm text-gray-600">
                    Wins: {u.wins} • Total Prize: ${u.totalPrize || 0}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;
