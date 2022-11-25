import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
function Allroutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/login" element={<Login/>}/>
            <Route path ="/signup" element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Allroutes