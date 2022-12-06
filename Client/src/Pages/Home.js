import React, { useEffect } from 'react'
import {MDBCol,MDBRow,MDBContainer,MDBTypography} from "mdb-react-ui-kit"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getTours } from '../Redux/Features/tourSlice';

export default function Home() {
  const dispatch = useDispatch();
  const {tours,loading} = useSelector((state)=> ({...state.tour}))
  useEffect(()=>{
    dispatch(getTours());
  },[])

  if(loading) {
    return <>loading....</>
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
                {tours && tours.map((item)=> <>Tour data</>)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}
