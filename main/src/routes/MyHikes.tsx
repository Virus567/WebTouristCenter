import React, {useState} from 'react';
import {Container,Button, Form, Dropdown} from 'react-bootstrap';
import green from '../assets/img/green.png';
import red from '../assets/img/red.png';
import yellow from '../assets/img/yellow.png';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import HikeService from '../redux/services/HikeService';
import {Hike} from "./../models/HikeModel";
import {Order} from "./../models/OrderModel";

function MyHikes() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hikes, setHikes] = useState<Hike[]>([]);

  const [key, setKey] = useState<boolean>(false);

  React.useEffect(() => {
    if (key) return;
    HikeService.getHikes().then((res:any) => {
      setHikes(res.hikes);
      setOrders(res.orders);
    })
    setKey(true);
  }, [orders, hikes, key])
  
  return (
    <div className="p-4" style={{height:"100%"}}>
      <div style={{height:"580px"}}>
        <div>
          <h4>Заявки</h4>
          <hr style={{margin:"0 0 20px 0"}}/>
        </div>
        {orders.map((order)=>(
       <Container className='mt-2 mb-2 d-flex justify-content-between p-2 rounded'
                style={{
                backgroundColor:"#B4C3B1"
                }}>
                    <span style={{width:"8%",fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{order.DateTime}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <span className='mx-2' style={{width:"80%", fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{order.RouteName}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <div style={{width:"10%"}}>
                      <img src={green} className="mx-2" style={{width:"12px", marginBottom:"3px"}} alt='color'/>
                      <span style={{fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{order.Status}</span>
                    </div>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <Button href="#" onClick= {() => {navigate("/order-info")}} className='text-sm mx-2 pt-0 pb-0 px-2'
                     style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889", height:"27px",
                     textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                     >
                         Подробнее
                     </Button> 
        </Container> 
         ))}
        <div className='mt-5'>
          <h4>Походы</h4>
          <hr style={{margin:"0 0 20px 0"}}/>     

        </div>
              
        <Container className='mt-2 mb-3 d-flex justify-content-between p-2 rounded'
                style={{
                backgroundColor:"#B6D3B0"
                }}>
                  <div>
                    <Form.Group  controlId="dob">
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Дата:</Form.Label>
                    <Form.Control style={{backgroundColor:"#F2FAED"}} type="date" name="dob"/>
                  </Form.Group>
                  </div>
                  <div style={{width:"20%"}}>
                    <Form.Group controlId="cb">
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Маршрут:</Form.Label>
                    <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Маршрут">
                      <option value="1">Любимая Немда</option>
                      <option value="2">Город с вдоды</option>
                      <option value="3">Путь Ушкуйников</option>
                      <option value="4">Быстрая вода</option>
                    </Form.Select>
                  </Form.Group>
                  </div>
                  <div style={{marginRight:"20px", marginBottom:"5px"}}>
                    <Form.Group controlId="cb" >
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Статус:</Form.Label>
                    <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Маршрут">
                      <option value="1">В сборке</option>
                      <option value="2">На маршруте</option>
                      <option value="3">Завершен</option>   
                    </Form.Select>
                  </Form.Group>
                  </div>                                        
        </Container>           
          
          {hikes.map((hike)=>( 
        <Container className='mt-2 mb-2 d-flex justify-content-between p-2 rounded'
                style={{
                backgroundColor:"#B4C3B1"
                }}>
                    <span style={{width:"8%", fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{hike.StartTime}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <span className='mx-2' style={{width:"80%",fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{hike.RouteName}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <div style={{width:"10%"}}>
                      {hike.Status === "В сборке"?(
                      <img src={yellow} className="mx-2" style={{width:"12px", marginBottom:"3px"}} alt='color'/>
                      ):(<img src={red} className="mx-2" style={{width:"12px", marginBottom:"3px"}} alt='color'/>)}
                      <span style={{fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{hike.Status}</span>
                    </div>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <Button onClick= {() => {navigate("/hike-info")}} className='text-sm mx-2 pt-0 pb-0 px-2'
                     style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889", height:"27px",
                     textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                     >
                         Подробнее
                     </Button> 
        </Container> 
        ))}
        
      </div> 
      <div className='d-flex flex-column align-items-end'>
        <Button onClick= {() => {navigate("/instructors")}} className='mx-2 pt-0 pb-0 px-2'
        style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
        textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
        >
          Сформировать<br/>отчет
        </Button>
      </div>
       

    </div>
  );
}

export default MyHikes;