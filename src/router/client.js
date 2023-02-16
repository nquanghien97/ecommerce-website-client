import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from '../pages/Home';
import Header from '../pages/Header';
import Product from '../pages/Product';
import SignIn from '../pages/sign-in';
import SignUp from '../pages/sign-up';
import WishList from '../pages/wishList';
import AllProducts from '../pages/AllProducts';
import FilterProducts from '../pages/FilterProducts';
import SearchResult from '../pages/SearchResult';

function Client() {

  const currentUser = useSelector((state) => state.user.user)

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        <Route path='/product/:id' element={<Product />} />
        <Route path='/sign-in' element={ currentUser ? <Navigate to="/" replace /> : <SignIn />} />
        <Route path='/sign-up' element={ currentUser ? <Navigate to="/" replace /> : <SignUp />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/allproducts' element={<AllProducts />} />
        <Route path='/female' element={<FilterProducts />} />
        <Route path='/male' element={<FilterProducts />} />
        <Route path='/search' element={<SearchResult />}/>
      </Routes>
    </>
  )
}


export default Client;
