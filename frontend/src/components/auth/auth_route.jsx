import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Wrap Authentication for Routes
 * @param {object} root0 Object containing the props
 * @param {boolean} root0.isAuth isAuth prop to check authetication for a route
 * @returns {React.ReactHTMLElement} Returns the HTML element
 */
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
