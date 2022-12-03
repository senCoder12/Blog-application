import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardFooter, MDBCardBody, MDBValidation, MDBBtn, MDBSpinner, MDBAccordionItem,MDBValidationItem } from "mdb-react-ui-kit"
import ChipInput from "material-ui-chip-input"
import FileBase from "react-file-base64"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createTour } from '../Redux/Features/tourSlice'

let initialState = {
    title: "",
    description: "",
    tags: []
}

export default function AddEditTour() {
    const [tourData, setTourData] = useState(initialState);
    let { title, description, tags } = tourData;
    const {user} = useSelector((state)=>({...state.auth}))
    const {error,loading} = useSelector((state)=>({...state.tour}))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error])

    const handleInputChange= (e) => {
        const {name,value} = e.target;
        setTourData({...tourData,[name]:value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(title && description && tags) {
            const updatedTourData = {...tourData,name: user.result[0].name,creator: user.result[0]._id}
            dispatch(createTour({updatedTourData,navigate,toast}))
            handleClear();
        }
    }
    const handleAddTag= (tag) => {
        setTourData({...tourData,tags:[...tourData.tags,tag]});
    }
    const handleDeleteTag= (deleteTag) =>{
        setTourData({...tourData,tags:tourData.tags.filter((tag)=>tag!=deleteTag)});
    }
    const handleClear = () => {
        setTourData({title:"",description:"",tags:[]})
    }
    

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }} className="container">
            <MDBCard alignment='center'>
                <h5>Add Tour</h5>
                <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                    <div className='col-md-12'>
                    <MDBValidationItem feedback='Please provide a title' invalid>
                        <input
                            placeholder='Enter Title'
                            type="text"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            className='form-control'
                            required
                        />
                    </MDBValidationItem>
                    </div>
                    <div className='col-md-12'>    
                        <MDBValidationItem feedback='Please provide the description' invalid>
                            <textarea
                                placeholder='Enter Description'
                                type="text"
                                style={{height:"100px"}}
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                                className='form-control'
                                required
                            />
                        </MDBValidationItem>
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
                    <div className="d-flex justify-content-start">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64})=> setTourData({...tourData,imageFile:base64})}
                        />
                    </div> 
                    <div className='col-md-12'>
                        <MDBBtn style={{width:"100%"}}>
                                {
                                    loading && (
                                        <MDBSpinner
                                            size='sm'
                                            role="status"
                                            tag="span"
                                            className="me-2"
                                        />
                                    )
                                }Submit</MDBBtn>
                        <MDBBtn style={{width:"100%",marginTop:"10px"}} color='danger' onClick={handleClear}>Cancel</MDBBtn>
                    </div>
                </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}
