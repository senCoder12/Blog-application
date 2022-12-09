import React, { useEffect } from 'react'
import { MDBCard, MDBCardFooter, MDBCardBody, MDBContainer, MDBCardImage, MDBCardText, MDBIcon } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import { getTour } from '../Redux/Features/tourSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export default function SingleTour() {
    const dispatch = useDispatch();
    const {tour} = useSelector((state)=>({...state.tour}));
    const {id} = useParams();
    useEffect(()=> {
        dispatch(getTour(id));
    },[])


  return (
    <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
            <MDBCardImage
                position='top'
                style={{width:'100%', maxHeight:'600px'}}
                src={tour.imageFile}
                alt={tour.title}
            />
            <MDBCardBody>
                <h3>{tour.title}</h3>
                <span>
                    <p className='text-start tourName'>Created By: {tour.name}</p>
                </span>
                <div style={{float: "left"}}>
                    <span className='text-start'>
                        {tour && tour.tags && tour.tags.map((item)=> `#${item} `)}
                    </span>
                </div>
                <br />
                <MDBCardText className='text-start mt-2'>
                    <MDBIcon
                        style={{float: "left", margin: "5px" , marginTop: "13px" , marginRight: "10px"}}
                        far
                        icon='calendar-alt'
                        size='lg'
                    />
                    <small className='text-muted'>
                        {moment(tour.createdAt).fromNow()}
                    </small>
                </MDBCardText>
                <MDBCardText className='lead mb-0 text-start'>
                    {tour.description}
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
  )
}
