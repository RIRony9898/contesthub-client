import { useState } from "react";
import ContestCard from "../components/contestPage/ContestCard";
import ContestTab from "../components/contestPage/ContestTab";

function Contest() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ContestTab activeTab={activeTab} setActiveTab={setActiveTab}></ContestTab>
      </div>
      <ContestCard activeTab={activeTab}></ContestCard>
    </div>
  );
}

export default Contest;
