import React from 'react';
import {Container,Card, Carousel,Button} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";


function Instructors() {
  return (
    <div className='d-flex'>
		<Card>
        <Card.Body>
          Hello, World!
        </Card.Body>
      </Card>
    </div>
  );
}

export default Instructors;