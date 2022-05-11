import React,{useState} from 'react';
import {Container, Button, Form} from 'react-bootstrap';
import AuthService from "../../redux/services/AuthService";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {useNavigate} from 'react-router-dom';
import {RegisterSuccess} from "../../redux/actions/authActions";
import {RegistrationModel} from '../../models/RequestModels';
import sha256 from "sha256";

interface State {
	login: string,
	surname: string,
	name: string,
	phone: string,
	middlename: string,
	email: string,
	mainpassword: string,
	passwordcheck: string
}

function Registration() {
  const [values, setValues] = useState<State>({
		login: '',
		surname: '',
		name: '',
		phone: '',
		middlename: '',
		email: '',
		mainpassword: '',
		passwordcheck: ''
	})
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
  const onClick = (event: any) => {
		if (values.mainpassword !== values.passwordcheck) return;
		const data: RegistrationModel = {
			login: values.login,
			password: sha256(values.mainpassword),
			surname: values.surname,
			name: values.name,
			phone: values.phone,
			middlename: values.middlename,
			email: values.email
		};
		AuthService.register(data).then((res) => {
			dispatch(res)
			if (res.type === RegisterSuccess.type){
				navigate("/");
			}
		});
	};
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({...values, [prop]: event.target.value.trim()});
	};
  return (
    <div className='w-100 d-flex flex-column align-items-center'>
       <Container className='rounded w-50 m-4 d-flex flex-column align-items-center'  style={{
                backgroundColor:"#B6D3B0"
            }}>
      <h4 className='text-center text-white'
      style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
      >Регистрация
      </h4>

      <Form className='d-flex flex-column align-items-center'>
        <Container className='row'>
          <Container className='mr-3 col'>
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingSurname"value={values.surname} onChange={handleChange("surname")} type="text" placeholder="Фамилия"/>
              <Form.Label for="floatingSurname">Фамилия</Form.Label>
            </Form.Floating>  
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingName" value={values.name} onChange={handleChange("name")} type="text" placeholder="Имя"/>
              <Form.Label for="floatingName">Имя</Form.Label>
            </Form.Floating>
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingMiddlename" value={values.middlename} onChange={handleChange("middlename")} type="text" placeholder="Фамилия"/>
              <Form.Label for="floatingMiddlename">Отчество</Form.Label>
            </Form.Floating>  
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingPhone" value={values.phone} onChange={handleChange("phone")}  type="phone" placeholder="Номер телефона"/>
              <Form.Label for="floatingPhone">Номер телефона</Form.Label>
            </Form.Floating>
          </Container>
          <Container className='col'>
            <Form.Floating className='mt-2'> 
              <Form.Control style={{backgroundColor:"#F2FAED"}} id="floatingEmail" value={values.email} onChange={handleChange("email")} type="email" placeholder="Email"/>
              <Form.Label for="floatingEmail">Email</Form.Label>
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
      {/* <input type="text" placeholder='Фамилия' value={values.surname} onChange={handleChange("surname")} className='row mt-2' />
      <input type="text" placeholder='Имя' value={values.name} onChange={handleChange("name")} className='row mt-2'/>
      <input type="text" placeholder='Отчество' value={values.middlename} onChange={handleChange("middlename")} className='row mt-2' />
      <input type="text" placeholder='Email' value={values.email} onChange={handleChange("email")} className='row mt-2'/>
      <input type="text" placeholder='Номер телефона' value={values.phone} onChange={handleChange("phone")} className='row mt-2' />
      <input type="text" placeholder='Логин' value={values.login} onChange={handleChange("login")} className='row mt-2'/>
      <input type="password" placeholder='Пароль' value={values.mainpassword} onChange={handleChange("mainpassword")} className='row mt-2'/>
      <input type="password" placeholder='Повторите пароль' value={values.passwordcheck} onChange={handleChange("passwordcheck")} className='row mt-2'/> */}
      </Container>
    </div>
  );
}

export default Registration;