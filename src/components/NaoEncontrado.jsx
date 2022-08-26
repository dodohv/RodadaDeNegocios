
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card,Table } from 'react-bootstrap'
import {useState} from 'react'
const NaoEncontrado = () => {
const [reuniao, setreuniao] = useState('');

    return ( 
        <div>
            <h2> 404, Página não encontrada!</h2>
            <Link to="/" >
                <button> Voltar para Inicio</button>

            </Link>
        
 
            <p>
            Numero
            </p>
            <p>
            Se 9 entao mesas 3 aprox 3 part/mesa
            </p>
            <p>
            Se 10 entao mesas 5 aprox 2 part/mesa  3min int tempo 37:30 min
            </p>
            <p>
            Se 15 entao mesas 5 ou 7 aprox 3 part/mesa 3min int tempo 45min
            </p>
            <p>
            Se 20 entao mesas 5 ou 7 ou 9 aprox 4 part/mesa 3 min int  52:30 min
            </p>
            <p>
            Se 30 entao mesas 7 ou 9 ou 11 ou 13 ou 15  aprox 5 part/mesa 3 min int  01:24:00 min
            </p>
            <p>
            Se 40 entao mesas 7 ou 9 ou 11 ou 13 ou 15 ou 17 ou 19 aprox 6 part/mesa 3 min int  01:34:30
            </p>
            <p>
            Se 47 entao mesas 7 ou 9 ou 11 ou 13 ou 15 ou 17 ou 19 ou 23 aprox 7 part/mesa 3 min int  01:45:0
            </p>
            <p>
            Se 48 entao mesas 7 ou 9 ou 11 ou 13 ou 15 ou 17 ou 19 ou 23 aprox 7 part/mesa 3 min int  01:45:0
            </p>
            <p>
            Se 49 entao mesas 7 ou 9 ou 11 ou 13 ou 15 ou 17 ou 19 ou 23 aprox 7 part/mesa 3 min int  01:45:30
            </p>
            <p>
            Se 50 entao mesas 11 ou 13 ou 15 ou 17 ou 19 ou 21 ou 23 ou 25 aprox 6 part/mesa 3 min int  02:01:30
            </p>

            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome Rodada</th>
          <th>Tipo de Apresentação</th>
          <th>Nº Participantes</th>
          <th>Participante</th>
          <th>Intervalo</th>
          <th>Qtd Mesas</th>
          <th>Pt Mesas</th>
          
          <th>Tempo Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>10</td>
        <td>1:30</td>
        <td>3:00</td>
        <td>5</td>
        <td>2</td>
        <td>37:30</td>
        
        </tr>
        <tr>
          <td>2</td>
          <td>2</td> 
          <td>2</td>
          <td>14</td>
          <td>1:30</td>
          <td>3:00</td>
          <td>5</td>
          <td>~3</td>
          <td>00:45:00</td>

        </tr>
        <tr>
          <td>2</td>
          <td>2</td> 
          <td>2</td>
          <td>14</td>
          <td>1:30</td>
          <td>3:00</td>
          <td>7</td>
          <td>2</td>
          <td>00:31:30</td>

        </tr>
        <tr>
          <td>3</td>
          <td>3</td> 
          <td>3</td>
          <td>15</td>
          <td>1:30</td>
          <td>3:00</td>
          <td>5</td>
          <td>3</td>
          <td>00:45:00</td>
        </tr>
        <tr>
          <td>3</td>
          <td>3</td> 
          <td>3</td>
          <td>15</td>
          <td>1:30</td>
          <td>3:00</td>
          <td>7</td>
          <td>~3</td>
          <td>01:03:00</td>
        </tr>
        <tr>
          <td>4</td>
          <td>4</td> 
          <td>4</td>
          <td>16</td>
          <td>1:30</td>
          <td>3:00</td>
          <td>5</td>
          <td>~4</td>
          <td>00:52:30</td>
        </tr>
        <tr>
          <td>4</td>
          <td>4</td> 
          <td>4</td>
          <td>16</td>
          <td>1:30</td>
          <td>3:00</td>
          <td>7</td>
          <td>~3</td>
          <td>01:03:00</td>
        </tr>
        <tr>
          <td>4</td>
          <td>4</td> 
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>
          <td>4</td>

        </tr>
        <tr>
          <td>5</td>
          <td>5</td> 
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>
          <td>5</td>

        </tr>
        <tr>
          <td>6</td>
          <td>6</td> 
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>
          <td>6</td>

        </tr>
        <tr>
          <td>7</td>
          <td>7</td> 
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>
          <td>7</td>

        </tr>
        <tr>
          <td>8</td>
          <td>8</td> 
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>
          <td>8</td>

        </tr>
        <tr>
          <td>9</td>
          <td>9</td> 
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>
          <td>9</td>

        </tr>
        <tr>
          <td>10</td>
          <td>10</td> 
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>
          <td>10</td>

        </tr>
        <tr>
          <td>11</td>
          <td>11</td> 
          <td>11</td>
          <td>11</td>
          <td>11</td>
          <td>11</td>
          <td>11</td>
          <td>11</td>

        </tr>
        <tr>
          <td>12</td>
          <td>12</td> 
          <td>12</td>
          <td>12</td>
          <td>12</td>
          <td>12</td>
          <td>12</td>
          <td>12</td>

        </tr>
        <tr>
          <td>13</td>
          <td>13</td> 
          <td>13</td>
          <td>13</td>
          <td>13</td>
          <td>13</td>
          <td>13</td>
          <td>13</td>

        </tr>
      </tbody>
    </Table>
 
        </div>
     );
}
 
export default NaoEncontrado