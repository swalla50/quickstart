import React, { useEffect, useContext, useCallback } from "react";

import Header from "./Components/Headers";
import Products from "./Components/ProductTypes/Products";
import Items from "./Components/ProductTypes/Items";
import Context from "./Context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Bank from "./Pages/Bank";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return(
  <BrowserRouter>
    
      
        
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="bank" element={<Bank />} /
        ><Route path="home" element={<Home />} />
      </Routes>

  </BrowserRouter>
  )
};
  

export default App;
