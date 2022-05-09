import './assets/css/header.css';
import React, { useState } from 'react';
import sha256 from "sha256";
import {LoginModel} from './models/RequestModels';
import {LoginSuccess} from "./redux/actions/authActions";
import {FaUserCircle} from 'react-icons/fa';
import  UncontrolledDropdown from"react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./redux/store";
import AuthService from "./redux/services/AuthService";
import {useNavigate} from 'react-router-dom';
// reactstrap components
import {
  Dropdown,
  Navbar,
  Nav,
  Container,
  Image,
  Button,
  Modal
} from "react-bootstrap";
interface State {
	login: string,
	password: string
}

function Header() {
  const [values, setValues] = useState<State>({
		login: '',
		password: ''
	});
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({...values, [prop]: event.target.value.trim()});
	};

	const onClick = () => {
		const data: LoginModel = {
			login: values.login,
			password: sha256(values.password)
		};
		AuthService.login(data).then((res) => {
			dispatch(res)
			if (res.type === LoginSuccess.type) {
				navigate("/");
        handleClose();
			}
		})
	};
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div style={{
      width:"100%",
      backgroundColor:"#B5C2B1",
      backgroundSize: "cover",
      backgroundPosition: "center top",}}>
       <Navbar className="p-0" expand="md" id="navbar-main">
        <Container fluid style={{justifyContent:"end"}}>
          <Nav className="align-items-center d-none d-md-flex" navbar>

          {user.auth?(
            <div  className="align-items-center d-none d-md-flex">
              <img style={{height: "16px"}} 
              alt="..."
              src="/img/kolokol.svg"
            />
            <UncontrolledDropdown>
              <Dropdown.Toggle className="rr pr-0 d-flex"
               style={{
              border:"0px",
              backgroundColor:"#B5C2B1",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              }}>
                <div className="align-items-center d-flex" >
                  <div className="ml-2 d-none d-lg-block">
                    <span className="mb-0 mx-2 text-black  font-bold">
                      {user.client!.Login}
                    </span>
                  </div>
                  <span className="avatar ml-2 avatar-sm text-grey rounded-circle">
                    <FaUserCircle className='mt-2 mb-2' style={{color:"#F2FAED", height:"32px", width:"32px"}}/>
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-arrow dropdown-toggle-split">
                <Dropdown.Item>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </Dropdown.Item>
                <Dropdown.Item onClick={()=>dispatch(AuthService.logout())} >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </UncontrolledDropdown>
                      </div>
              
            ):(<Button className="m-2" style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
            textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}} 
            onClick={handleShow}>
              Войти
              </Button>)}
          </Nav>
        </Container>
      </Navbar>

      <Modal  show={show} onHide={handleClose}>
            <Modal.Header closeButton style={{backgroundColor:"#B6D3B0"}}>
                <Modal.Title className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                    Авторизация
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center' style={{backgroundColor:"#B6D3B0"}}>
              <input type="text" placeholder='Логин' value={values.login} onChange={handleChange('login')} className='row mt-2'/>
              <input type="password" placeholder='Пароль' value={values.password} onChange={handleChange('password')} className='row mt-2'/>
              <Button variant='outline-success' className='row mt-2' onClick={onClick}>Войти</Button>
            </Modal.Body>           
        </Modal>                    

    </div>
  );
}

export default Header;