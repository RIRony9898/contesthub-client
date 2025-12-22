import ContestCard from "../components/contestPage/ContestCard";
import ContestTab from "../components/contestPage/ContestTab";

function Contest() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ContestTab></ContestTab>
      </div>
      <ContestCard></ContestCard>
    </div>
  );
}

export default Contest;
