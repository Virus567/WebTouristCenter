import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import Register from '../components/Register';
import RegisterCompany from '../components/RegisterCompany';

let key: boolean = true;
const handleShow = () => key = !key;

function Registration() {
    
  return (
    <div>
        <div className='d-flex flex-column mt-4 align-items-center'>
          <div className='d-flex'>
            <Button className='mx-2'style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
              onClick={handleShow}>Регистрация для физ лиц</Button>
          <Button style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}} 
              onClick={handleShow}>Регистрация для компаний</Button>
          </div>  
        </div>
        
        {key? (<RegisterCompany/>):(<Register/>)}
    </div>
  );
}

export default Registration;