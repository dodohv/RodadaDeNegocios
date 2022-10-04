import { Link } from 'react-router-dom';
import {Form, Alert, InputGroup, Button, ButtonGroup, FloatingLabel,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import  React, {useState, useEffect, useRef} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
import NegocioDataService from "../services/negocio.services"
import MinutoDataService from "../services/minuto.services"
import ParticipanteDataService from "../services/participante.service"
import NotificationSound from "../assets/counter.wav";


const Alertas = () => {
    const [minutos, setMinutos] = useState([]);
    const [negocios, setNegocios] = useState([]);
    const audioPlayer = useRef(null);
    const handleGerarEtiqueta = async(e) => {
        e.preventDefault();

    }

    function playAudio() {
        audioPlayer.current.play();
    }

    const getNegocios = async () => {
        const data = await NegocioDataService.getAllNegocios();
        console.log(data.docs);
        setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
    };
    const getMinutos = async () => {
        const data = await MinutoDataService.getAllMinutos();
        
        setMinutos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    useEffect ( () => {
        

        getNegocios();
    },[] )
    
    
    return ( 
<div>

<Container className='configurador'>
{negocios.slice(-1).map((doc, index) => {
    return(

<Form onSubmit= {handleGerarEtiqueta}>
    <Row  xs={1} md={12} className="g-4">
        <Col xs={12} style={{ marginLeft: '10px' , textAlign: 'start'}}>
            <Card.Body>
                <Card.Title className='title-card'>
                Distribuição dos Participantes por Mesa
                </Card.Title>
                <Row className='row-card'>
                    <Col xs={5} md={5}>
                    <Card.Text className="text-card">
                                Iniciar Reunião: 
                            </Card.Text>
                    </Col>
                    <Col xs={4} md={4}>
                    <Form.Select value="{numMesas}" 
                                            
                                            className="input-card-se" aria-label="Floating label select example">
 
                                                <option value="1">Padrão</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                                            
                                            
                    </Col>
                    <Col xs={2} md={2}>
                            
                            <Card.Text>

                                   <Form.Control value={doc.reuniao} 
                                   disabled="true"
                                   onChange={(e) => setReuniao(e.target.value)}
                                   className="input-card" type="text" placeholder={doc.reuniao} />

                            </Card.Text>
                    </Col>
                    <Col xs={1} md={1}>
                    <audio ref={audioPlayer} src={NotificationSound} />
                    <Button variant="success" onClick ={ () => {playAudio()} }>Ouvir</Button>
                    </Col>
                </Row>
                <Row className='row-card'>
                    <Col xs={5} md={5}>
                    <Card.Text className="text-card">
                                Últimos 15 segundos: 
                    </Card.Text>
                    </Col>
                    <Col xs={4} md={4}>
                    <Form.Select value="{numMesas}" 
                                            
                                            className="input-card-se" aria-label="Floating label select example">
 
                                                <option value="1">Padrão</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                    </Col>
                    <Col xs={2} md={2}>
                            
                            <Card.Text>

                                   <Form.Control value={doc.reuniao} 
                                   disabled="true"
                                   onChange={(e) => setReuniao(e.target.value)}
                                   className="input-card" type="text" placeholder={doc.reuniao} />

                            </Card.Text>
                    </Col>
                    <Col xs={1} md={1}>
                    <audio ref={audioPlayer} src={NotificationSound} />
                    <Button variant="success" onClick ={ () => {playAudio()} }>Ouvir</Button>
                    </Col>
                
                </Row>
                <Row className='row-card'>
                    <Col xs={5} md={5}>
                    <Card.Text className="text-card">
                                Fechamento Individual: 
                            </Card.Text>
                    </Col>
                    <Col xs={4} md={4}>
                    <Form.Select value="{numMesas}" 
                                            
                                            className="input-card-se" aria-label="Floating label select example">
 
                                                <option value="1">Padrão</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                    </Col>
                    <Col xs={2} md={2}>
                            
                            <Card.Text>

                                   <Form.Control value={doc.reuniao} 
                                   disabled="true"
                                   onChange={(e) => setReuniao(e.target.value)}
                                   className="input-card" type="text" placeholder={doc.reuniao} />

                            </Card.Text>
                    </Col>
                    <Col xs={1} md={1}>
                    <audio ref={audioPlayer} src={NotificationSound} />
                    <Button variant="success" onClick ={ () => {playAudio()} }>Ouvir</Button>
                    </Col>    
                </Row>
                <Row className='row-card'>
                    <Col xs={5} md={5}>
                    <Card.Text className="text-card">
                                Intervalo do Grupo: 
                            </Card.Text>
                    </Col>
                    <Col xs={4} md={4}>
                    <Form.Select value="{numMesas}" 
                                            
                                            className="input-card-se" aria-label="Floating label select example">
 
                                                <option value="1">Padrão</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                                
                                            </Form.Select>
                    </Col>
                    <Col xs={2} md={2}>
                            
                            <Card.Text>

                                   <Form.Control value={doc.reuniao} 
                                   disabled="true"
                                   onChange={(e) => setReuniao(e.target.value)}
                                   className="input-card" type="text" placeholder={doc.reuniao} />

                            </Card.Text>
                    </Col>
                    <Col xs={1} md={1}>
                    <audio ref={audioPlayer} src={NotificationSound} />
                    <Button variant="success" onClick ={ () => {playAudio()} }>Ouvir</Button>
                    </Col>
                </Row>
                

            </Card.Body>
            
        </Col>
    </Row>
</Form>
    )
})}
</Container>

</div>


     );
}
 
export default Alertas;