import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Bars,
  NavMenu,
} from './navbarelements';


const Navbar = () => {

  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/home'>
            <button type="button" class="btn btn-secondary me-3">HOME</button>
          </NavLink>
          <NavLink to='/latestreviews' >
            <button type="button" class="btn btn-secondary me-3 text-nowrap">LATEST(S) REVIEW</button>
          </NavLink>
          <NavLink to='/reviewlist' >
            <button type="button" class="btn btn-secondary me-3 text-nowrap">REVIEW LIST</button>
            
          </NavLink>
          <NavLink to='/siteinfo' >
            <button type="button" class="btn btn-secondary me-3 text-nowrap">SITE INFOMATION</button>
            
          </NavLink>
          
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;


