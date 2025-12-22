import { motion } from "framer-motion";
import { Calendar, DollarSign, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import contestData from "../../../demoData/contestsData.json";
import SubmitModal from "./SubmitModal";

const ContestDetails = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState("");
  const [registered, setRegistered] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    const c = contestData.find((c) => c.id === id);
    setContest(c);
  }, [id]);

  // Countdown Logic
  useEffect(() => {
    if (!contest) return;

    const timer = setInterval(() => {
      const deadline = new Date(contest.deadline);
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Contest Ended");
        clearInterval(timer);
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [contest]);

  if (!contest) {
    return (
      <div className="text-center mt-20 py-10">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Loading contest details...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-16">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-96 rounded-2xl shadow-lg overflow-hidden"
      >
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              {contest.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              {contest.shortDesc}
            </p>
          </motion.div>

          {/* Key Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
          >
            <div className="text-center">
              <Users className="w-6 h-6 mx-auto text-blue-600 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Participants
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">
                {contest.participants}
              </p>
            </div>
            <div className="text-center">
              <DollarSign className="w-6 h-6 mx-auto text-green-600 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Prize Money
              </p>
              <p className="text-xl font-bold text-green-600">
                ${contest.prize}
              </p>
            </div>
            <div className="text-center">
              <Calendar className="w-6 h-6 mx-auto text-orange-600 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deadline
              </p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {new Date(contest.deadline).toLocaleDateString()}
              </p>
            </div>
            <div className="text-center">
              <Trophy className="w-6 h-6 mx-auto text-yellow-600 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {contest.type}
              </p>
            </div>
          </motion.div>

          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Contest Description
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {contest.shortDesc}
            </p>
          </motion.div>

          {/* Task Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Task Instruction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {contest.task ||
                "Complete the contest challenge and submit your work."}
            </p>
          </motion.div>

          {/* Winner Section */}
          {contest.winner && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-700"
            >
              <div className="flex items-center gap-4">
                <img
                  src={contest.winner.photo}
                  alt={contest.winner.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    🏆 Winner
                  </h3>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {contest.winner.name}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-28">
            {/* Countdown */}
            <div className="mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Time Remaining
              </p>
              <p
                className={`text-2xl font-bold ${
                  timeLeft === "Contest Ended"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {timeLeft}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={timeLeft === "Contest Ended"}
                onClick={() => setRegistered(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition"
              >
                {timeLeft === "Contest Ended"
                  ? "Contest Ended"
                  : "Register & Pay"}
              </motion.button>

              {registered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setOpenModal(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition"
                >
                  Submit Task
                </motion.button>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                ℹ️ Register first to participate and submit your work
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Submit Modal */}
      {openModal && <SubmitModal close={() => setOpenModal(false)} />}
    </div>
  );
};

export default ContestDetails;
