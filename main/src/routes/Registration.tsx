import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import Register from '../components/Register';
import RegisterCompany from '../components/RegisterCompany';

let key: boolean = true;
const handleShow = () => key = !key;

function Registration() {
    
  return (
    <div>
        <Button onClick={handleShow}>Регистрация для физ лиц</Button>
        <Button onClick={handleShow}>Регистрация для компаний</Button>
        {key? (<Register/>):(<RegisterCompany/>)}
    </div>
  );
}

export default Registration;