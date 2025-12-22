import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axiosInstance from "../../../utils/api/axios.jsx";

function LeaderboardCards() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/public/leaderboard");
      return res.data.data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="animate-pulse h-40 bg-white/10 rounded-2xl" />
        <div className="animate-pulse h-40 bg-white/10 rounded-2xl" />
        <div className="animate-pulse h-40 bg-white/10 rounded-2xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center text-white">
        Unable to load leaderboard data.
      </div>
    );
  }

  const totalWinners = data.length;
  const totalPrize = data.reduce((s, w) => s + (w.totalPrize || 0), 0);

  return (
    <>
      <div className="flex justify-center gap-10 mb-16">
        <div className="bg-white/20 backdrop-blur-md px-8 py-5 rounded-xl">
          <h3 className="text-3xl font-bold">{totalWinners}</h3>
          <p>Total Winners</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md px-8 py-5 rounded-xl">
          <h3 className="text-3xl font-bold">${totalPrize}</h3>
          <p>Total Prize Money</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {data.map((winner, idx) => (
          <motion.div
            key={winner._id || idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 shadow-xl"
          >
            <img
              src={winner.photo || "/assets/default-avatar.png"}
              alt={winner.name || winner._id}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white mb-4"
            />

            <h3 className="text-2xl font-semibold mb-1">{winner.name}</h3>
            <p className="opacity-90 mb-2">{winner._id}</p>

            <p className="text-yellow-300 text-xl font-bold">
              🏆 {winner.wins} wins
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

const WinnerAdvertisement = () => {
  return (
    <div className="mt-28 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center text-white">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          🌟 Celebrate Our Champions!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg opacity-90 mb-12"
        >
          Every contest brings new talent. Meet the latest winners who shined
          the brightest!
        </motion.p>

        {/* Winner Cards (fetched from leaderboard) */}
        <LeaderboardCards />
      </div>
    </div>
  );
};

export default WinnerAdvertisement;
