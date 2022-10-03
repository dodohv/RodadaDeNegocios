import { Link } from 'react-router-dom';
import {Form, Alert, InputGroup, Button, ButtonGroup, FloatingLabel,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import  React, {useState, useEffect} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
import NegocioDataService from "../services/negocio.services"
import MinutoDataService from "../services/minuto.services"
import ParticipanteDataService from "../services/participante.service"


const GeradorEtiquetas = () => {
    const [minutos, setMinutos] = useState([]);
    const [negocios, setNegocios] = useState([]);
    const handleGerarEtiqueta = async(e) => {
        e.preventDefault();

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
        getMinutos();
        getNegocios();
    },[] )

    return ( 
        <div>
            <h3>Gerador de Etiquetas</h3>
            <button> Gerar em Excel</button>
        
        <Container className='configurador'>
        {negocios.slice(-1).map((doc, index) => {
            return(

        <Form onSubmit= {handleGerarEtiqueta}>
            <Row  xs={1} md={12} className="g-4">
                <Col xs={12}>
                    <Card.Body>
                        <Card.Title className='title-card'>
                            Gerar
                        </Card.Title>
                        <Row className='row-card'>
                            <Col xs={4} md={6}>
                            <Card.Text className="text-card">
                                        Reunião: 
                                    </Card.Text>
                            </Col>
                            <Col xs={8} md={6}>
                                
                                    <Card.Text>
                                           <Form.Control value={doc.reuniao} 
                                           disabled="true"
                                           onChange={(e) => setReuniao(e.target.value)}
                                           className="input-card" type="text" placeholder={doc.reuniao} />

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
                                
                                    <Card.Text>
                                           <Form.Control value={doc.participantes} 
                                           disabled="true"
                                           onChange={(e) => setReuniao(e.target.value)}
                                           className="input-card" type="text" placeholder={doc.participantes}  />

                                    </Card.Text>
                                </Col>
                        </Row>
                        <Row className='row-card'>
                            <Col xs={4} md={6}>
                            <Card.Text className="text-card">
                                        Tempo Programado: 
                                    </Card.Text>
                            </Col>
                            <Col xs={8} md={6}>
                                
                                    <Card.Text>
                                           <Form.Control value={doc.tempoTotal}
                                           disabled="true"
                                           onChange={(e) => setReuniao(e.target.value)}
                                           className="input-card" type="text" placeholder={doc.tempoTotal} />

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
                                
                                    <Card.Text>
                                           <Form.Control value={doc.numMesas}
                                           disabled="true"
                                           onChange={(e) => setReuniao(e.target.value)}
                                           className="input-card" type="text" placeholder={doc.numMesas} />

                                    </Card.Text>
                                </Col>
                        </Row>

                        <Row className='row-card'>
                                <Col xs={5} md={5}>
                                    <Card.Text className="text-card">
                                    Teremos
                                    </Card.Text>
                                </Col>
                                <Col xs={1} md={1}>
                                <Card.Text className="text-card">
                                    3
                                    </Card.Text>
                                </Col>
                                <Col xs={6} md={6}>
                                
                                    <Card.Text className="text-card">
                                    Participantes por Mesa
                                    </Card.Text>

                                </Col>
                            </Row>
                        <Row className='row-card'>
                            <Col xs={4} md={6}>
                                <Button variant="success">
                                    Gerar Etiquetas
                                </Button>
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
 
export default GeradorEtiquetas;