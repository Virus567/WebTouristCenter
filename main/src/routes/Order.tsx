import React,{useState} from 'react';
import {Container, Button, Form} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";
import { stringify } from 'querystring';
import Moment from 'react-moment';
import moment from 'moment';


function Order() {
  const navigate = useNavigate();
  const [key, setKey] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state);
  const [route, setRoute] = useState<Route>();
  const [dateStart, setDateStart] = useState<string>();
  const [dateFinish, setDateFinish] = useState<string>();
  const [wayToTravel, setWayToTravel] = useState<string>("Рафты");
  const [isPhotograph, setIsPhotograph] = useState<boolean>(false);
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const routeId = searchParams.get("route-id");

  React.useEffect(() => {
    if (key) return;
    RouteService.getRouteById(routeId!).then((res) => {
      if(res!== undefined){
        setRoute(res);
      }
    })
    setKey(true);
  }, [route]);

  return (
    <div>
      <div className='mt-4 px-3' style={{height:"85%"}}>
        <div>
          <h4>Оформление заявки</h4>
          <hr style={{margin:"0 0 20px 0"}}/>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3 col-lg-11 col-md-8 mx-auto">
          <div className='col px-3'>
            <Container className='rounded mt-5 mb-2 mx-0 pt-2 px-3' style={{  height:"27rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Основная информация
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
              <h6 className='text-white p-0 mt-2' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Представитель:
              </h6>
              <Form.Control style={{backgroundColor:"#F2FAED"}} type="text" className="mt-2" readOnly value={user.client.client?.Surname + " " + user.client.client?.Name + " " + user.client.client?.Middlename}  placeholder="ФИО представителя"/>     
              <h6 className='text-white p-0 mt-2' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Телефон Представителя:
              </h6>
              <Form.Control style={{backgroundColor:"#F2FAED"}} type="text" className="mt-2" readOnly value={user.client.client?.PhoneNumber} placeholder="Номер телефона представителя"/>
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Даты:
              </h6>
              <div className='d-flex justify-content-between mt-1'>
                <Form.Control style={{backgroundColor:"#F2FAED"}} type="date" value={dateStart} 
                      onChange={e => {
                          const date : Date = new Date(Date.parse(e.target.value));
                          setDateStart(moment(date).format('YYYY-MM-DD'));
                          setDateFinish(moment(date).add((route!.NumberDays-1),'days').format('YYYY-MM-DD'));
                          }} name="dos"/>
                <h5 className='text-white p-0 ' 
              style={{margin:"3px 10px 0 10px",textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  —
              </h5>
                <Form.Control style={{backgroundColor:"#F2FAED"}} type="date" name="dof"value={dateFinish} readOnly/>
              </div>
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Способ передвижения:
              </h6>
              <Form.Select  style={{backgroundColor:"#F2FAED"}} className="mt-2" aria-label="Способ передвижения" value={wayToTravel} 
                      onChange={e => {
                          setWayToTravel(e.target.value);
                          }}>
                <option value="Рафты">Рафты</option>
                <option value="Байдарки">Байдарки</option>
              </Form.Select> 
              <Form.Check type ='checkbox' className="mt-3">
                <Form.Check.Input onChange={e => {setIsPhotograph(!isPhotograph)}}/>
                <Form.Check.Label >
                            <h6 className='text-white p-0 ' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>   
                  Услуги фотографа
              </h6></Form.Check.Label>
              </Form.Check>
          </Container>
          </div>
          <div className='col px-3'>
            <Container className='rounded mt-5 mb-2 mx-0 pt-2 px-3' style={{ height:"27rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Маршрут
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
              <Container className='mt-2 mb-2 d-flex justify-content-between p-1 rounded'
                style={{
                backgroundColor:"#F2FAED"
                }}>
                    <span className='mx-2'>{route?.Name}</span>
              </Container>  
              <div className='d-flex flex-column align-items-center rounded' style={{height:"80%"}}>
                <img src={route?.Images[0]} alt="img" className='rounded' style={{height:"90%"}}/>
              </div>
              
          </Container>
          </div>
          
        </div>     
      </div>
      <div className='d-flex flex-column align-items-end mx-5 mt-4'>
        <Button onClick= {() => {navigate("/order-partisipants", 
        {state:
          {
            route: route, 
            dateStart: dateStart, 
            dateFinish: dateFinish, 
            wayToTravel: wayToTravel,
            isPhotograph: isPhotograph
          }
        })}} 
          className='mx-2'
        style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
        textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
        >
          <h5 className='p-0 m-1'>
          Далее
          </h5>
        </Button>
      </div>
    </div>
  );
}

export default Order;