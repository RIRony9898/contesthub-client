import { useQuery } from "@tanstack/react-query";
import ContestsCard from "../../ui/ContestCard";
import axiosInstance from "../../utils/api/axios.jsx";

function ContestCard({ activeTab }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["public-contests", activeTab],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (activeTab && activeTab !== "All") params.set("type", activeTab);
      params.set("limit", "50");
      params.set("sort", "participants");
      const res = await axiosInstance.get(
        `/api/public/contests?${params.toString()}`
      );
      return res.data.data;
    },
  });

  const contests = data || [];

  if (isLoading) return <div className="p-6">Loading contests…</div>;
  if (error)
    return <div className="p-6 text-red-600">Failed to load contests</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.length > 0 ? (
          contests.map((contest, index) => {
            const normalized = { ...contest, id: contest._id || contest.id };
            return (
              <ContestsCard
                key={String(normalized.id)}
                contest={normalized}
                index={index}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No contests available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestCard;
