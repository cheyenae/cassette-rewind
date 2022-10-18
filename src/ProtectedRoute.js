import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import AppContext from "./AppContext";
function ProtectedRoute({ children }) {
    const myContext = useContext(AppContext);
    //const isLogin = localStorage.getItem("isLogin");
    let isLogin = myContext.valueIsLoggedIn;
    console.log("Is User Login?", isLogin);

    return (
        isLogin ? children : <Navigate to="/adminlogin" />
    );
}

export default ProtectedRoute;