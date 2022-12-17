import React, { useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBContainer, MDBCardImage, MDBCardText, MDBIcon, MDBBtn } from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import { getRelatedTours, getTour } from '../Redux/Features/tourSlice';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import RelatedTours from '../Components/RelatedTours';

export default function SingleTour() {
    const dispatch = useDispatch();
    const {tour,relatedTours} = useSelector((state)=>({...state.tour}));
    const {id} = useParams();
    const navigate = useNavigate();
    const tags = tour?.tags

    useEffect(() =>{
        dispatch(getRelatedTours(tags));
    },[tags])
    useEffect(()=> {
        dispatch(getTour(id));
    },[id])


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
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
                <MDBIcon fas icon="backward" style={{ float: "left" }} size="2x" />
              {/* <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              /> */}
            </MDBBtn>
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
        <RelatedTours relatedTours={relatedTours} tourId={id}/>
    </MDBContainer>
  )
}
