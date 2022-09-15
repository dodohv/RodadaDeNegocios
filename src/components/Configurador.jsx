import { Link } from 'react-router-dom';
import {FloatingLabel, Form,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
const Configurador = () => {

    const [reuniao, setreuniao] = useState('');
    const [tipoApresentacao, setTipoApresentacao] = useState('');
    const [numPart, setNumPart] = useState('0');
    const [tempoPartMin, setTempoPartMin] = useState('00');
    const [tempoPartSeg, setTempoPartSeg] = useState('00');
    const [IntervIndivMin, setIntervIndivMin] = useState('00');
    const [IntervIndivSeg, setIntervIndivSeg] = useState('00');
    const [IntervGrupoMin, setIntervGrupoMin] = useState('00');
    const [IntervGrupoSeg, setIntervGrupoSeg] = useState('00');
    const [NumMesas, setNumMesas] = useState('0');
    const [tempoTotal, setTempoTotal] = useState('00:00');
    const [idioma, setIdioma] = useState('');
    const [imgEsquerda, setImgEsquerda] = useState('');
    const [imgDireita, setImgDireita] = useState('');


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
                                                <Form.Control type="email" placeholder="Exemplo: Rodada dia 15/09"  
                                                value ={reuniao}
                                                onChange={(e) => setreuniao(e.target.value)}
                                                />
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
                                  
                                            <Form.Select aria-label="Floating label select example"
                                            value = {tipoApresentacao}
                                            onChange={(e) => setTipoApresentacao(e.target.value)}
                                            >
                                                <option value="1">Grupo</option>
                                                <option value="2">Individual</option>
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
                                            <Form.Select aria-label="Floating label select example"
                                            value = {numPart}
                                            onChange={(e) => setNumPart(e.target.value)}
                                            >
                                                <option value="1">9</option>
                                                <option value="2">10</option>
                                                <option value="3">300</option>
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
                                                <Form.Select aria-label="Floating label select example"
                                                value = {tempoPartMin}
                                                onChange={(e) => setTempoPartMin(e.target.value)}
                                                >
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
                                        <p className="text-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                           <Form.Select aria-label="Floating label select example"
                                           value = {tempoPartSeg}
                                           onChange={(e) => setTempoPartSeg(e.target.value)}
                                           >
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
                                            <Form.Select aria-label="Floating label select example"
                                            value = {IntervIndivMin}
                                            onChange={(e) => setIntervIndivMin(e.target.value)}
                                            >
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
                                        <p className="text-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select aria-label="Floating label select example"
                                            value = {IntervIndivSeg}
                                            onChange={(e) => setIntervIndivSeg(e.target.value)}
                                            >
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
                                            <Form.Select aria-label="Floating label select example"
                                            value ={IntervGrupoMin}
                                            onChange={(e) => setIntervGrupoMin(e.target.value)}
                                            >
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
                                        <p className="text-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select aria-label="Floating label select example"
                                            value = {IntervGrupoSeg}
                                            onChange={(e) => setIntervGrupoSeg(e.target.value)}
                                            >
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
                                            <Form.Select aria-label="Floating label select example"
                                            value = {NumMesas}
                                            onChange={(e) => setNumMesas(e.target.value)}
                                            >
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
                                        <p className="text-card"> <BsFillPeopleFill/></p>
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
                                    <Card.Text className="text-card" >
                                    <p className="text-card"> <BsClockHistory/>  {tempoTotal} </p>

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
                                            <Form.Control type="file" 
                                            value = {imgDireita}
                                            onChange={(e) => setImgDireita(e.target.value)}
                                            >

                                            </Form.Control>
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
                                    <Form.Control type="file"
                                    value = {imgEsquerda}
                                    onChange={(e) => setImgEsquerda(e.target.value)}
                                    >

                                    </Form.Control>
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
                                            <Form.Select aria-label="Floating label select example"
                                            value = {idioma}
                                            onChange={(e) => setIdioma(e.target.value)}
                                            >
                                                <option value="1">Português</option>
                                                <option value="2">Espanhol</option>
                                                <option value="3">Inglês</option>
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
          <th>Tempo Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{reuniao}</td>
          <td>{tipoApresentacao}</td>
          <td>{numPart}</td>
          <td>{tempoPartMin}:{tempoPartSeg}</td>
          <td>{IntervGrupoMin}:{IntervGrupoSeg}</td>
          <td> {NumMesas} </td>
          <td> {tempoTotal} </td>
        </tr>
        <tr>
        <td>2</td>
          <td>{reuniao}</td>
          <td>{tipoApresentacao}</td>
          <td>{numPart}</td>
          <td>{tempoPartMin}:{tempoPartSeg}</td>
          <td>{IntervGrupoMin}:{IntervGrupoSeg}</td>
          <td> {NumMesas} </td>
          <td> {tempoTotal} </td>
        </tr>
        <tr>
        <td>3</td>
          <td>{reuniao}</td>
          <td>{tipoApresentacao}</td>
          <td>{numPart}</td>
          <td>{tempoPartMin}:{tempoPartSeg}</td>
          <td>{IntervGrupoMin}:{IntervGrupoSeg}</td>
          <td> {NumMesas} </td>
          <td> {tempoTotal} </td>
        </tr>
        <tr>
            <td>1</td>
            <td>{reuniao}</td>
            <td>{tipoApresentacao}</td>
            <td>{numPart}</td>
        {   tempoPartMin.length == 1 && 
            tempoPartSeg.length == 1 
            ?         
                <td>0{tempoPartMin}:0{tempoPartSeg}</td> 
            :
            tempoPartMin.length == 2 && 
            tempoPartSeg.length == 1 
            ?
                <td>{tempoPartMin}:0{tempoPartSeg}</td>
            :
            tempoPartMin.length == 1 && 
            tempoPartSeg.length == 2
            ?
                <td>0{tempoPartMin}:{tempoPartSeg}</td>
            :
            tempoPartMin.length == 1
            ?                  
                <td>0{tempoPartMin}:{tempoPartSeg}</td>
            :
                <td>{tempoPartMin}:{tempoPartSeg}</td>
        }                          

        {   
            IntervGrupoMin.length == 1  && 
            IntervGrupoSeg.length == 1
            ?          
                <td>0{IntervGrupoMin}:0{IntervGrupoSeg}</td>
            :
            IntervGrupoMin.length == 2 && 
            IntervGrupoSeg.length == 1
            ?                
                <td>{IntervGrupoMin}:0{IntervGrupoSeg}</td>
            :
            IntervGrupoMin.length ==  1 && 
            IntervGrupoSeg.length == 2
            ?
                <td>0{IntervGrupoMin}:{IntervGrupoSeg}</td>
            :                    
            IntervGrupoMin.length == 1 
            ?
                <td>0{IntervGrupoMin}:{IntervGrupoSeg}</td>
            :
                <td>{IntervGrupoMin}:{IntervGrupoSeg}</td>
        }          
            <td>{NumMesas}</td>
            <td>{tempoTotal}</td>
        </tr>

      </tbody>
    </Table>

        </Container>
     );
}
 
export default Configurador;