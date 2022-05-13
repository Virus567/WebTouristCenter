import React from 'react';
import {Card, Container,Button, Form} from 'react-bootstrap';
import route from './assets/img/loveNemda.png';
import {useNavigate} from 'react-router-dom';
import RouteService from './redux/services/RouteService';
import {HikeRoute} from "./models/RoutesModel";

function HikeRoutes() {
  const navigate = useNavigate();
  const [routes, setRoutes] = React.useState<HikeRoute[]>([]);

  React.useEffect(() => {
    if (routes.length !== 0) return;
    RouteService.GetRoutes().then((res) => {
      setRoutes(res);
    })
  }, [routes])
  return (
    <div>
      <Container className='mt-2 mb-3 col-lg-11 col-md-8 mx-auto row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 p-2 rounded'
                style={{
                backgroundColor:"#B6D3B0"
                }}>
                  <div className='col'>
                    <Form.Group controlId="sort">
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Сортировка:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Сортировка">
                        <option value="1">По популярности</option>
                        <option value="2">По алфавиту</option>
                        <option value="3">По количеству дней</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='col'>
                    <Form.Group  controlId="search">
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Поиск:</Form.Label>
                    <Form.Control style={{backgroundColor:"#F2FAED"}} type="text" name="search" placeholder='Поиск по маршруту'/>
                  </Form.Group>
                  </div>
                  <div className='col'>
                    <Form.Group controlId="river">
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Название реки:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Река">
                        <option value="0">Все</option>
                        <option value="1">Немда</option>
                        <option value="2">Вятка</option>
                        <option value="3">Быстрица</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='col'>
                    <Form.Group controlId="count" >
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Количество дней:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Кол-во дней">
                        <option value="0">Любое</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>   
                      </Form.Select>
                    </Form.Group>
                  </div>                                        
        </Container>  
      <Container className='mt-4 mb-4 row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 col-lg-11 col-md-8 mx-auto'>
        <div className='col'>
          <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
            <Card.Img variant="top" src={route} />
            <Card.Body style={{backgroundColor:"#F2FAED"}}>
              <Card.Title className='d-flex justify-content-between'>
                <span>
                  Любимая Немда
                </span>
                <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    3 дня
                </div>
              </Card.Title>
              <Card.Text>
                Красавица река НЕМДА является жемчужиной Вятского края. Природа этих мест уникальна: выходы скал, самый высокий водопад Кировской области.
              </Card.Text>
              <div className='d-flex flex-column align-items-end'>
                <Button onClick= {() => {navigate("/route")}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                  Перейти
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div> 
        <div className='col'>
          <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
            <Card.Img variant="top" src={route} />
            <Card.Body style={{backgroundColor:"#F2FAED"}}>
              <Card.Title className='d-flex justify-content-between'>
                <span>
                  Любимая Немда
                </span>
                <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    3 дня
                </div>
              </Card.Title>
              <Card.Text>
                Красавица река НЕМДА является жемчужиной Вятского края. Природа этих мест уникальна: выходы скал, самый высокий водопад Кировской области.
              </Card.Text>
              <div className='d-flex flex-column align-items-end'>
                <Button onClick= {() => {navigate("/route")}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                  Перейти
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>  
        <div className='col'>
          <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
            <Card.Img variant="top" src={route} />
            <Card.Body style={{backgroundColor:"#F2FAED"}}>
              <Card.Title className='d-flex justify-content-between'>
                <span>
                  Любимая Немда
                </span>
                <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    3 дня
                </div>
              </Card.Title>
              <Card.Text>
                Красавица река НЕМДА является жемчужиной Вятского края. Природа этих мест уникальна: выходы скал, самый высокий водопад Кировской области.
              </Card.Text>
              <div className='d-flex flex-column align-items-end'>
                <Button onClick= {() => {navigate("/route")}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                  Перейти
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>  
        <div className='col'>
          <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
            <Card.Img variant="top" src={route} />
            <Card.Body style={{backgroundColor:"#F2FAED"}}>
              <Card.Title className='d-flex justify-content-between'>
                <span>
                  Любимая Немда
                </span>
                <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    3 дня
                </div>
              </Card.Title>
              <Card.Text>
                Красавица река НЕМДА является жемчужиной Вятского края. Природа этих мест уникальна: выходы скал, самый высокий водопад Кировской области.
              </Card.Text>
              <div className='d-flex flex-column align-items-end'>
                <Button onClick= {() => {navigate("/route")}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                  Перейти
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>  
        <div className='col'>
          <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
            <Card.Img variant="top" src={route} />
            <Card.Body style={{backgroundColor:"#F2FAED"}}>
              <Card.Title className='d-flex justify-content-between'>
                <span>
                  Любимая Немда
                </span>
                <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    3 дня
                </div>
              </Card.Title>
              <Card.Text>
                Красавица река НЕМДА является жемчужиной Вятского края. Природа этих мест уникальна: выходы скал, самый высокий водопад Кировской области.
              </Card.Text>
              <div className='d-flex flex-column align-items-end'>
                <Button onClick= {() => {navigate("/route")}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                  Перейти
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>  
        <div className='col'>
          <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
            <Card.Img variant="top" src={route} />
            <Card.Body style={{backgroundColor:"#F2FAED"}}>
              <Card.Title className='d-flex justify-content-between'>
                <span>
                  Любимая Немда
                </span>
                <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", fontSize:"16px", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                    3 дня
                </div>
              </Card.Title>
              <Card.Text>
                Красавица река НЕМДА является жемчужиной Вятского края. Природа этих мест уникальна: выходы скал, самый высокий водопад Кировской области.
              </Card.Text>
              <div className='d-flex flex-column align-items-end'>
                <Button onClick= {() => {navigate("/route")}} style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
                textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}
                >
                  Перейти
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div> 
      </Container>
    </div>
  );
}

export default HikeRoutes;