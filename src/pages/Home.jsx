import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/home/Banner";
import ExtraSection from "../components/home/sections/ExtraSection";
import PopularContest from "../components/home/sections/PopularContest";
import WinnerAdvertisement from "../components/home/sections/WinnerAdvertisement";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/all-contests?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div>
      <Banner onSearch={handleSearch}></Banner>
      <PopularContest></PopularContest>
      <WinnerAdvertisement></WinnerAdvertisement>
      <ExtraSection></ExtraSection>
    </div>
  );
}

export default Home;
