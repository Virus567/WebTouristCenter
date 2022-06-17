import React, {useState} from 'react';
import {Container,Button, Form, Dropdown, Card, Modal} from 'react-bootstrap';
import green from '../assets/img/green.png';
import red from '../assets/img/red.png';
import yellow from '../assets/img/yellow.png';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import HikeService from '../redux/services/HikeService';
import {Hike} from "./../models/HikeModel";
import {Order} from "./../models/OrderModel";
import moment from 'moment';


function MyHikes() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hikes, setHikes] = useState<Hike[]>([]);

  const [route, setRoute] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [key, setKey] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  const [startDate, setStartDate] = useState<string>('');
  const [finishDate, setFinishDate] = useState<string>('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const addReport =(startDate:string, finishDate:string) =>{
    HikeService.addReport(startDate, finishDate).then((res:any) => {
      setHikes(res);
    })
  }
  const getHikesWithParams =(date:string, route:string, status:string) =>{
    HikeService.getHikesWithParams(date, route, status).then((res:any) => {
      setHikes(res);
    })
  }

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
                    <span style={{width:"8%",fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{moment(order.StartTime).format("DD.MM.YYYY")}</span>
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
                    <Button href="#" onClick= {() => {navigate("/order-info?id=" + order.ID)}} className='text-sm mx-2 pt-0 pb-0 px-2'
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
                    <Form.Control value={date} onChange={e=>{
                      setDate(e.target.value);
                      getHikesWithParams(e.target.value, route, status);
                    }} style={{backgroundColor:"#F2FAED"}} type="date" name="dob"/>
                  </Form.Group>
                  </div>
                  <div style={{width:"20%"}}>
                    <Form.Group controlId="cb">
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Маршрут:</Form.Label>
                    <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Маршрут" value={route} 
                    onChange={e=>{
                      setRoute(e.target.value);
                      getHikesWithParams(date, e.target.value, status);
                      }}>
                      <option value="">Любой</option>
                      <option value="Любимая Немда">Любимая Немда</option>
                      <option value="Город с вдоды">Город с вдоды</option>
                      <option value="Путь Ушкуйников">Путь Ушкуйников</option>
                      <option value="Быстрая вода">Быстрая вода</option>
                      <option value="Затерянный мир">Затерянный мир</option>
                      <option value="Поющие пески">Поющие пески</option>
                    </Form.Select>
                  </Form.Group>
                  </div>
                  <div style={{marginRight:"20px", marginBottom:"5px"}}>
                    <Form.Group controlId="cb" >
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Статус:</Form.Label>
                    <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Маршрут" value={status} 
                    onChange={e=>{
                      setStatus(e.target.value);
                      getHikesWithParams(date, route, e.target.value)
                      }}>
                      <option value="">Любой</option>
                      <option value="В сборке">В сборке</option>
                      <option value="На маршруте">На маршруте</option>
                      <option value="Завершен">Завершен</option>   
                    </Form.Select>
                  </Form.Group>
                  </div>                                        
        </Container>           
          
          {hikes.map((hike)=>( 
        <Container className='mt-2 mb-2 d-flex justify-content-between p-2 rounded'
                style={{
                backgroundColor:"#B4C3B1"
                }}>
                    <span style={{width:"8%", fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{moment(hike.StartTime).format("DD.MM.YYYY")}</span>
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
                    <Button onClick= {() => {navigate("/hike-info?id="+ hike.ID)}} className='text-sm mx-2 pt-0 pb-0 px-2'
                     style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889", height:"27px",
                     textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                     >
                         Подробнее
                     </Button> 
        </Container> 
        ))}
        
      </div> 
      <div className='d-flex flex-column align-items-end'>
        <Button onClick= {handleShow} className='mx-2 pt-0 pb-0 px-2'
        style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
        textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
        >
          Сформировать<br/>отчет
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor:"#B4C3B1"}}>
          <Modal.Title className='text-white' style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Сформировать отчет за период</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#B4C3B1", color:"#ffffff"}}>
            <p className='text-white'>Вы можете сформировать отчет о ваших походах за определенный период. Отчет придет к вам на почту {user.client.client?.Email}</p>
            <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Даты:
              </h6>
              <div className='d-flex justify-content-between mt-1'>
                <Form.Control style={{backgroundColor:"#F2FAED"}} value ={startDate} onChange={e=>{setStartDate(e.target.value);}} type="date" name="dos"/>
                <h5 className='text-white p-0 ' 
              style={{margin:"3px 10px 0 10px",textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  —
              </h5>
                <Form.Control style={{backgroundColor:"#F2FAED"}} value ={finishDate} onChange={e=>{setFinishDate(e.target.value);}} type="date" name="dof"/>
              </div>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:"#B4C3B1"}}>
          <Button style={{backgroundColor:"#B6D3B0", color:"#ffffff", border:" 1px solid #89A889", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}} 
          onClick={e=>{
            if(startDate!='' && finishDate!=''){
              addReport(startDate,finishDate);
              handleClose();
              navigate(0);
            }   
            }}>
            Сформировать отчет
          </Button>
          <Button style={{backgroundColor:"#B6D3B0", color:"#ffffff", border:" 1px solid #89A889", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}} onClick={handleClose}>
            Oтмена
          </Button>
        </Modal.Footer>
      </Modal>      

    </div>
  );
}

export default MyHikes;