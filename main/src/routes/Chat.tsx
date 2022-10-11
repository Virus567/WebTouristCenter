import {SignalRContext} from '../index';
import React, {useState} from 'react';
import {Container,Carousel,Button} from 'react-bootstrap';
import {useNavigate, useLocation} from 'react-router-dom';
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";

interface Message{
    user: string,
    message: string
};

function Chat() {
  const [user, setUser] = useState<string>("");
  const [currMessage, setCurr] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  SignalRContext.useSignalREffect(
    "receive", (usr: string, msg: string) => {
        const newtmp =[] as Message[]
        messages.map((e)=> {newtmp.push({user:e.user, message:e.message})
    })
    newtmp.push({user:usr, message:msg})
    setMessages(newtmp)},[messages]
    )
  
  return (
    <div>
        <div>
            Введите логин:<br/>

            <input type="text" value={user} onChange={(e)=>{setUser(e.target.value)}} />
            <br/><br/>
            <input type="text" value={currMessage} onChange={(e)=>{setCurr(e.target.value)}} />
            <br/><br/>
            <input type={"button"} value={"Отправить"} onClick={() => {
                SignalRContext.invoke("Send", user, currMessage)
                setCurr("")
            }} disabled = {user ==="" || currMessage ===""}/>
        </div>
        <div>
            { messages.map((msg,i)=>(
                <div>
                    <h3>{msg.message}</h3>
                    <p>{msg.user}</p>
                </div>
            ))}
        </div>
    </div>
  ); 
}

export default Chat;