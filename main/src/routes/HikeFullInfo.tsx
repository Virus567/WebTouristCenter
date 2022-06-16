import React,{useState} from 'react';
import {Container, Button, Form} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function HikeFullInfo() {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 1200, min: 1024 },
      items: 3,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  return (
    <div>
      <div className='mt-4 px-3' style={{height:"85%"}}>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3 col-lg-11 col-md-8 mx-auto">
          <div className='col px-3'>
            <Container className='rounded mt-2 mb-2 mx-0 pt-2 px-3' style={{  height:"22rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Команда
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
              
          </Container>
          </div>
          <div className='col px-3'>
            <Container className='rounded mt-2 mb-2 mx-0 pt-2 px-3' style={{ height:"22rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Маршрут
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
              
          </Container>
          </div>
          
        </div>     
      </div>

        <div className="d-flex flex-column align-items-end" style={{marginRight:"5rem"}}>
            <Carousel responsive={responsive} className ="w-75">
                <div style={{backgroundColor:"#B6D3B0", height:"200px"}}>Item 1</div>
                <div style={{backgroundColor:"#B6D3B0", height:"200px"}}>Item 2</div>
                <div style={{backgroundColor:"#B6D3B0", height:"200px"}}>Item 3</div>
                <div style={{backgroundColor:"#B6D3B0", height:"200px"}}>Item 4</div>
            </Carousel>
        </div>
      

    </div>
  );
}

export default HikeFullInfo;