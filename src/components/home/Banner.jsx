import { motion } from "framer-motion";
import { Search, Sparkles, Trophy, Zap } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Banner({ onSearch }) {
  const { register, handleSubmit } = useForm({
    shouldUnregister: true,
  });

  const submit = (data) => onSearch(data.query);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-[450px] bg-linear-to-br from-blue-600 via-blue-500 to-indigo-700 rounded-3xl flex flex-col justify-center items-center text-white px-4 py-16 md:py-0 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-10 left-10 text-4xl opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Trophy />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-4xl opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: -30, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-xl px-6 py-3 rounded-full mb-8 shadow-lg border border-white/20"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={20} />
          </motion.div>
          <span className="font-bold text-sm tracking-wide">
            Join Thousands of Creative Minds
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
        >
          Discover & Participate in
          <br />
          <motion.span
            className="bg-linear-to-r from-yellow-200 via-orange-200 to-yellow-100 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Creative Contests
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="opacity-95 mb-10 text-center text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Showcase your talent, win amazing prizes, and connect with creatives
          worldwide. From design to writing, gaming to photography—find contests
          that match your passion.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit(submit)}
          className="w-full max-w-xl mx-auto px-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-yellow-300 to-orange-300 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white rounded-xl p-1 flex items-center">
              <input
                {...register("query")}
                className="flex-1 px-4 md:px-6 py-3 md:py-4 border-none outline-0 text-gray-800 rounded-lg placeholder-gray-500 focus:ring-0 bg-white"
                placeholder="Search by contest type (Design, Writing, Gaming, etc.)"
              />
              <button
                type="submit"
                className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-4 md:px-8 py-3 md:py-4 rounded-lg font-bold flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition active:scale-95"
              >
                <Search size={20} />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <p className="text-3xl font-bold">500+</p>
            <p className="text-sm opacity-80">Active Contests</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">50K+</p>
            <p className="text-sm opacity-80">Participants</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">₹10Cr+</p>
            <p className="text-sm opacity-80">Prize Money</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
