import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import Register from '../components/Register';
import RegisterCompany from '../components/RegisterCompany';


function Registration() {
   const [key, setKey] = useState<boolean>(true);
   const keyCompany = () => {
      setKey(true);   
    }
    const keyUser = () => {
      setKey(false);   
    }
  return (
    <div>
        <div className='d-flex flex-column mt-4 align-items-center'>
          <div className='d-flex'>
            <Button className='mx-2'style={{backgroundColor:"#F2FAED",fontWeight:"bold", borderColor:"#89A889", color:"#89A889"}} 
              onClick={keyUser}>Регистрация для физ лиц</Button>
          <Button style={{backgroundColor:"#F2FAED",fontWeight:"bold", borderColor:"#89A889", color:"#89A889"}} 
              onClick={keyCompany}>Регистрация для компаний</Button>
          </div>  
        </div>
        
        {key ? (<RegisterCompany/>):(<Register/>)}
    </div>
  );
}

export default Registration;