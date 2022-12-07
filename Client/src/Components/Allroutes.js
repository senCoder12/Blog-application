import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import AddEditTour from '../Pages/addEditTour.js'
import SingleTour from '../Pages/SingleTour'
function Allroutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/login" element={<Login/>}/>
            <Route path ="/register" element={<Register/>}/>
            <Route path ="/addTour" element={<AddEditTour/>}/>
            <Route path ="/addTour/:id" element={<SingleTour/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Allroutes