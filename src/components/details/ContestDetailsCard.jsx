import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Share2,
  Trophy,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/UseContext";
import axiosInstance from "../../utils/api/axios.jsx";
import SubmitModal from "./SubmitModal";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  const [countdown, setCountdown] = useState({});
  const [isExpired, setIsExpired] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/public/contests/${id}`);
      return res.data.data;
    },
    enabled: !!id
  });

  // Countdown timer
  useEffect(() => {
    if (!data?.deadline) return;

    const interval = setInterval(() => {
      const deadlineDate = new Date(data.deadline).getTime();
      const now = new Date().getTime();
      const difference = deadlineDate - now;

      if (difference <= 0) {
        setIsExpired(true);
        clearInterval(interval);
        return;
      }

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.deadline]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Loading contest details...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-red-600 dark:text-red-400">
          Failed to load contest. Please try again.
        </div>
      </div>
    );

  const contest = data;
  const isDeadlineOver = isExpired || new Date() > new Date(contest.deadline);

  const handleRegister = () => {
    if (!auth.user)
      return navigate("/login", { state: { from: `/contest/${id}` } });
    if (isDeadlineOver) {
      toast.error("Contest deadline has passed!");
      return;
    }
    navigate("/payment", {
      state: {
        contestId: contest._id || contest.id,
        price: contest.price || contest.entryFee || 5,
      },
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: contest.name,
        text: contest.description.slice(0, 100),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Hero Image */}
        <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
          <img
            src={contest.image || "https://via.placeholder.com/800x400"}
            alt={contest.name}
            className="w-full h-full object-cover"
          />
          {isDeadlineOver && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Clock size={48} className="mx-auto mb-3" />
                <p className="text-3xl font-bold">Contest Ended</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-black text-zinc-800 dark:text-white mb-6 leading-tight">
                {contest.name}
              </h1>
              <div className="flex flex-wrap gap-4">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 bg-linear-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-bold shadow-sm border border-blue-200 dark:border-blue-700"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  {contest.type || "Design"}
                </motion.span>
                {!isDeadlineOver && (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 bg-linear-to-r from-green-100 to-green-200 dark:from-green-900/40 dark:to-green-800/40 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-bold shadow-sm border border-green-200 dark:border-green-700"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Active Contest
                  </motion.span>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow">
              <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-3">
                About This Contest
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {contest.description}
              </p>
            </div>

            {/* Task Instructions */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={24} className="text-orange-600" />
                <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
                  Task Instructions
                </h2>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {contest.taskInstructions ||
                  contest.instructions ||
                  "No specific instructions provided."}
              </p>
            </div>

            {/* Winner Section */}
            {contest.winner && (
              <div className="bg-linear-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-6 border border-yellow-300 dark:border-yellow-700">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy size={24} className="text-yellow-600" />
                  <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-400">
                    Contest Winner
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      contest.winner.photo || "https://via.placeholder.com/64"
                    }
                    alt={contest.winner.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-yellow-600"
                  />
                  <div>
                    <p className="font-bold text-lg text-yellow-900 dark:text-yellow-400">
                      {contest.winner.name}
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-500">
                      Prize: ₹{contest.prizeMoney}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Countdown Timer */}
            <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={24} />
                <h3 className="font-bold text-lg">Time Remaining</h3>
              </div>

              {isDeadlineOver ? (
                <div className="text-center py-6">
                  <p className="text-lg font-semibold opacity-90">
                    Contest Ended
                  </p>
                  <p className="text-sm opacity-75">
                    {new Date(contest.deadline).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-2xl font-bold">{countdown.days || 0}</p>
                    <p className="text-xs opacity-80">Days</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{countdown.hours || 0}</p>
                    <p className="text-xs opacity-80">Hours</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {countdown.minutes || 0}
                    </p>
                    <p className="text-xs opacity-80">Mins</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {countdown.seconds || 0}
                    </p>
                    <p className="text-xs opacity-80">Secs</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contest Stats */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <Users size={18} />
                  <span>Participants</span>
                </div>
                <span className="text-2xl font-bold text-zinc-800 dark:text-white">
                  {contest.participants || 0}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <Trophy size={18} className="text-yellow-600" />
                  <span>Prize Money</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  ₹{contest.prizeMoney || 0}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-4">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <DollarSign size={18} />
                  <span>Entry Fee</span>
                </div>
                <span className="text-2xl font-bold text-zinc-800 dark:text-white">
                  ₹{contest.price || 0}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <Calendar size={18} />
                  <span>Deadline</span>
                </div>
                <span className="text-sm font-semibold text-zinc-800 dark:text-white">
                  {new Date(contest.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleRegister}
                disabled={isDeadlineOver}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white transition flex items-center justify-center gap-2 ${
                  isDeadlineOver
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                }`}
              >
                <DollarSign size={20} />
                {isDeadlineOver ? "Contest Closed" : "Register & Pay"}
              </button>

              {!isDeadlineOver && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full py-3 px-4 rounded-lg font-bold text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition flex items-center justify-center gap-2"
                >
                  <FileText size={20} />
                  Submit Task
                </button>
              )}

              <button
                onClick={handleShare}
                className="w-full py-3 px-4 rounded-lg font-bold text-zinc-700 dark:text-zinc-300 border-2 border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition flex items-center justify-center gap-2"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <SubmitModal
          contestId={contest._id || contest.id}
          onClose={() => setShowSubmitModal(false)}
        />
      )}
    </div>
  );
};

export default ContestDetails;
