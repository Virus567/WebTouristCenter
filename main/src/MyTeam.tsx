import React from 'react';
import {Container} from 'react-bootstrap';

function MyTeam() {
  return (
    <div>
        <Container className='row'>
            <Container className='rounded col-6 m-2'
            style={{
                backgroundColor:"#B4C3B1"

            }}>
                <h4 className='text-white' 
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Приглашения
                </h4>
               
            </Container>
            <Container className='rounded col-5 mb-2 mt-2'  style={{backgroundColor:"#B6D3B0"}}> 
                <h4 className='text-white'
                style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    Команда
                </h4>  
            </Container>
        </Container>
        <Container className='rounded row' style={{margin:"2px 2px 2px 1.3rem", padding:"0 12px 0 12px", width:"45.2%", backgroundColor:"#B4C3B1"}}>
            <h4 className='text-white p-0' 
            style={{textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                Мои команды
            </h4>
        </Container>
      
    </div>
  );
}

export default MyTeam;