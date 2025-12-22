import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ContestCard from "../../../ui/ContestCard";
import axiosInstance from "../../../utils/api/axios.jsx";

function PopularContest() {
  const { data, isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/api/public/contests?sort=participants&limit=6"
      );
      return res.data.data;
    },
  });

  const sortedContests = data || [];

  if (isLoading) return <div className="p-6">Loading popular contests…</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 mt-20 mb-16"
    >
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            🔥 Popular Contests
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Check out the most participated contests
          </p>
        </div>
        <Link
          to="/all-contests"
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2 transition"
        >
          Show All →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedContests.map((contest, index) => {
          const normalized = { ...contest, id: contest._id || contest.id };
          return (
            <ContestCard
              key={String(normalized.id)}
              contest={normalized}
              index={index}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

export default PopularContest;
