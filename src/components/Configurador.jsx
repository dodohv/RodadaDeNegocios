import { Link } from 'react-router-dom';
import {Form, Alert, InputGroup, Button, ButtonGroup, FloatingLabel,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import  React, {useState, useEffect} from 'react'
import {BsArrowRepeat, BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
import NegocioDataService from "../services/negocio.services"
import RodadaDataService from '../services/rodada.service';
import RodadaBoaDataService from '../services/rodadaBoa.service';
import Rodada2DataService from '../services/rodada2.service';
import Rodada3DataService from '../services/rodada3.service';
import Rodada4DataService from '../services/rodada4.service';
import Rodada5DataService from '../services/rodada5.service';
import Rodada6DataService from '../services/rodada6.service';
import Rodada7DataService from '../services/rodada7.service';
import Rodada8DataService from '../services/rodada8.service';
import Rodada9DataService from '../services/rodada9.service';
import Rodada10DataService from '../services/rodada10.service';
import Rodada11DataService from '../services/rodada11.service';
import Rodada12DataService from '../services/rodada12.service';
import Rodada13DataService from '../services/rodada13.service';
import Rodada14DataService from '../services/rodada14.service';
import Rodada15DataService from '../services/rodada15.service';
import Rodada16DataService from '../services/rodada16.service';
import Rodada17DataService from '../services/rodada17.service';
import Rodada18DataService from '../services/rodada18.service';
import Rodada19DataService from '../services/rodada19.service';
import Rodada20DataService from '../services/rodada20.service';


const Configurador = ({id, setNegocioId}) => {
    
    const [rodadasMesas, setRodadasMesas] = useState([]);
    const [minutos, setMinutos] = useState([]);
    const [partics, setPartics] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [reuniao, setReuniao] = useState('');
    const [grupo, setGrupo] = useState('');
    const [participantes, setParticipantes] = useState(7);
    const [tempoPartMin, setTempoPartMin]= useState(0);
    const [tempoPartSeg, setTempoPartSeg]= useState(0);
    const [intIndMin, setIntIndMin]= useState(0);
    const [intIndSeg, setIntIndSeg]= useState(0);
    const [intGrupMin, setIntGrupMin]= useState(0);
    const [intGrupSeg, setIntGrupSeg] = useState(0);
    const [numMesas, setNumMesas] = useState(1);
    const [partMesa,setPartMesa] = useState(1);
    const [tempoTotal, setTempoTotal] = useState("00:00:00");
    const [tempoTotalHra, setTempoTotalHra] = useState(0);
    const [tempoTotalMin, setTempoTotalMin] = useState(0);
    const [tempoTotalSeg, setTempoTotalSeg] = useState(0);
    const [imgDireita, setImgDireita] = useState(null); 
    const [imgEsquerda, setImgEsquerda] = useState(null);
    const [idioma, setIdioma] = useState('');
    const types = ['image/png', 'image/jpeg'];
    const [url, setUrl] = useState(null);
    const [message, setMessage] = useState({error: false, msg: ""});
    const [dataRodada, setDataRodada] = useState(Date.now());
    const [arrayRodada,setArrayRodada]= useState([]);
    const [arrayRodadaMesas,setArrayRodadaMesas] = useState([]);
    const [arrayParticipante1,setArrayParticipante1] = useState([]);
    const [arrayMesas, setArrayMesas] = useState([]);
    const [arrayMesa1, setArrayMesa1] = useState([]);
    const [arrayMesa2, setArrayMesa2] = useState([]);
    const [arrayMesa3, setArrayMesa3] = useState([]);
    const [arrayMesa4, setArrayMesa4] = useState([]);
    const [arrayMesa5, setArrayMesa5] = useState([]);
    const [arrayMesa6, setArrayMesa6] = useState([]);
    const [arrayMesa7, setArrayMesa7] = useState([]);
    const [arrayMesa8, setArrayMesa8] = useState([]);
    const [arrayMesa9, setArrayMesa9] = useState([]);
    const [arrayMesa10, setArrayMesa10] = useState([]);
    const [arrayMesa11, setArrayMesa11] = useState([]);
    const [arrayMesa12, setArrayMesa12] = useState([]);
    const [arrayMesa13, setArrayMesa13] = useState([]);
    const [arrayMesa14, setArrayMesa14] = useState([]);
    const [arrayMesa15, setArrayMesa15] = useState([]);
    const [arrayMesa16, setArrayMesa16] = useState([]);
    const [arrayMesa17, setArrayMesa17] = useState([]);
    const [arrayMesa18, setArrayMesa18] = useState([]);
    const [arrayMesa19, setArrayMesa19] = useState([]);
    const [arrayMesa20, setArrayMesa20] = useState([]);
    const [arrayMesa21, setArrayMesa21] = useState([]);
    const [arrayMesa22, setArrayMesa22] = useState([]);
    const [arrayMesa23, setArrayMesa23] = useState([]);
    const [arrayMesa24, setArrayMesa24] = useState([]);
    const [arrayMesa25, setArrayMesa25] = useState([]);
    const [arrayMesa26, setArrayMesa26] = useState([]);
    const [arrayMesa27, setArrayMesa27] = useState([]);
    const [arrayMesa28, setArrayMesa28] = useState([]);
    const [arrayMesa29, setArrayMesa29] = useState([]);
    const [arrayMesa30, setArrayMesa30] = useState([]);
    const [aarrayMesa1, setAarrayMesa1] = useState([]);
    const [aarrayMesa2, setAarrayMesa2] = useState([]);
    const [aarrayMesa3, setAarrayMesa3] = useState([]);
    const [aarrayMesa4, setAarrayMesa4] = useState([]);
    const [aarrayMesa5, setAarrayMesa5] = useState([]);
    const [aarrayMesa6, setAarrayMesa6] = useState([]);
    const [aarrayMesa7, setAarrayMesa7] = useState([]);
    const [aarrayMesa8, setAarrayMesa8] = useState([]);
    const [aarrayMesa9, setAarrayMesa9] = useState([]);
    const [aarrayMesa10, setAarrayMesa10] = useState([]);
    const [aarrayMesa11, setAarrayMesa11] = useState([]);
    const [aarrayMesa12, setAarrayMesa12] = useState([]);
    const [aarrayMesa13, setAarrayMesa13] = useState([]);
    const [aarrayMesa14, setAarrayMesa14] = useState([]);
    const [aarrayMesa15, setAarrayMesa15] = useState([]);
    const [aarrayMesa16, setAarrayMesa16] = useState([]);
    const [aarrayMesa17, setAarrayMesa17] = useState([]);
    const [aarrayMesa18, setAarrayMesa18] = useState([]);
    const [aarrayMesa19, setAarrayMesa19] = useState([]);
    const [aarrayMesa20, setAarrayMesa20] = useState([]);
    const [aarrayMesa21, setAarrayMesa21] = useState([]);
    const [aarrayMesa22, setAarrayMesa22] = useState([]);
    const [aarrayMesa23, setAarrayMesa23] = useState([]);
    const [aarrayMesa24, setAarrayMesa24] = useState([]);
    const [aarrayMesa25, setAarrayMesa25] = useState([]);
    const [aarrayMesa26, setAarrayMesa26] = useState([]);
    const [aarrayMesa27, setAarrayMesa27] = useState([]);
    const [aarrayMesa28, setAarrayMesa28] = useState([]);
    const [aarrayMesa29, setAarrayMesa29] = useState([]);
    const [aarrayMesa30, setAarrayMesa30] = useState([]);
    const [auxiliar,setAuxiliar] = useState(0);
    const [error, setError] = useState(null);
    const [newRodadaFlat, setNewRodadaFlat] = useState([]);

    const handleChange = (e) => {
        e.preventDefault()
        if(e.target.files[0]){
            var selected = e.target.files[0];
            if (selected && types.includes(selected.type)) {
                setImgEsquerda(selected);
                setError('')
            }else {
                setImgEsquerda(null);
                setError('Por favor coloque uma imagem png ou jpeg!')
            }
        }

    };
    


    const gerarEtiquetas = () => {

        if (participantes > 7) {
            console.log("1 vez mano")
            console.log(participantes)
            
            setArrayMesas([])

            for (let i = 1; i <= parseInt(participantes); i++){


                   setArrayMesas(arrayMesas.push(
                        {
                        id: i,
                        idParticipante: `Nome ${i}`
                        }
                        ))
                    
                    setArrayMesa1(arrayMesa1.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa2(arrayMesa2.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa3(arrayMesa3.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa4(arrayMesa4.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa5(arrayMesa5.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa6(arrayMesa6.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa7(arrayMesa7.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa8(arrayMesa8.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa9(arrayMesa9.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setArrayMesa10(arrayMesa10.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))         
                    setArrayMesa11(arrayMesa11.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))    
                    setArrayMesa12(arrayMesa12.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setArrayMesa13(arrayMesa13.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setArrayMesa14(arrayMesa14.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setArrayMesa15(arrayMesa15.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa16(arrayMesa16.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))
                    setArrayMesa17(arrayMesa17.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa18(arrayMesa18.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa19(arrayMesa19.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa20(arrayMesa20.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))       
                    setArrayMesa21(arrayMesa21.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))    
                    setArrayMesa22(arrayMesa22.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setArrayMesa23(arrayMesa23.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setArrayMesa24(arrayMesa24.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setArrayMesa25(arrayMesa25.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa26(arrayMesa26.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))
                    setArrayMesa27(arrayMesa27.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa28(arrayMesa28.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa29(arrayMesa29.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setArrayMesa30(arrayMesa30.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))
                    
                    setAarrayMesa1(aarrayMesa1.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa2(aarrayMesa2.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa3(aarrayMesa3.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa4(aarrayMesa4.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa5(aarrayMesa5.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa6(aarrayMesa6.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa7(aarrayMesa7.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa8(aarrayMesa8.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa9(aarrayMesa9.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))
                    setAarrayMesa10(aarrayMesa10.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))         
                    setAarrayMesa11(aarrayMesa11.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                       }))    
                    setAarrayMesa12(aarrayMesa12.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setAarrayMesa13(aarrayMesa13.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setAarrayMesa14(aarrayMesa14.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setAarrayMesa15(aarrayMesa15.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa16(aarrayMesa16.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))
                    setAarrayMesa17(aarrayMesa17.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa18(aarrayMesa18.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa19(aarrayMesa19.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa20(aarrayMesa20.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))       
                    setAarrayMesa21(aarrayMesa21.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))    
                    setAarrayMesa22(aarrayMesa22.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setAarrayMesa23(aarrayMesa23.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setAarrayMesa24(aarrayMesa24.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))    
                    setAarrayMesa25(aarrayMesa25.push({
                    id: i,
                    idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa26(aarrayMesa26.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))
                    setAarrayMesa27(aarrayMesa27.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa28(aarrayMesa28.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa29(aarrayMesa29.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))         
                    setAarrayMesa30(aarrayMesa30.push({
                        id: i,
                        idParticipante: `Nome ${i}`
                    }))            
                        
            }


            for (let i = parseInt(partMesa); i < participantes; i++) {
         
                setArrayMesa1(arrayMesa1.pop())    
                setAarrayMesa1(aarrayMesa1.pop())
            }

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa2(arrayMesa2.shift())
                setArrayMesa3(arrayMesa3.shift())
                setArrayMesa4(arrayMesa4.shift())
                setArrayMesa5(arrayMesa5.shift())
                setArrayMesa6(arrayMesa6.shift())
                setArrayMesa7(arrayMesa7.shift())
                setArrayMesa8(arrayMesa8.shift())
                setArrayMesa9(arrayMesa9.shift())
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa2(aarrayMesa2.shift())
                setAarrayMesa3(aarrayMesa3.shift())
                setAarrayMesa4(aarrayMesa4.shift())
                setAarrayMesa5(aarrayMesa5.shift())
                setAarrayMesa6(aarrayMesa6.shift())
                setAarrayMesa7(aarrayMesa7.shift())
                setAarrayMesa8(aarrayMesa8.shift())
                setAarrayMesa9(aarrayMesa9.shift())
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())
                
            }
            for (let i = parseInt(partMesa); i < (arrayMesas.length - arrayMesa1.length); i++) {
           
                setArrayMesa2(arrayMesa2.pop())
                setAarrayMesa2(aarrayMesa2.pop())
            }

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                    setArrayMesa3(arrayMesa3.shift())
                    setArrayMesa4(arrayMesa4.shift())
                    setArrayMesa5(arrayMesa5.shift())
                    setArrayMesa6(arrayMesa6.shift())
                    setArrayMesa7(arrayMesa7.shift())
                    setArrayMesa8(arrayMesa8.shift())
                    setArrayMesa9(arrayMesa9.shift())
                    setArrayMesa10(arrayMesa10.shift())
                    setArrayMesa11(arrayMesa11.shift())
                    setArrayMesa12(arrayMesa12.shift())
                    setArrayMesa13(arrayMesa13.shift())
                    setArrayMesa14(arrayMesa14.shift())
                    setArrayMesa15(arrayMesa15.shift())
                    setArrayMesa16(arrayMesa16.shift())
                    setArrayMesa17(arrayMesa17.shift())
                    setArrayMesa18(arrayMesa18.shift())
                    setArrayMesa19(arrayMesa19.shift())
                    setArrayMesa20(arrayMesa20.shift())
                    setArrayMesa21(arrayMesa21.shift())
                    setArrayMesa22(arrayMesa22.shift())
                    setArrayMesa23(arrayMesa23.shift())
                    setArrayMesa24(arrayMesa24.shift())
                    setArrayMesa25(arrayMesa25.shift())
                    setArrayMesa26(arrayMesa26.shift())
                    setArrayMesa27(arrayMesa27.shift())
                    setArrayMesa28(arrayMesa28.shift())
                    setArrayMesa29(arrayMesa29.shift())
                    setArrayMesa30(arrayMesa30.shift())
                    setAarrayMesa3(aarrayMesa3.shift())
                    setAarrayMesa4(aarrayMesa4.shift())
                    setAarrayMesa5(aarrayMesa5.shift())
                    setAarrayMesa6(aarrayMesa6.shift())
                    setAarrayMesa7(aarrayMesa7.shift())
                    setAarrayMesa8(aarrayMesa8.shift())
                    setAarrayMesa9(aarrayMesa9.shift())
                    setAarrayMesa10(aarrayMesa10.shift())
                    setAarrayMesa11(aarrayMesa11.shift())
                    setAarrayMesa12(aarrayMesa12.shift())
                    setAarrayMesa13(aarrayMesa13.shift())
                    setAarrayMesa14(aarrayMesa14.shift())
                    setAarrayMesa15(aarrayMesa15.shift())
                    setAarrayMesa16(aarrayMesa16.shift())
                    setAarrayMesa17(aarrayMesa17.shift())
                    setAarrayMesa18(aarrayMesa18.shift())
                    setAarrayMesa19(aarrayMesa19.shift())
                    setAarrayMesa20(aarrayMesa20.shift())
                    setAarrayMesa21(aarrayMesa21.shift())
                    setAarrayMesa22(aarrayMesa22.shift())
                    setAarrayMesa23(aarrayMesa23.shift())
                    setAarrayMesa24(aarrayMesa24.shift())
                    setAarrayMesa25(aarrayMesa25.shift())
                    setAarrayMesa26(aarrayMesa26.shift())
                    setAarrayMesa27(aarrayMesa27.shift())
                    setAarrayMesa28(aarrayMesa28.shift())
                    setAarrayMesa29(aarrayMesa29.shift())
                    setAarrayMesa30(aarrayMesa30.shift())
                    
            }  

            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length) ); i++) {

                setArrayMesa3(arrayMesa3.pop())
                setAarrayMesa3(aarrayMesa3.pop())
            }
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa4(arrayMesa4.shift())
                setArrayMesa5(arrayMesa5.shift())
                setArrayMesa6(arrayMesa6.shift())
                setArrayMesa7(arrayMesa7.shift())
                setArrayMesa8(arrayMesa8.shift())
                setArrayMesa9(arrayMesa9.shift())
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa4(aarrayMesa4.shift())
                setAarrayMesa5(aarrayMesa5.shift())
                setAarrayMesa6(aarrayMesa6.shift())
                setAarrayMesa7(aarrayMesa7.shift())
                setAarrayMesa8(aarrayMesa8.shift())
                setAarrayMesa9(aarrayMesa9.shift())
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())

            }  
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length )); i++) {

                setArrayMesa4(arrayMesa4.pop())
                setAarrayMesa4(aarrayMesa4.pop())

            }
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa5(arrayMesa5.shift())
                setArrayMesa6(arrayMesa6.shift())
                setArrayMesa7(arrayMesa7.shift())
                setArrayMesa8(arrayMesa8.shift())
                setArrayMesa9(arrayMesa9.shift())
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa5(aarrayMesa5.shift())
                setAarrayMesa6(aarrayMesa6.shift())
                setAarrayMesa7(aarrayMesa7.shift())
                setAarrayMesa8(aarrayMesa8.shift())
                setAarrayMesa9(aarrayMesa9.shift())
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())

                
            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length )); i++) {

                setArrayMesa5(arrayMesa5.pop())
                setAarrayMesa5(aarrayMesa5.pop())

            }  
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa6(arrayMesa6.shift())
                setArrayMesa7(arrayMesa7.shift())
                setArrayMesa8(arrayMesa8.shift())
                setArrayMesa9(arrayMesa9.shift())
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa6(aarrayMesa6.shift())
                setAarrayMesa7(aarrayMesa7.shift())
                setAarrayMesa8(aarrayMesa8.shift())
                setAarrayMesa9(aarrayMesa9.shift())
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }

            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length )); i++) {

                setArrayMesa6(arrayMesa6.pop())
                setAarrayMesa6(aarrayMesa6.pop())

            }  

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa7(arrayMesa7.shift())
                setArrayMesa8(arrayMesa8.shift())
                setArrayMesa9(arrayMesa9.shift())
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa7(aarrayMesa7.shift())
                setAarrayMesa8(aarrayMesa8.shift())
                setAarrayMesa9(aarrayMesa9.shift())
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())



            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length )); i++) {

                setArrayMesa7(arrayMesa7.pop())
                setAarrayMesa7(aarrayMesa7.pop())

            }  

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa8(arrayMesa8.shift())
                setArrayMesa9(arrayMesa9.shift())                
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa8(aarrayMesa8.shift())
                setAarrayMesa9(aarrayMesa9.shift())                
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length )); i++) {

                setArrayMesa8(arrayMesa8.pop())
                setAarrayMesa8(aarrayMesa8.pop())

            }

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa9(arrayMesa9.shift())                
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa9(aarrayMesa9.shift())                
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length )); i++) {

                setArrayMesa9(arrayMesa9.pop())
                setAarrayMesa9(aarrayMesa9.pop())

            }

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa10(arrayMesa10.shift())
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa10(aarrayMesa10.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length )); i++) {

                setArrayMesa10(arrayMesa10.pop())
                setAarrayMesa10(aarrayMesa10.pop())

            }

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa11(arrayMesa11.shift())
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa11(aarrayMesa11.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())
                

            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length )); i++) {

                setArrayMesa11(arrayMesa11.pop())
                setAarrayMesa11(aarrayMesa11.pop())

            }
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa12(arrayMesa12.shift())
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa12(aarrayMesa12.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length )); i++) {

                setArrayMesa12(arrayMesa12.pop())
                setAarrayMesa12(aarrayMesa12.pop())

            }
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa13(arrayMesa13.shift())
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa13(aarrayMesa13.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())
                


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length )); i++) {

                setArrayMesa13(arrayMesa13.pop())
                setAarrayMesa13(aarrayMesa13.pop())

            }            
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa14(arrayMesa14.shift())
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa14(aarrayMesa14.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length )); i++) {

                setArrayMesa14(arrayMesa14.pop())
                setAarrayMesa14(aarrayMesa14.pop())

            }

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa15(arrayMesa15.shift())
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa15(aarrayMesa15.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length )); i++) {

                setArrayMesa15(arrayMesa15.pop())
                setAarrayMesa15(aarrayMesa15.pop())

            }
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa16(arrayMesa16.shift())
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa16(aarrayMesa16.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length )); i++) {

                setArrayMesa16(arrayMesa16.pop())
                setAarrayMesa16(aarrayMesa16.pop())

            }
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa17(arrayMesa17.shift())
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa17(aarrayMesa17.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length )); i++) {

                setArrayMesa17(arrayMesa17.pop())
                setAarrayMesa17(aarrayMesa17.pop())

            }
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa18(arrayMesa18.shift())
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa18(aarrayMesa18.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length )); i++) {

                setArrayMesa18(arrayMesa18.pop())
                setAarrayMesa18(aarrayMesa18.pop())

            }
            console.log("arrayMesa18", arrayMesa18)
            console.log("length arrayMesa18", arrayMesa18.length)
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa19(arrayMesa19.shift())
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa19(aarrayMesa19.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length )); i++) {

                setArrayMesa19(arrayMesa19.pop())
                setAarrayMesa19(aarrayMesa19.pop())

            }
            console.log("arrayMesa19", arrayMesa19)
            console.log("length arrayMesa19", arrayMesa19.length)
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa20(arrayMesa20.shift())
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa20(aarrayMesa20.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length )); i++) {

                setArrayMesa20(arrayMesa20.pop())
                setAarrayMesa20(aarrayMesa20.pop())

            }
            console.log("arrayMesa20", arrayMesa20)
            console.log("length arrayMesa20", arrayMesa20.length)
            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa21(arrayMesa21.shift())
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa21(aarrayMesa21.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length )); i++) {

                setArrayMesa21(arrayMesa21.pop())
                setAarrayMesa21(aarrayMesa21.pop())

            }
            console.log("arrayMesa21", arrayMesa21)
            console.log("length arrayMesa21", arrayMesa21.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa22(arrayMesa22.shift())
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa22(aarrayMesa22.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length )); i++) {

                setArrayMesa22(arrayMesa22.pop())
                setAarrayMesa22(aarrayMesa22.pop())

            }
            console.log("arrayMesa22", arrayMesa22)
            console.log("length arrayMesa22", arrayMesa22.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa23(arrayMesa23.shift())
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa23(aarrayMesa23.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length)); i++) {

                setArrayMesa23(arrayMesa23.pop())
                setAarrayMesa23(aarrayMesa23.pop())

            }
            console.log("arrayMesa23", arrayMesa23)
            console.log("length arrayMesa23", arrayMesa23.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa24(arrayMesa24.shift())
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa24(aarrayMesa24.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length + arrayMesa23.length)); i++) {

                setArrayMesa24(arrayMesa24.pop())
                setAarrayMesa24(aarrayMesa24.pop())

            }
            console.log("arrayMesa24", arrayMesa24)
            console.log("length arrayMesa24", arrayMesa24.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa25(arrayMesa25.shift())
                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa25(aarrayMesa25.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())



            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length + arrayMesa23.length + arrayMesa24.length )); i++) {

                setArrayMesa25(arrayMesa25.pop())
                setAarrayMesa25(aarrayMesa25.pop())

            }
            console.log("arrayMesa25", arrayMesa25)
            console.log("length arrayMesa25", arrayMesa25.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {

                setArrayMesa26(arrayMesa26.shift())
                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa26(aarrayMesa26.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length + arrayMesa23.length + arrayMesa24.length + arrayMesa25.length)); i++) {

                setArrayMesa26(arrayMesa26.pop())
                setAarrayMesa26(aarrayMesa26.pop())

            }
            console.log("arrayMesa26", arrayMesa26)
            console.log("length arrayMesa26", arrayMesa26.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {

                setArrayMesa27(arrayMesa27.shift())
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa27(aarrayMesa27.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length + arrayMesa23.length + arrayMesa24.length  + arrayMesa25.length  + arrayMesa26.length )); i++) {

                setArrayMesa27(arrayMesa27.pop())
                setAarrayMesa27(aarrayMesa27.pop())

            }
            console.log("arrayMesa27", arrayMesa27)
            console.log("length arrayMesa27", arrayMesa27.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa28(arrayMesa28.shift())
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa28(aarrayMesa28.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length + arrayMesa23.length + arrayMesa24.length + arrayMesa25.length + arrayMesa26.length + arrayMesa27.length)); i++) {

                setArrayMesa28(arrayMesa28.pop())
                setAarrayMesa28(aarrayMesa28.pop())

            }
            console.log("arrayMesa28", arrayMesa28)
            console.log("length arrayMesa28", arrayMesa28.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa29(arrayMesa29.shift())
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa29(aarrayMesa29.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length + arrayMesa23.length + arrayMesa24.length + arrayMesa25.length + arrayMesa26.length + arrayMesa27.length + arrayMesa28.length )); i++) {

                setArrayMesa29(arrayMesa29.pop())
                setAarrayMesa29(aarrayMesa29.pop())

            }
            console.log("arrayMesa29", arrayMesa29)
            console.log("length arrayMesa29", arrayMesa29.length)

            for (let i = 1 ; i <= parseInt(partMesa) ; i++) {
                setArrayMesa30(arrayMesa30.shift())
                setAarrayMesa30(aarrayMesa30.shift())


            }
            for (let i = parseInt(partMesa) ; i < (arrayMesas.length - (arrayMesa1.length + arrayMesa2.length + arrayMesa3.length + arrayMesa4.length + arrayMesa5.length + arrayMesa6.length + arrayMesa7.length + arrayMesa8.length + arrayMesa9.length + arrayMesa10.length + arrayMesa11.length + arrayMesa12.length + arrayMesa13.length + arrayMesa14.length + arrayMesa15.length + arrayMesa16.length + arrayMesa17.length + arrayMesa18.length + arrayMesa19.length + arrayMesa20.length + arrayMesa21.length + arrayMesa22.length + arrayMesa23.length + arrayMesa24.length + arrayMesa25.length + arrayMesa26.length + arrayMesa27.length + arrayMesa28.length + arrayMesa29.length )); i++) {

                setArrayMesa30(arrayMesa30.pop())
                setAarrayMesa30(aarrayMesa30.pop())

            }
            console.log("arrayMesa30", arrayMesa30)
            console.log("length arrayMesa30", arrayMesa30.length)

            console.log("arrayMesa1", arrayMesa1)
            console.log("arrayMesa2", arrayMesa2)
            console.log("arrayMesa3", arrayMesa3)
            console.log("arrayMesa4", arrayMesa4)
            console.log("arrayMesa5", arrayMesa5)
            console.log("arrayMesa6", arrayMesa6)
            console.log("arrayMesa7", arrayMesa7)
            console.log("arrayMesa8", arrayMesa8)
            const minharodadaMesa1 = arrayMesa1.flat(2)
            console.log("minharodadaMesa1", minharodadaMesa1)
            const minharodadaMesa2 = arrayMesa2.flat(2)
            console.log("minharodadaMesa2", minharodadaMesa2)
            const minharodadaMesa3 = arrayMesa3.flat(2)
            console.log("minharodadaMesa3", minharodadaMesa3)
            const minharodadaMesa4 = arrayMesa4.flat(2)
            console.log("minharodadaMesa4", minharodadaMesa4)
            const minharodadaMesa5 = arrayMesa5.flat(2)
            console.log("minharodadaMesa5", minharodadaMesa5)
            const minharodadaMesa6 = arrayMesa6.flat(2)
            console.log("minharodadaMesa6", minharodadaMesa6)
            const minharodadaMesa7 = arrayMesa7.flat(2)
            console.log("minharodadaMesa7", minharodadaMesa7)
            const minharodadaMesa8 = arrayMesa8.flat(2)
            console.log("minharodadaMesa8", minharodadaMesa8)
        }

        
        // if (numMesas >= 2) { 
        //     for (let i = 1 ; i <= 2 ; i++) {
        //         if(partMesa <= arrayMesa2.length){
        //         var shift2 = aarrayMesa2.shift()
        //          aarrayMesa2.push(shift2)
        //         }
        //     }  
        // }
        // if (numMesas == 6) {
        //     if (arrayMesa6.length < partMesa) {
        //         var poped = arrayMesa5.pop()
        //         arrayMesa6.unshift(poped)
        //         if( arrayMesa6.length < partMesa) {
        //             var poped = arrayMesa4.pop()
        //             arrayMesa5.unshift(poped)
        //             var poped2 = arrayMesa5.pop()
        //                 arrayMesa6.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 7) {
        //     if (arrayMesa7.length < partMesa) {
        //         var poped = arrayMesa6.pop() 
        //         arrayMesa7.unshift(poped)
        //         if( arrayMesa7.length < partMesa) {
        //             var poped = arrayMesa5.pop()
        //             arrayMesa6.unshift(poped)
        //             var poped2 = arrayMesa6.pop()
        //                 arrayMesa7.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 8) {
        //     if (arrayMesa8.length < partMesa) {
        //         var poped = arrayMesa7.pop() 
        //         arrayMesa8.unshift(poped)
        //         if( arrayMesa8.length < partMesa) {
        //             var poped = arrayMesa6.pop()
        //             arrayMesa7.unshift(poped)
        //             var poped2 = arrayMesa7.pop()
        //                 arrayMesa8.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 9) {
        //     if (arrayMesa9.length < partMesa) {
        //         var poped = arrayMesa8.pop() 
        //         arrayMesa9.unshift(poped)
        //         if( arrayMesa9.length < partMesa) {
        //             var poped = arrayMesa7.pop()
        //             arrayMesa8.unshift(poped)
        //             var poped2 = arrayMesa8.pop()
        //                 arrayMesa9.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 10) {
        //     if (arrayMesa10.length < partMesa) {
        //         var poped = arrayMesa9.pop() 
        //         arrayMesa10.unshift(poped)
        //         if( arrayMesa10.length < partMesa) {
        //             var poped = arrayMesa8.pop()
        //             arrayMesa9.unshift(poped)
        //             var poped2 = arrayMesa9.pop()
        //                 arrayMesa10.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 11) {
        //     if (arrayMesa11.length < partMesa) {
        //         var poped = arrayMesa10.pop() 
        //         arrayMesa11.unshift(poped)
        //         if( arrayMesa11.length < partMesa) {
        //             var poped = arrayMesa9.pop()
        //             arrayMesa10.unshift(poped)
        //             var poped2 = arrayMesa10.pop()
        //                 arrayMesa11.unshift(poped2)

        //         }
        //     }
            
        // }else if (numMesas == 12) {
        //     if (arrayMesa12.length < partMesa) {
        //         var poped = arrayMesa11.pop() 
        //         arrayMesa12.unshift(poped)
        //         if( arrayMesa12.length < partMesa) {
        //             var poped = arrayMesa10.pop()
        //             arrayMesa11.unshift(poped)
        //             var poped2 = arrayMesa11.pop()
        //                 arrayMesa12.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 13) {
        //     if (arrayMesa13.length < partMesa) {
        //         var poped = arrayMesa12.pop() 
        //         arrayMesa13.unshift(poped)
        //         if( arrayMesa13.length < partMesa) {
        //             var poped = arrayMesa11.pop()
        //             arrayMesa12.unshift(poped)
        //             var poped2 = arrayMesa12.pop()
        //                 arrayMesa13.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 14) {
        //     if (arrayMesa14.length < partMesa) {
        //         var poped = arrayMesa13.pop() 
        //         arrayMesa14.unshift(poped)
        //         if( arrayMesa14.length < partMesa) {
        //             var poped = arrayMesa12.pop()
        //             arrayMesa13.unshift(poped)
        //             var poped2 = arrayMesa13.pop()
        //                 arrayMesa14.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 15) {
        //     if (arrayMesa15.length < partMesa) {
        //         var poped = arrayMesa14.pop() 
        //         arrayMesa15.unshift(poped)
        //         if( arrayMesa15.length < partMesa) {
        //             var poped = arrayMesa13.pop()
        //             arrayMesa14.unshift(poped)
        //             var poped2 = arrayMesa14.pop()
        //                 arrayMesa15.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 16) {
        //     if (arrayMesa16.length < partMesa) {
        //         var poped = arrayMesa15.pop() 
        //         arrayMesa16.unshift(poped)
        //         if( arrayMesa16.length < partMesa) {
        //             var poped = arrayMesa14.pop()
        //             arrayMesa15.unshift(poped)
        //             var poped2 = arrayMesa15.pop()
        //                 arrayMesa16.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 17) {
        //     if (arrayMesa17.length < partMesa) {
        //         var poped = arrayMesa16.pop() 
        //         arrayMesa17.unshift(poped)
        //         if( arrayMesa17.length < partMesa) {
        //             var poped = arrayMesa15.pop()
        //             arrayMesa16.unshift(poped)
        //             var poped2 = arrayMesa16.pop()
        //                 arrayMesa17.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 18) {
        //     if (arrayMesa18.length < partMesa) {
        //         var poped = arrayMesa17.pop() 
        //         arrayMesa18.unshift(poped)
        //         if( arrayMesa18.length < partMesa) {
        //             var poped = arrayMesa16.pop()
        //             arrayMesa17.unshift(poped)
        //             var poped2 = arrayMesa17.pop()
        //                 arrayMesa18.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 19) {
        //     if (arrayMesa19.length < partMesa) {
        //         var poped = arrayMesa18.pop() 
        //         arrayMesa19.unshift(poped)
        //         if( arrayMesa19.length < partMesa) {
        //             var poped = arrayMesa17.pop()
        //             arrayMesa18.unshift(poped)
        //             var poped2 = arrayMesa18.pop()
        //                 arrayMesa19.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 20) {
        //     if (arrayMesa20.length < partMesa) {
        //         var poped = arrayMesa19.pop() 
        //         arrayMesa20.unshift(poped)
        //         if( arrayMesa20.length < partMesa) {
        //             var poped = arrayMesa18.pop()
        //             arrayMesa19.unshift(poped)
        //             var poped2 = arrayMesa19.pop()
        //                 arrayMesa20.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 21) {
        //     if (arrayMesa21.length < partMesa) {
        //         var poped = arrayMesa20.pop() 
        //         arrayMesa21.unshift(poped)
        //         if( arrayMesa21.length < partMesa) {
        //             var poped = arrayMesa19.pop()
        //             arrayMesa20.unshift(poped)
        //             var poped2 = arrayMesa20.pop()
        //                 arrayMesa21.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 22) {
        //     if (arrayMesa22.length < partMesa) {
        //         var poped = arrayMesa21.pop() 
        //         arrayMesa22.unshift(poped)
        //         if( arrayMesa22.length < partMesa) {
        //             var poped = arrayMesa20.pop()
        //             arrayMesa21.unshift(poped)
        //             var poped2 = arrayMesa21.pop()
        //                 arrayMesa22.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 23) {
        //     if (arrayMesa23.length < partMesa) {
        //         var poped = arrayMesa22.pop() 
        //         arrayMesa23.unshift(poped)
        //         if( arrayMesa23.length < partMesa) {
        //             var poped = arrayMesa21.pop()
        //             arrayMesa22.unshift(poped)
        //             var poped2 = arrayMesa22.pop()
        //                 arrayMesa23.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 24) {
        //     if (arrayMesa24.length < partMesa) {
        //         var poped = arrayMesa23.pop() 
        //         arrayMesa24.unshift(poped)
        //         if( arrayMesa24.length < partMesa) {
        //             var poped = arrayMesa22.pop()
        //             arrayMesa23.unshift(poped)
        //             var poped2 = arrayMesa23.pop()
        //                 arrayMesa24.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 25) {
        //     if (arrayMesa25.length < partMesa) {
        //         var poped = arrayMesa24.pop() 
        //         arrayMesa25.unshift(poped)
        //         if( arrayMesa25.length < partMesa) {
        //             var poped = arrayMesa23.pop()
        //             arrayMesa24.unshift(poped)
        //             var poped2 = arrayMesa24.pop()
        //                 arrayMesa25.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 26) {
        //     if (arrayMesa26.length < partMesa) {
        //         var poped = arrayMesa25.pop() 
        //         arrayMesa26.unshift(poped)
        //         if( arrayMesa26.length < partMesa) {
        //             var poped = arrayMesa24.pop()
        //             arrayMesa25.unshift(poped)
        //             var poped2 = arrayMesa25.pop()
        //                 arrayMesa26.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 27) {
        //     if (arrayMesa27.length < partMesa) {
        //         var poped = arrayMesa26.pop() 
        //         arrayMesa27.unshift(poped)
        //         if( arrayMesa27.length < partMesa) {
        //             var poped = arrayMesa25.pop()
        //             arrayMesa26.unshift(poped)
        //             var poped2 = arrayMesa26.pop()
        //                 arrayMesa27.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 28) {
        //     if (arrayMesa28.length < partMesa) {
        //         var poped = arrayMesa27.pop() 
        //         arrayMesa28.unshift(poped)
        //         if( arrayMesa28.length < partMesa) {
        //             var poped = arrayMesa26.pop()
        //             arrayMesa27.unshift(poped)
        //             var poped2 = arrayMesa27.pop()
        //                 arrayMesa28.unshift(poped2)

        //         }
        //     }
        // }else if (numMesas == 29) {
        //     if (arrayMesa29.length < partMesa) {
        //         var poped = arrayMesa28.pop() 
        //         arrayMesa29.unshift(poped)
        //         if( arrayMesa29.length < partMesa) {
        //             var poped = arrayMesa27.pop()
        //             arrayMesa28.unshift(poped)
        //             var poped2 = arrayMesa28.pop()
        //                 arrayMesa29.unshift(poped2)

        //         }
        //     }
          
        // }else if (numMesas == 30) {
        //     if (arrayMesa30.length < partMesa) {
        //         var poped = arrayMesa29.pop() 
        //         arrayMesa30.unshift(poped)
        //         if( arrayMesa30.length < partMesa) {
        //             var poped = arrayMesa28.pop()
        //             arrayMesa29.unshift(poped)
        //             var poped2 = arrayMesa29.pop()
        //                 arrayMesa30.unshift(poped2)

        //         }
        //     }
            
        // }
        
        
    }

    const meusPartMesa = async () => {
        
               
                
                

                // for (let j = auxiliar; j < arrayMesas.length; j++){
                     
                //     setArrayMesa1([arrayMesa1.push(j)])
                    
                // }
                // const index = arrayMesas.indexOf(i)
                // if (index != -1) {
                //     arrayMesas[index] = arrayMesas.slice(-1)
                //     console.log(arrayMesas)
                //     console.log("loop novo acima")
                // }
                
                if(numMesas != 0 ) {
            const roundar = Math.ceil((participantes / numMesas).toFixed(1))
            setPartMesa(roundar)

            }


            setTempoTotalHra(
            ((numMesas *
                ((Math.floor(parseInt(intGrupMin) * 60)
                         + Math.floor(parseInt(intIndMin) * 60) 
                         + Math.floor(parseInt(tempoPartMin) * 60) 
                         + Math.floor(parseInt(tempoPartMin) * 60)
                         + parseInt(tempoPartSeg)
                         + parseInt(intGrupSeg) 
                         + parseInt(intIndSeg) 
                         + parseInt(tempoPartSeg)))) / 3600).toFixed(0)
            )
          //  console.log("tempototalHra", tempoTotalHra)
            setTempoTotalMin(
                ((numMesas *
                ((Math.floor(parseInt(intGrupMin) * 60)
                         + Math.floor(parseInt(intIndMin) * 60) 
                         + Math.floor(parseInt(tempoPartMin) * 60) 
                         + Math.floor(parseInt(tempoPartMin) * 60)
                         + parseInt(tempoPartSeg)
                         + parseInt(intGrupSeg) 
                         + parseInt(intIndSeg) 
                         + parseInt(tempoPartSeg))) % 3600)/60).toFixed(0)

            )
            //console.log("TempoTotalMin", tempoTotalMin)
            setTempoTotalSeg (
               ((numMesas *
                    ((Math.floor(parseInt(intGrupMin) * 60)
                             + Math.floor(parseInt(intIndMin) * 60) 
                             + Math.floor(parseInt(tempoPartMin) * 60) 
                             + Math.floor(parseInt(tempoPartMin) * 60)
                             + parseInt(tempoPartSeg)
                             + parseInt(intGrupSeg) 
                             + parseInt(intIndSeg) 
                             + parseInt(tempoPartSeg))) % 3600) % 60).toFixed(0)
    
            )  
          //  console.log("TempoTotalSeg", tempoTotalSeg)

    if(tempoTotalHra.length == 2 && tempoTotalMin.length == 2 && tempoTotalSeg.length == 1) {
        setTempoTotal(
        tempoTotalHra + ":" + tempoTotalMin + ":0" + tempoTotalSeg
        )
    }else if(tempoTotalHra.length == 2 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 1) {
        setTempoTotal(
        tempoTotalHra + ":0" + tempoTotalMin + ":0" + tempoTotalSeg
        )  
    }else if(tempoTotalHra.length == 2 && tempoTotalMin.length == 2 && tempoTotalSeg.length == 2) {
        setTempoTotal(  
        tempoTotalHra + ":" + tempoTotalMin + ":" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 1 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 1) {
        setTempoTotal(  
        "0" + tempoTotalHra + ":0" + tempoTotalMin + ":0" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 1 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 2) {
        setTempoTotal(  
        "0" + tempoTotalHra + ":0" + tempoTotalMin + ":" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 2 && tempoTotalMin.length == 1 && tempoTotalSeg.length == 2) {
        setTempoTotal(  
        tempoTotalHra + ":0" + tempoTotalMin + ":" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 1 && tempoTotalMin.length == 2 && tempoTotalSeg.length == 1) {
        setTempoTotal(  
        "0" + tempoTotalHra + ":" + tempoTotalMin + ":0" + tempoTotalSeg  
    )
    }else if(tempoTotalHra.length == 1 && tempoTotalMin.length == 2 && tempoTotalSeg.length == 2) {
        setTempoTotal(  
        "0" + tempoTotalHra + ":" + tempoTotalMin + ":" + tempoTotalSeg  
    )
    }
    
    else{
    setTempoTotal(  
        "0" + tempoTotalHra + ":" + tempoTotalMin + ":0" + tempoTotalSeg  
    )
    console.log("falhou tempo corversa")
    }

}    
    ;
    const handleSubmit = async(e) => {
        
        e.preventDefault();

        setMessage("");
        gerarEtiquetas();
      
        setIntIndMin(parseInt(intIndMin))
        setIntIndSeg(parseInt(intIndSeg))
        setIntGrupMin(parseInt(intGrupMin))
        setIntGrupSeg(parseInt(intGrupSeg))
        setTempoPartMin(parseInt(tempoPartMin))
        setTempoPartSeg(parseInt(tempoPartMin))
        setParticipantes(parseInt(participantes))
        setNumMesas(parseInt(numMesas))
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        
        
        console.log("arrayMesa1", arrayMesa1)
        console.log("length arrayMesa1", arrayMesa1.length)
        console.log("arrayMesa2", arrayMesa2)
        console.log("length arrayMesa2", arrayMesa2.length)
        console.log("arrayMesa3", arrayMesa3)
        console.log("length arrayMesa3", arrayMesa3.length)
        console.log("arrayMesa4", arrayMesa4)
        console.log("length arrayMesa4", arrayMesa4.length)
        console.log("arrayMesa5", arrayMesa5)
        console.log("length arrayMesa5", arrayMesa5.length)
        console.log("arrayMesa6", arrayMesa6)
        console.log("length arrayMesa6", arrayMesa6.length)
        console.log("arrayMesa7", arrayMesa7)
        console.log("length arrayMesa7", arrayMesa7.length)
        console.log("arrayMesa8", arrayMesa8)
        console.log("length arrayMesa8", arrayMesa8.length)
        console.log("arrayMesa9", arrayMesa9)
        console.log("length arrayMesa9", arrayMesa9.length)
        console.log("arrayMesa10", arrayMesa10)
        console.log("length arrayMesa10", arrayMesa10.length)
        console.log("arrayMesa11", arrayMesa11)
        console.log("length arrayMesa11", arrayMesa11.length)
        console.log("arrayMesa13", arrayMesa12)
        console.log("length arrayMesa12", arrayMesa12.length)
        console.log("arrayMesa13", arrayMesa13)
        console.log("length arrayMesa13", arrayMesa13.length)
        console.log("arrayMesa14", arrayMesa14)
        console.log("length arrayMesa14", arrayMesa14.length)
        console.log("arrayMesa15", arrayMesa15)
        console.log("length arrayMesa15", arrayMesa15.length)
        console.log("arrayMesa16", arrayMesa16)
        console.log("length arrayMesa16", arrayMesa16.length)
        console.log("arrayMesa17", arrayMesa17)
        console.log("length arrayMesa17", arrayMesa17.length)


        if(reuniao === "" || grupo === "" || participantes === "" || tempoPartMin === "" || tempoPartSeg === "") {
            setMessage({error: true, msg: "Todos os campos são obrigatórios!"});    
            return;
        }

        const newRodada = {

                arrayMesa1, 
                arrayMesa2, 
                arrayMesa3, 
                arrayMesa4, 
                arrayMesa5,
                arrayMesa6, 
                arrayMesa7,
                arrayMesa8,
                arrayMesa9,
                arrayMesa10,
                arrayMesa11,
                arrayMesa12,
                arrayMesa13,
                arrayMesa14,
                arrayMesa15,
                arrayMesa16,
                arrayMesa17,
                arrayMesa18,
                arrayMesa19,
                arrayMesa20,
                dataRodada
        }

        

        
        const newRodadaBoa = {

            aarrayMesa1, 
            aarrayMesa2, 
            aarrayMesa3, 
            aarrayMesa4, 
            aarrayMesa5,
            aarrayMesa6, 
            aarrayMesa7,
            aarrayMesa8,
            aarrayMesa9,
            aarrayMesa10,
            aarrayMesa11,
            aarrayMesa12,
            aarrayMesa13,
            aarrayMesa14,
            aarrayMesa15,
            aarrayMesa16,
            aarrayMesa17,
            aarrayMesa18,
            aarrayMesa19,
            aarrayMesa20,
            dataRodada
    }
        
        
        await RodadaBoaDataService.addRodadasBoa(newRodadaBoa);
        // este Array Cria a logica de mesas da rodada 2 em diante
        var shift1 = aarrayMesa1.shift()
        aarrayMesa1.push(shift1)
        
        if (numMesas >= 2) { 
            for (let i = 1 ; i <= 2 ; i++) {
                if(partMesa <= arrayMesa2.length){
                var shift2 = aarrayMesa2.shift()
                 aarrayMesa2.push(shift2)
                }
            }
        
        }
               if (numMesas >= 3) { 
            for (let i = 1 ; i <= 3 ; i++) {
                if(partMesa <= arrayMesa3.length){
                var shift2 = aarrayMesa3.shift()
                aarrayMesa3.push(shift2)
                }
            }
        }
               if (numMesas >= 4) { 
            for (let i = 1 ; i <= 4 ; i++) {
                if(partMesa <= arrayMesa4.length){
                var shift2 = aarrayMesa4.shift()
                 aarrayMesa4.push(shift2)
                }
            }
        }
               if (numMesas >= 5) { 
            for (let i = 1 ; i <= 5 ; i++) {
                if(partMesa <= arrayMesa5.length){
                var shift2 = aarrayMesa5.shift()
                 aarrayMesa5.push(shift2)
                }
            }
        }
        
               if (numMesas >= 6) { 
            for (let i = 1 ; i <= 6 ; i++) {
                if(partMesa <= arrayMesa6.length){
                var shift2 = aarrayMesa6.shift()
                 aarrayMesa6.push(shift2)
                }
            }
        }
               if (numMesas >= 7) {  
            for (let i = 1 ; i <= 7 ; i++) {
                if(partMesa <= arrayMesa7.length){
                var shift2 = aarrayMesa7.shift()
                 aarrayMesa7.push(shift2)
                }
            }
        }
               if (numMesas >= 8) { 
            for (let i = 1 ; i <= 8 ; i++) {
                if(partMesa <= arrayMesa8.length){
                var shift2 = aarrayMesa8.shift()
                 aarrayMesa8.push(shift2)
                }
            }
        }
               if (numMesas >= 9) { 
            for (let i = 1 ; i <= 9 ; i++) {
                if(partMesa <= arrayMesa9.length){
                var shift2 = aarrayMesa9.shift()
                 aarrayMesa9.push(shift2)
                }
            }
        }
                if (numMesas >= 10) { 
            for (let i = 1 ; i <= 10 ; i++) {
                if(partMesa <= arrayMesa10.length){
                var shift2 = aarrayMesa10.shift()
                 aarrayMesa10.push(shift2)
                }
            }
        }
            
         if (numMesas >= 11) { 
            for (let i = 1 ; i <= 11 ; i++) {
                if(partMesa <= aarrayMesa11.length){
                var shift2 = aarrayMesa11.shift()
                 aarrayMesa11.push(shift2)
                }
            }
        }
            
         if (numMesas >= 12) { 
            for (let i = 1 ; i <= 12 ; i++) {
                if(partMesa <= arrayMesa12.length){
                var shift2 = aarrayMesa12.shift()
                 aarrayMesa12.push(shift2)
                }
            }
        }
            
        if (numMesas >= 13) { 
            for (let i = 1 ; i <= 13 ; i++) {
                if(partMesa <= arrayMesa13.length){
                var shift2 = aarrayMesa13.shift()
                 aarrayMesa13.push(shift2)
                }
            }
        }
            
        if (numMesas >= 14) { 
            for (let i = 1 ; i <= 14 ; i++) {
                if(partMesa <= arrayMesa14.length){
                var shift2 = aarrayMesa14.shift()
                 aarrayMesa14.push(shift2)
                }
            }
        }
            
        if (numMesas >= 15) { 
            for (let i = 1 ; i <= 15 ; i++) {
                if(partMesa <= arrayMesa15.length){
                var shift2 = aarrayMesa15.shift()
                 aarrayMesa15.push(shift2)
                }
            }
        }
            
        if (numMesas >= 16) { 
            for (let i = 1 ; i <= 16 ; i++) {
                if(partMesa <= arrayMesa16.length){
                var shift2 = aarrayMesa16.shift()
                 aarrayMesa16.push(shift2)
                }
            }
        }
            
        if (numMesas >= 17) { 
            for (let i = 1 ; i <= 17 ; i++) {
                if(partMesa <= arrayMesa17.length){
                var shift2 = aarrayMesa17.shift()
                 aarrayMesa17.push(shift2)
                }
            }
        }
            
        if (numMesas >= 18) { 
            for (let i = 1 ; i <= 18 ; i++) {
                if(partMesa <= arrayMesa2.length){
                var shift2 = aarrayMesa18.shift()
                 aarrayMesa18.push(shift2)
                }
            }
        }
            
        if (numMesas >= 19) { 
            for (let i = 1 ; i <= 19 ; i++) {
                if(partMesa <= arrayMesa2.length){
                var shift2 = aarrayMesa19.shift()
                 aarrayMesa19.push(shift2)
                }
            }
        }
            
        if (numMesas >= 20) { 
            for (let i = 1 ; i <= 20 ; i++) {
                if(partMesa <= arrayMesa2.length){
                var shift2 = aarrayMesa20.shift()
                 aarrayMesa20.push(shift2)
                }
            }
        }   
    
        const newRodada2 = {

            aarrayMesa1, 
            aarrayMesa2, 
            aarrayMesa3, 
            aarrayMesa4, 
            aarrayMesa5,
            aarrayMesa6, 
            aarrayMesa7,
            aarrayMesa8,
            aarrayMesa9,
            aarrayMesa10,
            aarrayMesa11,
            aarrayMesa12,
            aarrayMesa13,
            aarrayMesa14,
            aarrayMesa15,
            aarrayMesa16,
            aarrayMesa17,
            aarrayMesa18,
            aarrayMesa19,
            aarrayMesa20,
            dataRodada
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
            idioma,
            dataRodada
        }


        const newMesa = {
            dataRodada,
            reuniao,
            participantes,
            partMesa,
            numMesas
        }


        try {
            // if(id !== undefined && id !== "") {
            //     await NegocioDataService.updateNegocio(id, newNegocio);
            //     setNegocioId("");
            //     setMessage({error: false, msg: "Atualizado com sucesso"});
            // }
            // else {
                setNewRodadaFlat(newRodada)
                console.log(newRodadaFlat)
                console.log(newRodadaFlat.flat())
                await NegocioDataService.addNegocios(newNegocio);
                console.log("negocio criado")
                // await MesaDataService.addMesas(newMesa);
                // console.log("mesa criado")
                
                await RodadaDataService.addRodadas(newRodada);
                console.log("participantes criados")
                  await Rodada2DataService.addRodadas2(newRodada2);
                  console.log("Rodadas criadas")
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
var shift1 = aarrayMesa1.shift()
        aarrayMesa1.push(shift1)
           if (numMesas >= 2) { 
        for (let i = 1 ; i <= 2 ; i++) {
            if(partMesa <= arrayMesa2.length){
            var shift2 = aarrayMesa2.shift()
             aarrayMesa2.push(shift2)
            }
        }
    
    }
           if (numMesas >= 3) { 
        for (let i = 1 ; i <= 3 ; i++) {
            if(partMesa <= arrayMesa3.length){
            var shift2 = aarrayMesa3.shift()
            aarrayMesa3.push(shift2)
            }
        }
    }
           if (numMesas >= 4) { 
        for (let i = 1 ; i <= 4 ; i++) {
            if(partMesa <= arrayMesa4.length){
            var shift2 = aarrayMesa4.shift()
             aarrayMesa4.push(shift2)
            }
        }
    }
           if (numMesas >= 5) { 
        for (let i = 1 ; i <= 5 ; i++) {
            if(partMesa <= arrayMesa5.length){
            var shift2 = aarrayMesa5.shift()
             aarrayMesa5.push(shift2)
            }
        }
    }
    
           if (numMesas >= 6) { 
        for (let i = 1 ; i <= 6 ; i++) {
            if(partMesa <= arrayMesa6.length){
            var shift2 = aarrayMesa6.shift()
             aarrayMesa6.push(shift2)
            }
        }
    }
           if (numMesas >= 7) {  
        for (let i = 1 ; i <= 7 ; i++) {
            if(partMesa <= arrayMesa7.length){
            var shift2 = aarrayMesa7.shift()
             aarrayMesa7.push(shift2)
            }
        }
    }
           if (numMesas >= 8) { 
        for (let i = 1 ; i <= 8 ; i++) {
            if(partMesa <= arrayMesa8.length){
            var shift2 = aarrayMesa8.shift()
             aarrayMesa8.push(shift2)
            }
        }
    }
           if (numMesas >= 9) { 
        for (let i = 1 ; i <= 9 ; i++) {
            if(partMesa <= arrayMesa9.length){
            var shift2 = aarrayMesa9.shift()
             aarrayMesa9.push(shift2)
            }
        }
    }
            if (numMesas >= 10) { 
        for (let i = 1 ; i <= 10 ; i++) {
            if(partMesa <= arrayMesa10.length){
            var shift2 = aarrayMesa10.shift()
             aarrayMesa10.push(shift2)
            }
        }
    }
        
     if (numMesas >= 11) { 
        for (let i = 1 ; i <= 11 ; i++) {
            if(partMesa <= aarrayMesa11.length){
            var shift2 = aarrayMesa11.shift()
             aarrayMesa11.push(shift2)
            }
        }
    }
        
     if (numMesas >= 12) { 
        for (let i = 1 ; i <= 12 ; i++) {
            if(partMesa <= arrayMesa12.length){
            var shift2 = aarrayMesa12.shift()
             aarrayMesa12.push(shift2)
            }
        }
    }
        
    if (numMesas >= 13) { 
        for (let i = 1 ; i <= 13 ; i++) {
            if(partMesa <= arrayMesa13.length){
            var shift2 = aarrayMesa13.shift()
             aarrayMesa13.push(shift2)
            }
        }
    }
        
    if (numMesas >= 14) { 
        for (let i = 1 ; i <= 14 ; i++) {
            if(partMesa <= arrayMesa14.length){
            var shift2 = aarrayMesa14.shift()
             aarrayMesa14.push(shift2)
            }
        }
    }
        
    if (numMesas >= 15) { 
        for (let i = 1 ; i <= 15 ; i++) {
            if(partMesa <= arrayMesa15.length){
            var shift2 = aarrayMesa15.shift()
             aarrayMesa15.push(shift2)
            }
        }
    }
        
    if (numMesas >= 16) { 
        for (let i = 1 ; i <= 16 ; i++) {
            if(partMesa <= arrayMesa16.length){
            var shift2 = aarrayMesa16.shift()
             aarrayMesa16.push(shift2)
            }
        }
    }
        
    if (numMesas >= 17) { 
        for (let i = 1 ; i <= 17 ; i++) {
            if(partMesa <= arrayMesa17.length){
            var shift2 = aarrayMesa17.shift()
             aarrayMesa17.push(shift2)
            }
        }
    }
        
    if (numMesas >= 18) { 
        for (let i = 1 ; i <= 18 ; i++) {
            if(partMesa <= arrayMesa2.length){
            var shift2 = aarrayMesa18.shift()
             aarrayMesa18.push(shift2)
            }
        }
    }
        
    if (numMesas >= 19) { 
        for (let i = 1 ; i <= 19 ; i++) {
            if(partMesa <= arrayMesa2.length){
            var shift2 = aarrayMesa19.shift()
             aarrayMesa19.push(shift2)
            }
        }
    }
        
    if (numMesas >= 20) { 
        for (let i = 1 ; i <= 20 ; i++) {
            if(partMesa <= arrayMesa2.length){
            var shift2 = aarrayMesa20.shift()
             aarrayMesa20.push(shift2)
            }
        }
    }   
        
        const newRodada3 = {

            aarrayMesa1, 
            aarrayMesa2, 
            aarrayMesa3, 
            aarrayMesa4, 
            aarrayMesa5,
            aarrayMesa6, 
            aarrayMesa7,
            aarrayMesa8,
            aarrayMesa9,
            aarrayMesa10,
            aarrayMesa11,
            aarrayMesa12,
            aarrayMesa13,
            aarrayMesa14,
            aarrayMesa15,
            aarrayMesa16,
            aarrayMesa17,
            aarrayMesa18,
            aarrayMesa19,
            aarrayMesa20,
            dataRodada
    }
                  await Rodada3DataService.addRodadas3(newRodada3)
                console.log("Array Rodada 3 enviado e aplicada logica na mesma ufa!")
                
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   
const newRodada4 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}


                await Rodada4DataService.addRodadas4(newRodada4)
                console.log("Rodada 4 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada5 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada5DataService.addRodadas5(newRodada5)
                console.log("Rodada 5 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada6 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada6DataService.addRodadas6(newRodada6)
                console.log("Rodada 6 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada7 = {
    dataRodada,
    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20
}

                await Rodada7DataService.addRodadas7(newRodada7)
                console.log("Rodada 7 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada8 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada8DataService.addRodadas8(newRodada8)
                console.log("Rodada 8 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada9 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada9DataService.addRodadas9(newRodada9)
                console.log("Rodada 9 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada10 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada10DataService.addRodadas10(newRodada10)
                console.log("Rodada 10 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada11 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada11DataService.addRodadas11(newRodada11)
                console.log("Rodada 11 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada12 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada12DataService.addRodadas12(newRodada12)
                console.log("Rodada 12 gerada e aplicada logica na mesma ufa!" )

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var shift1 = aarrayMesa1.shift()
aarrayMesa1.push(shift1)
if (numMesas >= 2) { 
    for (let i = 1 ; i <= 2 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa2.shift()
         aarrayMesa2.push(shift2)
        }
    }

}
       if (numMesas >= 3) { 
    for (let i = 1 ; i <= 3 ; i++) {
        if(partMesa <= arrayMesa3.length){
        var shift2 = aarrayMesa3.shift()
        aarrayMesa3.push(shift2)
        }
    }
}
       if (numMesas >= 4) { 
    for (let i = 1 ; i <= 4 ; i++) {
        if(partMesa <= arrayMesa4.length){
        var shift2 = aarrayMesa4.shift()
         aarrayMesa4.push(shift2)
        }
    }
}
       if (numMesas >= 5) { 
    for (let i = 1 ; i <= 5 ; i++) {
        if(partMesa <= arrayMesa5.length){
        var shift2 = aarrayMesa5.shift()
         aarrayMesa5.push(shift2)
        }
    }
}

       if (numMesas >= 6) { 
    for (let i = 1 ; i <= 6 ; i++) {
        if(partMesa <= arrayMesa6.length){
        var shift2 = aarrayMesa6.shift()
         aarrayMesa6.push(shift2)
        }
    }
}
       if (numMesas >= 7) {  
    for (let i = 1 ; i <= 7 ; i++) {
        if(partMesa <= arrayMesa7.length){
        var shift2 = aarrayMesa7.shift()
         aarrayMesa7.push(shift2)
        }
    }
}
       if (numMesas >= 8) { 
    for (let i = 1 ; i <= 8 ; i++) {
        if(partMesa <= arrayMesa8.length){
        var shift2 = aarrayMesa8.shift()
         aarrayMesa8.push(shift2)
        }
    }
}
       if (numMesas >= 9) { 
    for (let i = 1 ; i <= 9 ; i++) {
        if(partMesa <= arrayMesa9.length){
        var shift2 = aarrayMesa9.shift()
         aarrayMesa9.push(shift2)
        }
    }
}
        if (numMesas >= 10) { 
    for (let i = 1 ; i <= 10 ; i++) {
        if(partMesa <= arrayMesa10.length){
        var shift2 = aarrayMesa10.shift()
         aarrayMesa10.push(shift2)
        }
    }
}
    
 if (numMesas >= 11) { 
    for (let i = 1 ; i <= 11 ; i++) {
        if(partMesa <= aarrayMesa11.length){
        var shift2 = aarrayMesa11.shift()
         aarrayMesa11.push(shift2)
        }
    }
}
    
 if (numMesas >= 12) { 
    for (let i = 1 ; i <= 12 ; i++) {
        if(partMesa <= arrayMesa12.length){
        var shift2 = aarrayMesa12.shift()
         aarrayMesa12.push(shift2)
        }
    }
}
    
if (numMesas >= 13) { 
    for (let i = 1 ; i <= 13 ; i++) {
        if(partMesa <= arrayMesa13.length){
        var shift2 = aarrayMesa13.shift()
         aarrayMesa13.push(shift2)
        }
    }
}
    
if (numMesas >= 14) { 
    for (let i = 1 ; i <= 14 ; i++) {
        if(partMesa <= arrayMesa14.length){
        var shift2 = aarrayMesa14.shift()
         aarrayMesa14.push(shift2)
        }
    }
}
    
if (numMesas >= 15) { 
    for (let i = 1 ; i <= 15 ; i++) {
        if(partMesa <= arrayMesa15.length){
        var shift2 = aarrayMesa15.shift()
         aarrayMesa15.push(shift2)
        }
    }
}
    
if (numMesas >= 16) { 
    for (let i = 1 ; i <= 16 ; i++) {
        if(partMesa <= arrayMesa16.length){
        var shift2 = aarrayMesa16.shift()
         aarrayMesa16.push(shift2)
        }
    }
}
    
if (numMesas >= 17) { 
    for (let i = 1 ; i <= 17 ; i++) {
        if(partMesa <= arrayMesa17.length){
        var shift2 = aarrayMesa17.shift()
         aarrayMesa17.push(shift2)
        }
    }
}
    
if (numMesas >= 18) { 
    for (let i = 1 ; i <= 18 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa18.shift()
         aarrayMesa18.push(shift2)
        }
    }
}
    
if (numMesas >= 19) { 
    for (let i = 1 ; i <= 19 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa19.shift()
         aarrayMesa19.push(shift2)
        }
    }
}
    
if (numMesas >= 20) { 
    for (let i = 1 ; i <= 20 ; i++) {
        if(partMesa <= arrayMesa2.length){
        var shift2 = aarrayMesa20.shift()
         aarrayMesa20.push(shift2)
        }
    }
}   

const newRodada13 = {

    aarrayMesa1, 
    aarrayMesa2, 
    aarrayMesa3, 
    aarrayMesa4, 
    aarrayMesa5,
    aarrayMesa6, 
    aarrayMesa7,
    aarrayMesa8,
    aarrayMesa9,
    aarrayMesa10,
    aarrayMesa11,
    aarrayMesa12,
    aarrayMesa13,
    aarrayMesa14,
    aarrayMesa15,
    aarrayMesa16,
    aarrayMesa17,
    aarrayMesa18,
    aarrayMesa19,
    aarrayMesa20,
    dataRodada
}

                await Rodada13DataService.addRodadas13(newRodada13)
                console.log("Rodada 13 gerada e aplicada logica na mesma ufa!" )



                setMessage({error: false, msg: "Nova Rodada de Negócios gerada!"});
                console.log("Msg Rodada gerada")
            // }

        } catch(err) {
            setMessage({error: true, msg:err.message})
        }
        setReuniao("");
        setGrupo("Grupo");
        setParticipantes(0);
        setTempoPartMin(0);
        setTempoPartSeg(0);
        setIntGrupMin(0);
        setIntGrupSeg(0);
        setIntIndMin(0);
        setIntIndSeg(0);
        setNumMesas(0);
        setPartMesa(0);
        setTempoTotal(0);
        setImgDireita("");
        setImgEsquerda("");
        setIdioma("Português");
        setDataRodada(Date.now());
    };
        const editHandler = async(e) => {
            setMessage("");
            try{
                const docSnap = await NegocioDataService.getNegocio(id);
                //console.log("O Registro é: ", docSnap.data());
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
        //        setImgDireita(docSnap.data().imgDireita);
        //        setImgEsquerda(docSnap.data().imgEsquerda);
                setIdioma(docSnap.data().idioma);
                setDataRodada(docSnap.data().dataRodada);

            }
            catch (err) {   
                setMessage({error: true, msg: err.message});
            }
        }
        
        
        useEffect(() => {
   
            
            meusPartMesa();
        },[numMesas, participantes, tempoPartMin, tempoPartSeg, intIndMin, intIndSeg, intGrupMin, intGrupSeg, 
         tempoTotalHra, tempoTotalMin,tempoTotalSeg,tempoTotal, partMesa,reuniao, grupo])
        



    return ( 
 
    
        <Container className='configurador w-100 p-3'>
        <>
        {message?.msg && (
        <Alert 
            variant={ message?.error ? "danger": "success"} 
            dismissible 
            onClose={() => setMessage("")}
        > 
            {message?.msg}
        </Alert> 
        )}
        </>
        <Form onSubmit= {handleSubmit}  onLoadedData ={() =>
                {
                    setReuniao("Reunião")
                    ;
                    setGrupo("Grupo");
                    setParticipantes(7);
                    setTempoPartMin(0);
                    setTempoPartSeg(0);
                    setIntIndMin(0);
                    setIntIndSeg(0);
                    setIntGrupMin(0);
                    setIntGrupSeg(0);
                    setNumMesas(0);
                    setPartMesa(0);
                    setTempoTotal(0);
                    setImgDireita(null);
                    setImgEsquerda(null);
                    setIdioma("Português")
                    
                }
            } >
            <Row xs={12} md={12} className="g-4 ">

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
                                            defaultValue={"Grupo"}
                                            className="input-card" aria-label="Floating label select example">
                                               <option value="Selecione">Selecione</option>
                                                <option value="Grupo">Grupo</option>
                                                
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
                                            onChange={(e) => { setParticipantes(e.target.value);
                                        
                                            }}
                                            defaultValue={"0"}
                                             className="input-card" aria-label="Floating label select example">
                                            
                                                   <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                    <option value="31">31</option>
                                                    <option value="32">32</option>
                                                    <option value="33">33</option>
                                                    <option value="34">34</option>
                                                    <option value="35">35</option>
                                                    <option value="36">36</option>
                                                    <option value="37">37</option>
                                                    <option value="38">38</option>
                                                    <option value="39">39</option>
                                                    <option value="40">40</option>
                                                    <option value="41">41</option>
                                                    <option value="42">42</option>
                                                    <option value="43">43</option>
                                                    <option value="44">44</option>
                                                    <option value="45">45</option>
                                                    <option value="46">46</option>
                                                    <option value="47">47</option>
                                                    <option value="48">48</option>
                                                    <option value="49">49</option>
                                                    <option value="50">50</option>
                                                    <option value="51">51</option>
                                                    <option value="52">52</option>
                                                    <option value="53">53</option>
                                                    <option value="54">54</option>
                                                    <option value="55">55</option>
                                                    <option value="56">56</option>
                                                    <option value="57">57</option>
                                                    <option value="58">58</option>
                                                    <option value="59">59</option>
                                                    <option value="60">60</option>
                                                    <option value="61">61</option>
                                                    <option value="62">62</option>
                                                    <option value="63">63</option>
                                                    <option value="64">64</option>
                                                    <option value="65">65</option>
                                                    <option value="66">66</option>
                                                    <option value="67">67</option>
                                                    <option value="68">68</option>
                                                    <option value="69">69</option>
                                                    <option value="70">70</option>
                                                    <option value="71">71</option>
                                                    <option value="72">72</option>
                                                    <option value="73">73</option>
                                                    <option value="74">74</option>
                                                    <option value="75">75</option>
                                                    <option value="76">76</option>
                                                    <option value="77">77</option>
                                                    <option value="78">78</option>
                                                    <option value="79">79</option>
                                                    <option value="80">80</option>
                                                    <option value="81">81</option>
                                                    <option value="82">82</option>
                                                    <option value="83">83</option>
                                                    <option value="84">84</option>
                                                    <option value="85">85</option>
                                                    <option value="86">86</option>
                                                    <option value="87">87</option>
                                                    <option value="88">88</option>
                                                    <option value="89">89</option>
                                                    <option value="90">90</option>
                                                    <option value="91">91</option>
                                                    <option value="92">92</option>
                                                    <option value="93">93</option>
                                                    <option value="94">94</option>
                                                    <option value="95">95</option>
                                                    <option value="96">96</option>
                                                    <option value="97">97</option>
                                                    <option value="98">98</option>
                                                    <option value="99">99</option>
                                                    <option value="100">100</option>
                                                    <option value="101">101</option>
                                                    <option value="102">102</option>
                                                    <option value="103">103</option>
                                                    <option value="104">104</option>
                                                    <option value="105">105</option>
                                                    <option value="106">106</option>
                                                    <option value="107">107</option>
                                                    <option value="108">108</option>
                                                    <option value="109">109</option>
                                                    <option value="110">110</option>
                                                    <option value="111">111</option>
                                                    <option value="112">112</option>
                                                    <option value="113">113</option>
                                                    <option value="114">114</option>
                                                    <option value="115">115</option>
                                                    <option value="116">116</option>
                                                    <option value="117">117</option>
                                                    <option value="118">118</option>
                                                    <option value="119">119</option>
                                                    <option value="120">120</option>
                                                    <option value="121">121</option>
                                                    <option value="122">122</option>
                                                    <option value="123">123</option>
                                                    <option value="124">124</option>
                                                    <option value="125">125</option>
                                                    <option value="126">126</option>
                                                    <option value="127">127</option>
                                                    <option value="128">128</option>
                                                    <option value="129">129</option>
                                                    <option value="130">130</option>
                                                    <option value="131">131</option>
                                                    <option value="132">132</option>
                                                    <option value="133">133</option>
                                                    <option value="134">134</option>
                                                    <option value="135">135</option>
                                                    <option value="136">136</option>
                                                    <option value="137">137</option>
                                                    <option value="138">138</option>
                                                    <option value="139">139</option>
                                                    <option value="140">140</option>
                                                    <option value="141">141</option>
                                                    <option value="142">142</option>
                                                    <option value="143">143</option>
                                                    <option value="144">144</option>
                                                    <option value="145">145</option>
                                                    <option value="146">146</option>
                                                    <option value="147">147</option>
                                                    <option value="148">148</option>
                                                    <option value="149">149</option>
                                                    <option value="150">150</option>
                                                    <option value="151">151</option>
                                                    <option value="152">152</option>
                                                    <option value="153">153</option>
                                                    <option value="154">154</option>
                                                    <option value="155">155</option>
                                                    <option value="156">156</option>
                                                    <option value="157">157</option>
                                                    <option value="158">158</option>
                                                    <option value="159">159</option>
                                                    <option value="160">160</option>
                                                    <option value="161">161</option>
                                                    <option value="162">162</option>
                                                    <option value="163">163</option>
                                                    <option value="164">164</option>
                                                    <option value="165">165</option>
                                                    <option value="166">166</option>
                                                    <option value="167">167</option>
                                                    <option value="168">168</option>
                                                    <option value="169">169</option>
                                                    <option value="170">170</option>
                                                    <option value="171">171</option>
                                                    <option value="172">172</option>
                                                    <option value="173">173</option>
                                                    <option value="174">174</option>
                                                    <option value="175">175</option>
                                                    <option value="176">176</option>
                                                    <option value="177">177</option>
                                                    <option value="178">178</option>
                                                    <option value="179">179</option>
                                                    <option value="180">180</option>
                                                    <option value="181">181</option>
                                                    <option value="182">182</option>
                                                    <option value="183">183</option>
                                                    <option value="184">184</option>
                                                    <option value="185">185</option>
                                                    <option value="186">186</option>
                                                    <option value="187">187</option>
                                                    <option value="188">188</option>
                                                    <option value="189">189</option>
                                                    <option value="190">190</option>
                                                    <option value="191">191</option>
                                                    <option value="192">192</option>
                                                    <option value="193">193</option>
                                                    <option value="194">194</option>
                                                    <option value="195">195</option>
                                                    <option value="196">196</option>
                                                    <option value="197">197</option>
                                                    <option value="198">198</option>
                                                    <option value="199">199</option>
                                                    <option value="200">200</option>
                                                    <option value="201">201</option>
                                                    <option value="202">202</option>
                                                    <option value="203">203</option>
                                                    <option value="204">204</option>
                                                    <option value="205">205</option>
                                                    <option value="206">206</option>
                                                    <option value="207">207</option>
                                                    <option value="208">208</option>
                                                    <option value="209">209</option>
                                                    <option value="210">210</option>
                                                    <option value="211">211</option>
                                                    <option value="212">212</option>
                                                    <option value="213">213</option>
                                                    <option value="214">214</option>
                                                    <option value="215">215</option>
                                                    <option value="216">216</option>
                                                    <option value="217">217</option>
                                                    <option value="218">218</option>
                                                    <option value="219">219</option>
                                                    <option value="220">220</option>
                                                    <option value="221">221</option>
                                                    <option value="222">222</option>
                                                    <option value="223">223</option>
                                                    <option value="224">224</option>
                                                    <option value="225">225</option>
                                                    <option value="226">226</option>
                                                    <option value="227">227</option>
                                                    <option value="228">228</option>
                                                    <option value="229">229</option>
                                                    <option value="230">230</option>
                                                    <option value="231">231</option>
                                                    <option value="232">232</option>
                                                    <option value="233">233</option>
                                                    <option value="234">234</option>
                                                    <option value="235">235</option>
                                                    <option value="236">236</option>
                                                    <option value="237">237</option>
                                                    <option value="238">238</option>
                                                    <option value="239">239</option>
                                                    <option value="240">240</option>
                                                    <option value="241">241</option>
                                                    <option value="242">242</option>
                                                    <option value="243">243</option>
                                                    <option value="244">244</option>
                                                    <option value="245">245</option>
                                                    <option value="246">246</option>
                                                    <option value="247">247</option>
                                                    <option value="248">248</option>
                                                    <option value="249">249</option>
                                                    <option value="250">250</option>
                                                    <option value="251">251</option>
                                                    <option value="252">252</option>
                                                    <option value="253">253</option>
                                                    <option value="254">254</option>
                                                    <option value="255">255</option>
                                                    <option value="256">256</option>
                                                    <option value="257">257</option>
                                                    <option value="258">258</option>
                                                    <option value="259">259</option>
                                                    <option value="260">260</option>
                                                    <option value="261">261</option>
                                                    <option value="262">262</option>
                                                    <option value="263">263</option>
                                                    <option value="264">264</option>
                                                    <option value="265">265</option>
                                                    <option value="266">266</option>
                                                    <option value="267">267</option>
                                                    <option value="268">268</option>
                                                    <option value="269">269</option>
                                                    <option value="270">270</option>
                                                    <option value="271">271</option>
                                                    <option value="272">272</option>
                                                    <option value="273">273</option>
                                                    <option value="274">274</option>
                                                    <option value="275">275</option>
                                                    <option value="276">276</option>
                                                    <option value="277">277</option>
                                                    <option value="278">278</option>
                                                    <option value="279">279</option>
                                                    <option value="280">280</option>
                                                    <option value="281">281</option>
                                                    <option value="282">282</option>
                                                    <option value="283">283</option>
                                                    <option value="284">284</option>
                                                    <option value="285">285</option>
                                                    <option value="286">286</option>
                                                    <option value="287">287</option>
                                                    <option value="288">288</option>
                                                    <option value="289">289</option>
                                                    <option value="290">290</option>
                                                    <option value="291">291</option>
                                                    <option value="292">292</option>
                                                    <option value="293">293</option>
                                                    <option value="294">294</option>
                                                    <option value="295">295</option>
                                                    <option value="296">296</option>
                                                    <option value="297">297</option>
                                                    <option value="298">298</option>
                                                    <option value="299">299</option>
                                                    <option value="300">300</option>


                                                
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
                                            defaultValue={"0"}
                                            className="input-card-se" aria-label="Floating label select example">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="51">51</option>
                                            <option value="52">52</option>
                                            <option value="53">53</option>
                                            <option value="54">54</option>
                                            <option value="55">55</option>
                                            <option value="56">56</option>
                                            <option value="57">57</option>
                                            <option value="58">58</option>
                                            <option value="59">59</option>

                                            
                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={tempoPartSeg} 
                                                onChange={(e) => setTempoPartSeg(e.target.value)}
                                                defaultValue={"0"}
                                                className="input-card-se" aria-label="Floating label select example">
                                              <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>

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
                                    Intervalo Individual:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                    <Row>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={intIndMin}
                                                onChange={(e) => setIntIndMin(e.target.value)}
                                                defaultValue={"0"} 
                                                className="input-card-se" aria-label="Floating label select example">
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>

                                                
                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                           <Form.Select value={intIndSeg}  
                                                onChange={(e) => setIntIndSeg(e.target.value)}
                                                defaultValue={"0"} 
                                                className="input-card-se" aria-label="Floating label select example">
                                               <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>


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
                                            defaultValue={"0"} 
                                           className="input-card-se" aria-label="Floating label select example">
                                          <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                            <option value="32">32</option>
                                            <option value="33">33</option>
                                            <option value="34">34</option>
                                            <option value="35">35</option>
                                            <option value="36">36</option>
                                            <option value="37">37</option>
                                            <option value="38">38</option>
                                            <option value="39">39</option>
                                            <option value="40">40</option>
                                            <option value="41">41</option>
                                            <option value="42">42</option>
                                            <option value="43">43</option>
                                            <option value="44">44</option>
                                            <option value="45">45</option>
                                            <option value="46">46</option>
                                            <option value="47">47</option>
                                            <option value="48">48</option>
                                            <option value="49">49</option>
                                            <option value="50">50</option>
                                            <option value="51">51</option>
                                            <option value="52">52</option>
                                            <option value="53">53</option>
                                            <option value="54">54</option>
                                            <option value="55">55</option>
                                            <option value="56">56</option>
                                            <option value="57">57</option>
                                            <option value="58">58</option>
                                            <option value="59">59</option>

                                            </Form.Select>
                                        
                                        </Col >
                                        <Col xs={2} md={2}>
                                        <p className="hr-card-p"> min</p>
                                        </Col>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={intGrupSeg}  
                                            onChange={(e) => setIntGrupSeg(e.target.value)}
                                            defaultValue={"0"} 
                                            className="input-card-se" aria-label="Floating label select example">
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                                <option value="32">32</option>
                                                <option value="33">33</option>
                                                <option value="34">34</option>
                                                <option value="35">35</option>
                                                <option value="36">36</option>
                                                <option value="37">37</option>
                                                <option value="38">38</option>
                                                <option value="39">39</option>
                                                <option value="40">40</option>
                                                <option value="41">41</option>
                                                <option value="42">42</option>
                                                <option value="43">43</option>
                                                <option value="44">44</option>
                                                <option value="45">45</option>
                                                <option value="46">46</option>
                                                <option value="47">47</option>
                                                <option value="48">48</option>
                                                <option value="49">49</option>
                                                <option value="50">50</option>
                                                <option value="51">51</option>
                                                <option value="52">52</option>
                                                <option value="53">53</option>
                                                <option value="54">54</option>
                                                <option value="55">55</option>
                                                <option value="56">56</option>
                                                <option value="57">57</option>
                                                <option value="58">58</option>
                                                <option value="59">59</option>
                                        
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
                                    <Row xs={12} md={12}>
                                        <Col xs={4} md={4}>
                                            <Form.Select value={numMesas} 
                                                onChange={(e) => {
                                                setNumMesas(e.target.value); 
                                                
                                                
                                                } }
                                                
                                                className="input-card-se" aria-label="Floating label select example">
                                                 {/* {minutos.map((doc, index) => {
                                                return (
                                                    <option key={index} value={doc.minuto}>{doc.minuto}</option>
                                                    )
                                                })};     */}
                                                <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>     
                                                   <option value="10">10</option>
                                                   <option value="11">11</option>
                                                   <option value="12">12</option>
                                                   <option value="13">13</option>
                                                   <option value="14">14</option>
                                                   <option value="15">15</option>
                                                   <option value="16">16</option>
                                                   <option value="17">17</option>
                                                   <option value="18">18</option>
                                                   <option value="19">19</option>
                                                   <option value="20">20</option>
                                                   <option value="21">21</option>
                                                   <option value="22">22</option>
                                                   <option value="23">23</option>
                                                   <option value="24">24</option>
                                                   <option value="25">25</option>
                                                   <option value="26">26</option>
                                                   <option value="27">27</option>
                                                   <option value="28">28</option>
                                                   <option value="29">29</option>
                                                   <option value="30">30</option>
                                            </Form.Select>
                                       </Col >
                                        <Col xs={3} md={3} className="hr-card-p">
                                            <FloatingLabel value={partMesa}
                                                className=""
                                                controlId="floatingInputGrid" >          
                                                { partMesa
                                                // partMesa !== "1.0" ?
                                                //  "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "2.0" ?
                                                //      "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "3.0" ?
                                                //      "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "4.0" ?
                                                //     "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "5.0" ?
                                                //      "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "6.0" ?
                                                //     "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "7.0" ?
                                                //     "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "8.0" ?
                                                //     "~" + parseInt(partMesa)
                                                //     :
                                                //     partMesa !== "9.0" ?
                                                //  "~" + Math.ceil(partMesa)
                                                //  :
                                                //  partMesa !== "10.0" ?
                                                //  "~" + parseInt(partMesa)
                                                //  :
                                                //   parseInt(partMesa)

                                             }      
                                            
                                            </FloatingLabel> 
                                        </Col>
                                        <Col xs={1} md={1} className="" >
                                         <BsFillPeopleFill   className="hr-card-participantes-icon"/>
                                        </Col>
                                        <Col xs={4} md={4}  className="">
                                        <FloatingLabel 
                                        className=""
                                        controlId="floatingInputGrid"  >
                                        por mesa
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
                                           
                                           className="input-card" size="sm" type="text" placeholder={tempoTotal}  />

                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card d-none'>
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Imagem Direita:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                        <Form.Control value={imgDireita}
                                        onChange={(e)   => setImgDireita(e.target.value)}
                                        className="mb-0 input-card" type="file"   />
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
                                        <Form.Control 
                                        onChange={handleChange}
                                        className="mb-0 input-card" type="file"  />
                                     {/* <Form.Group controlId="formFileSm" className="mb-3 input-card">
                                        <Form.Control type="file" size="sm" />
                                    </Form.Group> */}
                                    {error && <div className="error" >{error}</div>}
                                    </Card.Text>
                                </Col>
                            </Row>
                            <Row className='row-card d-none' >
                                <Col xs={4} md={6}>
                                    <Card.Text className="text-card">
                                    Idioma:
                                    </Card.Text>
                                </Col>
                                <Col xs={8} md={6}>
                                    <Card.Text >
                                            <Form.Select value = {idioma}
                                            onChange={(e)   =>  setIdioma(e.target.value)}  
                                            defaultValue={"Português"}                                         
                                            className="input-card" aria-label="Floating label select example">
                                                <option value="Português">Português</option>
                                                <option value="Inglês">Inglês</option>
                                                <option value="Espanhol">Espanhol</option>
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
                                <Col xs={8} md={8} style={{ textAlign: 'end'}}>
                                    <Link to="/" >
                                        <Button  variant="danger"> 
                                            Cancelar
                                        </Button>
                                    </Link>
                                </Col>
                                
                            </Row>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Form>
        </Container>

     );
}
 
export default Configurador