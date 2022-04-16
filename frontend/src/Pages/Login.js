import axios from 'axios';
import { userInfo } from 'os';
import { User } from 'plaid-threads';
import React, { Component, SyntheticEvent, useContext, useState } from 'react'
import AuthContext from '../Context/AuthProvider';
import logo from '../assets/images/altbookwithtext.png';
import './Login.css'
import { Router, Route, Navigate, Routes, useNavigate} from 'react-router-dom';


function Login () {
 
    // const [UserName, setUserName] = useState('');
    // const [Password, setPassword] = useState ('');
    // const [success, setSuccess] = useState (false);

     const submit =  e => {
        e.preventDefault();

        const data = {
            UserName: this.UserName,
            Password: this.Password
        }

        

        axios.post('applicationuser/login',  data)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            console.log(res.data.token);
            window.location.href = "/home";
        })
        .catch(err =>{
            console.log(err);
        })
        
    }

     console.log("token",localStorage.getItem('token'))
    
    //     try{
    //         const response = await axios.post('https://webapi20220126203702.azurewebsites.net/api/applicationuser/login', 
    //         JSON.stringify({UserName,Password}),
    //         {
    //             headers: {'Content-Type': 'application/json'},
                
    //         }
    //     )
    //     console.log(JSON.stringify(response?.data));
    //     // console.log(JSON.stringify(response));
    //     const accessToken= response?.data?.accessToken;
            
    //         setUserName('');
    //         setPassword('');
    //         setSuccess(true);
    //     }catch(err){
    //         console.log("error happened")
    //     }
    // }
    // const navigate = useNavigate();

    // // React.useEffect(() => {
    // //     if (success) {
    // //       navigate('/home');
    // //     }
    // //   });
    
    return (
        
            <div className ="login">
                <form className="form-signin" onSubmit={submit}> 
                <img  className="login-form-logo" src={logo}/>
                <div className='Email-label'>
                    <label htmlFor="inputEmail" className="sr-only">User Name</label>
                </div>
                <input type="text" name ="UserName"id="UserName" className="form-control" placeholder="User Name" required autoFocus 
                    onChange={e => this.UserName = e.target.value}
                />
                <div className='Password-label'>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                </div>
                <input name="UserName" type="password" id="Password" className="form-control" placeholder="Password" required 
                    onChange={e => this.Password = e.target.value}
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
