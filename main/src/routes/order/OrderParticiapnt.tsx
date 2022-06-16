import React,{useState} from 'react';
import {Container, Button, Form, Modal, Card, Image} from 'react-bootstrap';
import {useNavigate,useLocation} from 'react-router-dom';
import {Participant} from "../../models/ParticipantModel";
import {Instructor} from "../../models/InstructorModel";
import {Teammate, Team} from '../../models/TeamModel';
import {RootState} from "../../redux/store";
import TeamService from '../../redux/services/TeamService';
import InstructorService from '../../redux/services/InstructorService';
import {useSelector} from "react-redux";
import {BsXCircle, BsCheckCircle} from 'react-icons/bs';
import {Route} from "../../models/RoutesModel";
import {FirsOrderInfo} from "../../models/order/FirstOrderInfo";

interface State {
	surname: string,
	name: string,
	phone: string,
	middlename: string,
}
let tmpParticipants : Participant[] = [];

function OrderParticiapnt() {
  const navigate = useNavigate();
  const location = useLocation();
  const mainOrderInfo: FirsOrderInfo = location.state as FirsOrderInfo;

  const [values, setValues] = useState<State>({
		surname: '',
		name: '',
		phone: '',
		middlename: '',
	})

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({...values, [prop]: event.target.value.trim()});
	};

  

  const user = useSelector((state: RootState) => state);
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [team, setTeam] = useState<string>("");
  const [show, setShow] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showParticipant, setShowParticipant] = useState(false);
  const [instructor, setInstructor] = useState<Instructor>();
  const [peopleAmount, setPeopleAmount] = useState<string>();
  const [childrenAmount, setChildrenAmount] = useState<string>();


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getTeams();
  }

  const handleCloseInstructor = () => setShowInstructor(false);
  const handleShowInstructor = () => {
    setShowInstructor(true);
    getInstructors();
  }


  const handleCloseDopParticipant = () => setShowParticipant(false);
  const handleShowDopParticipant = () => {
    setShowParticipant(true);
  }

  const changeInstructor = (instructor: Instructor) =>{
      setInstructor(instructor);
      handleCloseInstructor();
  }

  const changeTeam = (teamId: number) => {
    TeamService.changeTeamByTeamId(teamId).then((res:any) => {
      setTeam(res.team.Name);
      setTeammates(res.teammates)
    })
    handleClose()
  }
  const getTeams = () =>{
    TeamService.getTeams().then((res:any) => {
      setTeams(res.teams);
    })
    
  };
  const getInstructors = () =>{
    InstructorService.getInstructors().then((res:any) => {
      setInstructors(res);
    })
    
  };

  const onClick = (event: any) => {
    if(values.surname === '' && values.name === '') return;
		const participant: Participant = {
			surname: values.surname,
			name: values.name,
      middlename: values.middlename,
			phone: values.phone		
		};
    tmpParticipants.push(participant);
    setParticipants(tmpParticipants);
    console.log(participants, tmpParticipants, participant);
    handleCloseDopParticipant();
	};

  const [key, setKey] = useState<boolean>(false);
  React.useEffect(() => {
    if (key) return;
    TeamService.getDefaultTeammatesByUser().then((res:any) => {
      setTeammates(res.teammates);
      setTeam(res.team.Name);

    })
    setKey(true);
  }, [teammates, team, key])

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
                    Информация о составе
                </h4>
                <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/> 
                <Form.Control style={{backgroundColor:"#F2FAED"}} type="text" className="mt-3" maxLength={2} value={peopleAmount}
                  onChange={e => {
                    if(!isNaN(Number(e.target.value))){
                        setPeopleAmount(e.target.value.trim());
                    }
                    else{
                      setPeopleAmount (e.target.value.substring(0, e.target.value.length - 1).trim());
                    }                 
                  }}  
                  placeholder="Количество человек"/>     
                <Form.Control style={{backgroundColor:"#F2FAED"}} type="text" className="mt-4" maxLength={2} value={childrenAmount}
                  onChange={e => {
                    if(!isNaN(Number(e.target.value))){
                      if(Number(e.target.value)<= Number(peopleAmount)){
                        setChildrenAmount(e.target.value.trim());
                      }
                      else{
                        setChildrenAmount(e.target.value.substring(0, e.target.value.length - 1).trim());
                      }
                  }
                  else{
                    setChildrenAmount(e.target.value.substring(0, e.target.value.length - 1).trim());
                  }                 
                  }}   placeholder="Из Них детей (До 14 лет)"/>
                <div className='d-flex'>
                  <Form.Control style={{backgroundColor:"#F2FAED", width:"70%"}} type="text" readOnly className="mt-4" value={team} />
                  <Button onClick={handleShow} className='p-0 rounded mt-4 mx-1' style={{backgroundColor:"#B6D3B0", color:"#ffffff", border:" 1px solid #89A889", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889", height:"38px", width:"30%"}}>
                          <h6 className='m-0 p-0'>Выбрать команду</h6> 
                  </Button>  
                </div>
              </div>
              <div className='d-flex flex-column align-items-center'>
                <Button onClick={handleShowInstructor} className='p-0 rounded mt-4 mx-1' style={{backgroundColor:"#B6D3B0", color:"#ffffff", width:"19.5rem", border:" 1px solid #89A889", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889", height:"38px"}}>
                          <h6 className='m-0 p-2'>Выбрать основного инструктора</h6> 
                </Button>
                <Button onClick={handleShowDopParticipant} className='p-0 rounded mt-2 mx-1' style={{backgroundColor:"#B6D3B0", color:"#ffffff", border:" 1px solid #89A889", textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889", height:"38px"}}>
                          <h6 className='m-0 p-2'>Добавить дополнительных участников</h6> 
                </Button>
              </div>
          </Container>
          </div>
          <div className='col px-3'>
            <Container className='rounded mt-5 mb-2 mx-0 pt-2 px-3' style={{ height:"27rem", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
              <h4 className='text-white p-0' 
              style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                 Список участников
              </h4>
              <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
              {teammates.map((teammate)=>(
              <Container className='mt-2 mb-2 d-flex justify-content-between p-1 rounded'
                        style={{
                        backgroundColor:"#F2FAED"
                        }}>
                          <span className='mx-2'>{teammate.User.Surname} {teammate.User.Name} | {teammate.User.Login}</span>

              </Container>
              ))}

              {participants.map((p)=>(
                <Container className='mt-2 mb-2 d-flex justify-content-between p-1 rounded'
                style={{
                backgroundColor:"#F2FAED"
                }}>
                  <span className='mx-2'>{p.surname} {p.name} {participants} | Дополнительно</span>
                  <Button variant='outline-danger' className='p-0 mt-1 mx-2 rounded-circle' style={{height:"16px", border:"0px"}}>
                      <BsXCircle style={{marginBottom:"12px"}}/>
                  </Button>
                </Container>
              ))}
          </Container>
          </div>
          
        </div>     
      </div>
      <div className='d-flex flex-column align-items-end mx-5 mt-4'>
        <Button onClick= {() => {navigate("/order-features", 
        {
          state:
          {
            route: mainOrderInfo.route, 
            dateStart: mainOrderInfo.dateStart, 
            dateFinish: mainOrderInfo.dateFinish, 
            wayToTravel:mainOrderInfo. wayToTravel,
            isPhotograph: mainOrderInfo.isPhotograph,
            instructor: instructor,
            peopleAmount: peopleAmount,
            childrenAmount: childrenAmount,
            teammates: teammates,
            participants: participants

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
      <Modal  show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{backgroundColor:"#B4C3B1"}}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                    Выбрать команду
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B4C3B1"}}>
            {teams.map((team)=>(
              <div>
              {(team.Name === 'Моя команда' && team.MainUser.ID === user.client.client?.ID )?(
                <Button className='mt-2 mb-2 p-1 rounded' onClick={(e) => {changeTeam(team.ID)}}
                  style={{width:"300px", backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                  textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                      <span className='mx-2'>Моя команда</span>
                </Button>
               ):(
                <>
                {(team.Name === 'Пойти в одиночку')?
                (
                  <Button className='mt-2 mb-2 p-1 rounded' onClick={(e) => {changeTeam(team.ID)}}
                  style={{width:"300px", backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                  textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                      <span className='mx-2'>Пойти в одиночку</span>
                </Button>
                ):(
                  <Button className='mt-2 mb-2 p-1 rounded'  onClick={(e) => {changeTeam(team.ID)}}
                  style={{width:"300px", backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                  textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    <span className='mx-2'>Команда {team.MainUser.Surname} {team.MainUser.Name}</span>
                </Button>
                )}
                </>
                )}
              </div>
            ))}
            </Modal.Body>           
        </Modal> 
        
        <Modal  show={showParticipant} onHide={handleCloseDopParticipant}>
            <Modal.Header closeButton style={{backgroundColor:"#B6D3B0"}}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                   <h5> Добавить дополнительных участников</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B6D3B0"}}>
              <Form className='d-flex flex-column align-items-center w-75'>
                <Container className='row flex-column align-items-center' style={{marginLeft:"1.7rem"}}>
                  <Container className='col'>
                    <Form.Floating className='mt-2' style={{width:"15rem"}}> 
                      <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingSurname"value={values.surname} onChange={handleChange("surname")} type="text" placeholder="Фамилия участника"/>
                      <Form.Label for="floatingSurname">Фамилия</Form.Label>
                    </Form.Floating>  
                    <Form.Floating className='mt-2' style={{width:"15rem"}}> 
                      <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingName" value={values.name} onChange={handleChange("name")} type="text" placeholder="Имя участника"/>
                      <Form.Label for="floatingName">Имя </Form.Label>
                    </Form.Floating>
                    <Form.Floating className='mt-2' style={{width:"15rem"}}> 
                      <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingMiddlename" value={values.middlename} onChange={handleChange("middlename")} type="text" placeholder="Отчество участника"/>
                      <Form.Label for="floatingMiddlename">Отчество (при наличии)</Form.Label>
                    </Form.Floating>  
                    <Form.Floating className='mt-2' style={{width:"15rem"}}> 
                      <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingPhone" value={values.phone} onChange={handleChange("phone")}  type="phone" placeholder="Телефон при наличии"/>
                      <Form.Label for="floatingPhone">Телефон (при наличии)</Form.Label>
                    </Form.Floating>
                  </Container>
                </Container>
                <Button onClick={onClick} variant='outline-success' className='mt-3 btn btn-lg' style={{backgroundColor:"#F2FAED", borderColor:"#89A889", color:"#89A889"}}>Добавить участника</Button>
              </Form>
            </Modal.Body>           
        </Modal>
          <Modal  show={showInstructor} onHide={handleCloseInstructor} style={{width:"93.5%"}} >
            <Modal.Header closeButton style={{backgroundColor:"#B4C3B1", width:"600px", margin:"auto" }}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                   <h5> Выбрать основного инструктора</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B4C3B1", overflow:"scroll", overflowX:"hidden", maxHeight:"600px", width:"600px"}}>
              <p style={{color:"#ffffff"}}>Вы можете выбрать старшего инструктора, с которым хотите отправиться на маршрут. Администратор по возможности учтет ваш выбор.</p>
              {instructors.map((i)=>(
                <>
                {(i.ID === instructor?.ID)?
                (
                  <Container className='d-flex mt-3 p-0'>
                      <Image src={i.Image} alt='Фото' style={{width:"13rem"}}/>
                      <Card style={{ width: '22rem' }}>
                        <Card.Body >
                          <Card.Title>
                            <BsCheckCircle style={{marginRight:"7px", marginBottom:"5px"}}/>
                            Выбран(а) {i.Surname} {i.Name}
                            </Card.Title>
                          <Card.Text>
                            {i.Discription}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                  </Container>

                ):(
                  <Container className='d-flex mt-3 p-0'>
                      <Image src={i.Image} alt='Фото' style={{width:"13rem"}}/>
                      <Card style={{ width: '22rem' }}>
                        <Card.Body >
                          <Card.Title>{i.Surname} {i.Name}</Card.Title>
                          <Card.Text>
                            {i.Discription}
                          </Card.Text>
                          <Button onClick={(e) => {changeInstructor(i)}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                                          textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                                            Выбрать
                          </Button>
                        </Card.Body>
                      </Card>
                  </Container>
                )}
                
                </>
                
              ))}
              
              

            </Modal.Body>           
        </Modal>     
        
    </div>
  );
}

export default OrderParticiapnt;