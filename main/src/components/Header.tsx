import '../assets/css/header.css';
import React, { useState } from 'react';
import sha256 from "sha256";
import {LoginModel} from '../models/RequestModels';
import {LoginSuccess} from "../redux/actions/authActions";
import {FaUserCircle} from 'react-icons/fa';
import  UncontrolledDropdown from"react-bootstrap/Dropdown";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import AuthService from "../redux/services/AuthService";
import {useNavigate} from 'react-router-dom';
// reactstrap components
import {
  Dropdown,
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer
} from "react-bootstrap";
import { clientActions } from '../redux/slices/clientSlice';
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
      handleClose();
      if(res.type === clientActions.loginSuccess.type){
        navigate("/");
      }
      else{
       setShowToast(true);
      }
		})
	};

  const [showToast, setShowToast] = useState(false);
  const toggleShow = () => setShowToast(!showToast);
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

          {user.client.isAuth?(
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
                  <span className="mb-0 mx-2 text-black font-bold">
                     {(user.client.client!.NameOfCompany=== null)?
                     (
                        user.client.client!.Login
                     ):(
                        user.client.client!.NameOfCompany
                     )
                     }
                      
                    </span>
                  </div>
                  <span className="avatar ml-2 avatar-sm text-grey rounded-circle">
                    <FaUserCircle className='mt-2 mb-2' style={{color:"#F2FAED", height:"32px", width:"32px"}}/>
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-arrow dropdown-toggle-split">
                <Dropdown.Item onClick={()=>dispatch(AuthService.logout())} >
                  <i className="ni ni-user-run" />
                  <span>Выйти</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </UncontrolledDropdown>
                      </div>
              
            ):(
              <>
              <Button className="m-2" style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
            textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}} 
            onClick={handleShow}>
              Войти
              </Button>
              <Button className="m-2" style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}} 
              onClick={() =>{navigate("/register")}}>
                Регистрация
              </Button>
              </>
            )}
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
              <Form>
                <Form.Floating>  
                  <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingInput" value={values.login} onChange={handleChange('login')} type="text" placeholder="Login"/>
                  <Form.Label for="floatingInput">Login</Form.Label>
                </Form.Floating> 
                <Form.Floating className='mt-3'> 
                  <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingPassword" value={values.password} onChange={handleChange('password')} type="password" placeholder="Password"/>
                  <Form.Label for="floatingPassword">Password</Form.Label>
                </Form.Floating>  

                <Button variant='outline-success' className='mt-3 w-100 btn btn-lg' style={{backgroundColor:"#F2FAED", borderColor:"#89A889", color:"#89A889"}} onClick={onClick}>Войти</Button>
              </Form>
              
            </Modal.Body>           
        </Modal>  

        <ToastContainer position="top-end">
            <Toast show={showToast} bg="danger" autohide delay={3000} onClose={toggleShow}>
              <Toast.Header>
                <strong>Ошибка</strong>
              </Toast.Header>
              <Toast.Body>Неверный логин или пароль</Toast.Body>
            </Toast>
        </ToastContainer>                  

    </div>
  );
}

export default Header;