
import { Navigate, Outlet, useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"

export default function AuthRoute({isAuth}) {
    const origin = useLocation()

    if (isAuth !== true) {
        return (
            <div>
                <h1> Unathorized User </h1>
                <p> The User is Unauthorized. Click <a href="/">here</a> to go back</p>
            </div>
        );
    }

    return isAuth ? <Outlet /> : <Navigate to="/" replace state={{ from: origin}} />
}