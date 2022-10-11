import React from 'react';
import {Container,Carousel,Button} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";

function HikeRoute() {
  const navigate = useNavigate();
  const [route, setRoute] = React.useState<Route>();
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const routeId = searchParams.get("id");
  let key = false;

  React.useEffect(() => {
    if (key) return;
    RouteService.getRouteById(routeId!).then((res) => {
      if(res!== undefined){
        setRoute(res);
      }
    })
    key = true;
  }, [route])
  return (
    <div>
      <div className='mt-4 px-4'>
        <div className='d-flex justify-content-between'>
          <h4>{route?.name}</h4>
          <div className='mx-2'>
            <div className='rounded d-flex flex-column align-items-center px-2' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
            textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
              Кол-во дней: {route?.numberDays}
            </div>
          </div>
          
          
        </div>
        
        <hr style={{margin:"0 0 20px 0"}}/>     
      </div>
      <div className='d-flex'>
        <Container className='d-flex flex-column align-items-center' style={{width:'60%'}}>
          <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={route?.images[0]}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={route?.images[1]}
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={route?.images[2]}
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        </Container>
        <Container className='mt-4' style={{width:'40%'}}>
          <div style={{height:"80%"}}>
            <h4>Описание</h4>
            <div className='mt-2'>
            {route?.fullDescription}
            </div> 
            <div className='mt-4'>
                <div className='rounded d-flex flex-column align-items-center p-2' style={{backgroundColor:"#B4C3B1", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                  textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Место отправления: {route?.checkpointStart.Title}
                </div>
                <div className='rounded d-flex flex-column align-items-center p-2 mt-3' style={{backgroundColor:"#B4C3B1", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                  textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Место прибытия: {route?.checkpointFinish.Title}
                </div>
            </div>
          </div>
          
          <div className='d-flex flex-column align-items-end mt-4 mb-5'>
          <Button onClick= {() => {navigate("/order?route-id=" + routeId)}} style={{backgroundColor:"#F2FAED",fontWeight:"bold",  border:" 2px solid #89A889", color:"#89A889"}}
          >
            Оформить заявку
          </Button> 
        </div>  
        </Container>
      </div>
    </div>
  );
}

export default HikeRoute;