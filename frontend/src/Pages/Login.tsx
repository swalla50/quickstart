import { userInfo } from 'os';
import { User } from 'plaid-threads';
import React, { SyntheticEvent, useState } from 'react'
import logo from '../assets/images/altbookwithtext.png';
import './Login.css'



const  Login = () => {
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState ('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('https://webapi20220126203702.azurewebsites.net/api/applicationuser/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                UserName,
                Password
            })
        });
    }
    console.log(UserName,Password)
  return (
    
        <div>
            <form className="form-signin" onSubmit={submit}> 
            <img  className="login-form-logo" src={logo}/>
            <div className='Email-label'>
                <label htmlFor="inputEmail" className="sr-only">User Name</label>
            </div>
            <input type="text" name ="UserName"id="UserName" className="form-control" placeholder="User Name" required autoFocus 
                onChange={e => setUserName(e.target.value)}
            />
            <div className='Password-label'>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
            </div>
            <input name="UserName" type="password" id="Password" className="form-control" placeholder="Password" required 
                onChange={e => setPassword(e.target.value)}
            />
            <div className="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"/> Remember me
            </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
            <p className="mt-5 mb-0 text-muted">&#174; 2021</p>
            <p className="mb-3 text-muted">Altnetix LLC</p>
            </form>
        </div>
        
    );
   
}

export default Login