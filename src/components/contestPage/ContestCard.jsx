import { useEffect, useState } from "react";
import contestsData from "../../../demoData/contestsData.json";
import ContestsCard from "../../ui/ContestCard";

function ContestCard() {
  const [contestData, setContestsData] = useState([]);

  useEffect(() => {
    setContestsData(contestsData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contestData.length > 0 ? (
          contestData.map((contest, index) => (
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
