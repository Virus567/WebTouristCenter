import React,{useState} from 'react';
import {Container, Button, Form, Card, Image, Modal} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";
import { Hike } from '../models/HikeModel';
import moment from 'moment';
import HikeService from '../redux/services/HikeService';
import {Order} from '../models/OrderModel';
import OrderService from '../redux/services/OrderService';

function OrderFullInfo() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state);
  const [route, setRoute] =  useState<Route>();
  const [order, setOrder] = useState<Order>();
  const [key, setKey] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const orderId = searchParams.get("id");

  React.useEffect(() => {   
    if (key) return;
    OrderService.getOrderFullInfo(Number(orderId!)).then((res:any) => {
      if(res!== undefined){       
        setRoute(res.route);
        setOrder(res.order);
      }
    })
    setKey(true);
  }, [route,order, key]);
  return (
    <div style={{overflowY: "hidden"}}>
      <div className='mt-4 px-2' style ={{marginLeft:"250px"}}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3 col-lg-11 col-md-8 mx-auto">
          <div className='col px-3'>
            <Container className='rounded mt-2 mb-2 mx-0 pt-2 px-3' style={{  height:"37rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Полная информация о заявке
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
              <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3 col-lg-11 col-md-8 mx-auto'>
                <Container>
                <h6 className='text-white p-0 mt-2' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Команда:
              </h6>
              <Form.Control style={{backgroundColor:"#F2FAED"}} value={order?.touristGroup} readOnly type="text" className="mt-2" placeholder="Команда"/>
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Количество человек:
              </h6>
              <div className='d-flex'>
                <Form.Control style={{backgroundColor:"#F2FAED", width:"220px"}} value={order?.peopleAmount} readOnly type="text" className="mt-2" maxLength={2} placeholder="Количество человек"/>
                <Button onClick={handleShow} className='p-0 rounded mt-2' style={{backgroundColor:"#F2FAED",fontWeight:"bold",  border:" 2px solid #89A889", color:"#89A889", height:"38px", width:"30%", marginLeft:"9rem"}}>
                          <h6 className='m-0 p-0'>Состав</h6>
                </Button> 
              </div>
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Количество детей:
              </h6>
              <Form.Control style={{backgroundColor:"#F2FAED", width:"220px"}} value={order?.childrenAmount} readOnly type="text" className="mt-2" maxLength={2} placeholder="Количество детей"/>

              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Даты:
              </h6>
              <div className='d-flex justify-content-between mt-1'>
                <Form.Control style={{backgroundColor:"#F2FAED"}} value={order?.startTime} readOnly type="date" name="dos"/>
                <h5 className='text-white p-0 ' 
              style={{margin:"3px 10px 0 10px",textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  —
              </h5>
                <Form.Control style={{backgroundColor:"#F2FAED"}} value={order?.finishTime} type="date" name="dof" readOnly/>
              </div>
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Способ передвижения:
              </h6>
              <Form.Select  style={{backgroundColor:"#F2FAED"}} value={order?.wayToTravel} className="mt-2" aria-label="Способ передвижения" >
                <option value="Рафты">Рафты</option>
                <option value="Байдарки">Байдарки</option>
              </Form.Select> 
                </Container>
                  <Container>
                  <h6 className='text-white p-0 mt-2' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Команда:
              </h6>
                  <Form.Control style={{backgroundColor:"#F2FAED"}} className="mt-2" type="text" value={route?.name}  readOnly  placeholder="Маршрут"/>
                  <div className='d-flex flex-column align-items-center rounded mt-4' style={{height:"28%"}}>
                    <img src={route?.images[0]} alt="img" className='rounded' style={{height:"80%"}}/>
                  </div>
                  </Container>
                  </div>
          </Container>
          </div> 
        </div>     
      </div>
      <Modal  show={show} onHide={handleClose} style={{width:"93.5%"}} >
            <Modal.Header closeButton style={{backgroundColor:"#B4C3B1", width:"600px", margin:"auto" }}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                   <h5> Состав участников</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B4C3B1", overflow:"scroll", overflowX:"hidden", maxHeight:"600px", width:"600px"}}>
               {order?.users.map((u)=>(
                    <Container className='d-flex mt-3 p-0'>
                      <Card style={{ width: '22rem' }}>
                        <Card.Body >
                          <Card.Text>
                              {u.surname} {u.name} {u.middleName}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                  </Container>
                  )             
              )}
              
              

            </Modal.Body>           
        </Modal>     
    </div>
  );
}

export default OrderFullInfo;