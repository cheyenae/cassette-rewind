import React,{useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from './AppContext';
import {
  Nav,
  Bars,
  NavMenu,
} from './navbarelements';


const NavbarAdmin = () => {
    const myContext = useContext(AppContext);
    let isLoggedIn = myContext.valueIsLoggedIn;
    console.log(isLoggedIn);
  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
        <NavLink to='/adminhome'>
            <button type="button" class="btn btn-secondary me-3">HOME</button>
          </NavLink>
          <NavLink to='/adminlist' >
            <button type="button" class="btn btn-secondary me-3 text-nowrap">REVIEW LIST</button>
          </NavLink>
          <NavLink to='/adminapprovals' >
            <button type="button" class="btn btn-secondary me-3 text-nowrap">APPROVALS</button>
          </NavLink>
          <NavLink to='/newreview' >
            <button type="button" class="btn btn-secondary me-3 text-nowrap">NEW REVIEW</button>
          </NavLink>
          {isLoggedIn &&
            <NavLink to='/adminlogout' >
            <button type="button" class="btn btn-secondary me-3 text-nowrap">LOG OUT</button>
            
          </NavLink>
}

          
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default NavbarAdmin;