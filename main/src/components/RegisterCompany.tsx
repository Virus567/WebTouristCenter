import React,{useState} from 'react';
import {Container, Button, Form, Toast, ToastContainer} from 'react-bootstrap';
import AuthService from "../redux/services/AuthService";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {useNavigate} from 'react-router-dom';
import {RegisterSuccess} from "../redux/actions/authActions";
import {CompanyRegistrationModel} from '../models/RequestModels';
import sha256 from "sha256";

interface State {
	login: string,
  nameOfCompany: string,
	surname: string,
	name: string,
	phone: string,
	middlename: string,
	email: string,
	mainpassword: string,
	passwordcheck: string
}

function RegisterCompany() {
  const [values, setValues] = useState<State>({
		login: '',
    nameOfCompany: '',
		surname: '',
		name: '',
		phone: '+7',
		middlename: '',
		email: '',
		mainpassword: '',
		passwordcheck: ''
	})
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const onClick = (event: any) => {
    if (values.mainpassword !== values.passwordcheck) {setShowToast(true); return;};
    if(values.login===''|| values.surname ==='' || values.name === '' || values.phone  === '+7' || values.phone  === '+' || values.phone  === '' || values.email === '' || values.mainpassword === '' || values.nameOfCompany===''){setShow(true);return;}
		const data: CompanyRegistrationModel = {
			login: values.login,
			password: sha256(values.mainpassword),
			surname: values.surname,
			name: values.name,
			phone: values.phone,
			middlename: values.middlename,
			email: values.email,
      nameOfCompany: values.nameOfCompany
		};
		AuthService.register(data).then((res) => {
			dispatch(res)
      navigate("/");
			if (res.type === RegisterSuccess.type){
				//navigate("/");
			}
		});
	};
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({...values, [prop]: event.target.value});
	};
  return (
    <div className='w-100 d-flex flex-column align-items-center'>
       <Container className='rounded w-50 m-4 d-flex flex-column align-items-center'  style={{
                backgroundColor:"#B6D3B0"
            }}>
      <h4 className='text-center text-white'
      style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
      >Регистрация для компаний
      </h4>

      <Form className='d-flex flex-column align-items-center'>
        <Container className='row'>
          <Container className='mr-3 col'>
          <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED" }} id="floatingNameOfCompany"value={values.nameOfCompany} onChange={handleChange("nameOfCompany")} type="text" placeholder="Фамилия"/>
              <Form.Label for="floatingSurname">Название компании</Form.Label>
            </Form.Floating>  
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingSurname"value={values.surname} onChange={handleChange("surname")} type="text" placeholder="Фамилия"/>
              <Form.Label for="floatingSurname">Фамилия представителя</Form.Label>
            </Form.Floating>  
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingName" value={values.name} onChange={handleChange("name")} type="text" placeholder="Имя"/>
              <Form.Label for="floatingName">Имя представителя</Form.Label>
            </Form.Floating>
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingMiddlename" value={values.middlename} onChange={handleChange("middlename")} type="text" placeholder="Фамилия"/>
              <Form.Label for="floatingMiddlename">Отчество представителя</Form.Label>
            </Form.Floating>  
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED", width:"13rem"}} id="floatingPhone" value={values.phone} maxLength={12}
              onChange={e=>{
                        if(!isNaN(Number(e.target.value))){
                        setValues({...values, phone:e.target.value.trim()});
                        }
                        else{
                          setValues({...values, phone:e.target.value.substring(0, e.target.value.length - 1).trim()});
                        }    
                      }}  
                       type="phone" placeholder="Номер телефона"/>
              <Form.Label for="floatingPhone">Телефон представителя</Form.Label>
            </Form.Floating>
          </Container>
          <Container className='col'>
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingEmail" value={values.email} onChange={handleChange("email")} type="email" placeholder="Email"/>
              <Form.Label for="floatingEmail">Email представителя</Form.Label>
            </Form.Floating>
          <Form.Floating className='mt-2'> 
            <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingInput" value={values.login} onChange={handleChange('login')} type="text" placeholder="Логин"/>
            <Form.Label for="floatingInput">Логин</Form.Label>
          </Form.Floating> 
          <Form.Floating className='mt-2'> 
            <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingMainPassword" value={values.mainpassword} onChange={handleChange("mainpassword")} type="password" placeholder="Пароль"/>
            <Form.Label for="floatingMainPassword">Пароль</Form.Label>
          </Form.Floating>  
          <Form.Floating className='mt-2'> 
            <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingPasswordCheck" value={values.passwordcheck} onChange={handleChange("passwordcheck")} type="password" placeholder="Повторите пароль"/>
            <Form.Label for="floatingPasswordCheck">Повторите пароль</Form.Label>
          </Form.Floating> 
          </Container> 
        </Container>
        <Button onClick={onClick} variant='outline-success' className='mt-3 mb-3 w-50 btn btn-lg' style={{backgroundColor:"#F2FAED", borderColor:"#89A889", color:"#89A889"}}>Регистрация</Button>
      </Form>
      </Container>

      <ToastContainer position="top-end">
            <Toast show={showToast} bg="danger" autohide delay={3000} onClose={toggleShowToast}>
              <Toast.Header>
                <strong>Ошибка</strong>
              </Toast.Header>
              <Toast.Body>Пароли не совпадают</Toast.Body>
            </Toast>
        </ToastContainer>   

        <ToastContainer position="top-end">
            <Toast show={show} bg="danger" autohide delay={3000} onClose={toggleShow}>
              <Toast.Header>
                <strong>Ошибка</strong>
              </Toast.Header>
              <Toast.Body>Заполните поля корректно</Toast.Body>
            </Toast>
        </ToastContainer>
    </div>
  );
}

export default RegisterCompany;