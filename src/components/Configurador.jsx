import { Link } from 'react-router-dom';
import {FloatingLabel, Form,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import {useState} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
const Configurador = () => {

    const [reuniao, setreuniao] = useState('');

return ( 
        <Container className='configurador'>
     
            <Link to="/" >
                <button> Voltar para Inicio</button>

            </Link>

            <Row xs={1} md={12} className="g-4">
            <Col xs={12}>
                <Card bg={'outline-primary'} >
                    <Card.Body>
                        <Card.Title className='title-card'>
                            Configurador
                        </Card.Title>
                            <Row className='row-card' >
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                        Nome da Reunião:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text>
                                        {/* <input className="input-card" />    */}
                                        <FloatingLabel className="input-card" controlId="floatingInputGrid" label="Nome da Reunião">
                                            <Form.Control type="email" placeholder="name@example.com" />
                                        </FloatingLabel> 
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                        Tipo de Apresentação:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                  
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="Tipo de Apresentação">
                                            <Form.Select aria-label="Floating label select example">
                                             
                                                <option value="1">Grupo</option>
                                                <option value="2">Individual</option>

                                            </Form.Select>
                                        </FloatingLabel>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Número de Participantes:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                     
                                                <option value="1">9</option>
                                                <option value="2">10</option>
                                                <option value="3">300</option>

                                            </Form.Select>
                                        </FloatingLabel>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Tempo por Participante:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                        
                                    <Row>
                                        <Col xs={4} md={4}>
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                        </FloatingLabel>  
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="text-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                                <option value="0">0</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option defaultChecked value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="30">30</option>                                                
                                                <option value="35">35</option>
                                                <option value="40">40</option>
                                                <option value="45">45</option>
                                                <option value="50">50</option>
                                                <option value="55">55</option>
                                            </Form.Select>
                                        </FloatingLabel>  
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="text-card-p"> seg</p>
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Intervalo Individual:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row>
                                        <Col xs={4} md={4}>
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                        </FloatingLabel>  
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="text-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                                <option value="0">0</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option defaultChecked value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="30">30</option>                                                
                                                <option value="35">35</option>
                                                <option value="40">40</option>
                                                <option value="45">45</option>
                                                <option value="50">50</option>
                                                <option value="55">55</option>
                                            </Form.Select>
                                        </FloatingLabel>  
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="text-card-p"> seg</p>
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Intervalo do Grupo:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row>
                                        <Col xs={4} md={4}>
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                        </FloatingLabel>  
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="text-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                                <option value="0">0</option>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option defaultChecked value="20">20</option>
                                                <option value="25">25</option>
                                                <option value="30">30</option>                                                
                                                <option value="35">35</option>
                                                <option value="40">40</option>
                                                <option value="45">45</option>
                                                <option value="50">50</option>
                                                <option value="55">55</option>
                                            </Form.Select>
                                        </FloatingLabel>  
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="text-card-p"> seg</p>
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Número de Mesas:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row>
                                        <Col xs={4} md={4}>
                                        <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                        </FloatingLabel>  
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="text-card-p"> <BsFillPeopleFill/></p>
                                        </Col>
                                        <Col xs={6} md={6}>
                                        
                                        <FloatingLabel className="input-card" controlId="floatingInputGrid" label=" por mesa">
                                        <BsFillPeopleFill/>    
                                        </FloatingLabel> 
                                        </Col>
                                    </Row>
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Tempo Total:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </FloatingLabel>  
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Imagem Direita:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </FloatingLabel>   
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Imagem Esquerda:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </FloatingLabel>   
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Idioma:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <FloatingLabel className="input-card"  controlId="floatingSelect" label="">
                                            <Form.Select aria-label="Floating label select example">
                                                <option>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </FloatingLabel>   
                                    </Card.Text>
                                </Col>
                            </Row>
                     
                    </Card.Body>
                </Card>
            </Col>

            </Row>

          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome Rodada</th>
          <th>Tipo de Apresentação</th>
          <th>Nº Participantes</th>
          <th><BsClockHistory/> Participante</th>
          <th><BsClockHistory/>Intervalo</th>
          <th>Qtd Mesas</th>
          <th>Tempo Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>3</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>40</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>49</td>
        </tr>
      </tbody>
    </Table>

        </Container>
     );
}
 
export default Configurador;