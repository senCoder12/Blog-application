import React, { useEffect } from 'react'
import {MDBCol,MDBRow,MDBContainer,MDBTypography} from "mdb-react-ui-kit"
import { useDispatch, useSelector } from 'react-redux'
import { getTours, setCurrentPage } from '../Redux/Features/tourSlice';
import CardTour from '../Components/cardTour';
import Spinner from '../Components/Spinner';
import Pagination from '../Components/Pagination';

export default function Home() {
  const dispatch = useDispatch();
  const {tours,loading,currentPage,noOfPages} = useSelector((state)=> ({...state.tour}));

  useEffect(()=>{
    dispatch(getTours(currentPage));
  },[currentPage])

  if(loading) {
    return <Spinner/>
  }
  return (
    <div style={{margin: "auto",padding: "15px", maxWidth: "1000px", alignContent: "center"}}>
      <MDBRow className='mt-5'>
        {
          tours.length==0 && (
            <MDBTypography className='text-center mb-0' tag="h2">
              No Tour Found
            </MDBTypography>
          )
        }
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-3'>
                {tours && tours.map((item)=> <CardTour key={Math.random()} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={noOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
    </div>
  )
}
