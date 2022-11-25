import React, { useState } from 'react'
import { MDBCard, MDBCardBody, MDBCardFooter, MDBInput, MDBValidation, MDBBtn, MDBIcon, MDBSpinner } from "mdb-react-ui-kit"
import { Link } from "react-router-dom"

let initState = {
    email: "",
    password: ""
}
function Login(props) {
    const [formValue, setFormValue] = useState(initState);
    const { email, password } = formValue;
    return (
        <div style={{   margin: "auto",
                        padding: "15px",
                        maxWidth: "450px", 
                        alignContent: "center", 
                        marginTop: "120px" 
                    }}
                >
                        Login
                        </div>
    )
}


export default Login
