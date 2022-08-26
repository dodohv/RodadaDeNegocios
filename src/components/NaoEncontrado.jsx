
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card  } from 'react-bootstrap'
import {useState} from 'react'
const NaoEncontrado = () => {
const [reuniao, setreuniao] = useState('');

    return ( 
        <div>
            <h2> 404, Página não encontrada!</h2>
            <Link to="/" >
                <button> Voltar para Inicio</button>

            </Link>
            <Row xs={1} md={2} className="g-4">
            <Col>
                        <Card>
                        <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                        Nome da Reunião:
                        </Card.Text>
                        </Card.Body>
                    </Card>


                </Col>
            </Row>

        <Row >
            <Col variant='md-6'>
   
            Nome da Reunião:

            </Col>
            <Col variant='md-6'>
 
            Nome da Reunião:

            </Col>
        </Row>
 
            <p>
            Tipo de Apresentação:
            </p>
            <p>
            Número de Participantes:
            </p>
            <p>
            Tempo por Participante:
            </p>
            <p>
            Intervalo Individual:
            </p>
            <p>
            Intervalo do Grupo:
            </p>
            <p>
            Número de Mesas:
            </p>
            <p>
            Tempo Total:
            </p>
            <p>
            Imagem Direita:
            </p>
            <p>
            Imagem Esquerda:
            </p>
            <p>
            Idioma:
            </p>
        
                        
        </div>
     );
}
 
export default NaoEncontrado