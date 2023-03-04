import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import DashBoard from './router/dashboard';
import Client from './router/client';
import { useSelector } from 'react-redux';
import Cart from './pages/Cart';
import NotLoginPopup from './components/common/NotLoginPopup';

function App() {
  const openSnackBar = useSelector(state => state.user.openSnackbar)
  const roles =  useSelector((state) => state.user?.user?.user.role)

  return (
    <>
    {openSnackBar ? <NotLoginPopup isOpen={openSnackBar} /> : null}
    <Routes>
      <Route path='/*' element={roles === "admin" ? <Navigate to="/dashboard/" replace />: <Client />} />
      <Route path='/dashboard/*' element={roles === "admin" ? <DashBoard /> : <Client />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    </>
  )
}

export default App;
