import React,{Fragment,useState} from 'react';
import './App.css';
import Home from './components/Home/home';
import Review from './components/Review/review';
import ReviewList from './components/Review/reviewlist';
import LatestReviews from './components/Review/latestreviews';
import SiteInformation from './components/SiteInformation/siteinformation';
import Login from './components/Login/login';
import Logout from './components/Login/logout';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import headerimage from './assets/rewind1.jpg'
import headerimage2 from './assets/cassrewind.png'
import Navbar from './navbar';
import NavbarAdmin from './navbaradmin';
import AdminMain from './components/Admin/adminmain';
import AdminList from './components/Admin/adminlist';
import EditReview from './components/Admin/editreview';
import NewReview from './components/Admin/newreview';
import ProtectedRoute from './ProtectedRoute';
import AppContext from './AppContext';
import ViewApprovals from './components/Admin/viewapprovals';
function App() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleShowAdminMenu = (newvalue) => {
      setShowAdminMenu(newvalue);
  };
  const toggleIsLoggedIn= (newvalue) => {
    setIsLoggedIn(newvalue);
};
  const appSettings = {
    valueShowAdminMenu: showAdminMenu,
    toggleShowAdminMenu,
    valueIsLoggedIn: isLoggedIn,
    toggleIsLoggedIn,
  };
  
  return (
    
    <div className="wrapper">
      <div className='left-column' >
      
      </div>
      
      <div className='center-column'>
        <img src={headerimage} alt="" height='100' width="15%" />
        <img src={headerimage2} alt="" height='100' width="70%" />
        <img src={headerimage} alt="" height='100' width="15%" />
        <br />

         
    <AppContext.Provider value={appSettings}>    
    <BrowserRouter>
    {
      
    showAdminMenu ? isLoggedIn ?  <NavbarAdmin /> : <Navbar /> : <Navbar />
    }
      <Fragment>
      
        <Routes>
        <Route exact path='/' element={<Home/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/latestreviews' element={<LatestReviews/>}/>
          <Route exact path='/reviewlist' element={<ReviewList/>}/>
          <Route exact path='/siteinfo' element={<SiteInformation/>}/>
          <Route exact path='/reviewdetails' element={<Review/>}/>
          <Route exact path='/adminlogin' element={<Login/>}/>
          <Route path="/adminhome" element={<ProtectedRoute><AdminMain /></ProtectedRoute>}/>
          <Route path="/adminapprovals" element={<ProtectedRoute><ViewApprovals /></ProtectedRoute>}/>
          <Route path="/adminlist" element={<ProtectedRoute><AdminList /></ProtectedRoute>}/>
          <Route path="/editreview" element={<ProtectedRoute><EditReview /></ProtectedRoute>}/>
          <Route path="/newreview" element={<ProtectedRoute><NewReview /></ProtectedRoute>}/>
          <Route exact path='/adminlogout' element={<Logout/>}/>
         </Routes>
         
      </Fragment>
    </BrowserRouter>
    </AppContext.Provider>
    <br /><br /><br />
    <div class="footer1 text-center p-4 bg-secondary text-white">
      © 2022 Copyright:&nbsp;
          <a class="text-reset fw-bold" href="https://www.linkedin.com/in/rodney-batten-ab7a67244/">KayDylMad Software</a>
      </div>

  
      </div>
      <div className='right-column'>
      </div>

    </div>
    
  );
}

export default App;
