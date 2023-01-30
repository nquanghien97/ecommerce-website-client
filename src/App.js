import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { setCurrentUser } from './redux/User/user.actions'
import { auth, handleUserProfile } from './firebase/utils'
import Home from './pages/Home'
import Header from './pages/Header'
import Cart from './pages/Cart'
import Product from './pages/Product'
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import WishList from './pages/wishList';
import AllProducts from './pages/AllProducts';
import FilterProducts from './pages/FilterProducts';

function App(props) {

  const { currentUser, setCurrentUser } = props
  useEffect(() =>{
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth)
    })
    return() => {
      authListener()
    } 
  },[setCurrentUser])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/sign-in' element={ currentUser ? <Navigate to="/" replace /> : <SignIn />} />
        <Route path='/sign-up' element={ currentUser ? <Navigate to="/" replace /> : <SignUp />} />
        <Route path='/wishlist' element={<WishList />} />
        <Route path='/allproducts' element={<AllProducts />} />
        <Route path='/female' element={<FilterProducts />} />
        <Route path='/male' element={<FilterProducts />} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
