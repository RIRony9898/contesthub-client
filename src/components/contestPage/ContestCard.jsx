import { useEffect, useState } from "react";
import contestsData from "../../../demoData/contestsData.json";
import ContestsCard from "../../ui/ContestCard";

function ContestCard({ activeTab }) {
  const [contestData, setContestsData] = useState([]);

  useEffect(() => {
    setContestsData(contestsData);
  }, []);

  const filteredContests = activeTab === "All"
    ? contestData.filter((contest) => contest.approved)
    : contestData.filter((contest) => contest.type === activeTab && contest.approved);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest, index) => (
            <ContestsCard key={contest.id} contest={contest} index={index} />
          ))
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
