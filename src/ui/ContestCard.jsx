import { motion } from "framer-motion";
import { ArrowRight, Calendar, DollarSign, Users, Zap } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/UseAuth";

function ContestCard({ contest, index }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDetailsClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to view contest details");
      navigate("/login", { state: { from: `/contest/${contest.id}` } });
      return;
    }
    navigate(`/contest/${contest.id}`);
  };

  const isActive = new Date() < new Date(contest.deadline);
  const daysLeft = Math.ceil(
    (new Date(contest.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-zinc-800 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2 flex flex-col h-full border border-zinc-100 dark:border-zinc-700"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-zinc-200 dark:bg-zinc-700">
        <img
          src={contest.image || "https://via.placeholder.com/400x300"}
          alt={contest.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* Type Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {contest.type || "Contest"}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          {isActive ? (
            <span className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              <Zap size={12} />
              Active
            </span>
          ) : (
            <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Closed
            </span>
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-5 grow flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
          {contest.name}
        </h3>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm line-clamp-2 flex-grow">
          {contest.description
            ? contest.description.slice(0, 80) + "..."
            : "No description available"}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-700">
          {/* Participants */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-1">
              <Users size={16} />
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              {contest.participants || 0}
            </p>
            <p className="text-xs text-zinc-500">Joined</p>
          </div>

          {/* Prize */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
              <DollarSign size={16} />
            </div>
            <p className="text-xs font-bold text-zinc-800 dark:text-white">
              ₹{contest.prizeMoney || 0}
            </p>
            <p className="text-xs text-zinc-500">Prize</p>
          </div>

          {/* Deadline */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400 mb-1">
              <Calendar size={16} />
            </div>
            <p className="text-xs font-bold text-zinc-800 dark:text-white">
              {daysLeft > 0 ? daysLeft : "0"}
            </p>
            <p className="text-xs text-zinc-500">Days</p>
          </div>
        </div>

        {/* Extra Info */}
        <div className="mb-4 flex items-center justify-between text-xs">
          <span className="bg-zinc-100 dark:bg-zinc-700 px-3 py-1 rounded-full text-zinc-700 dark:text-zinc-300">
            Entry: ₹{contest.price || "0"}
          </span>
          {isActive && (
            <span className="text-green-600 dark:text-green-400 font-semibold">
              Open Now
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleDetailsClick}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-semibold active:scale-95 shadow-md"
        >
          View Details
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </button>
      </div>
    </motion.div>
  );
}

export default ContestCard;
