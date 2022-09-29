import React,{useEffect,useContext} from 'react';
import AppContext from "../../AppContext";
export default function Logout() {
    const myContext = useContext(AppContext);
    useEffect(() => {
        myContext.toggleShowAdminMenu(false)
        myContext.toggleIsLoggedIn(false)
      });
  return (<div class="logindiv"><h2>You have been logged out</h2></div>)
  
}