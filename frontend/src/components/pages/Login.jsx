import React from 'react';

import { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

/**
 * Login Page Component
 * @returns {React.ReactHTMLElement} Returns the HTML element
 */
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [msgError, setMsgError] = useState('');

  const handleUsernameChange = (err) => {
    setUsername(err.target.value);
  };

  const handlePasswordChange = (err) => {
    setPassword(err.target.value);
  };

  const handleSubmit = async (err) => {
    /* Login and create User Session Cookie */
    err.preventDefault();
    axios.post('http://localhost:8000/api/login', {
      username: username,
      password: password,
    }).then((response) => {
      const cookies = new Cookies();
      if (response.data.auth === true) {
        // set cookie
        cookies.set('token', response.data.token);
        console.log('Success');
        window.location.href = '/dashboard';
      } else {
        // display error message
        setErrorStatus(true);
        setMsgError(response.data.err_msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      {errorStatus === true &&
        <Alert variant='danger'>
          {msgError}
        </Alert>
      }
      <h1>Login</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="InputUsername">Email or Username</label>
          <input className="form-control" id="InputUsername"
            name="username" placeholder="Enter email or username"
            value={username}
            onChange={handleUsernameChange}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="InputPassword">Password</label>
          <input type="password" className="form-control" id="InputPassword"
            name="password" placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
