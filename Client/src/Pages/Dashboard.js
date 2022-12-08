import React, { useEffect } from 'react'
import { MDBCard, MDBCardFooter, MDBCardBody, MDBValidation, MDBBtn, MDBSpinner, MDBAccordionItem,MDBValidationItem, MDBCardGroup, MDBRow, MDBCol, MDBCardImage, MDBCardTitle, MDBCardText, MDBIcon } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import { deleteTour, getToursByUser } from '../Redux/Features/tourSlice';
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import {toast} from "react-toastify"


export default function Dashboard() {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> ({...state.auth}));
    const {loading, userTours} = useSelector((state)=>({...state.tour}));
    const userId = user?.result[0]?._id;
    
    useEffect(()=> {
        if(userId) dispatch(getToursByUser(userId));
    },[userId])

    const excerpt = (str) => {
        if(str.length > 40) {
            str= str.substring(0, 40)+"...";
        }
        return str;
    }

    const deletHandler = (id) => {
        dispatch(deleteTour({id,toast}));
    }

    if(loading) {
        return <Spinner/>
    }

  return (
    <div
        style={{
            margin: "auto",
            padding: "120px",
            maxWidth: "900px",
            alingContent: "center",
        }}
    >
        <h4 className='text-center'>Dashboard: {user?.result[0]?.name}</h4>
        <hr style={{maxWidth: "570px"}}/>
        {
            userTours && userTours.map((item)=>(
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{maxWidth: "600px"}} className="mt-2">
                        <MDBRow className='g-0'>
                            <MDBCol md="4">
                                <MDBCardImage
                                src={item.imageFile}
                                alt={item.title}
                                fluid
                                className="rounded"
                                style={{height: "100px"}}
                                />
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start'>
                                        {item.title}
                                    </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className='text-muted'>
                                            {excerpt(item.description)}
                                        </small>
                                    </MDBCardText>
                                    <div
                                        style={{
                                            marginLeft: '5px',
                                            float: 'right',
                                            marginTop: '-60px'
                                        }}
                                    >
                                        <MDBBtn className='mt-1' tag='a' color="none">
                                            <MDBIcon
                                                fas
                                                icon='trash'
                                                style={{color: '#dd4b39'}}
                                                size='lg'
                                                onClick= {()=>deletHandler(item._id)}
                                            />
                                        </MDBBtn>
                                        <Link to={`/editTour/${item._id}`}>
                                            <MDBIcon
                                                fas
                                                icon='edit'
                                                style={{color: '#55acee', marginLeft: '10px'}}
                                                size='lg'
                                            />
                                        </Link>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))
        }
    </div>
  )
}
