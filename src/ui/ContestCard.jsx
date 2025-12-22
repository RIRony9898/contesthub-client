import { motion } from "framer-motion";
import { Calendar, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

function ContestCard({ contest, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {contest.type || "Contest"}
        </div>
      </div>

      <div className="p-5 grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">
          {contest.name}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm line-clamp-2">
          {contest.shortDesc || contest.description}
        </p>

        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Users size={16} />
            <span>{contest.participants || 0} participants</span>
          </div>
          {contest.prizeMoney && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
              <DollarSign size={16} />
              <span>Prize: ${contest.prizeMoney}</span>
            </div>
          )}
          {contest.deadline && (
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <Calendar size={16} />
              <span>{new Date(contest.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        <Link
          to={`/contest/${contest.id}`}
          className="w-full text-center bg-linear-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold mt-auto"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

export default ContestCard;
