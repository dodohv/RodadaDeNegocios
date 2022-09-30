
import React, {useEffect, useState} from "react";
import { Table, Button} from "react-bootstrap";
import NegocioDataService from "../services/negocio.services"
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
const ConfiguradorList = ({getNegocioId}) => {
    const [negocios, setNegocios] = useState([]);
    useEffect(() => {
        getNegocios();
    },[]);

    const getNegocios = async () => {
        const data = await NegocioDataService.getAllNegocios();
        console.log("data abaixo");
        console.log(data);
        console.log("data.docs abaixo");
        console.log(data.docs);
        setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    const deleteHandler = async(id) => {
        await NegocioDataService.deleteNegocio(id);
        getNegocios();
    }

    return ( 
        <>
          <div>
            <button
            variant="dark edit"
            onClick={getNegocios}
            >Atualizar</button>
        </div>
        <pre>{ JSON.stringify(negocios, undefined, 2) }</pre>
            
            <Table striped bordered hover size="sm">
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
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {negocios.map((doc, index) => {
                        return (
                            <tr key={doc.id}>
                                <td>{index + 1}</td>
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
                                    variant="danger"
                                    className="delete"
                                    onClick={(e) => deleteHandler(doc.id)}
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
     );
}
 
export default ConfiguradorList;