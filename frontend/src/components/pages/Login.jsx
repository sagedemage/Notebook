/* Login Page */

import { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error_status, setErrorStatus] = useState(false);
    const [msg_error, setMsgError] = useState('');

    const handleUsernameChange = err => {
        setUsername(err.target.value)
    }

    const handlePasswordChange = err => {
        setPassword(err.target.value)
    }

    const handleSubmit = async err => {
        /* Login and create User Session Cookie */
        err.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            username: username,
            password: password,
        }).then((response) => {
            const cookies = new Cookies();
            if (response.data.auth === true) {
                // set cookie
                cookies.set('token', response.data.token)
                console.log('Success')
                window.location.href = '/dashboard'
            }
            else {
                // display error message
                setErrorStatus(true)
                setMsgError(response.data.err_msg)
            }
        }).catch(err => {
            console.log(err)
        })
    };

    return (
        <>
             { error_status === true && 
                <div className="alert alert-danger" roles="alert">
                    { msg_error }
                </div>
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
    )
}