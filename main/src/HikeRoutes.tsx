import React from 'react';
import {Card, Container,Button, Form} from 'react-bootstrap';
import route from './assets/img/loveNemda.png';
import {useNavigate} from 'react-router-dom';

function HikeRoutes() {
  const navigate = useNavigate();
  return (
    <div>
      <Container className='mt-2 mb-3  d-flex justify-content-between p-2 rounded'
                style={{ margin:"0 0 0 40px",
                width:"94%",
                backgroundColor:"#B6D3B0"
                }}>
                  <div>
                    <Form.Group controlId="sort">
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Сортировка:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Сортировка">
                        <option value="1">По популярности</option>
                        <option value="2">По алфавиту</option>
                        <option value="3">По количеству дней</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div>
                    <Form.Group  controlId="search">
                    <Form.Label style={{margin:"0 0 5px 5px"}}>Поиск:</Form.Label>
                    <Form.Control style={{backgroundColor:"#F2FAED"}} type="text" name="search" placeholder='Поиск по маршруту'/>
                  </Form.Group>
                  </div>
                  <div style={{width:"20%"}}>
                    <Form.Group controlId="river">
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Название реки:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Река">
                        <option value="1">Немда</option>
                        <option value="2">Вятка</option>
                        <option value="3">Быстрица</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div style={{marginRight:"20px", marginBottom:"5px"}}>
                    <Form.Group controlId="count" >
                      <Form.Label style={{margin:"0 0 5px 5px"}}>Количество дней:</Form.Label>
                      <Form.Select  style={{backgroundColor:"#F2FAED"}} aria-label="Кол-во дней">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>   
                      </Form.Select>
                    </Form.Group>
                  </div>                                        
        </Container>  
      <Container className="mt-4 mb-4 d-flex justify-content-between">
        <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
          <Card.Img variant="top" src={route} />
          <Card.ImgOverlay className='d-flex flex-column align-items-end'>
            <Card.Text>
              <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  3 дня
              </div>
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Body style={{backgroundColor:"#F2FAED"}}>
            <Card.Title>Любимая Немда</Card.Title>
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

        <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
          <Card.Img variant="top" src={route} />
          <Card.ImgOverlay className='d-flex flex-column align-items-end'>
            <Card.Text>
              <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  3 дня
              </div>
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Body style={{backgroundColor:"#F2FAED"}}>
            <Card.Title>Любимая Немда</Card.Title>
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
        <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
          <Card.Img variant="top" src={route} />
          <Card.ImgOverlay className='d-flex flex-column align-items-end'>
            <Card.Text>
              <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  3 дня
              </div>
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Body style={{backgroundColor:"#F2FAED"}}>
            <Card.Title>Любимая Немда</Card.Title>
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
        

      </Container> 
      <Container className="mt-4 mb-4 d-flex justify-content-between">
        <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
          <Card.Img variant="top" src={route} />
          <Card.ImgOverlay className='d-flex flex-column align-items-end'>
            <Card.Text>
              <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  3 дня
              </div>
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Body style={{backgroundColor:"#F2FAED"}}>
            <Card.Title>Любимая Немда</Card.Title>
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

        <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
          <Card.Img variant="top" src={route} />
          <Card.ImgOverlay className='d-flex flex-column align-items-end'>
            <Card.Text>
              <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  3 дня
              </div>
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Body style={{backgroundColor:"#F2FAED"}}>
            <Card.Title>Любимая Немда</Card.Title>
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
        <Card style={{ width: '24rem', border:" 2px solid #89A889" }}>
          <Card.Img variant="top" src={route} />
          <Card.ImgOverlay className='d-flex flex-column align-items-end'>
            <Card.Text>
              <div className='rounded d-flex flex-column align-items-center px-1' style={{backgroundColor:"#B6D3B0", color:"#ffff", border:" 1px solid #89A889",
              textShadow:"1px 1px 0 #89A889, -1px -1px 0 #89A889, 1px -1px 0 #89A889, -1px 1px 0 #89A889, 1px 1px 0 #89A889"}}>
                  3 дня
              </div>
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Body style={{backgroundColor:"#F2FAED"}}>
            <Card.Title>Любимая Немда</Card.Title>
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
      </Container> 
    </div>
  );
}

export default HikeRoutes;