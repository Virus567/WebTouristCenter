import React from "react";
import {Nav, Navbar,Container, Card, NavItem} from 'react-bootstrap';
import '../assets/css/sideBar.css';
import forest from '../assets/img/forest.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {useNavigate} from 'react-router-dom';


function SideBar() {
  const navigate = useNavigate();
  return (
    <div>
     <Navbar className="navbar-vertical navbar-light bg-white" expand="md"
      style={{
        marginTop:"-1px",
        minHeight: "800px",
        backgroundImage:
          "url(" +
          forest +
          ")",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
     >
        <Container className="align-middle">
            <Navbar.Brand onClick={() => {navigate("/")}}>
                <img
                    src = "/img/Logo.svg"
                    className="d-inline-block align-top"
                    alt="logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="align-middle">
            <NavItem>
                <Card className="mt-2 mx-3 p-0" style={{backgroundColor:"#F2FAED"}}>
                    <Nav.Link className="p-1rem align-middle" onClick={() => {navigate("/")}}>
                        <FontAwesomeIcon icon={ solid("user-group")} />
                        <span className="mx-2">Моя команда</span>
                    </Nav.Link>
                </Card>      
            </NavItem>
            <NavItem>
                <Card className="mt-2 mx-3 p-0" style={{backgroundColor:"#F2FAED"}}>
                    <Nav.Link className="p-1rem" onClick={() => {navigate("/my-hikes")}}>
                        <FontAwesomeIcon icon={ solid("person-hiking")}/>
                        <span className="mx-2">Мои Походы</span>                  
                    </Nav.Link>
                </Card>      
            </NavItem>
            <NavItem>
                <Card className="mt-2 mx-3 p-0" style={{backgroundColor:"#F2FAED"}}>
                    <Nav.Link className="p-1rem" onClick={() => {navigate("/routes")}}>
                        <FontAwesomeIcon icon={ solid("route")} />
                        <span className="mx-2">Маршруты</span>                      
                    </Nav.Link>
                </Card>      
            </NavItem>
            <NavItem>
                <Card className="mt-2 mx-3 p-0" style={{backgroundColor:"#F2FAED"}}>
                    <Nav.Link className="p-1rem" onClick={() => {navigate("/instructors")}}>
                        <FontAwesomeIcon icon={ solid("id-card")} />
                        <span className="mx-2">Инструкторы</span>                     
                    </Nav.Link>
                </Card>      
            </NavItem>
        
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </div>
  );
}

export default SideBar;