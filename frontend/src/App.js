
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Movies from './components/Movies/Movies';
import Admin from './components/Admin/Admin';
import Auth from './components/Auth/User';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminActions, userActions } from './store';
import Booking from './components/Bookings/Booking';
import UserProfile from './profile/UserProfile';
import AddMovie from './components/Movies/AddMovie';
import AdminProfile from './profile/AdminProfile';

function App() {
  const dispatch= useDispatch();
  const isAdminLoggedIn =useSelector((state)=> state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector( (state) => state.user.isLoggedIn);

  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(()=>{
    if(localStorage.getItem("userId")){
       dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId"))
      {
        dispatch(adminActions.login());
      }
  },[dispatch])

  return (
    <>
    <div>
    <Header></Header>
    </div>
    <section>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route exact path='/movies' element={<Movies/>}/>
        
        {!isUserLoggedIn && !isAdminLoggedIn && (
          <>
        {" "}
          <Route exact path='/admin' element={<Admin />}/>
        <Route exact path='/auth' element={<Auth/>}/>
        </>
        )}

      { isUserLoggedIn && !isAdminLoggedIn && ( 
      <>
      {" "}
     <Route exact path='/user' element={<UserProfile/>}/>
        <Route exact path='/booking/:id' element={<Booking/>}/>
        </>
)}

     {isAdminLoggedIn && !isUserLoggedIn && ( 
      <>
      {" "}
      <Route exact path='/add' element={<AddMovie/>}/>
        <Route exact path='/user-admin' element={<AdminProfile/>}/>
        </>
      )}
        
      </Routes>
    </section>
    </>
  );
}

export default App;
