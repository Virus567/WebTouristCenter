import React from 'react';
import {Container,Carousel,Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";

function HikeRoute() {
  const navigate = useNavigate();
  const [route, setRoute] = React.useState<Route>();

  React.useEffect(() => {
    if (route === null) return;
    RouteService.getRouteById(1).then((res) => {
      if(res!== undefined){
        setRoute(res);
      }
    })
  }, [route])
  return (
    <div>
      <div className='mt-4 px-4'>
        <div className='d-flex justify-content-between'>
          <h4>{route?.Name}</h4>
          <div className='mx-2'>
            <div className='rounded d-flex flex-column align-items-center px-2' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
            textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
              Кол-во дней: {route?.NumberDays}
            </div>
          </div>
          
          
        </div>
        
        <hr style={{margin:"0 0 20px 0"}}/>     
      </div>
      <Container className='w-75 d-flex flex-column align-items-center'>
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={route?.Images[0]}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={route?.Images[1]}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={route?.Images[2]}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      </Container>
      <Container className='mt-4'>
        <h4>Описание</h4>
        <div className='mt-2'>
        {route?.FullDescription}
        </div> 
        <div className='mt-4 d-flex justify-content-between'>
            <div className='rounded d-flex flex-column align-items-center p-2' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                Место отправления: {route?.CheckpointStart.Title}
            </div>
            <div className='rounded d-flex flex-column align-items-center p-2' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                Место прибытия: {route?.CheckpointFinish.Title}
            </div>
        </div>
        <div className='d-flex flex-column align-items-end mt-4 mb-5'>
        <Button onClick= {() => {navigate("/order")}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
        textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
        >
          Оформить заявку
        </Button> 
      </div>  
      </Container>
      
      

    </div>
  );
}

export default HikeRoute;