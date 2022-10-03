import { Link } from 'react-router-dom';
import {Form, Alert, InputGroup, Button, ButtonGroup, FloatingLabel,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import  React, {useState, useEffect} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
import NegocioDataService from "../services/negocio.services"
import MinutoDataService from "../services/minuto.services"
import ParticipanteDataService from "../services/participante.service"


const Configurador = ({id, setNegocioId}) => {

    const [minutos, setMinutos] = useState([]);
    const [partics, setPartics] = useState([]);
    const [reuniao, setReuniao] = useState('');
    const [grupo, setGrupo] = useState('');
    const [participantes, setParticipantes] = useState(0);
    const [tempoPartMin, setTempoPartMin]= useState(0);
    const [tempoPartSeg, setTempoPartSeg]= useState(0);
    const [intIndMin, setIntIndMin]= useState(0);
    const [intIndSeg, setIntIndSeg]= useState(0);
    const [intGrupMin, setIntGrupMin]= useState(0);
    const [intGrupSeg, setIntGrupSeg] = useState(0);
    const [numMesas, setNumMesas] = useState(0);
    const [partMesa,setPartMesa] = useState(0);
    const [tempoTotal, setTempoTotal] = useState("00:00:00");
    const [imgDireita, setImgDireita] = useState('');
    const [imgEsquerda, setImgEsquerda] = useState('');
    const [idioma, setIdioma] = useState('');
    const [message, setMessage] = useState({error: false, msg: ""});
    const [dataRodada, setDataRodada] = useState(Date.now());
    
    
    const [auxiliar,setAuxiliar] = useState('');
    
    

    const getPartics = async () => {
        const data = await ParticipanteDataService.getAllParticipantes();
        
        setPartics(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    const getMinutos = async () => {
        const data = await MinutoDataService.getAllMinutos();
        
        setMinutos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    // useEffect(() => {
    //     getMinutos();
    // }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");
        if(reuniao === "" || grupo === "" || participantes === "" || tempoPartMin === "" || tempoPartSeg === "") {
            setMessage({error: true, msg: "Todos os campos são obrigatórios!"});    
            return;
        }
        const newNegocio = {
            reuniao,
            grupo,
            participantes,
            tempoPartMin,
            tempoPartSeg,
            intIndMin,
            intIndSeg,
            intGrupMin,
            intGrupSeg,
            numMesas,
            partMesa,
            tempoTotal,
            imgDireita,
            imgEsquerda,
            idioma,
            dataRodada
        }
        console.log(newNegocio)
        try {
            if(id !== undefined && id !== "") {
                await NegocioDataService.updateNegocio(id, newNegocio);
                setNegocioId("");
                setMessage({error: false, msg: "Atualizado com sucesso"});
            }
            else {
                await NegocioDataService.addNegocios(newNegocio);
                setMessage({error: false, msg: "Nova Rodada de Negócios gerada!"});
            }

        } catch(err) {
            setMessage({error: true, msg:err.message})
        }
        setReuniao("");
        setGrupo("");
        setParticipantes("");
        setTempoPartMin("");
        setTempoPartSeg("");
        setIntGrupMin("");
        setIntGrupSeg("");
        setIntIndMin("");
        setIntIndSeg("");
        setNumMesas("");
        setPartMesa("");
        setTempoTotal("");
        setImgDireita("");
        setImgEsquerda("");
        setIdioma("");
        setDataRodada("");
    };
        const editHandler = async(e) => {
            setMessage("");
            try{
                const docSnap = await NegocioDataService.getNegocio(id);
                console.log("O Registro é: ", docSnap.data());
                setReuniao(docSnap.data().reuniao)
                setGrupo(docSnap.data().grupo);
                setParticipantes(docSnap.data().participantes);
                setTempoPartMin(docSnap.data().tempoPartMin);
                setTempoPartSeg(docSnap.data().tempoPartSeg);
                setIntGrupMin(docSnap.data().intGrupMin);
                setIntGrupSeg(docSnap.data().intGrupSeg);
                setIntIndMin(docSnap.data().intIndMin);
                setIntIndSeg(docSnap.data().intIndSeg);
                setNumMesas(docSnap.data().numMesas);
                setPartMesa(docSnap.data().partMesa);
                setTempoTotal(docSnap.data().tempoTotal);
                setImgDireita(docSnap.data().imgDireita);
                setImgEsquerda(docSnap.data().imgEsquerda);
                setIdioma(docSnap.data().idioma);
                setDataRodada(docSnap.data().dataRodada);

            }
            catch (err) {   
                setMessage({error: true, msg: err.message});
            }
        }
        
        useEffect( () => {
            
            
            getPartics();
             getMinutos();
            console.log("O id está aqui: ", id)
            if(id !== undefined && id !== "") {
                editHandler();
            }
        },[id])

    return ( 
        <div>
        {message?.msg && (
        <Alert 
            variant={ message?.error ? "danger": "success"} 
            dismissible 
            onClose={() => setMessage("")}
        > 
            {message?.msg}
        </Alert> 
        )}


        <Container className='configurador'>
     
            <Link to="/" >
                <button> Voltar para Inicio</button>
            </Link>
        <Form onSubmit= {handleSubmit}>
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
                                           className="input-card" type="text" placeholder="Rodada de Negocios dia dd/mm/yyyy" />

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
                                            onChange={(e) => setParticipantes(e.target.value) }
                                             className="input-card" aria-label="Floating label select example">
                                             {partics.map((doc, index) => {
                                                return(
                                                    <option value={index}>{doc.idParticipante}</option>
                                                )
                                             })};
                                                
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
                                            {minutos.map((doc, index) => {
                                                return (
                                                <option value={doc.id}>{doc.minuto}</option>
                                                )
                                            })};

                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={tempoPartSeg} 
                                            onChange={(e) => setTempoPartSeg(e.target.value)}
                                            className="input-card-se" aria-label="Floating label select example">
                                            {minutos.map((doc, index) => {
                                                return (
                                                <option value={doc.id}>{doc.minuto}</option>
                                                )
                                            })};                                            </Form.Select>
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
                                            {minutos.map((doc, index) => {
                                                return (
                                                <option value={doc.id}>{doc.minuto}</option>
                                                )
                                            })}; 
                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                           <Form.Select value={intIndSeg}  
                                            onChange={(e) => setIntIndSeg(e.target.value)}
                                           className="input-card-se" aria-label="Floating label select example">
                                            {minutos.map((doc, index) => {
                                                return (
                                                <option value={doc.id}>{doc.minuto}</option>
                                                )
                                            })};                                            
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
                                            onChange={(e) => setIntGrupMin(e.target.value)} 
                                           
                                           className="input-card-se" aria-label="Floating label select example">
                                             {minutos.map((doc, index) => {
                                                return (
                                                <option value={doc.id}>{doc.minuto}</option>
                                                )
                                            })};
                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={intGrupSeg}  
                                            onChange={(e) => setIntGrupSeg(e.target.value)}
                                            
                                            className="input-card-se" aria-label="Floating label select example">
                                            {minutos.map((doc, index) => {
                                                return (
                                                <option value={doc.id}>{doc.minuto}</option>
                                                )
                                            })};                                              
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
                            <Row className='row-card'>
                                <Col xs={4} md={4}>
                                <Button variant="primary" type="submit">
                                    Salvar
                                </Button>
                                </Col>
                                
                            </Row>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Form>
        </Container>
        </div>
     );
}
 
export default Configurador