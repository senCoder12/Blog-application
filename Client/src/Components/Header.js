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
import { useSelector,useDispatch } from 'react-redux'
import { setLogout } from '../Redux/Features/authSlice';

function Header() {
    const { user } = useSelector(state => ({ ...state.auth }))
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = ()=> {
        localStorage.clear("profile");
        dispatch(setLogout());
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
                            <h5 style={{marginTop: "16px", marginRight:"17px"}}>Logged in as: {user.result[0].name}</h5>
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
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header