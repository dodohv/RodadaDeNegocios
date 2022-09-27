import { Link } from 'react-router-dom';
import {FloatingLabel, Form,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import  React, {useState, useEffect} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
 

const Configurador = () => {

    const [reuniao, setReuniao] = useState('');
    const [grupo, setGrupo] = useState('');
    const [participantes, setParticipantes] = useState(0);
    const [tempoPartMin, setTempoPartMin]= useState(0);
    const [tempoPartSeg, setTempoPartSeg]= useState(0);
    const [intIndMin, setIntIndMin]= useState('');
    const [intIndSeg, setIntIndSeg]= useState('');
    const [intGrupMin, setIntGrupMin]= useState('');
    const [intGrupSeg, SetIntGrupSeg] = useState('');
    const [numMesas, setNumMesas] = useState(0);
    const [partMesa,setPartMesa] = useState(0);
    const [tempoTotal, setTempoTotal] = useState("00:00:00");
    const [imgDireita, setImgDireita] = useState('');
    const [imgEsquerda, SetImgEsquerda] = useState('');
    const [idioma, setIdioma] = useState('');



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
                                           <Form.Control value={reuniao} 
                                           onChange={(e) => setReuniao(e.target.value)}
                                           className="input-card" type="email" placeholder="name@example.com" />
                                       
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
                                            <Form.Select value={grupo}  
                                            onChange={(e) => setGrupo(e.target.value)}
                                            className="input-card" aria-label="Floating label select example">
                                               <option value="Selecione">Selecione</option>
                                                <option value="Grupo">Grupo</option>
                                                <option value="Individual">Individual</option>
                                            </Form.Select>
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
                                            <Form.Select value={participantes} 
                                            onChange={(e) => setParticipantes(e.target.value)}
                                             className="input-card" aria-label="Floating label select example">
                                     
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="300">300</option>

                                            </Form.Select>
                                       
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
                                            <Form.Select value={tempoPartMin}  
                                            onChange={(e) => setTempoPartMin(e.target.value)}
                                            className="input-card-se" aria-label="Floating label select example">

                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={tempoPartSeg} 
                                            onChange={(e) => setTempoPartSeg(e.target.value)}
                                            className="input-card-se" aria-label="Floating label select example">
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
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> seg</p>
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
                                            <Form.Select value={intIndMin}
                                            onChange={(e) => setIntIndMin(e.target.value)}
                                            className="input-card-se" aria-label="Floating label select example">
 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                           <Form.Select value={intIndSeg}  
                                            onChange={(e) => SetIntIndSeg(e.target.value)}
                                           className="input-card-se" aria-label="Floating label select example">
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
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> seg</p>
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
                                           <Form.Select value={intGrupMin}
                                            onChange={(e) => setintGrupMin(e.target.value)} 
                                           
                                           className="input-card-se" aria-label="Floating label select example">
 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={intGrupSeg}  
                                            onChange={(e) => SetIntGrupSeg(e.target.value)}
                                            
                                            className="input-card-se" aria-label="Floating label select example">
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
                                       
                                        </Col>
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> seg</p>
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
                                            <Form.Select value={numMesas} 
                                            onChange={(e) => setNumMesas(e.target.value)}
                                            className="input-card-se" aria-label="Floating label select example">
 
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                       </Col >
                                        <Col xs={2} md={2}>
                                         <BsFillPeopleFill/>
                                        </Col>
                                        <Col xs={6} md={6}>
                                        
                                        <FloatingLabel value={partMesa}
                                        
                                        className="input-card-se" controlId="floatingInputGrid" label=" por mesa">
                                        
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
                                           <Form.Control disabled   value={tempoTotal} 
                                           
                                           className="input-card" size="sm" type="email" placeholder="00:00:00" />
                                  
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
                                        <Form.Control value={imgDireita}
                                        onChange={(e)   => setImgDireita(e.target.value)}
                                        className="mb-0 input-card" type="file"  />
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
                                        <Form.Control value={imgEsquerda} 
                                        onChange={(e)   => setImgEsquerda(e.target.value)}
                                        className="mb-0 input-card" type="file"  />
                                     {/* <Form.Group controlId="formFileSm" className="mb-3 input-card">
                                        <Form.Control type="file" size="sm" />
                                    </Form.Group> */}
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
                                            <Form.Select value = {idioma}
                                            onChange={(e)   =>  setIdioma(e.target.value)}                                            
                                            className="input-card" aria-label="Floating label select example">
                                                <option value="Português">Português</option>
                                                <option value="Inglês">Inglês</option>
                                                <option value="Inglês">Espanhol</option>
                                            </Form.Select>
                                      
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
                    <th>Part Mesa</th>
                    <th>Tempo Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{reuniao}</td>
                        <td>{grupo}</td>
                        <td>{participantes}</td>
                        {tempoPartMin.length == 1  && tempoPartSeg.length == 1
                            ?          
                        <td>0{tempoPartMin}:0{tempoPartSeg}</td>
                            :
                            tempoPartMin.length == 2 && tempoPartSeg.length == 1
                                ?
                                <td>{tempoPartMin}:0{tempoPartSeg}</td>
                                :
                                tempoPartMin.length == 1 && tempoPartSeg.length == 2
                                    ?

                                    <td>0{tempoPartMin}:{tempoPartSeg}</td>
                                    :
                                    tempoPartMin.length == 1
                                        ?
                                        <td>0{tempoPartMin}:{tempoPartSeg}</td>
                                        :
                                        <td>{tempoPartMin}:{tempoPartSeg}</td>
                        }                          
                        {intGrupMin.length == 1  && intGrupSeg.length == 1
                                    ?          
                                <td>0{intGrupMin}:0{intGrupSeg}</td>
                                    :
                                    intGrupMin.length == 2 && intGrupSeg.length == 1
                                        ?
                                        <td>{intGrupMin}:0{intGrupSeg}</td>
                                        :
                                        intGrupMin.length == 1 && intGrupSeg.length == 2
                                            ?

                                            <td>0{intGrupMin}:{intGrupSeg}</td>
                                            :
                                            intGrupMin.length == 1 
                                                ?
                                                <td>0{intGrupMin}:{intGrupSeg}</td>
                                                :
                                                <td>{intGrupMin}:{intGrupSeg}</td>
                        }          
                        <td>{numMesas}</td>
                        <td>
                        {partMesa}

                        </td>
                        <td>{tempoTotal}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
     );
}
 
export default Configurador;