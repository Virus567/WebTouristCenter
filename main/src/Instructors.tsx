import React,{useState} from 'react';
import {Container, Button} from 'react-bootstrap';
import AuthService from "./redux/services/AuthService";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";
import {useNavigate} from 'react-router-dom';
import {RegisterSuccess} from "./redux/actions/authActions";
import {RegistrationModel} from './models/RequestModels';
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

function Instructors() {

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
    <div className='d-flex'>
      <Container className='rounded w-25 m-4 d-flex flex-column align-items-center'  style={{
                backgroundColor:"#B6D3B0"
            }}>
      <h4 className='text-center text-white'
      style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
      >Авторизация
      </h4>
      <input type="text" placeholder='Логин' className='row mt-2'/>
      <input type="password" placeholder='Пароль' className='row mt-2'/>
      <Button variant='outline-success' className='row mt-2'>Войти</Button>
      </Container>
      <Container className='rounded w-25 m-4 d-flex flex-column align-items-center'  style={{
                backgroundColor:"#B6D3B0"
            }}>
      <h4 className='text-center text-white'
      style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
      >Регистрация
      </h4>
      <input type="text" placeholder='Фамилия' value={values.surname} onChange={handleChange("surname")} className='row mt-2' />
      <input type="text" placeholder='Имя' value={values.name} onChange={handleChange("name")} className='row mt-2'/>
      <input type="text" placeholder='Отчество' value={values.middlename} onChange={handleChange("middlename")} className='row mt-2' />
      <input type="text" placeholder='Email' value={values.email} onChange={handleChange("email")} className='row mt-2'/>
      <input type="text" placeholder='Номер телефона' value={values.phone} onChange={handleChange("phone")} className='row mt-2' />
      <input type="text" placeholder='Логин' value={values.login} onChange={handleChange("login")} className='row mt-2'/>
      <input type="password" placeholder='Пароль' value={values.mainpassword} onChange={handleChange("mainpassword")} className='row mt-2'/>
      <input type="password" placeholder='Повторите пароль' value={values.passwordcheck} onChange={handleChange("passwordcheck")} className='row mt-2'/>
      <Button onClick={onClick} variant='outline-success'className='row mt-2'>Зарегестрироваться</Button>
      </Container>
       
    </div>
  );
}

export default Instructors;