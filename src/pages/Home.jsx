import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import PopularContest from '../components/sections/PopularContest'
import WinnerAdvertisement from '../components/sections/WinnerAdvertisement'
import Footer from '../components/Footer'
import ExtraSection from '../components/sections/ExtraSection'
function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <Banner></Banner>
        <PopularContest></PopularContest>
        <WinnerAdvertisement></WinnerAdvertisement>
        <ExtraSection></ExtraSection>
        <Footer></Footer>
    </div>
  )
}

export default Home