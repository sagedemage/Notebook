import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import logout from '../auth/logout';

/**
 * AuthLinks UI Component
 * @param {object} root0 Object containing the props
 * @param {boolean} root0.isAuth isAuth prop to check authetication for a route
 * @returns {React.ReactHTMLElement} Returns the HTML element
 */
export default function AuthLinks({ isAuth }) {
  if (isAuth === true) {
    // Links that require authentication
    return (
      <Nav className='ms-auto'>
        <NavDropdown
          id="nav-dropdown"
          title="Account"
          menuVariant="dark">
          <NavDropdown.Item href="/dashboard">Notes</NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => logout()}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  } else {
    // Links that do not require authentication
    return (
      <Nav className='ms-auto'>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    );
  }
}
