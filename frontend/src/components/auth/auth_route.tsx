
import { Navigate, Outlet, useLocation } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"

export default function AuthRoute() {
    const origin = useLocation()
    const [isAuth, setAuth] = useState(false)

    useEffect(() => {
        /* Check authentication of the app */
        const cookies = new Cookies()
        const token = cookies.get("token")
        if (token !== undefined) {
            axios.post("http://localhost:8000/api/get-decoded-token", {
                token: token,
            }).then((response) => {
                if (response.data.auth === true) {
                    setAuth(true)
                }
                else {
                    setAuth(false)
                }
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            setAuth(false)
        }
    }, [])

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