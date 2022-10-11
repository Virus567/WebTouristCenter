import React,{useState} from 'react';
import {Card, Container,Button, Form} from 'react-bootstrap';
import route from './assets/img/loveNemda.png';
import {useNavigate} from 'react-router-dom';
import RouteService from '../redux/services/RouteService';
import {Route} from "../models/RoutesModel";

function HikeRoutes() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [sort, setSort] = useState<string>('');
  const [river, setRiver] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [days, setDays] = useState<string>('');
  const [key, setKey] = useState<boolean>(false);

  const getRoutesWithParams =(sort:string, river:string, search:string, days:string) =>{
    RouteService.getRoutesWithParams(sort, river, search, days).then((res) => {
      setRoutes(res);
    })
  }

  React.useEffect(() => {
    if (key) return;
    RouteService.getRoutes().then((res) => {
      setRoutes(res);
    })
    setKey(true);
  }, [key,routes])
  return (
    <div>
      <Container className='mt-2 mb-3 col-lg-11 col-md-8 mx-auto row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 p-2 rounded'
                style={{
                backgroundColor:"#B6D3B0",
                }}>
                  <div className='col'>
                    <Form.Group controlId="sort">
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Сортировка:</Form.Label>
                      <Form.Select style={{backgroundColor:"#F2FAED"}} value={sort} 
                      onChange={e => {
                          setSort(e.target.value);
                          getRoutesWithParams(e.target.value, river, search, days);
                      }} 
                      aria-label="Сортировка">
                        <option value="1">По популярности</option>
                        <option value="2">По алфавиту</option>
                        <option value="3">По количеству дней</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='col'>
                    <Form.Group  controlId="search">
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Поиск:</Form.Label>
                    <Form.Control style={{backgroundColor:"#F2FAED"}} type="text" name="search" placeholder='Поиск по маршруту'
                      onChange={e => {
                      setSearch(e.target.value);
                      getRoutesWithParams(sort, river, e.target.value, days);
                  }}/>
                  </Form.Group>
                  </div>
                  <div className='col'>
                    <Form.Group controlId="river">
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Название реки:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} value={river} 
                      onChange={e => {
                          setRiver(e.target.value);
                          getRoutesWithParams(sort, e.target.value, search, days);
                      }}  aria-label="Река">
                        <option value="All">Все</option>
                        <option value="Nemda">Немда</option>
                        <option value="Vyatka">Вятка</option>
                        <option value="Bystrica">Быстрица</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='col'>
                    <Form.Group controlId="count" >
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Количество дней:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} value={days} 
                      onChange={e => {
                          setDays(e.target.value);
                          getRoutesWithParams(sort, river, search, e.target.value);
                      }} aria-label="Кол-во дней">
                        <option value="0">Любое</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>   
                      </Form.Select>
                    </Form.Group>
                  </div>                                        
        </Container>  
      <Container className='mt-4 mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 col-lg-11 col-md-8' style={{marginLeft:"65px"}}>
        {routes.map((route)=>(
            <div className='col'>
            <Card style={{ width: '22rem', height:'28rem', border:" 2px solid #89A889" }}>
              <Card.Img variant="top" style={{height:"255px"}} src={route.images[0]} />
              <Card.Body style={{backgroundColor:"#F2FAED"}}>
                <Card.Title className='d-flex justify-content-between'>
                  <span>
                    {route.name}
                  </span>
                  <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                  textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                     Кол-во дней: {route.numberDays} 
                  </div>
                </Card.Title>
                <Card.Text style={{height:"40%"}}>
                 {route.description}
                </Card.Text>
                <div className='d-flex flex-column align-items-end'>
                  <Button onClick= {() => {navigate("/route?id="+ route.id)}} style={{backgroundColor:"#F2FAED",fontWeight:"bold",  border:" 2px solid #89A889", color:"#89A889"}}
                  >
                    Перейти
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default HikeRoutes;