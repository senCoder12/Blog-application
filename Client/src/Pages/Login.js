import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBInput, MDBValidation, MDBBtn, MDBIcon, MDBSpinner, MDBValidationItem } from "mdb-react-ui-kit"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { login } from '../Redux/Features/authSlice';
import GoogleLogin from 'react-google-login';
// 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
let initState = {
    email: "",
    password: ""
}
function Login(props) {
    const [formValue, setFormValue] = useState(initState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error])
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ formValue, navigate, toast }))
    };
    const onInputChange = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    const googleSuccess = (resp) => {
        console.log(resp);
     }
    const googleFailure = (err) => {
     }

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
                <h5>Sign In</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback='Please enter your email' invalid>
                                <MDBInput
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formValue.email}
                                    onChange={onInputChange}
                                    required
                                />
                            </MDBValidationItem>
                        </div>
                        <div className='col-md-12'>
                            <MDBValidationItem feedback='Please provide your password' invalid>
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
                                Login
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                    <GoogleLogin
                        clientId="513261793782-4vfrgu0ibp0uq6ikihnh09qllvc5bq2r.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <MDBBtn style={{ width: "100%", marginTop: "15px" }} color="danger"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <MDBIcon className='me-2' fab icon='google' /> Google sign in
                            </MDBBtn>
                        )}
                        buttonText="Login"
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to="/register">
                        <p>Don't have an account ? Sign up</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    )
}


export default Login
