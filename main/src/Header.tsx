import './assets/css/header.css';
import React from 'react';
import { Link } from "react-router-dom";
// reactstrap components
import {
  Dropdown,
  Navbar,
  Nav,
  Container,
  Image
} from "react-bootstrap";
import  UncontrolledDropdown from"react-bootstrap/Dropdown";
import forest from './assets/img/forest.png';
import avatar from './assets/img/avatar.png';


function Header() {
  return (
    <div style={{
      width:"100%",
      backgroundColor:"#B5C2B1",
      backgroundSize: "cover",
      backgroundPosition: "center top",}}>
       <Navbar className="p-0" expand="md" id="navbar-main">
        <Container fluid style={{justifyContent:"end"}}>
          <Nav className="align-items-center d-none d-md-flex" navbar>
          <img style={{height: "16px"}} 
                      alt="..."
                      src="/img/kolokol.svg"
                    />
            <UncontrolledDropdown>
              <Dropdown.Toggle className="pr-0 d-flex"
               style={{
              border:"0px",
              backgroundColor:"#B5C2B1",
              backgroundSize: "cover",
              backgroundPosition: "center top",
              }}>
                <div className="align-items-center d-flex" >
                  <div className="ml-2 d-none d-lg-block">
                    <span className="mb-0 mx-2 text-black  font-bold">
                      @pomidorkin1
                    </span>
                  </div>
                  <span className="avatar ml-2 avatar-sm rounded-circle">
                    <Image className="avatar ml-2 avatar-sm rounded-circle"
                      style={{
                        height:"40px",
                      }}
                      alt="..."
                      src={avatar}
                    />
                  </span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-arrow dropdown-toggle-split">
                <Dropdown.Item>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </Dropdown.Item>
                <Dropdown.Item href="#pablo" >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;