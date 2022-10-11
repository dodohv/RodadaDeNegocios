import { Link } from 'react-router-dom';
import {Form, Alert, InputGroup, Button, ButtonGroup, FloatingLabel,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import  React, {useState, useEffect, useRef} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
import NegocioDataService from "../services/negocio.services"
import NotificationSound3 from "../assets/bass.aac";
import NotificationSound2 from "../assets/counter.wav";
import NotificationSound from "../assets/alarm.aac";

const Alertas = () => {

    const [negocios, setNegocios] = useState([]);
    const audioPlayer = useRef(null);
    const audioPlayer2 = useRef(null);
    const audioPlayer3 = useRef(null);
    const handleGerarEtiqueta = async(e) => {
        e.preventDefault();

    }

    function playAudio() {
        audioPlayer.current.play();
    }
    function playAudio2() {
        audioPlayer2.current.play();
    }
    function playAudio3() {
        audioPlayer3.current.play();
    }

    const getNegocios = async () => {
        const data = await NegocioDataService.getAllNegocios();
        console.log(data.docs);
        setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
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
                    <audio ref={audioPlayer2} src={NotificationSound2} />

                    <Button variant="success" onClick ={ () => {playAudio2()} }>Ouvir</Button>
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
                    <audio ref={audioPlayer3} src={NotificationSound3} />
                    <Button variant="success" onClick ={ () => {playAudio3()} }>Ouvir</Button>
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