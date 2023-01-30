import React from 'react'
import Festival from '../components/homePage/Festival'
import Ultraboot from '../components/homePage/Ultraboot'
import Saleoff from '../components/homePage/Saleoff'
import Popular from '../components/homePage/Popular'
import Interested from '../components/homePage/Interested'
import Trending from '../components/homePage/Trending'
import Shoes from '../components/homePage/Shoes'
import Shoppingfor from '../components/homePage/Shoppingfor'
import Notifications from '../components/homePage/Notifications'
import Info from '../components/homePage/Info'

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
      <Info />
    </>
  )
}

export default Home
