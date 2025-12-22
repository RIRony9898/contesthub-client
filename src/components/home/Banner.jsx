import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
      className="min-h-[380px] bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-2xl flex flex-col justify-center items-center text-white px-4 py-16 md:py-0"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold mb-4 text-center"
      >
        Discover Amazing Contests
      </motion.h1>

      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="opacity-90 mb-8 text-center text-base md:text-lg max-w-xl"
      >
        Find the best contests & showcase your creativity!
      </motion.p>

      <motion.form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md px-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="relative">
          <input
            {...register("query")}
            className="w-full p-3 md:p-4 border-none outline-0 text-black rounded-lg pr-12 focus:ring-2 focus:ring-blue-300 transition"
            placeholder="Search contest type..."
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
          >
            <Search size={20} />
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
