import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import MyTeam from './MyTeam';
import MyHikes from './MyHikes';
import HikeRoutes from './HikeRoutes';
import Instructors from './Instructors';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/sideBar.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div className="d-flex row" style={{backgroundColor:"#F2FAED",height:"100%"}}>
      <div className='col p-0' style={{maxWidth:"250px"}}>
        <SideBar/>  
      </div> 
      <div className='col p-0' style={{maxWidth:"100%"}}>
        <Header/>
        <Routes>
          <Route path={"/"} element={<MyTeam/>} />
          <Route path={"/my-hikes"} element={<MyHikes/>} />
          <Route path={"/routes"} element={<HikeRoutes/>} />
          <Route path={"/instructors"} element={<Instructors/>} />
        </Routes>
      </div>
    </div>   
    </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
