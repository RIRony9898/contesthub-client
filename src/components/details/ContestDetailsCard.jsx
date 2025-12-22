import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, DollarSign, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/UseContext";
import axiosInstance from "../../utils/api/axios.jsx";
import SubmitModal from "./SubmitModal";

const ContestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/public/contests/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="p-6">Loading contest…</div>;
  if (error)
    return <div className="p-6 text-red-600">Failed to load contest</div>;

  const contest = data;

  const handleRegister = () => {
    if (!auth.user)
      return navigate("/login", { state: { from: `/contest/${id}` } });
    navigate("/payment", {
      state: {
        contestId: contest._id || contest.id,
        price: contest.price || contest.entryFee || 5,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded shadow p-6"
      >
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{contest.name}</h1>
        <p className="text-gray-700 mb-4">{contest.description}</p>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users size={18} /> {contest.participants || 0} participants
          </div>
          {contest.prizeMoney && (
            <div className="flex items-center gap-2">
              <DollarSign size={18} /> ${contest.prizeMoney}
            </div>
          )}
          {contest.deadline && (
            <div className="flex items-center gap-2">
              <Calendar size={18} />{" "}
              {new Date(contest.deadline).toLocaleString()}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register / Pay
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded">Submit Task</button>
        </div>
      </motion.div>
      <SubmitModal contestId={contest._id || contest.id} />
    </div>
  );
};

export default ContestDetails;
