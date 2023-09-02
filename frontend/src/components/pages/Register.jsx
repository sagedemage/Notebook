/* Register Page */

import { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [confirm, setConfirm] = useState('')
    const [error_status, setErrorStatus] = useState(false)
    const [pwd_error_status, setPwdErrorStatus] = useState(false)
    const [msg_error, setMsgError] = useState('')

    const handleEmailChange = event => {
        setEmail(event.target.value)
    }

    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }

    const handleConfirmChange = event => {
        setConfirm(event.target.value)
    }

    const handleSubmit = async (event) => {
        /* Registration Submission */
        event.preventDefault()

        // reset error messages after submission
        setErrorStatus(false)
        setPwdErrorStatus(false)

        if (password.length < 8) {
            setPwdErrorStatus(true)
            setMsgError('Password should be 8 characters or more!')
        }
        else if (password !== confirm) {
            setErrorStatus(true)
            setMsgError('Passwords do not match!')
        }
        else {
            axios.post('http://localhost:8000/api/register', {
                email: email,
                username: username,
                password: password
            }).then((response) => {
                if (response.data.registered === true) {
                    window.location.href = '/login'
                }
                else {
                    setErrorStatus(true)
                    setMsgError(response.data.err_msg)
                }
            }).catch(event => {
                console.log(event)
            })
        }
    }

    return (
        <>
            {error_status === true &&
                <div className="alert alert-danger" role='alert'>
                    {msg_error}
                </div>
            }
            <h1>Register</h1>
            <div className="row">
                <div id="register_form" className="col col-lg-8">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email Address</label>
                            <input type="email" className="form-control" id="email"
                                name="email" placeholder="Enter email"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={handleEmailChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input className="form-control" id="username"
                                name="username" placeholder="Enter username"
                                value={username}
                                onChange={handleUsernameChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword"
                                name="password" placeholder="Enter password"
                                value={password}
                                onChange={handlePasswordChange}
                                required />
                            {pwd_error_status === true &&
                                <div className="text-danger">
                                    <small>{msg_error}</small>
                                </div>
                            }
                        </div>
                        <div className="form-group">
							<label htmlFor="inputConfirm">Confirm</label>
							<input type="password" className="form-control" id="inputConfirm"
								name="confirm" placeholder="Enter password again"
								value={confirm}
								onChange={handleConfirmChange}
								required />
						</div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}