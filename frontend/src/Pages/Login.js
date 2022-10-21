import axios from 'axios';
import { userInfo } from 'os';
import { User } from 'plaid-threads';
import React, { Component, SyntheticEvent, useContext, useState } from 'react'
import AuthContext from '../Context/AuthProvider';
import logo from '../assets/images/altbookwithtext.png';
import './Login.css'
import { Router, Route, Navigate, Routes, useNavigate, Link} from 'react-router-dom';
import { render } from '@testing-library/react';
import Auth from '../Auth/Auth';


export default class Login extends Component  {

    state={}

      submit =  (e) => {
        e.preventDefault();

        const data = {
            UserName: this.UserName,
            Password: this.Password
        }

        

        axios.post('applicationuser/login',  data)
        .then(res => {
            localStorage.setItem('token', res.data.token)
            console.log(res.data.token);

            this.setState({
                loggedIn: true
            });
            Auth.login();
            this.props.setUser(res.data.user);
            window.history.pushState("", "", "/home");
        })
        .catch(err =>{
            console.log(err);
        })
        
        
    }
    

     
    
   
    render(){
        if(localStorage.getItem('token')){
             <Navigate to="/home"/>
             window.history.pushState("", "", "/home");
             window.location.reload()
        }
        
    return (
            <div className ="login">
                <form className="form-signin" onSubmit={this.submit}> 
                <img  className="login-form-logo" src={logo}/>
                <div className='Email-label'>
                    <label htmlFor="inputEmail" className="sr-only">User Name</label>
                </div>
                <input type="text" id="UserName" className="form-control" placeholder="User Name" required 
                    onChange={e => this.UserName = e.target.value}
                />
                <div className='Password-label'>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                </div>
                <input  type="password" id="Password" className="form-control" placeholder="Password" required 
                    onChange={e => this.Password = e.target.value}
                />
                <div className="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                </label>
                </div>
                <button  className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
                <p className="mt-5 mb-0 text-muted">&#174; 2021</p>
                <p className="mb-3 text-muted">Altnetix LLC</p>
                </form>
            </div>

        );
  
    }
}

