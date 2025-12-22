import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter, Search, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axiosInstance from "../../../utils/api/axios.jsx";
import { DangerousContentCheck } from "../../../utils/custom-validation/CustomValidation";
import useDebounce from "../../../utils/useDebounce";

const roles = ["user", "creator", "admin"];

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: usersData, isLoading } = useQuery(
    ["admin-users", page],
    async () => {
      const res = await axiosInstance.get(
        `/api/admin/users?page=${page}&limit=${pageSize}`
      );
      return res.data;
    }
  );

  const mutation = useMutation(
    async ({ id, role }) => {
      await axiosInstance.put(`/api/admin/users/${id}/role`, { role });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["admin-users"]);
        toast.success("User role updated!");
      },
      onError: (err) => {
        toast.error("Failed to update role");
        console.error(err);
      },
    }
  );

  const handleRoleChange = (id, newRole) => {
    Swal.fire({
      title: "Change Role?",
      text: `Set role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, change it",
    }).then((r) => {
      if (r.isConfirmed) mutation.mutate({ id, role: newRole });
    });
  };

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      type: "all",
      search: "",
    },
  });
  const searchTerm = watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filterType = watch("type");

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
        Manage Users
      </h2>

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
            <div className="px-4 py-2 rounded-full bg-linear-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold shadow-md">
              📊 {usersData?.length || 0} Results
            </div>
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 font-medium">
            <Filter className="w-5 h-5 text-pink-500" />
            Filters
          </div>

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
              <option value="Design">User</option>
              <option value="Writing">Creator</option>
              <option value="Development">Admin</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500">
              ▼
            </span>
          </motion.div>

          {/* Clear Filters */}
          {filterType !== "all" && (
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

      <div className="overflow-x-auto text-black dark:text-white">
        <table className="min-w-full table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Name
              </th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Email
              </th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="p-6">
                  Loading users…
                </td>
              </tr>
            ) : (
              (usersData?.data || []).map((user) => (
                <tr
                  key={user._id || user.email}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <td className="px-4 py-2">{user.name || user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id || user.email, e.target.value)
                      }
                      className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {usersData?.total > pageSize && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pink-600 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">
              {Math.ceil(usersData?.total / pageSize)}
            </span>
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={!usersData?.hasMore}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pink-600 transition"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
