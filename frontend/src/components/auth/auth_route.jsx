
import { Navigate, Outlet, useLocation } from 'react-router-dom'

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