import React, {useState} from 'react';
import Configurador from "../components/Configurador"
import ConfiguradorList from "../components/ConfiguradorList"
import ApresentacaoGrupo from "./ApresentacaoGrupo"
const ConfiguradorView = () => {
    const [configuradorId, setConfiguradorId] = useState("");
    const getHandler = (id) => {
        console.log("O Id do configurador a ser editado: ", id); 
        setConfiguradorId(id);
    };
    return ( 
        <div>
        
            <Configurador id={configuradorId} setConfiguradorId={setConfiguradorId} />
            <ApresentacaoGrupo getNegocioId={getHandler}/>

        </div>
     );
}
 
export default ConfiguradorView;