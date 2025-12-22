import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Eye, Filter, Pencil, Search, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/api/axios.jsx";
import { DangerousContentCheck } from "../../../utils/custom-validation/CustomValidation";
import useDebounce from "../../../utils/useDebounce";

const MyCreatedContests = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      status: "all",
      type: "all",
      search: "",
    },
  });
  const [contests, setContests] = useState([]);
  const queryClient = useQueryClient();

  const { data: myContests, isLoading } = useQuery({
    queryKey: ["creator-contests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/creator/get?limit=100");
      return res.data.data;
    },
  });

  useEffect(() => {
    if (myContests) setContests(myContests);
  }, [myContests]);
  const searchTerm = watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filterStatus = watch("status");
  const filterType = watch("type");
  const loadMoreRef = useRef();
  const PaginationRef = useRef({});

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    PaginationRef.current || {};

  const getData = async (keyValuepair = {}, search) => {
    PaginationRef.current = await Pagination({
      url: "/api/contests",
      keyValuepair: keyValuepair,
      search: search,
      page: 1,
      limit: 10,
    });
  };

  const deleteMutation = useMutation(
    async (id) => {
      await axiosInstance.delete(`/api/creator/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["creator-contests"]);
        toast.success("Contest deleted successfully");
      },
    }
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete contest?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/edit-contest/${id}`);
  };

  useEffect(() => {
    if (
      errors?.search?.message ||
      errors?.status?.message ||
      errors?.type?.message
    ) {
      reset({ search: "", status: "all", type: "all" });
      return;
    }
    getData({ status: filterStatus, type: filterType, search: searchTerm });
  }, [searchTerm, filterStatus, filterType]);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
        My Created Contests
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={20} className="text-blue-600" />
            <p className="text-sm text-blue-700 dark:text-blue-400 font-semibold">
              Total Contests
            </p>
          </div>
          <p className="text-2xl font-bold text-blue-600">{contests.length}</p>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trash2 size={20} className="text-green-600" />
            <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
              Confirmed
            </p>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {contests.filter((c) => c.status === "Confirmed").length}
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Pencil size={20} className="text-yellow-600" />
            <p className="text-sm text-yellow-700 dark:text-yellow-400 font-semibold">
              Pending
            </p>
          </div>
          <p className="text-2xl font-bold text-yellow-600">
            {contests.filter((c) => c.status === "Pending").length}
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <X size={20} className="text-red-600" />
            <p className="text-sm text-red-700 dark:text-red-400 font-semibold">
              Rejected
            </p>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {contests.filter((c) => c.status === "Rejected").length}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-8">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search Box */}
          <motion.div
            initial={{ scale: 1 }}
            whileFocusWithin={{
              scale: 1.03,
              boxShadow: "0 0 0 3px rgba(236,72,153,0.35)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full lg:w-[45%]"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />

            <input
              type="text"
              disabled={errors?.search?.message}
              {...register("search", { ...DangerousContentCheck })}
              placeholder="Search contests by name or type..."
              className="w-full pl-12 pr-12 py-3 rounded-xl
                bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                focus:outline-none
                text-zinc-800 dark:text-white
                placeholder:text-zinc-400"
            />

            {/* Clear Search */}
            {searchTerm && (
              <button
                onClick={() => reset({ search: "" })}
                className="absolute right-4 top-1/2 -translate-y-1/2
                  text-zinc-400 hover:text-pink-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          {/* Right Info */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Typing Indicator */}
            {(searchTerm !== debouncedSearchTerm ||
              errors?.search?.message) && (
              <span className="text-sm font-medium text-pink-500 animate-pulse">
                {errors?.search?.message ? errors.search.message : "Typing..."}
              </span>
            )}

            {/* Result Badge */}
            <div
              className="px-4 py-2 rounded-full
                bg-linear-to-r from-pink-500 to-purple-500
                text-white text-sm font-semibold shadow-md"
            >
              📊 {contests.length} Results
            </div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 font-medium">
            <Filter className="w-5 h-5 text-pink-500" />
            Filters
          </div>

          {/* Status */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <select
              {...register("status", { ...DangerousContentCheck })}
              className="appearance-none px-4 py-2 pr-10 rounded-xl
                bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                text-zinc-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500">
              ▼
            </span>
          </motion.div>

          {/* Type */}
          <motion.div whileHover={{ scale: 1.03 }} className="relative">
            <select
              {...register("type", { ...DangerousContentCheck })}
              className="appearance-none px-4 py-2 pr-10 rounded-xl
                bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                text-zinc-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="all">All Types</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500">
              ▼
            </span>
          </motion.div>

          {/* Clear Filters */}
          {(filterStatus !== "all" || filterType !== "all") && (
            <button
              onClick={() => {
                reset({ status: "all", type: "all" });
              }}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full
                bg-pink-100 dark:bg-pink-500/20
                text-pink-600 dark:text-pink-300
                text-sm font-semibold hover:scale-105 transition"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full dark:text-white text-black table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Name
              </th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Type
              </th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Participants
              </th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Prize ($)
              </th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Status
              </th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr
                key={contest.id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <td className="px-4 py-2">{contest.name}</td>
                <td className="px-4 py-2">{contest.type}</td>
                <td className="px-4 py-2">{contest.participants}</td>
                <td className="px-4 py-2">{contest.prizeMoney}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    contest.status === "Confirmed"
                      ? "text-green-500"
                      : contest.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {contest.status}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {contest.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleEdit(contest._id)}
                        className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contest._id)}
                        className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button className="p-1 rounded bg-purple-500 text-white hover:bg-purple-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Load more / end indicator */}
      <div ref={loadMoreRef} className="w-full text-center mt-8">
        {isFetchingNextPage && (
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Loading more achievements...
            </span>
          </div>
        )}
        {!hasNextPage && data?.pages[0]?.data?.length > 0 && (
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg">
            <FaInfoCircle />
            <span className="font-medium">
              All achievements loaded successfully
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCreatedContests;
