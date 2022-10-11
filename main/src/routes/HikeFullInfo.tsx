import React,{useState} from 'react';
import {Container, Button, Form, Card, Image, Modal} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";
import { Instructor } from '../models/InstructorModel';
import { Hike } from '../models/HikeModel';
import moment from 'moment';
import HikeService from '../redux/services/HikeService';

function HikeFullInfo() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state);
  const [route, setRoute] =  useState<Route>();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [hike, setHike] = useState<Hike>();
  const [key, setKey] = useState<boolean>(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const handleCloseInstructor = () => setShowInstructor(false);
  const handleShowInstructor = () => {
    setShowInstructor(true);
  }

  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const hikeId = searchParams.get("id");

  React.useEffect(() => {   
    if (key) return;
    HikeService.getHikeFullInfo(Number(hikeId!)).then((res:any) => {
      if(res!== undefined){   
        console.log(res.hike);    
        setRoute(res.route);
        setInstructors(res.instructors);
        setHike(res.hike);
      }
    })
    setKey(true);
  }, [route, instructors, hike, key]);
  return (
    <div style={{overflowY: "hidden"}}>
      <div className='mt-4 px-2' style={{height:"85%", marginLeft:"250px"}}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 g-3 col-lg-11 col-md-8 mx-auto">
          <div className='col px-3'>
            <Container className='rounded mt-2 mb-2 mx-0 pt-2 px-3' style={{  height:"37rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Полная информация о походе
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
              <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 g-3 col-lg-11 col-md-8 mx-auto'>
                <Container>
                <h6 className='text-white p-0 mt-2' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Команда:
              </h6>
              <Form.Control style={{backgroundColor:"#F2FAED"}} value={hike?.CompanyName} readOnly type="text" className="mt-2" placeholder="Команда"/>     
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Количество человек:
              </h6>
              <div className='d-flex'>
                <Form.Control style={{backgroundColor:"#F2FAED", width:"220px"}} value={hike?.PeopleAmount} readOnly type="text" className="mt-2" maxLength={2} placeholder="Количество человек"/>
                <Button onClick={handleShow} className='p-0 rounded mt-2' style={{backgroundColor:"#F2FAED",fontWeight:"bold",  border:" 2px solid #89A889", color:"#89A889", height:"38px", width:"30%", marginLeft:"9rem"}}>
                          <h6 className='m-0 p-0'>Сотстав</h6> 
                </Button> 
              </div>
                   
              <h6 className='text-white p-0 mt-2' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Количество инструкторов:
              </h6>
              <div className='d-flex'>
                <Form.Control style={{backgroundColor:"#F2FAED", width:"220px"}} type="text" value={instructors?.length} className="mt-2" maxLength={2} placeholder="Количество инструкторов"/>
                <Button onClick={handleShowInstructor} className='p-0 rounded mt-2' style={{backgroundColor:"#F2FAED",fontWeight:"bold",  border:" 2px solid #89A889", color:"#89A889", height:"38px", width:"30%", marginLeft:"9rem"}}>
                          <h6 className='m-0 p-0'>Сотстав</h6> 
                </Button>
              </div>
              
              
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Даты:
              </h6>
              <div className='d-flex justify-content-between mt-1'>
                <Form.Control style={{backgroundColor:"#F2FAED"}} value={hike?.StartTime} type="date" name="dos"/>
                <h5 className='text-white p-0 ' 
              style={{margin:"3px 10px 0 10px",textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  —
              </h5>
                <Form.Control style={{backgroundColor:"#F2FAED"}} value={hike?.FinishTime} type="date" name="dof" readOnly/>
              </div>
              <h6 className='text-white p-0 mt-3' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Способ передвижения:
              </h6>
              <Form.Select  style={{backgroundColor:"#F2FAED"}} value={hike?.WayToTravel} className="mt-2" aria-label="Способ передвижения" >
                <option value="Рафты">Рафты</option>
                <option value="Байдарки">Байдарки</option>
              </Form.Select> 
              
                <div>
                  {
                  (hike?.isPhotograph)?(
                  <Form.Check type ='checkbox' className="mt-2">
                    <Form.Check.Input checked/>
                    <Form.Check.Label >
                                <h6 className='text-white p-0 ' 
                  style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>   
                      Услуги фотографа
                  </h6></Form.Check.Label>
                  </Form.Check>
                  ):(
                  <Form.Check type ='checkbox' className="mt-2">
                    <Form.Check.Input/>
                    <Form.Check.Label >
                                <h6 className='text-white p-0 ' 
                  style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>   
                      Услуги фотографа
                  </h6></Form.Check.Label>
                  </Form.Check>
                  )}
                </div>
                </Container>
                  <Container>
                  <h6 className='text-white p-0 mt-2' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  Команда:
              </h6>
                  <Form.Control style={{backgroundColor:"#F2FAED"}} className="mt-2" type="text" value={route?.name}  readOnly  placeholder="Маршрут"/>
                  <div className='d-flex flex-column align-items-center rounded ' style={{height:"28%", marginTop:"2.3rem"}}>
                    <img src={route?.images[0]} alt="img" className='rounded' style={{height:"80%"}}/>
                  </div>
                  </Container>
                  </div>
          </Container>
          </div> 
        </div>     
      </div>

      <Modal  show={showInstructor} onHide={handleCloseInstructor} style={{width:"93.5%"}} >
            <Modal.Header closeButton style={{backgroundColor:"#B4C3B1", width:"600px", margin:"auto" }}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                   <h5> Состав инструкторов</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B4C3B1", overflow:"scroll", overflowX:"hidden", maxHeight:"600px", width:"600px"}}>
               {instructors.map((i)=>(
               
                  <Container className='d-flex mt-3 p-0'>
                      <Image src={i.Image} alt='Фото' style={{width:"13rem"}}/>
                      <Card style={{ width: '22rem' }}>
                        <Card.Body >
                          <Card.Title>{i.Surname} {i.Name}</Card.Title>
                          <Card.Text>
                            {i.Discription}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                  </Container>
                
              ))}
            </Modal.Body>           
        </Modal> 

        <Modal  show={show} onHide={handleClose} >
            <Modal.Header closeButton style={{backgroundColor:"#B4C3B1"}}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                   <h5> Состав участников</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B4C3B1", overflowY:"scroll", overflowX:"hidden", maxHeight:"600px"}}>
               <div className='d-flex flex-column align-items-center'>
               {hike?.Users.map((u)=>(
               
               <Container className='d-flex mt-3 p-0'>
                   <Card style={{ width: '22rem' }}>
                     <Card.Body >
                       <Card.Text>
                           {u.Surname} {u.Name} {u.MiddleName}
                       </Card.Text>
                     </Card.Body>
                   </Card>
               </Container>
             
           ))}
               </div>       
            </Modal.Body>           
        </Modal>         
    </div>
  );
}

export default HikeFullInfo;