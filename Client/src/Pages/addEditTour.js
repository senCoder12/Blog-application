import React, { useState } from 'react'
import { MDBCard, MDBCardFooter, MDBCardBody, MDBValidation, MDBBtn, MDBSpinner } from "mdb-react-ui-kit"
import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const initialState = {
    title: "",
    description: "",
    tags: []
}

export default function AddEditTour() {
    const [tourData, setTourData] = useState(initialState);
    const { title, description, tags } = tourData;

    const handleInputChange= (e) => {
        e.preventDefault();
        const {name,value} = e.target;
        setTourData({...tourData,[name]:value});
    }

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }} className="container">
            <MDBCard alignment='center'>
                <h5>Add Tour</h5>
                <MDBValidation>
                    <div className='col-md-12'>
                        <input
                            placeholder='Enter Title'
                            type="text"
                            value={title}
                            name="title"
                            onchange={handleInputChange}
                            className='form-control'
                            required
                            invalid
                            validation = "Please provide the title"
                        />
                    </div>
                    <div className='col-md-12'>
                        <textarea
                            placeholder='Enter Description'
                            type="text"
                            style={{height:"100px"}}
                            value={description}
                            name="description"
                            onchange={handleInputChange}
                            className='form-control'
                            required
                            invalid
                            validation = "Please provide the description"
                        />
                    </div>
                    <div className='col-md-12'>
                        <ChipInput
                            name="tags"
                            variant='outlined'
                            placeholder='Enter tag'
                            fullWidth
                            value={tags}
                            onAdd= {(tag)=>handleAddTag(tag)}
                            onDelete= {(tag)=>handleDeleteTag(tag)}    
                        />
                    </div>
                </MDBValidation>
            </MDBCard>
        </div>
    )
}
