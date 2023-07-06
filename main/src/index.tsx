import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import SideBar from './components/SideBar';
import Header from './components/Header';
import MyTeam from './routes/MyTeam';
import MyHikes from './routes/MyHikes';
import HikeRoutes from './routes/HikeRoutes';
import Instructors from './routes/Instructors';
import HikeRoute from './routes/HikeRoute';
import Order from './routes/Order';
import OrderParticiapnt from './routes/order/OrderParticiapnt';
import OrderFeatures from './routes/order/OrderFeatures';
import Registration from './routes/Registration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/sideBar.css';
import {Provider} from "react-redux";
import {store} from './redux/store';
import HikeFullInfo from './routes/HikeFullInfo';
import OrderFullInfo from './routes/OrderFullInfo';
import {createSignalRContext} from 'react-signalr';

export const SignalRContext = createSignalRContext();


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter>
      <div className="d-flex row" style={{overflowX:"hidden", backgroundColor:"#F2FAED",height:"100%"}}>
        <div className='col p-0' style={{maxWidth:"250px"}}>
          <SideBar/>  
        </div> 
        <div className='col p-0' style={{maxWidth:"100%"}}>
          <Header/>
          <Routes>
            <Route path={"/"} element={<HikeRoutes/>} />
            <Route path={"/my-team"} element={<MyTeam/>} />
            <Route path={"/my-hikes"} element={<MyHikes/>} />      
            <Route path={"/route"} element={<HikeRoute/>} />
            <Route path={"/order"} element={<Order/>} />
            <Route path={"/order-partisipants"} element={<OrderParticiapnt/>} />
            <Route path={"/order-features"} element={<OrderFeatures/>} />
            <Route path={"/hike-info"} element={<HikeFullInfo/>} />
            <Route path={"/order-info"} element={<OrderFullInfo/>} />
            <Route path={"/register"} element={<Registration/>} />
          </Routes>
        </div>
      </div>   
      </BrowserRouter> 
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
