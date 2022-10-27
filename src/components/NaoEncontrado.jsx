//how to use a data.map in const functions in react js?
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card,Table, Button } from 'react-bootstrap'
import {useState, useEffect, useRef} from "react"
import NegocioDataService from "../services/negocio.services"
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
import {CSVLink , CSVDownload } from "react-csv";




// const dataSetFirebase = [
//   {
//     nome: "Douglas",
//     idade: 26,
//     sexo: "Masculino",
//     online: true
//   },
//   {
//     nome: "Greysi",
//     idade: 56,
//     sexo: "Feminino",
//     online: true
//   },
//   {
//     nome: "David",
//     idade: 62,
//     sexo: "Masculino",
//     online: true
//   },
//   {
//     nome: "Elaine",
//     idade: 21,
//     sexo: "Feminino",
//     online: true
//   },
// ];



const NaoEncontrado = () => {
const [reuniao, setreuniao] = useState('');
const [negocios, setNegocios] = useState([]);
const [fullName, setFullName] = useState("");
const [age, setAge] = useState(0);
const [occupation, setOccupation] = useState("");
const [data, setData] = useState([
  ["Full Name", "Age", "Occupation"],
  ["Irakli Tchigladze", 32, "writer"],
  ["George Abuladze", 33, "politician"],
  ["Nick Tsereteli", 19, "public worker"]
]);
const handleSubmit = (e) => {
  setData([...data, [fullName, age, occupation]]);
  setFullName("");
  setAge(0);
  setOccupation("");
};
console.log(data);

const getNegocios = async () => {
  const data = await NegocioDataService.getAllNegocios();
  console.log(data.docs);
  setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
};

const deleteHandler = async(id) => {
  await NegocioDataService.deleteNegocio(id);
  getNegocios();
}


useEffect(() => {

getNegocios();

 }, []);
    return ( 
      
        <div>

            <h2> 404, Página não encontrada!</h2>
            <Link to="/" >
                <button> Voltar para Inicio</button>

            </Link>
            <CSVLink filename={Date.now()} data={data}>Download Excel File</CSVLink>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p>Full Name</p>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <p>Age</p>
        <input
          value={age}
          type="number"
          onChange={(e) => setAge(e.target.value)}
        />
        <p>Occupation</p>
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
        <p></p>
        <button type="submit">Submit data</button>
      </form>

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
          <th><BsClockHistory/> Participante</th>
                    <th><BsClockHistory/>Intervalo</th>
                    <th>Qtd Mesas</th>
          <th>Pt Mesas</th>
          <th>Tempo Total</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>

      {negocios.map((doc, index) => {
        return(
            <tr key={doc.id}>
              <td>{index+1}</td>
              <td>{doc.reuniao}</td>
              <td>{doc.grupo}</td>
              <td>{doc.participantes}</td>
              {doc.tempoPartMin.length == 1  && doc.tempoPartSeg.length == 1
                                ?          
                                <td>0{doc.tempoPartMin}:0{doc.tempoPartSeg}</td>
                                    :
                                    doc.tempoPartMin.length == 2 && doc.tempoPartSeg.length == 1
                                        ?
                                        <td>{doc.tempoPartMin}:0{doc.tempoPartSeg}</td>
                                        :
                                        doc.tempoPartMin.length == 1 && doc.tempoPartSeg.length == 2
                                            ?

                                            <td>0{doc.tempoPartMin}:{doc.tempoPartSeg}</td>
                                            :
                                            doc.tempoPartMin.length == 1
                                                ?
                                                <td>0{doc.tempoPartMin}:{doc.tempoPartSeg}</td>
                                                :
                                                <td>{doc.tempoPartMin}:{doc.tempoPartSeg}</td>
                                }        
                                {doc.intGrupMin.length == 1  && doc.intGrupSeg.length == 1
                                    ?          
                                <td>0{doc.intGrupMin}:0{doc.intGrupSeg}</td>
                                    :
                                    doc.intGrupMin.length == 2 && doc.intGrupSeg.length == 1
                                        ?
                                        <td>{doc.intGrupMin}:0{doc.intGrupSeg}</td>
                                        :
                                        doc.intGrupMin.length == 1 && doc.intGrupSeg.length == 2
                                            ?

                                            <td>0{doc.intGrupMin}:{doc.intGrupSeg}</td>
                                            :
                                            doc.intGrupMin.length == 1 
                                                ?
                                                <td>0{doc.intGrupMin}:{doc.intGrupSeg}</td>
                                                :
                                                <td>{doc.intGrupMin}:{doc.intGrupSeg}</td>
                                }  
                                <td>{doc.numMesas}</td>
                                <td>{doc.partMesa}</td>
                                <td>{doc.tempoTotal}</td>
                                <td>
                                    <Button
                                    variant="secondary"
                                    className="edit"
                                    onClick={(e) => getNegocioId(doc.id)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                    variant="danger"
                                    className="delete"
                                    onClick={(e) => deleteHandler(doc.id)}
                                    >
                                        Deletar
                                    </Button>
                                </td>


            </tr>
        )
      })}

      </tbody>
    </Table>
      

        </div>
     );
}
 
export default NaoEncontrado