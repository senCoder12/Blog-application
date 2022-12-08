import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import AddEditTour from '../Pages/addEditTour.js'
import SingleTour from '../Pages/SingleTour'
import Dashboard from '../Pages/Dashboard'
import Privateroute from './Privateroute'
import NotFoundPage from '../Pages/NotFoundPage'
function Allroutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/login" element={<Login/>}/>
            <Route path ="/register" element={<Register/>}/>
            <Route path ="/addTour" element={<Privateroute><AddEditTour/></Privateroute>}/>
            <Route path ="/editTour/:id" element={<Privateroute><AddEditTour/></Privateroute>}/>
            <Route path ="/tour/:id" element={<SingleTour/>}/>
            <Route path ="/dashboard" element={<Privateroute><Dashboard/></Privateroute>}/>
            <Route path= "*" element= {<NotFoundPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Allroutes