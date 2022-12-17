import React, { useEffect, useState } from 'react'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBNavbarToggler,
    MDBNavbarBrand
} from "mdb-react-ui-kit"
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../Redux/Features/authSlice';
import { getTours, getToursBySearch } from '../Redux/Features/tourSlice';
import { useNavigate } from 'react-router-dom';
import decode from "jwt-decode";
import LoadingToRedirect from './LoadingToRedirect';

function Header() {
    const { user } = useSelector(state => ({ ...state.auth }))
    const [show, setShow] = useState(false);
    const [search,setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = user?.token;

    if(token) {
        const decodeToken = decode(token);
        if(decodeToken.exp * 1000 < new Date().getTime() ) {
            dispatch(setLogout());
        }
    }

    const handleLogout = () => {
        localStorage.clear("profile");
        dispatch(setLogout());
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(search) {
            dispatch(getToursBySearch(search));
            navigate(`/tours/search?searchQuery=${search}`)
        } else {
            dispatch(getTours());
            navigate("/");
        }
        setSearch("");
    }

    return (
        <MDBNavbar fixed='top' expand="lg" style={{ backgroundColor: "#f0e6ea" }}>
            <MDBContainer>
                <MDBNavbarBrand href='/' style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}>
                    Touropedian
                </MDBNavbarBrand>
                <MDBNavbarToggler type='button' aria-expanded="false" aria-label='toggle navigation' onClick={() => setShow(!show)} style={{ color: "#606080" }}>
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {user?.result[0]?._id && (
                            <h5 style={{ marginTop: "27px", marginRight: "17px" }}>Logged in as: {user.result[0].name}</h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'>
                                <p className='header-text'>Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result[0]?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/addTour'>
                                        <p className='header-text'>Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/dashboard'>
                                        <p className='header-text'>Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result[0]?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className='header-text' onClick={handleLogout}>Logout</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>
                                    <p className='header-text'>Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                    <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Tour"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                            <MDBIcon fas icon="search" />
                        </div>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header