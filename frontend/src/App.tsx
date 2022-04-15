import React, { useEffect, useContext, useCallback } from "react";

import Header from "./Components/Headers";
import Products from "./Components/ProductTypes/Products";
import Items from "./Components/ProductTypes/Items";
import Context from "./Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Bank from "./Pages/Bank";
import Register from "./Pages/Register";



const App = () => {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="bank" element={<Bank />} />
    </Routes>
  </BrowserRouter>
  )
};
  

export default App;
