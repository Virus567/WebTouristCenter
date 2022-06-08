import React, { useState } from 'react';
import {Container, Button, Modal} from 'react-bootstrap';
import { BsCheckCircle, BsXCircle, BsPlusCircle, BsSearch } from 'react-icons/bs';
import {AppDispatch, RootState} from "../redux/store";
import TeamService from '../redux/services/TeamService';
import {Team, Teammate, InviteModel} from '../models/TeamModel'
let key = false;

function MyTeam() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [teams, setTeams] = React.useState<Team[]>([]);
    const [teammates, setTeammates] = React.useState<Teammate[]>([]);
    const [invites, setInvites] = React.useState<InviteModel[]>([]);
  
    React.useEffect(() => {
      if (key) return;
      TeamService.getTeams().then((res:any) => {
        setTeams(res.teams);
        setTeammates(res.teammates);
        setInvites(res.invites)
      })
      key = true;
    }, [teams, teammates, invites])

  return (
    <div className='d-flex justify-content-between'>
        <Container className=' mt-4 mb-4 mr-0 ml-4 ' style={{width:"62%"}}>
            <Container className='rounded mt-0 mx-0 pt-2 px-3 mb-2'
            style={{
                backgroundColor:"#B4C3B1",
                height:"250px"
            }}>
                <h4 className='text-white' 
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Приглашения
                </h4>
                <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
                {invites.map((invite)=>(
                <Container className='mt-2 mb-2 d-flex justify-content-between p-1 rounded'
                style={{
                backgroundColor:"#F2FAED"
                }}>
                    <span className='mx-2'>{invite.MainUser.Surname} {invite.MainUser.Name} приглашает вас в команду</span>
                    <div className='mx-2'>
                        <Button variant='outline-success' className='p-0 rounded-circle' style={{height:"16px",margin:"0 6px 0 6px", border:"0px"}}>
                            <BsCheckCircle style={{marginBottom:"12px"}}/>
                        </Button>
                        <Button variant='outline-danger' className='p-0 rounded-circle' style={{height:"16px", border:"0px"}}>
                            <BsXCircle style={{marginBottom:"12px"}}/>
                        </Button>
                    </div>
                </Container> 
                 ))}
                       
            </Container>
            <Container className='rounded mt-5 mb-2 mx-0 pt-2 px-3' style={{ height:"320px", padding:"0 12px 0 12px", backgroundColor:"#B4C3B1"}}>
                <h4 className='text-white p-0' 
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Мои команды
                </h4>
                <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
                {teams.map((team)=>(
                <div>
                    {(team.Name === 'Моя команда')?(
                        <Container className='mt-2 mb-2 d-flex justify-content-between p-1 rounded'
                        style={{
                        backgroundColor:"#F2FAED"
                            }}>
                            <span className='mx-2'>Команда {team.MainUser.Surname} {team.MainUser.Name}</span>
                        </Container>
                    ):(
                    <Container className='mt-2 mb-2 d-flex justify-content-between p-1 rounded'
                style={{
                backgroundColor:"#F2FAED"
                    }}>
                    <span className='mx-2'>Команда {team.MainUser.Surname} {team.MainUser.Name}</span>
                    <div className='mx-2'>
                        <Button variant='outline-danger' className='p-0 rounded-circle' style={{height:"16px", border:"0px"}}>
                            <BsXCircle style={{marginBottom:"12px"}}/>
                        </Button>
                    </div>
                </Container>  )}
                </div> 
                ))}
                    
            </Container>
        </Container>
        <Container className='rounded mt-4 ml-2  pt-2 px-3' style={{ width:"33%",marginRight:"30px" ,height:"617px",backgroundColor:"#B6D3B0"}}> 
                <h4 className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Команда
                </h4> 
                <hr style={{margin:"0 0 10px 0", backgroundColor:"#ffffff"}}/>
                <div className='d-block h-100'>
                    <div style={{height:"80%"}}>
                    {teammates.map((teammate)=>(
                        <Container className='mt-2 mb-2 d-flex justify-content-between p-1 rounded'
                        style={{
                        backgroundColor:"#F2FAED"
                        }}>
                            <span className='mx-2'>{teammate.User.Surname} {teammate.User.Name}| {teammate.User.Login}</span>
                            <div className='mx-2'>
                                <Button variant='outline-danger' className='p-0 rounded-circle' style={{height:"16px", border:"0px"}}>
                                    <BsXCircle style={{marginBottom:"12px"}}/>
                                </Button>
                            </div>
                        </Container>  
                    ))}
    
                    </div>
                    <div className='h-100 d-flex flex-column align-items-center'>
                       <Button onClick={handleShow} className='p-0 rounded-circle'style={{ backgroundColor:"#F2FAED", border:"0", height:"32px", width:"32px"}}>
                            <BsPlusCircle style={{margin:"0 1px 2px 0", color:"#89A889", height:"100%", width:"100%"}}/>
                       </Button>  
                    </div>
                    
                </div>        
        </Container>

        <Modal  show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{backgroundColor:"#B6D3B0"}}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                    Добавить в команду
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B6D3B0"}}>
                <div className='d-flex mt-2'>
                    <input type="text" placeholder='Логин' style={{margin:"0 3px 0 0", backgroundColor:"#F2FAED", border:" 1px solid #89A889"}}/>
                    <Button className='p-0' style={{ backgroundColor:"#F2FAED", color:"#89A889", border:" 1px solid #89A889", width:"32px", height:"32px"}}>
                        <BsSearch className='h-90 w-90'/>
                    </Button>
                </div>
                <div className='d-flex mt-2'>
                    <input type="text" placeholder='Телефон' style={{margin:"0 3px 0 0", backgroundColor:"#F2FAED", border:" 1px solid #89A889"}}/>
                    <Button className='p-0' style={{ backgroundColor:"#F2FAED", color:"#89A889", border:" 1px solid #89A889", width:"32px", height:"32px"}}>
                        <BsSearch className='h-90 w-90'/>
                    </Button>
                </div>
                
                <input type="text" placeholder='ФИО' className='row mt-2' style={{margin:"0 3px 0 0", backgroundColor:"#F2FAED", width:"220px" , border:" 1px solid #89A889"}}/>
                <Button className='mt-2' style={{ backgroundColor:"#F2FAED", color:"#89A889", border:" 1px solid #89A889"}}>Пригласить</Button>
            </Modal.Body>           
        </Modal>                     
    </div>

  );
}

export default MyTeam;