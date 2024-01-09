
import { Outlet } from 'react-router-dom';

export default function AuthRoute({ isAuth }) {
  if (isAuth === false) {
    return (
      <div>
        <h1> Unathorized User </h1>
        <p> The User is Unauthorized. Click <a href="/">here</a> to go back</p>
      </div>
    );
  }

  return <Outlet />;
}
