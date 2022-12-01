import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBInput, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBValidationItem } from "mdb-react-ui-kit"
import { Link,useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import {toast, ToastContainer} from "react-toastify";
import { register } from '../Redux/Features/authSlice';

let initState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
}
function Register(props) {
    const [formValue, setFormValue] = useState(initState);
    const {loading,error} = useSelector((state)=>({...state.auth}));
    const { email, password, firstName, lastName, confirmPassword } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        error && toast.error(error);
    },[error])
    const handleSubmit = (e) => {
        e.preventDefault();
        if(confirmPassword !== password) {
          return toast.error("Password not match");
        }
        if(firstName && lastName && email && password && confirmPassword) {
          dispatch(register({formValue,navigate,toast}))
        }
    };
    const onInputChange = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    return (
        <div style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px"
        }}
        >
            <MDBCard alignment='center'>
                <MDBIcon fas icon='user-circle' className='fa-2x' />
                <h5>Sign Up</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                        <div className='col-md-6'>
                              <MDBValidationItem feedback='Please enter your first name ' invalid>
                                  <MDBInput
                                      label="First Name"
                                      type="name"
                                      name="firstName"
                                      value={firstName}
                                      onChange={onInputChange}
                                      required
                                  />
                              </MDBValidationItem>
                        </div>
                        <div className='col-md-6'>
                              <MDBValidationItem feedback='Please enter your last name' invalid>
                                  <MDBInput
                                      label="Last Name"
                                      type="name"
                                      name="lastName"
                                      value={lastName}
                                      onChange={onInputChange}
                                      required
                                  />
                              </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback='Please enter your email' invalid>
                                <MDBInput
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback='Please provide  your password' invalid>
                                <MDBInput
                                    label="Password"
                                    type="password"
                                    name='password'
                                    value={formValue.password}
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback='Confirm your password' invalid>
                                <MDBInput
                                    label="Password"
                                    type="password"
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBBtn style={{ width: "100%" }} className="mt-2">
                                {
                                    loading && (
                                        <MDBSpinner
                                            size='sm'
                                            role="status"
                                            tag="span"
                                            className="me-2"
                                        />
                                    )
                                }
                                Register
                            </MDBBtn>
                        </div>

                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/login">
                        <p>Already have an account ? Sign in</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}


export default Register;
