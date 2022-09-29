import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const isLogin = localStorage.getItem("isLogin");
    console.log("Is User Login?", isLogin);

    return (
        isLogin ? children : <Navigate to="/adminlogin" />
    );
}

export default ProtectedRoute;