import React from 'react';
import {Container,Button, Form, Dropdown} from 'react-bootstrap';
import green from './assets/img/green.png';
import red from './assets/img/red.png';
import yellow from './assets/img/yellow.png';
import {useNavigate} from 'react-router-dom';

const dateStart = "05.07.2022";
const route = "Любимая Немда";
const status = "Активна";
const img = green;

function MyHikes() {
  const navigate = useNavigate();
  // if(status == "В сборке"){
  //  img = yellow;
  // }
  // else if(status =="Завершен"){
  //     img= red;
  // }
  return (
    <div className="p-4" style={{height:"100%"}}>
      <div style={{height:"81%"}}>
        <div>
          <h4>Заявки</h4>
          <hr style={{margin:"0 0 20px 0"}}/>
        </div>
       <Container className='mt-2 mb-2 d-flex justify-content-between p-2 rounded'
                style={{
                backgroundColor:"#B4C3B1"
                }}>
                    <span style={{width:"8%",fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{dateStart}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <span className='mx-2' style={{width:"80%", fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{route}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <div style={{width:"10%"}}>
                      <img src={img} className="mx-2" style={{width:"12px", marginBottom:"3px"}} alt='color'/>
                      <span style={{fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{status}</span>
                    </div>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <Button href="#" onClick= {() => {navigate("/instructors")}} className='text-sm mx-2 pt-0 pb-0 px-2'
                     style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889", height:"27px",
                     textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                     >
                         Подробнее
                     </Button> 
        </Container> 
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

        <Container className='mt-2 mb-2 d-flex justify-content-between p-2 rounded'
                style={{
                backgroundColor:"#B4C3B1"
                }}>
                    <span style={{width:"8%", fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{dateStart}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <span className='mx-2' style={{width:"80%",fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{route}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <div style={{width:"10%"}}>
                      <img src={img} className="mx-2" style={{width:"12px", marginBottom:"3px"}} alt='color'/>
                      <span style={{fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{status}</span>
                    </div>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <Button onClick= {() => {navigate("/instructors")}} className='text-sm mx-2 pt-0 pb-0 px-2'
                     style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889", height:"27px",
                     textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                     >
                         Подробнее
                     </Button> 
        </Container> 
        <Container className='mt-2 mb-2 d-flex justify-content-between p-2 rounded'
                style={{
                backgroundColor:"#B4C3B1"
                }}>
                    <span style={{width:"8%",fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{dateStart}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <span className='mx-2' style={{width:"80%", fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{route}</span>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <div style={{width:"10%",fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>
                      <img src={img} className="mx-2" style={{width:"12px", marginBottom:"3px"}} alt='color'/>
                      <span style={{fontStyle: "normal",fontWeight:"700", fontSize: "14px", lineHeight: "28px"}}>{status}</span>
                    </div>
                    <div
                    style={{width: "0px", 
                            float: "left", 
                            border: "1px inset #000000"}} />
                    <Button onClick= {() => {navigate("/instructors")}} className='text-sm mx-2 pt-0 pb-0 px-2'
                     style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889", height:"27px",
                     textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                     >
                         Подробнее
                     </Button> 
        </Container>
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