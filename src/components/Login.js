import React from 'react'
import firebase from 'firebase'

import { auth } from '../firebase'

const Login = () => {
    const handleClick = (e) => {
        if(e.target.classList.contains('login-google')) {
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        } else {
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        }
    }

    return (
        <main className="login-section">
            <div className="login-container">
                <h2 className="login-title">Please Select Login</h2>
                <div className="login-options-container">
                    <div className="login-google login" onClick={e => handleClick(e)}><i className="fab fa-google"></i> Login with Google</div>
                    <div className="login-facebook login" onClick={e => handleClick(e)}><i className="fab fa-facebook-f"></i> Login with Facebook</div>
                </div>
            </div>
        </main>
    )
}

export default Login