import Festival from '../components/homePage/Festival';
import Ultraboot from '../components/homePage/Ultraboot';
import Saleoff from '../components/homePage/Saleoff';
import Popular from '../components/homePage/Popular';
import Interested from '../components/homePage/Interested';
import Trending from '../components/homePage/Trending';
import Shoes from '../components/homePage/Shoes';
import Shoppingfor from '../components/homePage/Shoppingfor';
import Notifications from '../components/homePage/Notifications';
import Footer from '../components/footer';

function Home() {

  return (
    <>
      <Saleoff />
      <Festival /> 
      <Ultraboot />
      <Interested />
      <Popular />
      <Trending />
      <Shoes />
      <Shoppingfor />
      <Notifications />
      <Footer />
    </>
  )
}

export default Home
