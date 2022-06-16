import React,{useState} from 'react';
import {Container, Button, Form, Modal, Card, Image} from 'react-bootstrap';
import {useNavigate,useLocation} from 'react-router-dom';
import {Participant} from "../../models/ParticipantModel";
import {Instructor} from "../../models/InstructorModel";
import {Teammate, Team} from '../../models/TeamModel';
import {RootState} from "../../redux/store";
import TeamService from '../../redux/services/TeamService';
import OrderService from '../../redux/services/OrderService';
import InstructorService from '../../redux/services/InstructorService';
import {useSelector} from "react-redux";
import {BsXCircle, BsCheckCircle} from 'react-icons/bs';
import {Route} from "../../models/RoutesModel";
import {OrderInfo} from "../../models/order/OrderInfo";
import { FinalOrderInfo } from '../../models/order/FinalOrderInfo';


function OrderFeatures() {
const user = useSelector((state: RootState) => state);
const navigate = useNavigate();
const location = useLocation();
const orderInfo: OrderInfo = location.state as OrderInfo;

const [allergyComment, setAllergyComment] = useState<string>("");
const [equipmentComment, setEquipmentComment] = useState<string>("");
const [isDiabetic, setIsDiabetic] = useState<boolean>(false);
const [isVegetarian, setIsVegetarian] = useState<boolean>(false);
const [personalTent,setPpersonalTent] = useState<string>();
const [hermeticBag, setHermeticBag] = useState<string>();
const [order, setOrder] = useState<FinalOrderInfo> (
  {
    route: orderInfo.route, 
    dateStart: orderInfo.dateStart,
    dateFinish: orderInfo.dateFinish, 
    wayToTravel: orderInfo.wayToTravel,
    isPhotograph: orderInfo.isPhotograph,
    instructor: orderInfo.instructor,
    peopleAmount: Number(orderInfo.peopleAmount),
    childrenAmount: Number(orderInfo.childrenAmount),
    teammates: orderInfo.teammates,
    participants: orderInfo.participants,
    allergyComment: allergyComment,
    equipmentComment: equipmentComment,
    isDiabetic: isDiabetic,
    isVegetarian: isVegetarian,
    personalTent: 0,
    hermeticBag: 0
  }
);
const [email, setEmail] = useState<string>(user.client.client!.Email);
const [status, setStatus] = useState<boolean>(false);

const [show, setShow] = useState(false);

  const handleClose = () =>{ 
    setShow(false);
    navigate("/");
  };
  const handleShow = () => setShow(true);


const addOrder = () =>{
    OrderService.addOrder(order!).then((res:any) => {
        setEmail(res.email);
        if(res.status){
          handleShow();
        }
    })
    
};

 
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
              <div style={{height:"72%"}}>
                <h4 className='text-white p-0' 
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Особенности питания
                </h4>
                <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/> 

                <p style={{color:"#ffffff", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Укажите особенности в питании вашей команды, чтобы инструкторы смогли сделать необходимые коректировки в питании группы на маршруте.</p>

                <Form.Check type ='checkbox' className="mt-3">
                <Form.Check.Input onChange={e => {
                  setIsDiabetic(!isDiabetic);
                  setOrder({...order, isDiabetic: !isDiabetic});
                  }} />
                <Form.Check.Label >
                            <h6 className='text-white p-0 ' 
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>   
                  В вашей команде есть диабетики?
              </h6></Form.Check.Label>
              </Form.Check>  
              <Form.Check type ='checkbox' className="mt-3">
                <Form.Check.Input onChange={e => {
                  setIsVegetarian(!isVegetarian);
                  setOrder({...order, isVegetarian: !isVegetarian});
                  }}/>
                <Form.Check.Label >
                            <h6 className='text-white p-0 ' 
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>   
                  В вашей компании есть вегетарианцы?
              </h6></Form.Check.Label>
              </Form.Check>

              <p className='mt-2' style={{color:"#ffffff", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Укажите аллергии, которые есть в вашей компании:</p>
               <Form.Control style={{backgroundColor:"#F2FAED", height:"150px"}} type="text" as="textarea" maxLength={300}
               value={allergyComment} 
               onChange={e => {
                   setAllergyComment(e.target.value);
                   setOrder({...order, allergyComment: e.target.value});
               }}
               placeholder="Аллергии"/> 

              </div>
          </Container>
          </div>
          <div className='col px-3'>
            <Container className='rounded mt-5 mb-2 mx-0 pt-2 px-3' style={{ height:"27rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                 Особенности снаряжения
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>

              <p style={{color:"#ffffff", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Укажите пожелания относительно группового снаряжения.</p>
              <div className="d-flex">
                <p  style={{color:"#ffffff", marginTop:"2.1rem", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Укажите количество личных полаток.</p>
                <Form.Control  style={{backgroundColor:"#F2FAED", marginTop:"2.1rem",  width:"40px",marginLeft:"1.7rem", height:"25px", padding:"4px 4px 4px 4px"}}
                value={personalTent}
                onChange={e => {
                  if(!isNaN(Number(e.target.value))){
                    if(Number(e.target.value)<= Number(orderInfo.peopleAmount)){
                      setPpersonalTent(e.target.value.trim());
                      setOrder({...order, personalTent: Number(e.target.value.trim())});
                    }
                    else{
                      setPpersonalTent(e.target.value.substring(0, e.target.value.length - 1).trim());
                      setOrder({...order, personalTent: Number(e.target.value.substring(0, e.target.value.length - 1).trim())});
                    }
                }
                else{
                  setPpersonalTent(e.target.value.substring(0, e.target.value.length - 1).trim());
                  setOrder({...order, personalTent: Number(e.target.value.substring(0, e.target.value.length - 1).trim())});
                }}}    
                type="text" maxLength={2}/> 
              </div>
              <div className="d-flex">
                <p className='mt-2' style={{color:"#ffffff", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Укажите количество доп. гермомешков.</p>
                <Form.Control className='mt-2 mx-2' style={{backgroundColor:"#F2FAED", width:"40px", height:"25px", padding:"4px 4px 4px 4px"}}
                value={hermeticBag}
                onChange={e => {
                  if(!isNaN(Number(e.target.value))){
                      setHermeticBag(e.target.value.trim());
                      setOrder({...order, hermeticBag: Number(e.target.value.trim())});
                  }
                  else{
                    setHermeticBag(e.target.value.substring(0, e.target.value.length - 1).trim());
                    setOrder({...order, hermeticBag: Number(e.target.value.substring(0, e.target.value.length - 1).trim())});
                  }                 
                }}
                type="text" maxLength={2}/> 
              </div>

              <p className='mt-2' style={{color:"#ffffff", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Пожелания по снаряжению:</p>
              <Form.Control style={{backgroundColor:"#F2FAED", height:"150px"}} type="text" as="textarea" maxLength={300}
               value={equipmentComment} 
               onChange={e => {
                   setEquipmentComment(e.target.value);
                   setOrder({...order, equipmentComment: e.target.value});
               }}
              placeholder="Снаряжение"/> 

          </Container>
          </div>  
        </div>     
      </div>
      <div className='d-flex flex-column align-items-end mx-5 mt-4'>
        <Button onClick= {() => {addOrder()}} 
        className='mx-2'
        style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
        textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
        >
          <h5 className='p-0 m-1'>
          Оформить заявку
          </h5>
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor:"#B4C3B1"}}>
          <Modal.Title className='text-white' style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>Заявка оформлена</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:"#B4C3B1", color:"#ffffff"}}>Заявка успешно оформлена! Договор на предоставление услуг отправлен на  почту {email}</Modal.Body>
        <Modal.Footer style={{backgroundColor:"#B4C3B1"}}>
          <Button style={{backgroundColor:"#B6D3B0", color:"#ffffff", border:" 1px solid #89A889", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}} onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderFeatures;