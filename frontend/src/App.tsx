import React, { useEffect, useContext, useCallback, useState } from "react";

import Header from "./Components/Headers";
import Products from "./Components/ProductTypes/Products";
import Items from "./Components/ProductTypes/Items";
import Context from "./Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Bank from "./Pages/Bank";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import axios from "./api/axios";



const App = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState ('');
  const [success, setSuccess] = useState (false);

    const submit = async (e:any) => {
        e.preventDefault();

        try{
            const response = await axios.post('https://webapi20220126203702.azurewebsites.net/api/applicationuser/login', 
          ({UserName,Password}),
            {
                headers: {'Content-Type': 'application/json'},
                
            }
        )
        console.log(response.data.token.JSON);
        // console.log(JSON.stringify(response));
        const accessToken= response?.data?.accessToken;
        console.log("Token",accessToken);
            
            setUserName('');
            setPassword('');
            setSuccess(true);
        }catch(err){
            console.log("error happened")
        }
    }
    
  return(
    

  <BrowserRouter>
  
  <>
    <Routes>
      
      
      {success? (
      <><Route path="register" element={<Register />} /><Route path="bank" element={<Bank />} /><Route path="home" element={<Home />} /></>
      ) : (
        <Route path="/" element={<Login />} />

        )}
        
    </Routes>
    </>
    
  </BrowserRouter>

    
    
 
  )
};
  

export default App;
