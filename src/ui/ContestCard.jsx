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
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="group bg-white dark:bg-zinc-800/50 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 flex flex-col h-full border border-zinc-200/50 dark:border-zinc-700/50 relative"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
      <div className="p-6 grow flex flex-col relative z-10">
        {/* Title */}
        <motion.h3
          className="text-xl font-bold mb-3 text-zinc-800 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300"
          whileHover={{ scale: 1.02 }}
        >
          {contest.name}
        </motion.h3>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 mb-5 text-sm line-clamp-2 flex-grow leading-relaxed">
          {contest.description
            ? contest.description.slice(0, 80) + "..."
            : "No description available"}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-5 pb-5 border-b border-zinc-200/50 dark:border-zinc-700/50">
          {/* Participants */}
          <motion.div
            className="text-center p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-2">
              <Users size={18} />
            </div>
            <p className="text-sm font-bold text-zinc-800 dark:text-white">
              {contest.participants || 0}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Joined</p>
          </motion.div>

          {/* Prize */}
          <motion.div
            className="text-center p-3 rounded-xl bg-green-50/50 dark:bg-green-900/20 hover:bg-green-100/50 dark:hover:bg-green-900/30 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-2">
              <Trophy size={18} />
            </div>
            <p className="text-sm font-bold text-zinc-800 dark:text-white">
              ₹{contest.prizeMoney || 0}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Prize</p>
          </motion.div>

          {/* Deadline */}
          <motion.div
            className="text-center p-3 rounded-xl bg-orange-50/50 dark:bg-orange-900/20 hover:bg-orange-100/50 dark:hover:bg-orange-900/30 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center justify-center gap-1 text-orange-600 dark:text-orange-400 mb-2">
              <Calendar size={18} />
            </div>
            <p className="text-sm font-bold text-zinc-800 dark:text-white">
              {daysLeft > 0 ? daysLeft : "0"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Days</p>
          </motion.div>
        </div>

        {/* Extra Info */}
        <div className="mb-5 flex items-center justify-between text-sm">
          <motion.span
            className="bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-700 dark:to-zinc-600 px-4 py-2 rounded-full text-zinc-700 dark:text-zinc-300 font-medium shadow-sm"
            whileHover={{ scale: 1.05 }}
          >
            Entry: ₹{contest.price || "0"}
          </motion.span>
          {isActive && (
            <motion.span
              className="text-green-600 dark:text-green-400 font-bold flex items-center gap-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={14} />
              Open Now
            </motion.span>
          )}
        </div>

        {/* Button */}
        <motion.button
          onClick={handleDetailsClick}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden"
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">View Details</span>
          <motion.div
            className="relative z-10"
            whileHover={{ x: 3 }}
          >
            <ArrowRight size={20} />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-700 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ContestCard;
