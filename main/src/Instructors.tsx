import React from 'react';
import {Container, Button} from 'react-bootstrap';

function Instructors() {
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
      <input type="text" placeholder='Фамилия' className='row mt-2' />
      <input type="text" placeholder='Имя'  className='row mt-2'/>
      <input type="text" placeholder='Отчество' className='row mt-2' />
      <input type="text" placeholder='Email' className='row mt-2'/>
      <input type="text" placeholder='Номер телефона' className='row mt-2' />
      <input type="text" placeholder='Логин' className='row mt-2'/>
      <input type="password" placeholder='Пароль' className='row mt-2'/>
      <input type="password" placeholder='Повторите пароль' className='row mt-2'/>
      <Button variant='outline-success'className='row mt-2'>Зарегестрироваться</Button>
      </Container>
       
    </div>
  );
}

export default Instructors;