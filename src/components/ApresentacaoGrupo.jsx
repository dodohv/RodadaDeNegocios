
import { Link } from 'react-router-dom';
import {FloatingLabel, Form,Container,Row, Col, Card ,Table,Button  } from 'react-bootstrap'
import {useState, useEffect, useRef} from "react"
import NegocioDataService from "../services/negocio.services"
import NotificationSound3 from "../assets/sprayer.wav";
import NotificationSound2 from "../assets/counter.wav";
import NotificationSound from "../assets/ctwin.ogg";
import {BsClockHistory, BsFillPeopleFill, BsPeople, BsPlayCircle, BsPauseCircle, BsArrowLeftCircle} from 'react-icons/bs'
import MinutoDataService from "../services/minuto.services"
import MesaDataService from "../services/mesas.service"
import RodadaDataService from "../services/rodada.service"
import Test from '../components/test'
const ApresentacaoGrupo = () => {
    const [mesa2Rodada, setMesa2Rodada]=useState(0)
    const [rodadas, setRodadas] = useState([]);
    const [minutos, setMinutos] = useState([]);
    const [arrayNovo, setArrayNovo] = useState([]);
    const [pause, setPause] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const [manual, setManual] = useState(true);
    const [iniciar,setIniciar] = useState(true);
    const [leftright, setLeftRight] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(1);
    const [minutesLeft, setMinutesLeft] = useState(0);
    const [timer3, setTimer3] = useState(1);
    const [tempoDecorrido, setTempoDecorrido] = useState("00:00:00");
    const [timer3Hra,setTimer3Hra] = useState(0);
    const [timer3Min,setTimer3Min] = useState(0);
    const [timer3Seg, setTimer3Seg] = useState(0);
    const audioPlayer = useRef(null);
    const audioPlayer2 = useRef(null);
    const audioPlayer3 = useRef(null);
    const [mesas, setMesas] = useState([]);
    const [negocios, setNegocios] = useState([]);
    const [reuniaototal, setReuniaoTotal] = useState('');
    const [newSeconds, setNewSeconds] = useState(0);
    const [newMinutes, setNewMinutes] = useState(0);
    const [contarReuniao, setContarReuniao] = useState(1);
    const [contarApresentacao, setContarApresentacao] = useState(1);
    const Ref = useRef(null);

    
    
    const resetTimer = () => {
        clearInterval(timer2.current);
        timer2.current= undefined;
        setSecondsLeft(newSeconds);
        setMinutesLeft(newMinutes);   
    }
const meuTempoDecorrido = async() => {
    setTimer3Seg(
        (((Math.floor(timer3  % 3600)) % 60)).toFixed(0)
    )    
    setTimer3Hra(
        (Math.floor(timer3 / 3600)).toFixed(0)
    )
    setTimer3Min(
        (((Math.floor(timer3  % 3600)) / 60)).toFixed(0)
    )

     
    setTempoDecorrido(
        timer3Hra < 2 && timer3Min.length < 2 && timer3Seg.length < 2 ?
        "0" + timer3Hra + ":0" + timer3Min + ":0" + timer3Seg
            :
            timer3Hra < 2 && timer3Min.length < 2 &&  timer3Seg.length > 1 ?
            "0" + timer3Hra + ":0" + timer3Min + ":" + timer3Seg
                :
                timer3Hra < 2 && timer3Min.length > 1 &&  timer3Seg.length < 2 ?
                "0" + timer3Hra + ":" + timer3Min + ":0" + timer3Seg
                    :
                    timer3Hra > 1 && timer3Min.length < 2 && timer3Seg.length < 2 ?
                    timer3Hra + ":0" + timer3Min + ":0" + timer3Seg
                        :
                        timer3Hra > 1 && timer3Min.length < 2 && timer3Seg.length < 2 ?
                        timer3Hra + ":0" + timer3Min + ":" + timer3Seg
                            :
                            timer3Hra > 1 && timer3Min.length > 1 &&  timer3Seg.length < 2 ?
                             timer3Hra + ":" + timer3Min + ":0" + timer3Seg
                                :
                                    timer3Hra + ":" + timer3Min + ":" + timer3Seg
        )

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
    const timer2 = () => {
        var countdown = setInterval(() => {
            if (minutesLeft > 0 && secondsLeft == 0 && pause != true) {
                
                setMinutesLeft((min) => min - 1);
                setSecondsLeft(59);
            }
            if (minutesLeft == 0 && secondsLeft == 16 && pause != true) {
                playAudio3();
            }
            if (minutesLeft == 0 && secondsLeft == 0 && pause != true ) {
                playAudio()
                pauseTimer()
                alert(intIndMin)
                alert(intIndSeg)
            
            }

            if (secondsLeft <= 0) {
                clearInterval(countdown);
                return;
            }
            if (pause === true) {
                clearInterval(countdown);
                return;
            }
            setTimer3((sec) => sec + 1);
            
            setSecondsLeft((sec) => sec - 1);
        }, 1000);
            if (secondsLeft.toString().length == 1 ) {
                setSecondsLeft("0" + secondsLeft.toString())
            } 
            else {
                setSecondsLeft(secondsLeft.toString())
            }    
        return () => {
            clearInterval(countdown);
        };
    };
    const enableTimerButton = () => {
        setManual((manual) => !manual);
        setDisableButton((disable) => !disable);
    }
    const pauseTimer = () => {
        resetTimer
        setPause((pause) => !pause);
        setIniciar ((iniciar) => !iniciar)
        console.log(newSeconds)
        console.log(secondsLeft)
            if(iniciar === true && newSeconds <= secondsLeft && newMinutes <= minutesLeft) {
                playAudio2()
            }
    };
    useEffect(timer2, [ minutesLeft,secondsLeft, pause]);
    useEffect(() => {
        meuTempoDecorrido();
    },[timer3,timer3Hra,timer3Min,timer3Seg])
    useEffect(() => {
        getMinutos();
        getNegocios();
        getMesas();
        getRodadas();
        
    }, []);
    const getNegocios = async () => {
        const data = await NegocioDataService.getAllNegocios();
        console.log(data.docs);
            setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    const getRodadas = async () => {
        const data = await RodadaDataService.getAllRodadas();
            setRodadas(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getMinutos = async () => {
        const data = await MinutoDataService.getAllMinutos();    
            setMinutos(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    const getMesas = async () => {
        const data = await MesaDataService.getAllMesas();
        
        setMesas(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const database = [
        {
            contador: 20
        }
    ]
    return (  
    <>
    {/* <pre>datanew.sort((a,b) =>(a.data > b.data) ? 1 : -1)</pre>*/}
    {/* negocios.slice(-1).map((doc, index) => { */}
    {negocios.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
        return (

        <Card  key={index} style={{width:'1000px'}} 
           onLoadedData ={() =>
                {
                setMinutesLeft(doc.tempoPartMin) 
                ;
                setNewSeconds(doc.tempoPartSeg)
                ;
                setSecondsLeft(doc.tempoPartSeg) 
                ;
                setNewMinutes(doc.tempoPartMin)
                }
            } 
           
           > 
            <Row xs={12} md={12} className="">
                <Col xs={12} md={12} style={{ marginLeft: '10px' , textAlign: 'start'}}>
                    <div>
                        <Card.Title className='title-card'>
                            {doc.reuniao}
                        </Card.Title>
                    </div>
                </Col>
            </Row>
            <Row xs={12} md={12}>
                <Col xs={4} md={4}>
                    <Row xs={12} md={12} style={{marginLeft:'0px'}}>
                        <Col xs={6} md={6} style={{ textAlign: 'start'}}>
                           <Card.Text className="text-card medio">
                                Reuniao {contarReuniao}/{doc.numMesas}          
                            </Card.Text>
                        </Col>
                        <Col xs={3} md={3}> 
                            <Button 
                                onClick ={() => {
                                    setMinutesLeft(doc.intGrupMin) 
                                    ; 
                                    setSecondsLeft(doc.intGrupSeg)
                                    ;
                                    setNewSeconds(doc.intGrupSeg)
                                    ;
                                    setNewMinutes(doc.intGrupMin)
                                    ;
                                    setContarReuniao(contarReuniao !== 1 ? contarReuniao - 1: contarReuniao )
                                
                                    } 
                                }    
                                variant="outline-secondary"  
                                className="mini">
                                    Anterior
                            </Button>
                        </Col>
                        <Col xs={3} md={3}> 
                            <Button 
                                onClick ={() => {
                                    setMinutesLeft(doc.intGrupMin) 
                                    ; 
                                    setSecondsLeft(doc.intGrupSeg)
                                    ;
                                    setNewSeconds(doc.intGrupSeg)
                                    ;
                                    setNewMinutes(doc.intGrupMin)
                                    ;
                                setContarReuniao( contarReuniao !== (parseInt(doc.numMesas)) ? contarReuniao + 1: contarReuniao )
                                
                            } 
                                }    
                                variant="outline-secondary" 
                                className="mini">
                                    Próximo
                            </Button>
                        </Col>
                    </Row>
                    <Row xs={12} md={12} style={{marginLeft:'0px'}}>
                        <Col xs={6} md={6} style={{ textAlign: 'start'}}>
                            <Card.Text className="text-card medio">
                                Apresentação {contarApresentacao}/{parseInt(doc.partMesa)}
                            </Card.Text>         
                        </Col>
                        <Col xs={3} md={3}> 
                            <Button 
                                onClick ={() => {
                                    setMinutesLeft(doc.tempoPartMin) 
                                    ; 
                                    setSecondsLeft(doc.tempoPartSeg)
                                    ;
                                    setNewSeconds(doc.tempoPartSeg)
                                    ;
                                    setNewMinutes(doc.tempoPartMin)   
                                ;   
                                setContarApresentacao(contarApresentacao !== 1 ? contarApresentacao - 1 : contarApresentacao) 
                                
                                    } 
                                }
                                variant="outline-secondary" 
                                className="mini">
                                    Anterior
                            </Button>
                        </Col>
                        <Col xs={3} md={3}> 
                            <Button 
                                onClick ={() => {
                                setMinutesLeft(doc.tempoPartMin) 
                                ; 
                                setSecondsLeft(doc.tempoPartSeg)
                                ;
                                setNewSeconds(doc.tempoPartSeg)
                                ;
                                setNewMinutes(doc.tempoPartMin)
                                ; 
                                setContarApresentacao(contarApresentacao !== (parseInt(doc.partMesa)) ? contarApresentacao + 1: contarApresentacao) 
                          
                                    } 
                                }
                                variant="outline-secondary" 
                                className="mini">
                                    Próximo
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4} md={4} >
                    <Row xs={12} md={12} >
                        <span>TIMER</span>
                        <p className="timernovo">
                            00:{ minutesLeft.toString().length == 1 ? 
                            "0" + minutesLeft
                            : 
                            minutesLeft 
                            }
                            :
                            {
                            secondsLeft  
                            }
                        </p>
                        <Col xs={4} md={4} className="mini" style={{ textAlign: 'end'}}>
                            <BsPlayCircle className="botão" onClick={pauseTimer} /> 
                                <p>Continuar</p>
                        </Col>
                        
                        {disableButton == true ?
                        <Col xs={4} md={4} className="mini">
                            {pause ?    
                            <>
                                <BsPlayCircle className="botão" onClick={pauseTimer} /> 
                                <p>
                                    Iniciar
                                </p>
                            </>
                            : 
                            <>  
                                <BsPauseCircle className="botão" onClick={pauseTimer} />
                                <p>
                                    Pausar
                                </p>
                            </>
                            }   
                        
                        </Col>
                        :
                        <Col xs={4} md={4} className="mini" style={{ textAlign: 'center'}}>   
                            <BsPauseCircle className="botãoReversoDisabled"   disabled= {disableButton} />
                            <p>
                                Pausar
                            </p>
                        </Col>
                        
                        }
                
                        <Col xs={4} md={4} className="mini" style={{ textAlign: 'start'}}>
                            {disableButton == true ?
                            <>
                                <BsPlayCircle 
                                className="botãoReverso"
                                onClick =  {resetTimer } 
                                disabled= {disableButton}
                                />
                                <p>
                                    Reiniciar
                                </p>
                            </>
                            :
                            <>
                                <BsPlayCircle 
                                className="botãoReversoDisabled"
                                disabled= {disableButton}
                                />
                                <p>
                                    Reiniciar
                                </p>
                            </>
                            }
                            <audio ref={audioPlayer} src={NotificationSound} />
                            <audio ref={audioPlayer2} src={NotificationSound2} />
                            <audio ref={audioPlayer3} src={NotificationSound3} />
                        </Col>

                    </Row>
                    <Row xs={12} md={12}>
                                <Col xs={1} md={1} className="medio">
                                    <Form.Check  onClick={enableTimerButton}           
                                    />
                                </Col>
                                <Col xs={4} md={4} className="medio" >
                                    <p>Manual</p>
                                </Col>
                        
                    </Row>
                </Col>
                <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                    <Card.Text className="text-card medio">
                        Tempo Programado:
                    </Card.Text>
                    <Card.Text className="text-card medio">
                        Tempo Decorrido:
                    </Card.Text>
                    <Card.Text className="text-card medio">
                        Apresentação Individual:
                    </Card.Text>
                    <Card.Text className="text-card medio">
                        Intervalo Individual:
                    </Card.Text>
                    <Card.Text className="text-card medio">
                        Intervalo da Reunião:
                    </Card.Text>
                </Col>
                <Col xs={2} md={2} className="medio" style={{ textAlign: 'start'}}>
                    <Card.Text className="text-card">
                        {doc.tempoTotal}
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                         {tempoDecorrido}
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                        {doc.tempoPartMin.length > 1 && doc.tempoPartSeg.length > 1 ?
                        "00:" + doc.tempoPartMin + ":" + doc.tempoPartSeg
                        :
                         doc.tempoPartMin.length == 1 && doc.tempoPartSeg.length < 2  ?
                          "00:0" + doc.tempoPartMin + ":0" + doc.tempoPartSeg + "aa"
                              :
                               doc.tempoPartMin.length == 1 && doc.tempoPartSeg.length > 1 ?
                                "00:0" + doc.tempoPartMin + ":" + doc.tempoPartSeg
                                    :
                                    doc.tempoPartMin.length == null && doc.tempoPartSeg.length > 1 ?
                                    "00:0" + doc.tempoPartMin + ":" + doc.tempoPartSeg
                                    :
                                    doc.tempoPartMin.length >1 && doc.tempoPartSeg.length == null ?
                                    "00:" + doc.tempoPartMin + ":0" + doc.tempoPartSeg
                                    :
                                    doc.tempoPartMin.length <2 && doc.tempoPartSeg.length == null ?
                                    "00:0" + doc.tempoPartMin + ":0" + doc.tempoPartSeg
                                    :
                                    "00:0" + doc.tempoPartMin + ":0" + doc.tempoPartSeg

                        
                        }
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                        {
                        doc.intIndMin.length > 1 && doc.intIndSeg.length > 1 ?
                        "00:" + doc.intIndMin + ":" + doc.intIndSeg
                            :
                            doc.intIndMin.length != 2 && doc.intIndSeg.length != 2  ?
                            "00:0" + doc.intIndMin + ":0" + doc.intIndSeg
                                :
                                doc.intIndMin.length == 1 && doc.intIndSeg.length > 1 ?
                                "00:0" + doc.intIndMin + ":" + doc.intIndSeg
                                    :
                                    doc.intIndMin.length == null && doc.intIndSeg.length > 1 ?
                                    "00:0" + doc.intIndMin + ":" + doc.intIndSeg
                                    :
                                    doc.intIndMin.length >1 && doc.intIndSeg.length == null ?
                                    "00:" + doc.intIndMin + ":0" + doc.intIndSeg
                                    :
                                    doc.intIndMin.length <2 && doc.intIndSeg.length == null ?
                                    "00:0" + doc.intIndMin + ":0" + doc.intIndSeg
                                    :

                                    "00:0" + doc.intIndMin + ":0" + doc.intIndSeg
                                    
                        }
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                        00:00:00
                    </Card.Text>
                </Col>
            </Row>    
         
            
            <Row xs={12} md={12}>  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                
                {contarReuniao == 1 ?
                
                
                rodadas.sort((a,b)=> a.dataRodada > b.dataRodada ? 1 : -1).slice(-1).map((docrodada, indexrodada) => {
                    return(

                         
                    
                         <Col xs={6} md={6} className="mesas">
                            
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 1 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa1[0].id) + '-' +
                                 (docrodada.arrayMesa1[1].id) + '-' +
                                 (docrodada.arrayMesa1[2].id) + '-' +
                                 (docrodada.arrayMesa1[3].id) + '-'} 
                             {   docrodada.arrayMesa1.length == 5 ? 
                                 (docrodada.arrayMesa1[4].id)
                                  :
                                  docrodada.arrayMesa1.length == 6 ?
                                  (docrodada.arrayMesa1[4].id) + '-' +
                                  (docrodada.arrayMesa1[5].id)
                                   :
                                   docrodada.arrayMesa1.length == 7 ?
                                   (docrodada.arrayMesa1[4].id) + '-' +
                                   (docrodada.arrayMesa1[5].id) + '-' +
                                   (docrodada.arrayMesa1[6].id)
                                    :
                                    docrodada.arrayMesa1.length == 8 ?
                                    (docrodada.arrayMesa1[4].id) + '-' +
                                    (docrodada.arrayMesa1[5].id) + '-' +
                                    (docrodada.arrayMesa1[6].id) + '-' +
                                    (docrodada.arrayMesa1[7].id)
                                     : 
                                     docrodada.arrayMesa1.length == 9 ?
                                     (docrodada.arrayMesa1[4].id) + '-' +
                                     (docrodada.arrayMesa1[5].id) + '-' +
                                     (docrodada.arrayMesa1[6].id) + '-' +
                                     (docrodada.arrayMesa1[7].id) + '-' +
                                     (docrodada.arrayMesa1[8].id) 
                                      :
                                      docrodada.arrayMesa1.length == 10 ?
                                        (docrodada.arrayMesa1[4].id) + '-' +
                                        (docrodada.arrayMesa1[5].id) + '-' +
                                        (docrodada.arrayMesa1[6].id) + '-' +
                                        (docrodada.arrayMesa1[7].id) + '-' +
                                        (docrodada.arrayMesa1[8].id) + '-' +
                                        (docrodada.arrayMesa1[9].id)
                                            
                                         :
                                         docrodada.arrayMesa1.length == 11 ?
                                         (docrodada.arrayMesa1[4].id) + '-' +
                                         (docrodada.arrayMesa1[5].id) + '-' +
                                         (docrodada.arrayMesa1[6].id) + '-' +
                                         (docrodada.arrayMesa1[7].id) + '-' +
                                         (docrodada.arrayMesa1[8].id) + '-' +
                                         (docrodada.arrayMesa1[9].id) + '-' +
                                         (docrodada.arrayMesa1[10].id)
                                         :
                                         docrodada.arrayMesa1.length == 12 ?
                                         (docrodada.arrayMesa1[4].id) + '-' +
                                         (docrodada.arrayMesa1[5].id) + '-' +
                                         (docrodada.arrayMesa1[6].id) + '-' +
                                         (docrodada.arrayMesa1[7].id) + '-' +
                                         (docrodada.arrayMesa1[8].id) + '-' +
                                         (docrodada.arrayMesa1[9].id) + '-' +
                                         (docrodada.arrayMesa1[10].id) + '-' +
                                         (docrodada.arrayMesa1[11].id)
                                         :
                                         docrodada.arrayMesa1.length == 13 ?
                                         (docrodada.arrayMesa1[4].id) + '-' +
                                         (docrodada.arrayMesa1[5].id) + '-' +
                                         (docrodada.arrayMesa1[6].id) + '-' +
                                         (docrodada.arrayMesa1[7].id) + '-' +
                                         (docrodada.arrayMesa1[8].id) + '-' +
                                         (docrodada.arrayMesa1[9].id) + '-' +
                                         (docrodada.arrayMesa1[10].id) + '-' +
                                         (docrodada.arrayMesa1[11].id) + '-' +
                                         (docrodada.arrayMesa1[12].id) 
                                             :
                                             docrodada.arrayMesa1.length == 14 ?
                                             (docrodada.arrayMesa1[4].id) + '-' +
                                             (docrodada.arrayMesa1[5].id) + '-' +
                                             (docrodada.arrayMesa1[6].id) + '-' +
                                             (docrodada.arrayMesa1[7].id) + '-' +
                                             (docrodada.arrayMesa1[8].id) + '-' +
                                             (docrodada.arrayMesa1[9].id) + '-' +
                                             (docrodada.arrayMesa1[10].id) + '-' +
                                             (docrodada.arrayMesa1[11].id) + '-' +
                                             (docrodada.arrayMesa1[12].id) + '-' +
                                             (docrodada.arrayMesa1[13].id)
                                             :
                                             docrodada.arrayMesa1.length == 15 ?
                                             (docrodada.arrayMesa1[4].id) + '-' +
                                             (docrodada.arrayMesa1[5].id) + '-' +
                                             (docrodada.arrayMesa1[6].id) + '-' +
                                             (docrodada.arrayMesa1[7].id) + '-' +
                                             (docrodada.arrayMesa1[8].id) + '-' +
                                             (docrodada.arrayMesa1[9].id) + '-' +
                                             (docrodada.arrayMesa1[10].id) + '-' +
                                             (docrodada.arrayMesa1[11].id) + '-' +
                                             (docrodada.arrayMesa1[12].id) + '-' +
                                             (docrodada.arrayMesa1[13].id) + '-' +
                                             (docrodada.arrayMesa1[14].id)
                                             :
                                             docrodada.arrayMesa1.length == 16 ?
                                             (docrodada.arrayMesa1[4].id) + '-' +
                                             (docrodada.arrayMesa1[5].id) + '-' +
                                             (docrodada.arrayMesa1[6].id) + '-' +
                                             (docrodada.arrayMesa1[7].id) + '-' +
                                             (docrodada.arrayMesa1[8].id) + '-' +
                                             (docrodada.arrayMesa1[9].id) + '-' +
                                             (docrodada.arrayMesa1[10].id) + '-' +
                                             (docrodada.arrayMesa1[11].id) + '-' +
                                             (docrodada.arrayMesa1[12].id) + '-' +
                                             (docrodada.arrayMesa1[13].id) + '-' +
                                             (docrodada.arrayMesa1[14].id) + '-' +
                                             (docrodada.arrayMesa1[15].id) 
                                             :
                                             docrodada.arrayMesa1.length == 17 ?
                                             (docrodada.arrayMesa1[4].id) + '-' +
                                             (docrodada.arrayMesa1[5].id) + '-' +
                                             (docrodada.arrayMesa1[6].id) + '-' +
                                             (docrodada.arrayMesa1[7].id) + '-' +
                                             (docrodada.arrayMesa1[8].id) + '-' +
                                             (docrodada.arrayMesa1[9].id) + '-' +
                                             (docrodada.arrayMesa1[10].id) + '-' +
                                             (docrodada.arrayMesa1[11].id) + '-' +
                                             (docrodada.arrayMesa1[12].id) + '-' +
                                             (docrodada.arrayMesa1[13].id) + '-' +
                                             (docrodada.arrayMesa1[14].id) + '-' +
                                             (docrodada.arrayMesa1[15].id) + '-' +
                                             (docrodada.arrayMesa1[16].id)
                                                 :
                                                 docrodada.arrayMesa1.length == 18 ?
                                                 (docrodada.arrayMesa1[4].id) + '-' +
                                                 (docrodada.arrayMesa1[5].id) + '-' +
                                                 (docrodada.arrayMesa1[6].id) + '-' +
                                                 (docrodada.arrayMesa1[7].id) + '-' +
                                                 (docrodada.arrayMesa1[8].id) + '-' +
                                                 (docrodada.arrayMesa1[9].id) + '-' +
                                                 (docrodada.arrayMesa1[10].id) + '-' +
                                                 (docrodada.arrayMesa1[11].id) + '-' +
                                                 (docrodada.arrayMesa1[12].id) + '-' +
                                                 (docrodada.arrayMesa1[13].id) + '-' +
                                                 (docrodada.arrayMesa1[14].id) + '-' +
                                                 (docrodada.arrayMesa1[15].id) + '-' +
                                                 (docrodada.arrayMesa1[16].id) + '-' +
                                                 (docrodada.arrayMesa1[17].id)
                                                 :
                                                 docrodada.arrayMesa1.length == 19 ?
                                                 (docrodada.arrayMesa1[4].id) + '-' +
                                                 (docrodada.arrayMesa1[5].id) + '-' +
                                                 (docrodada.arrayMesa1[6].id) + '-' +
                                                 (docrodada.arrayMesa1[7].id) + '-' +
                                                 (docrodada.arrayMesa1[8].id) + '-' +
                                                 (docrodada.arrayMesa1[9].id) + '-' +
                                                 (docrodada.arrayMesa1[10].id) + '-' +
                                                 (docrodada.arrayMesa1[11].id) + '-' +
                                                 (docrodada.arrayMesa1[12].id) + '-' +
                                                 (docrodada.arrayMesa1[13].id) + '-' +
                                                 (docrodada.arrayMesa1[14].id) + '-' +
                                                 (docrodada.arrayMesa1[15].id) + '-' +
                                                 (docrodada.arrayMesa1[16].id) + '-' +
                                                 (docrodada.arrayMesa1[17].id) + '-' +
                                                 (docrodada.arrayMesa1[18].id) 
                                                 :
                                                 docrodada.arrayMesa1.length == 20 ?
                                                 (docrodada.arrayMesa1[4].id) + '-' +
                                                 (docrodada.arrayMesa1[5].id) + '-' +
                                                 (docrodada.arrayMesa1[6].id) + '-' +
                                                 (docrodada.arrayMesa1[7].id) + '-' +
                                                 (docrodada.arrayMesa1[8].id) + '-' +
                                                 (docrodada.arrayMesa1[9].id) + '-' +
                                                 (docrodada.arrayMesa1[10].id) + '-' +
                                                 (docrodada.arrayMesa1[11].id) + '-' +
                                                 (docrodada.arrayMesa1[12].id) + '-' +
                                                 (docrodada.arrayMesa1[13].id) + '-' +
                                                 (docrodada.arrayMesa1[14].id) + '-' +
                                                 (docrodada.arrayMesa1[15].id) + '-' +
                                                 (docrodada.arrayMesa1[16].id) + '-' +
                                                 (docrodada.arrayMesa1[17].id) + '-' +
                                                 (docrodada.arrayMesa1[18].id) + '-' +
                                                 (docrodada.arrayMesa1[19].id)
                                                 :
                                                 (docrodada.arrayMesa1[4].id) + '-' +
                                                 (docrodada.arrayMesa1[5].id) + '-' +
                                                 (docrodada.arrayMesa1[6].id) + '-' +
                                                 (docrodada.arrayMesa1[7].id) + '-' +
                                                 (docrodada.arrayMesa1[8].id) + '-' +
                                                 (docrodada.arrayMesa1[9].id) + '-' +
                                                 (docrodada.arrayMesa1[10].id) + '-' +
                                                 (docrodada.arrayMesa1[11].id) + '-' +
                                                 (docrodada.arrayMesa1[12].id) + '-' +
                                                 (docrodada.arrayMesa1[13].id) + '-' +
                                                 (docrodada.arrayMesa1[14].id) + '-' +
                                                 (docrodada.arrayMesa1[15].id) + '-' +
                                                 (docrodada.arrayMesa1[16].id) + '-' +
                                                 (docrodada.arrayMesa1[17].id) + '-' +
                                                 (docrodada.arrayMesa1[18].id) + '-' +
                                                 (docrodada.arrayMesa1[19].id) + '-' +
                                                 (docrodada.arrayMesa1[20].id)
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         {  docrodada.arrayMesa2.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande" >
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 2 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa2[0].id) + '-' +
                                 (docrodada.arrayMesa2[1].id) + '-' +
                                 (docrodada.arrayMesa2[2].id) + '-' +
                                 (docrodada.arrayMesa2[3].id) + '-'} 
                             {   docrodada.arrayMesa2.length == 5 ? 
                                 (docrodada.arrayMesa2[4].id)
                                  :
                                  docrodada.arrayMesa2.length == 6 ?
                                  (docrodada.arrayMesa2[4].id) + '-' +
                                  (docrodada.arrayMesa2[5].id)
                                   :
                                   docrodada.arrayMesa2.length == 7 ?
                                   (docrodada.arrayMesa2[4].id) + '-' +
                                   (docrodada.arrayMesa2[5].id) + '-' +
                                   (docrodada.arrayMesa2[6].id)
                                    :
                                    docrodada.arrayMesa2.length == 8 ?
                                    (docrodada.arrayMesa2[4].id) + '-' +
                                    (docrodada.arrayMesa2[5].id) + '-' +
                                    (docrodada.arrayMesa2[6].id) + '-' +
                                    (docrodada.arrayMesa2[7].id)
                                     : 
                                     docrodada.arrayMesa2.length == 9 ?
                                     (docrodada.arrayMesa2[4].id) + '-' +
                                     (docrodada.arrayMesa2[5].id) + '-' +
                                     (docrodada.arrayMesa2[6].id) + '-' +
                                     (docrodada.arrayMesa2[7].id) + '-' +
                                     (docrodada.arrayMesa2[8].id) 
                                      :
                                      docrodada.arrayMesa2.length == 10 ?
                                        (docrodada.arrayMesa2[4].id) + '-' +
                                        (docrodada.arrayMesa2[5].id) + '-' +
                                        (docrodada.arrayMesa2[6].id) + '-' +
                                        (docrodada.arrayMesa2[7].id) + '-' +
                                        (docrodada.arrayMesa2[8].id) + '-' +
                                        (docrodada.arrayMesa2[9].id)
                                            
                                         :
                                         docrodada.arrayMesa2.length == 11 ?
                                         (docrodada.arrayMesa2[4].id) + '-' +
                                         (docrodada.arrayMesa2[5].id) + '-' +
                                         (docrodada.arrayMesa2[6].id) + '-' +
                                         (docrodada.arrayMesa2[7].id) + '-' +
                                         (docrodada.arrayMesa2[8].id) + '-' +
                                         (docrodada.arrayMesa2[9].id) + '-' +
                                         (docrodada.arrayMesa2[10].id)
                                         :
                                         docrodada.arrayMesa2.length == 12 ?
                                         (docrodada.arrayMesa2[4].id) + '-' +
                                         (docrodada.arrayMesa2[5].id) + '-' +
                                         (docrodada.arrayMesa2[6].id) + '-' +
                                         (docrodada.arrayMesa2[7].id) + '-' +
                                         (docrodada.arrayMesa2[8].id) + '-' +
                                         (docrodada.arrayMesa2[9].id) + '-' +
                                         (docrodada.arrayMesa2[10].id) + '-' +
                                         (docrodada.arrayMesa2[11].id)
                                         :
                                         docrodada.arrayMesa2.length == 13 ?
                                         (docrodada.arrayMesa2[4].id) + '-' +
                                         (docrodada.arrayMesa2[5].id) + '-' +
                                         (docrodada.arrayMesa2[6].id) + '-' +
                                         (docrodada.arrayMesa2[7].id) + '-' +
                                         (docrodada.arrayMesa2[8].id) + '-' +
                                         (docrodada.arrayMesa2[9].id) + '-' +
                                         (docrodada.arrayMesa2[10].id) + '-' +
                                         (docrodada.arrayMesa2[11].id) + '-' +
                                         (docrodada.arrayMesa2[12].id) 
                                             :
                                             docrodada.arrayMesa2.length == 14 ?
                                             (docrodada.arrayMesa2[4].id) + '-' +
                                             (docrodada.arrayMesa2[5].id) + '-' +
                                             (docrodada.arrayMesa2[6].id) + '-' +
                                             (docrodada.arrayMesa2[7].id) + '-' +
                                             (docrodada.arrayMesa2[8].id) + '-' +
                                             (docrodada.arrayMesa2[9].id) + '-' +
                                             (docrodada.arrayMesa2[10].id) + '-' +
                                             (docrodada.arrayMesa2[11].id) + '-' +
                                             (docrodada.arrayMesa2[12].id) + '-' +
                                             (docrodada.arrayMesa2[13].id)
                                             :
                                             docrodada.arrayMesa2.length == 15 ?
                                             (docrodada.arrayMesa2[4].id) + '-' +
                                             (docrodada.arrayMesa2[5].id) + '-' +
                                             (docrodada.arrayMesa2[6].id) + '-' +
                                             (docrodada.arrayMesa2[7].id) + '-' +
                                             (docrodada.arrayMesa2[8].id) + '-' +
                                             (docrodada.arrayMesa2[9].id) + '-' +
                                             (docrodada.arrayMesa2[10].id) + '-' +
                                             (docrodada.arrayMesa2[11].id) + '-' +
                                             (docrodada.arrayMesa2[12].id) + '-' +
                                             (docrodada.arrayMesa2[13].id) + '-' +
                                             (docrodada.arrayMesa2[14].id)
                                             :
                                             docrodada.arrayMesa2.length == 16 ?
                                             (docrodada.arrayMesa2[4].id) + '-' +
                                             (docrodada.arrayMesa2[5].id) + '-' +
                                             (docrodada.arrayMesa2[6].id) + '-' +
                                             (docrodada.arrayMesa2[7].id) + '-' +
                                             (docrodada.arrayMesa2[8].id) + '-' +
                                             (docrodada.arrayMesa2[9].id) + '-' +
                                             (docrodada.arrayMesa2[10].id) + '-' +
                                             (docrodada.arrayMesa2[11].id) + '-' +
                                             (docrodada.arrayMesa2[12].id) + '-' +
                                             (docrodada.arrayMesa2[13].id) + '-' +
                                             (docrodada.arrayMesa2[14].id) + '-' +
                                             (docrodada.arrayMesa2[15].id) 
                                             :
                                             docrodada.arrayMesa2.length == 17 ?
                                             (docrodada.arrayMesa2[4].id) + '-' +
                                             (docrodada.arrayMesa2[5].id) + '-' +
                                             (docrodada.arrayMesa2[6].id) + '-' +
                                             (docrodada.arrayMesa2[7].id) + '-' +
                                             (docrodada.arrayMesa2[8].id) + '-' +
                                             (docrodada.arrayMesa2[9].id) + '-' +
                                             (docrodada.arrayMesa2[10].id) + '-' +
                                             (docrodada.arrayMesa2[11].id) + '-' +
                                             (docrodada.arrayMesa2[12].id) + '-' +
                                             (docrodada.arrayMesa2[13].id) + '-' +
                                             (docrodada.arrayMesa2[14].id) + '-' +
                                             (docrodada.arrayMesa2[15].id) + '-' +
                                             (docrodada.arrayMesa2[16].id)
                                                 :
                                                 docrodada.arrayMesa2.length == 18 ?
                                                 (docrodada.arrayMesa2[4].id) + '-' +
                                                 (docrodada.arrayMesa2[5].id) + '-' +
                                                 (docrodada.arrayMesa2[6].id) + '-' +
                                                 (docrodada.arrayMesa2[7].id) + '-' +
                                                 (docrodada.arrayMesa2[8].id) + '-' +
                                                 (docrodada.arrayMesa2[9].id) + '-' +
                                                 (docrodada.arrayMesa2[10].id) + '-' +
                                                 (docrodada.arrayMesa2[11].id) + '-' +
                                                 (docrodada.arrayMesa2[12].id) + '-' +
                                                 (docrodada.arrayMesa2[13].id) + '-' +
                                                 (docrodada.arrayMesa2[14].id) + '-' +
                                                 (docrodada.arrayMesa2[15].id) + '-' +
                                                 (docrodada.arrayMesa2[16].id) + '-' +
                                                 (docrodada.arrayMesa2[17].id)
                                                 :
                                                 docrodada.arrayMesa2.length == 19 ?
                                                 (docrodada.arrayMesa2[4].id) + '-' +
                                                 (docrodada.arrayMesa2[5].id) + '-' +
                                                 (docrodada.arrayMesa2[6].id) + '-' +
                                                 (docrodada.arrayMesa2[7].id) + '-' +
                                                 (docrodada.arrayMesa2[8].id) + '-' +
                                                 (docrodada.arrayMesa2[9].id) + '-' +
                                                 (docrodada.arrayMesa2[10].id) + '-' +
                                                 (docrodada.arrayMesa2[11].id) + '-' +
                                                 (docrodada.arrayMesa2[12].id) + '-' +
                                                 (docrodada.arrayMesa2[13].id) + '-' +
                                                 (docrodada.arrayMesa2[14].id) + '-' +
                                                 (docrodada.arrayMesa2[15].id) + '-' +
                                                 (docrodada.arrayMesa2[16].id) + '-' +
                                                 (docrodada.arrayMesa2[17].id) + '-' +
                                                 (docrodada.arrayMesa2[18].id) 
                                                 :
                                                 docrodada.arrayMesa2.length == 20 ?
                                                 (docrodada.arrayMesa2[4].id) + '-' +
                                                 (docrodada.arrayMesa2[5].id) + '-' +
                                                 (docrodada.arrayMesa2[6].id) + '-' +
                                                 (docrodada.arrayMesa2[7].id) + '-' +
                                                 (docrodada.arrayMesa2[8].id) + '-' +
                                                 (docrodada.arrayMesa2[9].id) + '-' +
                                                 (docrodada.arrayMesa2[10].id) + '-' +
                                                 (docrodada.arrayMesa2[11].id) + '-' +
                                                 (docrodada.arrayMesa2[12].id) + '-' +
                                                 (docrodada.arrayMesa2[13].id) + '-' +
                                                 (docrodada.arrayMesa2[14].id) + '-' +
                                                 (docrodada.arrayMesa2[15].id) + '-' +
                                                 (docrodada.arrayMesa2[16].id) + '-' +
                                                 (docrodada.arrayMesa2[17].id) + '-' +
                                                 (docrodada.arrayMesa2[18].id) + '-' +
                                                 (docrodada.arrayMesa2[19].id)
                                                 :
                                                 (docrodada.arrayMesa2[4].id) + '-' +
                                                 (docrodada.arrayMesa2[5].id) + '-' +
                                                 (docrodada.arrayMesa2[6].id) + '-' +
                                                 (docrodada.arrayMesa2[7].id) + '-' +
                                                 (docrodada.arrayMesa2[8].id) + '-' +
                                                 (docrodada.arrayMesa2[9].id) + '-' +
                                                 (docrodada.arrayMesa2[10].id) + '-' +
                                                 (docrodada.arrayMesa2[11].id) + '-' +
                                                 (docrodada.arrayMesa2[12].id) + '-' +
                                                 (docrodada.arrayMesa2[13].id) + '-' +
                                                 (docrodada.arrayMesa2[14].id) + '-' +
                                                 (docrodada.arrayMesa2[15].id) + '-' +
                                                 (docrodada.arrayMesa2[16].id) + '-' +
                                                 (docrodada.arrayMesa2[17].id) + '-' +
                                                 (docrodada.arrayMesa2[18].id) + '-' +
                                                 (docrodada.arrayMesa2[19].id) + '-' +
                                                 (docrodada.arrayMesa2[20].id)
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         { docrodada.arrayMesa3.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 3 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa3[0].id) + '-' +
                                 (docrodada.arrayMesa3[1].id) + '-' +
                                 (docrodada.arrayMesa3[2].id) + '-' +
                                 (docrodada.arrayMesa3[3].id) + '-'} 
                             {   docrodada.arrayMesa3.length == 5 ? 
                                 (docrodada.arrayMesa3[4].id)
                                  :
                                  docrodada.arrayMesa3.length == 6 ?
                                  (docrodada.arrayMesa3[4].id) + '-' +
                                  (docrodada.arrayMesa3[5].id)
                                   :
                                   docrodada.arrayMesa3.length == 7 ?
                                   (docrodada.arrayMesa3[4].id) + '-' +
                                   (docrodada.arrayMesa3[5].id) + '-' +
                                   (docrodada.arrayMesa3[6].id)
                                    :
                                    docrodada.arrayMesa3.length == 8 ?
                                    (docrodada.arrayMesa3[4].id) + '-' +
                                    (docrodada.arrayMesa3[5].id) + '-' +
                                    (docrodada.arrayMesa3[6].id) + '-' +
                                    (docrodada.arrayMesa3[7].id)
                                     : 
                                     docrodada.arrayMesa3.length == 9 ?
                                     (docrodada.arrayMesa3[4].id) + '-' +
                                     (docrodada.arrayMesa3[5].id) + '-' +
                                     (docrodada.arrayMesa3[6].id) + '-' +
                                     (docrodada.arrayMesa3[7].id) + '-' +
                                     (docrodada.arrayMesa3[8].id) 
                                      :
                                      docrodada.arrayMesa3.length == 10 ?
                                        (docrodada.arrayMesa3[4].id) + '-' +
                                        (docrodada.arrayMesa3[5].id) + '-' +
                                        (docrodada.arrayMesa3[6].id) + '-' +
                                        (docrodada.arrayMesa3[7].id) + '-' +
                                        (docrodada.arrayMesa3[8].id) + '-' +
                                        (docrodada.arrayMesa3[9].id)
                                            
                                         :
                                         docrodada.arrayMesa3.length == 11 ?
                                         (docrodada.arrayMesa3[4].id) + '-' +
                                         (docrodada.arrayMesa3[5].id) + '-' +
                                         (docrodada.arrayMesa3[6].id) + '-' +
                                         (docrodada.arrayMesa3[7].id) + '-' +
                                         (docrodada.arrayMesa3[8].id) + '-' +
                                         (docrodada.arrayMesa3[9].id) + '-' +
                                         (docrodada.arrayMesa3[10].id)
                                         :
                                         docrodada.arrayMesa3.length == 12 ?
                                         (docrodada.arrayMesa3[4].id) + '-' +
                                         (docrodada.arrayMesa3[5].id) + '-' +
                                         (docrodada.arrayMesa3[6].id) + '-' +
                                         (docrodada.arrayMesa3[7].id) + '-' +
                                         (docrodada.arrayMesa3[8].id) + '-' +
                                         (docrodada.arrayMesa3[9].id) + '-' +
                                         (docrodada.arrayMesa3[10].id) + '-' +
                                         (docrodada.arrayMesa3[11].id)
                                         :
                                         docrodada.arrayMesa3.length == 13 ?
                                         (docrodada.arrayMesa3[4].id) + '-' +
                                         (docrodada.arrayMesa3[5].id) + '-' +
                                         (docrodada.arrayMesa3[6].id) + '-' +
                                         (docrodada.arrayMesa3[7].id) + '-' +
                                         (docrodada.arrayMesa3[8].id) + '-' +
                                         (docrodada.arrayMesa3[9].id) + '-' +
                                         (docrodada.arrayMesa3[10].id) + '-' +
                                         (docrodada.arrayMesa3[11].id) + '-' +
                                         (docrodada.arrayMesa3[12].id) 
                                             :
                                             docrodada.arrayMesa3.length == 14 ?
                                             (docrodada.arrayMesa3[4].id) + '-' +
                                             (docrodada.arrayMesa3[5].id) + '-' +
                                             (docrodada.arrayMesa3[6].id) + '-' +
                                             (docrodada.arrayMesa3[7].id) + '-' +
                                             (docrodada.arrayMesa3[8].id) + '-' +
                                             (docrodada.arrayMesa3[9].id) + '-' +
                                             (docrodada.arrayMesa3[10].id) + '-' +
                                             (docrodada.arrayMesa3[11].id) + '-' +
                                             (docrodada.arrayMesa3[12].id) + '-' +
                                             (docrodada.arrayMesa3[13].id)
                                             :
                                             docrodada.arrayMesa3.length == 15 ?
                                             (docrodada.arrayMesa3[4].id) + '-' +
                                             (docrodada.arrayMesa3[5].id) + '-' +
                                             (docrodada.arrayMesa3[6].id) + '-' +
                                             (docrodada.arrayMesa3[7].id) + '-' +
                                             (docrodada.arrayMesa3[8].id) + '-' +
                                             (docrodada.arrayMesa3[9].id) + '-' +
                                             (docrodada.arrayMesa3[10].id) + '-' +
                                             (docrodada.arrayMesa3[11].id) + '-' +
                                             (docrodada.arrayMesa3[12].id) + '-' +
                                             (docrodada.arrayMesa3[13].id) + '-' +
                                             (docrodada.arrayMesa3[14].id)
                                             :
                                             docrodada.arrayMesa3.length == 16 ?
                                             (docrodada.arrayMesa3[4].id) + '-' +
                                             (docrodada.arrayMesa3[5].id) + '-' +
                                             (docrodada.arrayMesa3[6].id) + '-' +
                                             (docrodada.arrayMesa3[7].id) + '-' +
                                             (docrodada.arrayMesa3[8].id) + '-' +
                                             (docrodada.arrayMesa3[9].id) + '-' +
                                             (docrodada.arrayMesa3[10].id) + '-' +
                                             (docrodada.arrayMesa3[11].id) + '-' +
                                             (docrodada.arrayMesa3[12].id) + '-' +
                                             (docrodada.arrayMesa3[13].id) + '-' +
                                             (docrodada.arrayMesa3[14].id) + '-' +
                                             (docrodada.arrayMesa3[15].id) 
                                             :
                                             docrodada.arrayMesa3.length == 17 ?
                                             (docrodada.arrayMesa3[4].id) + '-' +
                                             (docrodada.arrayMesa3[5].id) + '-' +
                                             (docrodada.arrayMesa3[6].id) + '-' +
                                             (docrodada.arrayMesa3[7].id) + '-' +
                                             (docrodada.arrayMesa3[8].id) + '-' +
                                             (docrodada.arrayMesa3[9].id) + '-' +
                                             (docrodada.arrayMesa3[10].id) + '-' +
                                             (docrodada.arrayMesa3[11].id) + '-' +
                                             (docrodada.arrayMesa3[12].id) + '-' +
                                             (docrodada.arrayMesa3[13].id) + '-' +
                                             (docrodada.arrayMesa3[14].id) + '-' +
                                             (docrodada.arrayMesa3[15].id) + '-' +
                                             (docrodada.arrayMesa3[16].id)
                                                 :
                                                 docrodada.arrayMesa3.length == 18 ?
                                                 (docrodada.arrayMesa3[4].id) + '-' +
                                                 (docrodada.arrayMesa3[5].id) + '-' +
                                                 (docrodada.arrayMesa3[6].id) + '-' +
                                                 (docrodada.arrayMesa3[7].id) + '-' +
                                                 (docrodada.arrayMesa3[8].id) + '-' +
                                                 (docrodada.arrayMesa3[9].id) + '-' +
                                                 (docrodada.arrayMesa3[10].id) + '-' +
                                                 (docrodada.arrayMesa3[11].id) + '-' +
                                                 (docrodada.arrayMesa3[12].id) + '-' +
                                                 (docrodada.arrayMesa3[13].id) + '-' +
                                                 (docrodada.arrayMesa3[14].id) + '-' +
                                                 (docrodada.arrayMesa3[15].id) + '-' +
                                                 (docrodada.arrayMesa3[16].id) + '-' +
                                                 (docrodada.arrayMesa3[17].id)
                                                 :
                                                 docrodada.arrayMesa3.length == 19 ?
                                                 (docrodada.arrayMesa3[4].id) + '-' +
                                                 (docrodada.arrayMesa3[5].id) + '-' +
                                                 (docrodada.arrayMesa3[6].id) + '-' +
                                                 (docrodada.arrayMesa3[7].id) + '-' +
                                                 (docrodada.arrayMesa3[8].id) + '-' +
                                                 (docrodada.arrayMesa3[9].id) + '-' +
                                                 (docrodada.arrayMesa3[10].id) + '-' +
                                                 (docrodada.arrayMesa3[11].id) + '-' +
                                                 (docrodada.arrayMesa3[12].id) + '-' +
                                                 (docrodada.arrayMesa3[13].id) + '-' +
                                                 (docrodada.arrayMesa3[14].id) + '-' +
                                                 (docrodada.arrayMesa3[15].id) + '-' +
                                                 (docrodada.arrayMesa3[16].id) + '-' +
                                                 (docrodada.arrayMesa3[17].id) + '-' +
                                                 (docrodada.arrayMesa3[18].id) 
                                                 :
                                                 docrodada.arrayMesa3.length == 20 ?
                                                 (docrodada.arrayMesa3[4].id) + '-' +
                                                 (docrodada.arrayMesa3[5].id) + '-' +
                                                 (docrodada.arrayMesa3[6].id) + '-' +
                                                 (docrodada.arrayMesa3[7].id) + '-' +
                                                 (docrodada.arrayMesa3[8].id) + '-' +
                                                 (docrodada.arrayMesa3[9].id) + '-' +
                                                 (docrodada.arrayMesa3[10].id) + '-' +
                                                 (docrodada.arrayMesa3[11].id) + '-' +
                                                 (docrodada.arrayMesa3[12].id) + '-' +
                                                 (docrodada.arrayMesa3[13].id) + '-' +
                                                 (docrodada.arrayMesa3[14].id) + '-' +
                                                 (docrodada.arrayMesa3[15].id) + '-' +
                                                 (docrodada.arrayMesa3[16].id) + '-' +
                                                 (docrodada.arrayMesa3[17].id) + '-' +
                                                 (docrodada.arrayMesa3[18].id) + '-' +
                                                 (docrodada.arrayMesa3[19].id)
                                                 :
                                                 (docrodada.arrayMesa3[4].id) + '-' +
                                                 (docrodada.arrayMesa3[5].id) + '-' +
                                                 (docrodada.arrayMesa3[6].id) + '-' +
                                                 (docrodada.arrayMesa3[7].id) + '-' +
                                                 (docrodada.arrayMesa3[8].id) + '-' +
                                                 (docrodada.arrayMesa3[9].id) + '-' +
                                                 (docrodada.arrayMesa3[10].id) + '-' +
                                                 (docrodada.arrayMesa3[11].id) + '-' +
                                                 (docrodada.arrayMesa3[12].id) + '-' +
                                                 (docrodada.arrayMesa3[13].id) + '-' +
                                                 (docrodada.arrayMesa3[14].id) + '-' +
                                                 (docrodada.arrayMesa3[15].id) + '-' +
                                                 (docrodada.arrayMesa3[16].id) + '-' +
                                                 (docrodada.arrayMesa3[17].id) + '-' +
                                                 (docrodada.arrayMesa3[18].id) + '-' +
                                                 (docrodada.arrayMesa3[19].id) + '-' +
                                                 (docrodada.arrayMesa3[20].id)
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         { docrodada.arrayMesa4.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 4 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa4[0].id) + '-' +
                                 (docrodada.arrayMesa4[1].id) + '-' +
                                 (docrodada.arrayMesa4[2].id) + '-' +
                                 (docrodada.arrayMesa4[3].id) + '-'} 
                             {   docrodada.arrayMesa4.length == 5 ? 
                                 (docrodada.arrayMesa4[4].id)
                                  :
                                  docrodada.arrayMesa4.length == 6 ?
                                  (docrodada.arrayMesa4[4].id) + '-' +
                                  (docrodada.arrayMesa4[5].id)
                                   :
                                   docrodada.arrayMesa4.length == 7 ?
                                   (docrodada.arrayMesa4[4].id) + '-' +
                                   (docrodada.arrayMesa4[5].id) + '-' +
                                   (docrodada.arrayMesa4[6].id)
                                    :
                                    docrodada.arrayMesa4.length == 8 ?
                                    (docrodada.arrayMesa4[4].id) + '-' +
                                    (docrodada.arrayMesa4[5].id) + '-' +
                                    (docrodada.arrayMesa4[6].id) + '-' +
                                    (docrodada.arrayMesa4[7].id)
                                     : 
                                     docrodada.arrayMesa4.length == 9 ?
                                     (docrodada.arrayMesa4[4].id) + '-' +
                                     (docrodada.arrayMesa4[5].id) + '-' +
                                     (docrodada.arrayMesa4[6].id) + '-' +
                                     (docrodada.arrayMesa4[7].id) + '-' +
                                     (docrodada.arrayMesa4[8].id) 
                                      :
                                      docrodada.arrayMesa4.length == 10 ?
                                        (docrodada.arrayMesa4[4].id) + '-' +
                                        (docrodada.arrayMesa4[5].id) + '-' +
                                        (docrodada.arrayMesa4[6].id) + '-' +
                                        (docrodada.arrayMesa4[7].id) + '-' +
                                        (docrodada.arrayMesa4[8].id) + '-' +
                                        (docrodada.arrayMesa4[9].id)
                                            
                                         :
                                         docrodada.arrayMesa4.length == 11 ?
                                         (docrodada.arrayMesa4[4].id) + '-' +
                                         (docrodada.arrayMesa4[5].id) + '-' +
                                         (docrodada.arrayMesa4[6].id) + '-' +
                                         (docrodada.arrayMesa4[7].id) + '-' +
                                         (docrodada.arrayMesa4[8].id) + '-' +
                                         (docrodada.arrayMesa4[9].id) + '-' +
                                         (docrodada.arrayMesa4[10].id)
                                         :
                                         docrodada.arrayMesa4.length == 12 ?
                                         (docrodada.arrayMesa4[4].id) + '-' +
                                         (docrodada.arrayMesa4[5].id) + '-' +
                                         (docrodada.arrayMesa4[6].id) + '-' +
                                         (docrodada.arrayMesa4[7].id) + '-' +
                                         (docrodada.arrayMesa4[8].id) + '-' +
                                         (docrodada.arrayMesa4[9].id) + '-' +
                                         (docrodada.arrayMesa4[10].id) + '-' +
                                         (docrodada.arrayMesa4[11].id)
                                         :
                                         docrodada.arrayMesa4.length == 13 ?
                                         (docrodada.arrayMesa4[4].id) + '-' +
                                         (docrodada.arrayMesa4[5].id) + '-' +
                                         (docrodada.arrayMesa4[6].id) + '-' +
                                         (docrodada.arrayMesa4[7].id) + '-' +
                                         (docrodada.arrayMesa4[8].id) + '-' +
                                         (docrodada.arrayMesa4[9].id) + '-' +
                                         (docrodada.arrayMesa4[10].id) + '-' +
                                         (docrodada.arrayMesa4[11].id) + '-' +
                                         (docrodada.arrayMesa4[12].id) 
                                             :
                                             docrodada.arrayMesa4.length == 14 ?
                                             (docrodada.arrayMesa4[4].id) + '-' +
                                             (docrodada.arrayMesa4[5].id) + '-' +
                                             (docrodada.arrayMesa4[6].id) + '-' +
                                             (docrodada.arrayMesa4[7].id) + '-' +
                                             (docrodada.arrayMesa4[8].id) + '-' +
                                             (docrodada.arrayMesa4[9].id) + '-' +
                                             (docrodada.arrayMesa4[10].id) + '-' +
                                             (docrodada.arrayMesa4[11].id) + '-' +
                                             (docrodada.arrayMesa4[12].id) + '-' +
                                             (docrodada.arrayMesa4[13].id)
                                             :
                                             docrodada.arrayMesa4.length == 15 ?
                                             (docrodada.arrayMesa4[4].id) + '-' +
                                             (docrodada.arrayMesa4[5].id) + '-' +
                                             (docrodada.arrayMesa4[6].id) + '-' +
                                             (docrodada.arrayMesa4[7].id) + '-' +
                                             (docrodada.arrayMesa4[8].id) + '-' +
                                             (docrodada.arrayMesa4[9].id) + '-' +
                                             (docrodada.arrayMesa4[10].id) + '-' +
                                             (docrodada.arrayMesa4[11].id) + '-' +
                                             (docrodada.arrayMesa4[12].id) + '-' +
                                             (docrodada.arrayMesa4[13].id) + '-' +
                                             (docrodada.arrayMesa4[14].id)
                                             :
                                             docrodada.arrayMesa4.length == 16 ?
                                             (docrodada.arrayMesa4[4].id) + '-' +
                                             (docrodada.arrayMesa4[5].id) + '-' +
                                             (docrodada.arrayMesa4[6].id) + '-' +
                                             (docrodada.arrayMesa4[7].id) + '-' +
                                             (docrodada.arrayMesa4[8].id) + '-' +
                                             (docrodada.arrayMesa4[9].id) + '-' +
                                             (docrodada.arrayMesa4[10].id) + '-' +
                                             (docrodada.arrayMesa4[11].id) + '-' +
                                             (docrodada.arrayMesa4[12].id) + '-' +
                                             (docrodada.arrayMesa4[13].id) + '-' +
                                             (docrodada.arrayMesa4[14].id) + '-' +
                                             (docrodada.arrayMesa4[15].id) 
                                             :
                                             docrodada.arrayMesa4.length == 17 ?
                                             (docrodada.arrayMesa4[4].id) + '-' +
                                             (docrodada.arrayMesa4[5].id) + '-' +
                                             (docrodada.arrayMesa4[6].id) + '-' +
                                             (docrodada.arrayMesa4[7].id) + '-' +
                                             (docrodada.arrayMesa4[8].id) + '-' +
                                             (docrodada.arrayMesa4[9].id) + '-' +
                                             (docrodada.arrayMesa4[10].id) + '-' +
                                             (docrodada.arrayMesa4[11].id) + '-' +
                                             (docrodada.arrayMesa4[12].id) + '-' +
                                             (docrodada.arrayMesa4[13].id) + '-' +
                                             (docrodada.arrayMesa4[14].id) + '-' +
                                             (docrodada.arrayMesa4[15].id) + '-' +
                                             (docrodada.arrayMesa4[16].id)
                                                 :
                                                 docrodada.arrayMesa4.length == 18 ?
                                                 (docrodada.arrayMesa4[4].id) + '-' +
                                                 (docrodada.arrayMesa4[5].id) + '-' +
                                                 (docrodada.arrayMesa4[6].id) + '-' +
                                                 (docrodada.arrayMesa4[7].id) + '-' +
                                                 (docrodada.arrayMesa4[8].id) + '-' +
                                                 (docrodada.arrayMesa4[9].id) + '-' +
                                                 (docrodada.arrayMesa4[10].id) + '-' +
                                                 (docrodada.arrayMesa4[11].id) + '-' +
                                                 (docrodada.arrayMesa4[12].id) + '-' +
                                                 (docrodada.arrayMesa4[13].id) + '-' +
                                                 (docrodada.arrayMesa4[14].id) + '-' +
                                                 (docrodada.arrayMesa4[15].id) + '-' +
                                                 (docrodada.arrayMesa4[16].id) + '-' +
                                                 (docrodada.arrayMesa4[17].id)
                                                 :
                                                 docrodada.arrayMesa4.length == 19 ?
                                                 (docrodada.arrayMesa4[4].id) + '-' +
                                                 (docrodada.arrayMesa4[5].id) + '-' +
                                                 (docrodada.arrayMesa4[6].id) + '-' +
                                                 (docrodada.arrayMesa4[7].id) + '-' +
                                                 (docrodada.arrayMesa4[8].id) + '-' +
                                                 (docrodada.arrayMesa4[9].id) + '-' +
                                                 (docrodada.arrayMesa4[10].id) + '-' +
                                                 (docrodada.arrayMesa4[11].id) + '-' +
                                                 (docrodada.arrayMesa4[12].id) + '-' +
                                                 (docrodada.arrayMesa4[13].id) + '-' +
                                                 (docrodada.arrayMesa4[14].id) + '-' +
                                                 (docrodada.arrayMesa4[15].id) + '-' +
                                                 (docrodada.arrayMesa4[16].id) + '-' +
                                                 (docrodada.arrayMesa4[17].id) + '-' +
                                                 (docrodada.arrayMesa4[18].id) 
                                                 :
                                                 docrodada.arrayMesa4.length == 20 ?
                                                 (docrodada.arrayMesa4[4].id) + '-' +
                                                 (docrodada.arrayMesa4[5].id) + '-' +
                                                 (docrodada.arrayMesa4[6].id) + '-' +
                                                 (docrodada.arrayMesa4[7].id) + '-' +
                                                 (docrodada.arrayMesa4[8].id) + '-' +
                                                 (docrodada.arrayMesa4[9].id) + '-' +
                                                 (docrodada.arrayMesa4[10].id) + '-' +
                                                 (docrodada.arrayMesa4[11].id) + '-' +
                                                 (docrodada.arrayMesa4[12].id) + '-' +
                                                 (docrodada.arrayMesa4[13].id) + '-' +
                                                 (docrodada.arrayMesa4[14].id) + '-' +
                                                 (docrodada.arrayMesa4[15].id) + '-' +
                                                 (docrodada.arrayMesa4[16].id) + '-' +
                                                 (docrodada.arrayMesa4[17].id) + '-' +
                                                 (docrodada.arrayMesa4[18].id) + '-' +
                                                 (docrodada.arrayMesa4[19].id)
                                                 :
                                                 (docrodada.arrayMesa4[4].id) + '-' +
                                                 (docrodada.arrayMesa4[5].id) + '-' +
                                                 (docrodada.arrayMesa4[6].id) + '-' +
                                                 (docrodada.arrayMesa4[7].id) + '-' +
                                                 (docrodada.arrayMesa4[8].id) + '-' +
                                                 (docrodada.arrayMesa4[9].id) + '-' +
                                                 (docrodada.arrayMesa4[10].id) + '-' +
                                                 (docrodada.arrayMesa4[11].id) + '-' +
                                                 (docrodada.arrayMesa4[12].id) + '-' +
                                                 (docrodada.arrayMesa4[13].id) + '-' +
                                                 (docrodada.arrayMesa4[14].id) + '-' +
                                                 (docrodada.arrayMesa4[15].id) + '-' +
                                                 (docrodada.arrayMesa4[16].id) + '-' +
                                                 (docrodada.arrayMesa4[17].id) + '-' +
                                                 (docrodada.arrayMesa4[18].id) + '-' +
                                                 (docrodada.arrayMesa4[19].id) + '-' +
                                                 (docrodada.arrayMesa4[20].id)
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         {docrodada.arrayMesa5.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 5 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa5[0].id) + '-' +
                                 (docrodada.arrayMesa5[1].id) + '-' +
                                 (docrodada.arrayMesa5[2].id) + '-' +
                                 (docrodada.arrayMesa5[3].id) + '-' } 
                             {   docrodada.arrayMesa5.length == 5 ? 
                                 (docrodada.arrayMesa5[4].id)
                                  :
                                  docrodada.arrayMesa5.length == 6 ?
                                  (docrodada.arrayMesa5[4].id) + '-' +
                                  (docrodada.arrayMesa5[5].id)
                                   :
                                   docrodada.arrayMesa5.length == 7 ?
                                   (docrodada.arrayMesa5[4].id) + '-' +
                                   (docrodada.arrayMesa5[5].id) + '-' +
                                   (docrodada.arrayMesa5[6].id)
                                    :
                                    docrodada.arrayMesa5.length == 8 ?
                                    (docrodada.arrayMesa5[4].id) + '-' +
                                    (docrodada.arrayMesa5[5].id) + '-' +
                                    (docrodada.arrayMesa5[6].id) + '-' +
                                    (docrodada.arrayMesa5[7].id)
                                     : 
                                     docrodada.arrayMesa5.length == 9 ?
                                     (docrodada.arrayMesa5[4].id) + '-' +
                                     (docrodada.arrayMesa5[5].id) + '-' +
                                     (docrodada.arrayMesa5[6].id) + '-' +
                                     (docrodada.arrayMesa5[7].id) + '-' +
                                     (docrodada.arrayMesa5[8].id) 
                                      :
                                      docrodada.arrayMesa5.length == 10 ?
                                        (docrodada.arrayMesa5[4].id) + '-' +
                                        (docrodada.arrayMesa5[5].id) + '-' +
                                        (docrodada.arrayMesa5[6].id) + '-' +
                                        (docrodada.arrayMesa5[7].id) + '-' +
                                        (docrodada.arrayMesa5[8].id) + '-' +
                                        (docrodada.arrayMesa5[9].id)
                                            
                                         :
                                         docrodada.arrayMesa5.length == 11 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa5[10].id)
                                         :
                                         docrodada.arrayMesa5.length == 12 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa5[11].id)
                                         :
                                         docrodada.arrayMesa5.length == 13 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa5[12].id) 
                                             :
                                             docrodada.arrayMesa5.length == 14 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa5[12].id) + '-' +
                                             (docrodada.arrayMesa5[13].id)
                                             :
                                             docrodada.arrayMesa5.length == 15 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa5[12].id) + '-' +
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa5[14].id)
                                             :
                                             docrodada.arrayMesa5.length == 16 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa5[12].id) + '-' +
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa5[15].id) 
                                             :
                                             docrodada.arrayMesa5.length == 17 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa5[12].id) + '-' +
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa5[15].id) + '-' +
                                             (docrodada.arrayMesa5[16].id)
                                                 :
                                                 docrodada.arrayMesa5.length == 18 ?
                                                 (docrodada.arrayMesa5[4].id) + '-' +
                                                 (docrodada.arrayMesa5[5].id) + '-' +
                                                 (docrodada.arrayMesa5[6].id) + '-' +
                                                 (docrodada.arrayMesa5[7].id) + '-' +
                                                 (docrodada.arrayMesa5[8].id) + '-' +
                                                 (docrodada.arrayMesa5[9].id) + '-' +
                                                 (docrodada.arrayMesa5[10].id) + '-' +
                                                 (docrodada.arrayMesa5[11].id) + '-' +
                                                 (docrodada.arrayMesa5[12].id) + '-' +
                                                 (docrodada.arrayMesa5[13].id) + '-' +
                                                 (docrodada.arrayMesa5[14].id) + '-' +
                                                 (docrodada.arrayMesa5[15].id) + '-' +
                                                 (docrodada.arrayMesa5[16].id) + '-' +
                                                 (docrodada.arrayMesa5[17].id)
                                                 :
                                                 docrodada.arrayMesa5.length == 19 ?
                                                 (docrodada.arrayMesa5[4].id) + '-' +
                                                 (docrodada.arrayMesa5[5].id) + '-' +
                                                 (docrodada.arrayMesa5[6].id) + '-' +
                                                 (docrodada.arrayMesa5[7].id) + '-' +
                                                 (docrodada.arrayMesa5[8].id) + '-' +
                                                 (docrodada.arrayMesa5[9].id) + '-' +
                                                 (docrodada.arrayMesa5[10].id) + '-' +
                                                 (docrodada.arrayMesa5[11].id) + '-' +
                                                 (docrodada.arrayMesa5[12].id) + '-' +
                                                 (docrodada.arrayMesa5[13].id) + '-' +
                                                 (docrodada.arrayMesa5[14].id) + '-' +
                                                 (docrodada.arrayMesa5[15].id) + '-' +
                                                 (docrodada.arrayMesa5[16].id) + '-' +
                                                 (docrodada.arrayMesa5[17].id) + '-' +
                                                 (docrodada.arrayMesa5[18].id) 
                                                 :
                                                 docrodada.arrayMesa5.length == 20 ?
                                                 (docrodada.arrayMesa5[4].id) + '-' +
                                                 (docrodada.arrayMesa5[5].id) + '-' +
                                                 (docrodada.arrayMesa5[6].id) + '-' +
                                                 (docrodada.arrayMesa5[7].id) + '-' +
                                                 (docrodada.arrayMesa5[8].id) + '-' +
                                                 (docrodada.arrayMesa5[9].id) + '-' +
                                                 (docrodada.arrayMesa5[10].id) + '-' +
                                                 (docrodada.arrayMesa5[11].id) + '-' +
                                                 (docrodada.arrayMesa5[12].id) + '-' +
                                                 (docrodada.arrayMesa5[13].id) + '-' +
                                                 (docrodada.arrayMesa5[14].id) + '-' +
                                                 (docrodada.arrayMesa5[15].id) + '-' +
                                                 (docrodada.arrayMesa5[16].id) + '-' +
                                                 (docrodada.arrayMesa5[17].id) + '-' +
                                                 (docrodada.arrayMesa5[18].id) + '-' +
                                                 (docrodada.arrayMesa5[19].id)
                                                 :
                                                <span/>
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         {docrodada.arrayMesa6.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 6 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa6[0].id) + '-' +
                                 (docrodada.arrayMesa6[1].id) + '-' +
                                 (docrodada.arrayMesa6[2].id) + '-'
                            }
                             {   
                             docrodada.arrayMesa6.length == 4 ? 
                             (docrodada.arrayMesa6[3].id)
                              :
                                docrodada.arrayMesa6.length == 5 ? 
                                 (docrodada.arrayMesa6[3].id) + '-' +
                                 (docrodada.arrayMesa6[4].id)
                                  :
                                  docrodada.arrayMesa6.length == 6 ?
                                  (docrodada.arrayMesa6[3].id) + '-' +
                                  (docrodada.arrayMesa6[4].id) + '-' +
                                  (docrodada.arrayMesa6[5].id)
                                   :
                                   docrodada.arrayMesa6.length == 7 ?
                                   (docrodada.arrayMesa6[3].id) + '-' +
                                   (docrodada.arrayMesa6[4].id) + '-' +
                                   (docrodada.arrayMesa6[5].id) + '-' +
                                   (docrodada.arrayMesa6[6].id)
                                    :
                                    docrodada.arrayMesa6.length == 8 ?
                                    (docrodada.arrayMesa6[3].id) + '-' +
                                    (docrodada.arrayMesa6[4].id) + '-' +
                                    (docrodada.arrayMesa6[5].id) + '-' +
                                    (docrodada.arrayMesa6[6].id) + '-' +
                                    (docrodada.arrayMesa6[7].id)
                                     : 
                                     docrodada.arrayMesa6.length == 9 ?
                                     (docrodada.arrayMesa6[3].id) + '-' +
                                     (docrodada.arrayMesa6[4].id) + '-' +
                                     (docrodada.arrayMesa6[5].id) + '-' +
                                     (docrodada.arrayMesa6[6].id) + '-' +
                                     (docrodada.arrayMesa6[7].id) + '-' +
                                     (docrodada.arrayMesa6[8].id) 
                                      :
                                      docrodada.arrayMesa6.length == 10 ?
                                      (docrodada.arrayMesa6[3].id) + '-' +
                                        (docrodada.arrayMesa6[4].id) + '-' +
                                        (docrodada.arrayMesa6[5].id) + '-' +
                                        (docrodada.arrayMesa6[6].id) + '-' +
                                        (docrodada.arrayMesa6[7].id) + '-' +
                                        (docrodada.arrayMesa6[8].id) + '-' +
                                        (docrodada.arrayMesa6[9].id)
                                            
                                         :
                                         docrodada.arrayMesa6.length == 11 ?
                                         (docrodada.arrayMesa6[3].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa6[10].id)
                                         :
                                         docrodada.arrayMesa6.length == 12 ?
                                         (docrodada.arrayMesa6[3].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa6[11].id)
                                         :
                                         docrodada.arrayMesa6.length == 13 ?
                                         (docrodada.arrayMesa6[3].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa6[12].id) 
                                             :
                                             docrodada.arrayMesa6.length == 14 ?
                                             (docrodada.arrayMesa6[3].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa6[12].id) + '-' +
                                             (docrodada.arrayMesa6[13].id)
                                             :
                                             docrodada.arrayMesa6.length == 15 ?
                                             (docrodada.arrayMesa6[3].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa6[12].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa6[14].id)
                                             :
                                             docrodada.arrayMesa6.length == 16 ?
                                             (docrodada.arrayMesa6[3].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa6[12].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa6[15].id) 
                                             :
                                             docrodada.arrayMesa6.length == 17 ?
                                             (docrodada.arrayMesa6[3].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa6[12].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa6[15].id) + '-' +
                                             (docrodada.arrayMesa6[16].id)
                                                 :
                                                 docrodada.arrayMesa6.length == 18 ?
                                                 (docrodada.arrayMesa6[3].id) + '-' +
                                                 (docrodada.arrayMesa6[4].id) + '-' +
                                                 (docrodada.arrayMesa6[5].id) + '-' +
                                                 (docrodada.arrayMesa6[6].id) + '-' +
                                                 (docrodada.arrayMesa6[7].id) + '-' +
                                                 (docrodada.arrayMesa6[8].id) + '-' +
                                                 (docrodada.arrayMesa6[9].id) + '-' +
                                                 (docrodada.arrayMesa6[10].id) + '-' +
                                                 (docrodada.arrayMesa6[11].id) + '-' +
                                                 (docrodada.arrayMesa6[12].id) + '-' +
                                                 (docrodada.arrayMesa6[13].id) + '-' +
                                                 (docrodada.arrayMesa6[14].id) + '-' +
                                                 (docrodada.arrayMesa6[15].id) + '-' +
                                                 (docrodada.arrayMesa6[16].id) + '-' +
                                                 (docrodada.arrayMesa6[17].id)
                                                 :
                                                 docrodada.arrayMesa6.length == 19 ?
                                                 (docrodada.arrayMesa6[3].id) + '-' +
                                                 (docrodada.arrayMesa6[4].id) + '-' +
                                                 (docrodada.arrayMesa6[5].id) + '-' +
                                                 (docrodada.arrayMesa6[6].id) + '-' +
                                                 (docrodada.arrayMesa6[7].id) + '-' +
                                                 (docrodada.arrayMesa6[8].id) + '-' +
                                                 (docrodada.arrayMesa6[9].id) + '-' +
                                                 (docrodada.arrayMesa6[10].id) + '-' +
                                                 (docrodada.arrayMesa6[11].id) + '-' +
                                                 (docrodada.arrayMesa6[12].id) + '-' +
                                                 (docrodada.arrayMesa6[13].id) + '-' +
                                                 (docrodada.arrayMesa6[14].id) + '-' +
                                                 (docrodada.arrayMesa6[15].id) + '-' +
                                                 (docrodada.arrayMesa6[16].id) + '-' +
                                                 (docrodada.arrayMesa6[17].id) + '-' +
                                                 (docrodada.arrayMesa6[18].id) 
                                                 :
                                                 docrodada.arrayMesa6.length == 20 ?
                                                 (docrodada.arrayMesa6[3].id) + '-' +
                                                 (docrodada.arrayMesa6[4].id) + '-' +
                                                 (docrodada.arrayMesa6[5].id) + '-' +
                                                 (docrodada.arrayMesa6[6].id) + '-' +
                                                 (docrodada.arrayMesa6[7].id) + '-' +
                                                 (docrodada.arrayMesa6[8].id) + '-' +
                                                 (docrodada.arrayMesa6[9].id) + '-' +
                                                 (docrodada.arrayMesa6[10].id) + '-' +
                                                 (docrodada.arrayMesa6[11].id) + '-' +
                                                 (docrodada.arrayMesa6[12].id) + '-' +
                                                 (docrodada.arrayMesa6[13].id) + '-' +
                                                 (docrodada.arrayMesa6[14].id) + '-' +
                                                 (docrodada.arrayMesa6[15].id) + '-' +
                                                 (docrodada.arrayMesa6[16].id) + '-' +
                                                 (docrodada.arrayMesa6[17].id) + '-' +
                                                 (docrodada.arrayMesa6[18].id) + '-' +
                                                 (docrodada.arrayMesa6[19].id)
                                                 :
                                                <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                        { docrodada.arrayMesa7.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 7 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa7[0].id) + '-' +
                                 (docrodada.arrayMesa7[1].id) + '-' +
                                 (docrodada.arrayMesa7[2].id) + '-'} 
                             {   docrodada.arrayMesa7.length === 4 ?
                               (docrodada.arrayMesa7[3].id) + '-' 
                                :
                                docrodada.arrayMesa7.length == 5 ? 
                                 (docrodada.arrayMesa7[4].id)
                                  :
                                  docrodada.arrayMesa7.length == 6 ?
                                  (docrodada.arrayMesa7[4].id) + '-' +
                                  (docrodada.arrayMesa7[5].id)
                                   :
                                   docrodada.arrayMesa7.length == 7 ?
                                   (docrodada.arrayMesa7[4].id) + '-' +
                                   (docrodada.arrayMesa7[5].id) + '-' +
                                   (docrodada.arrayMesa7[6].id)
                                    :
                                    docrodada.arrayMesa7.length == 8 ?
                                    (docrodada.arrayMesa7[4].id) + '-' +
                                    (docrodada.arrayMesa7[5].id) + '-' +
                                    (docrodada.arrayMesa7[6].id) + '-' +
                                    (docrodada.arrayMesa7[7].id)
                                     : 
                                     docrodada.arrayMesa7.length == 9 ?
                                     (docrodada.arrayMesa7[4].id) + '-' +
                                     (docrodada.arrayMesa7[5].id) + '-' +
                                     (docrodada.arrayMesa7[6].id) + '-' +
                                     (docrodada.arrayMesa7[7].id) + '-' +
                                     (docrodada.arrayMesa7[8].id) 
                                      :
                                      docrodada.arrayMesa7.length == 10 ?
                                        (docrodada.arrayMesa7[4].id) + '-' +
                                        (docrodada.arrayMesa7[5].id) + '-' +
                                        (docrodada.arrayMesa7[6].id) + '-' +
                                        (docrodada.arrayMesa7[7].id) + '-' +
                                        (docrodada.arrayMesa7[8].id) + '-' +
                                        (docrodada.arrayMesa7[9].id)
                                            
                                         :
                                         docrodada.arrayMesa7.length == 11 ?
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa7[10].id)
                                         :
                                         docrodada.arrayMesa7.length == 12 ?
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa7[11].id)
                                         :
                                         docrodada.arrayMesa7.length == 13 ?
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa7[12].id) 
                                             :
                                             docrodada.arrayMesa7.length == 14 ?
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa7[12].id) + '-' +
                                             (docrodada.arrayMesa7[13].id)
                                             :
                                             docrodada.arrayMesa7.length == 15 ?
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa7[12].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa7[14].id)
                                             :
                                             docrodada.arrayMesa7.length == 16 ?
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa7[12].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa7[15].id) 
                                             :
                                             docrodada.arrayMesa7.length == 17 ?
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa7[12].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa7[15].id) + '-' +
                                             (docrodada.arrayMesa7[16].id)
                                                 :
                                                 docrodada.arrayMesa7.length == 18 ?
                                                 (docrodada.arrayMesa7[4].id) + '-' +
                                                 (docrodada.arrayMesa7[5].id) + '-' +
                                                 (docrodada.arrayMesa7[6].id) + '-' +
                                                 (docrodada.arrayMesa7[7].id) + '-' +
                                                 (docrodada.arrayMesa7[8].id) + '-' +
                                                 (docrodada.arrayMesa7[9].id) + '-' +
                                                 (docrodada.arrayMesa7[10].id) + '-' +
                                                 (docrodada.arrayMesa7[11].id) + '-' +
                                                 (docrodada.arrayMesa7[12].id) + '-' +
                                                 (docrodada.arrayMesa7[13].id) + '-' +
                                                 (docrodada.arrayMesa7[14].id) + '-' +
                                                 (docrodada.arrayMesa7[15].id) + '-' +
                                                 (docrodada.arrayMesa7[16].id) + '-' +
                                                 (docrodada.arrayMesa7[17].id)
                                                 :
                                                 docrodada.arrayMesa7.length == 19 ?
                                                 (docrodada.arrayMesa7[4].id) + '-' +
                                                 (docrodada.arrayMesa7[5].id) + '-' +
                                                 (docrodada.arrayMesa7[6].id) + '-' +
                                                 (docrodada.arrayMesa7[7].id) + '-' +
                                                 (docrodada.arrayMesa7[8].id) + '-' +
                                                 (docrodada.arrayMesa7[9].id) + '-' +
                                                 (docrodada.arrayMesa7[10].id) + '-' +
                                                 (docrodada.arrayMesa7[11].id) + '-' +
                                                 (docrodada.arrayMesa7[12].id) + '-' +
                                                 (docrodada.arrayMesa7[13].id) + '-' +
                                                 (docrodada.arrayMesa7[14].id) + '-' +
                                                 (docrodada.arrayMesa7[15].id) + '-' +
                                                 (docrodada.arrayMesa7[16].id) + '-' +
                                                 (docrodada.arrayMesa7[17].id) + '-' +
                                                 (docrodada.arrayMesa7[18].id) 
                                                 :
                                                 docrodada.arrayMesa7.length == 20 ?
                                                 (docrodada.arrayMesa7[4].id) + '-' +
                                                 (docrodada.arrayMesa7[5].id) + '-' +
                                                 (docrodada.arrayMesa7[6].id) + '-' +
                                                 (docrodada.arrayMesa7[7].id) + '-' +
                                                 (docrodada.arrayMesa7[8].id) + '-' +
                                                 (docrodada.arrayMesa7[9].id) + '-' +
                                                 (docrodada.arrayMesa7[10].id) + '-' +
                                                 (docrodada.arrayMesa7[11].id) + '-' +
                                                 (docrodada.arrayMesa7[12].id) + '-' +
                                                 (docrodada.arrayMesa7[13].id) + '-' +
                                                 (docrodada.arrayMesa7[14].id) + '-' +
                                                 (docrodada.arrayMesa7[15].id) + '-' +
                                                 (docrodada.arrayMesa7[16].id) + '-' +
                                                 (docrodada.arrayMesa7[17].id) + '-' +
                                                 (docrodada.arrayMesa7[18].id) + '-' +
                                                 (docrodada.arrayMesa7[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        
                        { docrodada.arrayMesa8.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                            
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 8 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa8[0].id) + '-' +
                                 (docrodada.arrayMesa8[1].id) + '-' +
                                 (docrodada.arrayMesa8[2].id) + '-'} 
                             {   docrodada.arrayMesa8.length == 4 ?
                               (docrodada.arrayMesa8[3].id) + '-' 
                                :
                                docrodada.arrayMesa8.length == 5 ? 
                                 (docrodada.arrayMesa8[4].id)
                                  :
                                  docrodada.arrayMesa8.length == 6 ?
                                  (docrodada.arrayMesa8[4].id) + '-' +
                                  (docrodada.arrayMesa8[5].id)
                                   :
                                   docrodada.arrayMesa8.length == 7 ?
                                   (docrodada.arrayMesa8[4].id) + '-' +
                                   (docrodada.arrayMesa8[5].id) + '-' +
                                   (docrodada.arrayMesa8[6].id)
                                    :
                                    docrodada.arrayMesa8.length == 8 ?
                                    (docrodada.arrayMesa8[4].id) + '-' +
                                    (docrodada.arrayMesa8[5].id) + '-' +
                                    (docrodada.arrayMesa8[6].id) + '-' +
                                    (docrodada.arrayMesa8[7].id)
                                     : 
                                     docrodada.arrayMesa8.length == 9 ?
                                     (docrodada.arrayMesa8[4].id) + '-' +
                                     (docrodada.arrayMesa8[5].id) + '-' +
                                     (docrodada.arrayMesa8[6].id) + '-' +
                                     (docrodada.arrayMesa8[7].id) + '-' +
                                     (docrodada.arrayMesa8[8].id) 
                                      :
                                      docrodada.arrayMesa8.length == 10 ?
                                        (docrodada.arrayMesa8[4].id) + '-' +
                                        (docrodada.arrayMesa8[5].id) + '-' +
                                        (docrodada.arrayMesa8[6].id) + '-' +
                                        (docrodada.arrayMesa8[7].id) + '-' +
                                        (docrodada.arrayMesa8[8].id) + '-' +
                                        (docrodada.arrayMesa8[9].id)
                                            
                                         :
                                         docrodada.arrayMesa8.length == 11 ?
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa8[10].id)
                                         :
                                         docrodada.arrayMesa8.length == 12 ?
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa8[11].id)
                                         :
                                         docrodada.arrayMesa8.length == 13 ?
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa8[12].id) 
                                             :
                                             docrodada.arrayMesa8.length == 14 ?
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa8[12].id) + '-' +
                                             (docrodada.arrayMesa8[13].id)
                                             :
                                             docrodada.arrayMesa8.length == 15 ?
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa8[12].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa8[14].id)
                                             :
                                             docrodada.arrayMesa8.length == 16 ?
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa8[12].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa8[15].id) 
                                             :
                                             docrodada.arrayMesa8.length == 17 ?
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa8[12].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa8[15].id) + '-' +
                                             (docrodada.arrayMesa8[16].id)
                                                 :
                                                 docrodada.arrayMesa8.length == 18 ?
                                                 (docrodada.arrayMesa8[4].id) + '-' +
                                                 (docrodada.arrayMesa8[5].id) + '-' +
                                                 (docrodada.arrayMesa8[6].id) + '-' +
                                                 (docrodada.arrayMesa8[7].id) + '-' +
                                                 (docrodada.arrayMesa8[8].id) + '-' +
                                                 (docrodada.arrayMesa8[9].id) + '-' +
                                                 (docrodada.arrayMesa8[10].id) + '-' +
                                                 (docrodada.arrayMesa8[11].id) + '-' +
                                                 (docrodada.arrayMesa8[12].id) + '-' +
                                                 (docrodada.arrayMesa8[13].id) + '-' +
                                                 (docrodada.arrayMesa8[14].id) + '-' +
                                                 (docrodada.arrayMesa8[15].id) + '-' +
                                                 (docrodada.arrayMesa8[16].id) + '-' +
                                                 (docrodada.arrayMesa8[17].id)
                                                 :
                                                 docrodada.arrayMesa8.length == 19 ?
                                                 (docrodada.arrayMesa8[4].id) + '-' +
                                                 (docrodada.arrayMesa8[5].id) + '-' +
                                                 (docrodada.arrayMesa8[6].id) + '-' +
                                                 (docrodada.arrayMesa8[7].id) + '-' +
                                                 (docrodada.arrayMesa8[8].id) + '-' +
                                                 (docrodada.arrayMesa8[9].id) + '-' +
                                                 (docrodada.arrayMesa8[10].id) + '-' +
                                                 (docrodada.arrayMesa8[11].id) + '-' +
                                                 (docrodada.arrayMesa8[12].id) + '-' +
                                                 (docrodada.arrayMesa8[13].id) + '-' +
                                                 (docrodada.arrayMesa8[14].id) + '-' +
                                                 (docrodada.arrayMesa8[15].id) + '-' +
                                                 (docrodada.arrayMesa8[16].id) + '-' +
                                                 (docrodada.arrayMesa8[17].id) + '-' +
                                                 (docrodada.arrayMesa8[18].id) 
                                                 :
                                                 docrodada.arrayMesa8.length == 20 ?
                                                 (docrodada.arrayMesa8[4].id) + '-' +
                                                 (docrodada.arrayMesa8[5].id) + '-' +
                                                 (docrodada.arrayMesa8[6].id) + '-' +
                                                 (docrodada.arrayMesa8[7].id) + '-' +
                                                 (docrodada.arrayMesa8[8].id) + '-' +
                                                 (docrodada.arrayMesa8[9].id) + '-' +
                                                 (docrodada.arrayMesa8[10].id) + '-' +
                                                 (docrodada.arrayMesa8[11].id) + '-' +
                                                 (docrodada.arrayMesa8[12].id) + '-' +
                                                 (docrodada.arrayMesa8[13].id) + '-' +
                                                 (docrodada.arrayMesa8[14].id) + '-' +
                                                 (docrodada.arrayMesa8[15].id) + '-' +
                                                 (docrodada.arrayMesa8[16].id) + '-' +
                                                 (docrodada.arrayMesa8[17].id) + '-' +
                                                 (docrodada.arrayMesa8[18].id) + '-' +
                                                 (docrodada.arrayMesa8[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa9.length != 0  ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                           
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 9 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa9[0].id) + '-' +
                                 (docrodada.arrayMesa9[1].id) + '-' +
                                 (docrodada.arrayMesa9[2].id) + '-'} 
                             {   docrodada.arrayMesa9.length == 4 ?
                               (docrodada.arrayMesa9[3].id) + '-' 
                                :
                                docrodada.arrayMesa9.length == 5 ? 
                                 (docrodada.arrayMesa9[4].id)
                                  :
                                  docrodada.arrayMesa9.length == 6 ?
                                  (docrodada.arrayMesa9[4].id) + '-' +
                                  (docrodada.arrayMesa9[5].id)
                                   :
                                   docrodada.arrayMesa9.length == 7 ?
                                   (docrodada.arrayMesa9[4].id) + '-' +
                                   (docrodada.arrayMesa9[5].id) + '-' +
                                   (docrodada.arrayMesa9[6].id)
                                    :
                                    docrodada.arrayMesa9.length == 8 ?
                                    (docrodada.arrayMesa9[4].id) + '-' +
                                    (docrodada.arrayMesa9[5].id) + '-' +
                                    (docrodada.arrayMesa9[6].id) + '-' +
                                    (docrodada.arrayMesa9[7].id)
                                     : 
                                     docrodada.arrayMesa9.length == 9 ?
                                     (docrodada.arrayMesa9[4].id) + '-' +
                                     (docrodada.arrayMesa9[5].id) + '-' +
                                     (docrodada.arrayMesa9[6].id) + '-' +
                                     (docrodada.arrayMesa9[7].id) + '-' +
                                     (docrodada.arrayMesa9[8].id) 
                                      :
                                      docrodada.arrayMesa9.length == 10 ?
                                        (docrodada.arrayMesa9[4].id) + '-' +
                                        (docrodada.arrayMesa9[5].id) + '-' +
                                        (docrodada.arrayMesa9[6].id) + '-' +
                                        (docrodada.arrayMesa9[7].id) + '-' +
                                        (docrodada.arrayMesa9[8].id) + '-' +
                                        (docrodada.arrayMesa9[9].id)
                                            
                                         :
                                         docrodada.arrayMesa9.length == 11 ?
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa9[10].id)
                                         :
                                         docrodada.arrayMesa9.length == 12 ?
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa9[11].id)
                                         :
                                         docrodada.arrayMesa9.length == 13 ?
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa9[12].id) 
                                             :
                                             docrodada.arrayMesa9.length == 14 ?
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa9[12].id) + '-' +
                                             (docrodada.arrayMesa9[13].id)
                                             :
                                             docrodada.arrayMesa9.length == 15 ?
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa9[12].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa9[14].id)
                                             :
                                             docrodada.arrayMesa9.length == 16 ?
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa9[12].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa9[15].id) 
                                             :
                                             docrodada.arrayMesa9.length == 17 ?
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa9[12].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa9[15].id) + '-' +
                                             (docrodada.arrayMesa9[16].id)
                                                 :
                                                 docrodada.arrayMesa9.length == 18 ?
                                                 (docrodada.arrayMesa9[4].id) + '-' +
                                                 (docrodada.arrayMesa9[5].id) + '-' +
                                                 (docrodada.arrayMesa9[6].id) + '-' +
                                                 (docrodada.arrayMesa9[7].id) + '-' +
                                                 (docrodada.arrayMesa9[8].id) + '-' +
                                                 (docrodada.arrayMesa9[9].id) + '-' +
                                                 (docrodada.arrayMesa9[10].id) + '-' +
                                                 (docrodada.arrayMesa9[11].id) + '-' +
                                                 (docrodada.arrayMesa9[12].id) + '-' +
                                                 (docrodada.arrayMesa9[13].id) + '-' +
                                                 (docrodada.arrayMesa9[14].id) + '-' +
                                                 (docrodada.arrayMesa9[15].id) + '-' +
                                                 (docrodada.arrayMesa9[16].id) + '-' +
                                                 (docrodada.arrayMesa9[17].id)
                                                 :
                                                 docrodada.arrayMesa9.length == 19 ?
                                                 (docrodada.arrayMesa9[4].id) + '-' +
                                                 (docrodada.arrayMesa9[5].id) + '-' +
                                                 (docrodada.arrayMesa9[6].id) + '-' +
                                                 (docrodada.arrayMesa9[7].id) + '-' +
                                                 (docrodada.arrayMesa9[8].id) + '-' +
                                                 (docrodada.arrayMesa9[9].id) + '-' +
                                                 (docrodada.arrayMesa9[10].id) + '-' +
                                                 (docrodada.arrayMesa9[11].id) + '-' +
                                                 (docrodada.arrayMesa9[12].id) + '-' +
                                                 (docrodada.arrayMesa9[13].id) + '-' +
                                                 (docrodada.arrayMesa9[14].id) + '-' +
                                                 (docrodada.arrayMesa9[15].id) + '-' +
                                                 (docrodada.arrayMesa9[16].id) + '-' +
                                                 (docrodada.arrayMesa9[17].id) + '-' +
                                                 (docrodada.arrayMesa9[18].id) 
                                                 :
                                                 docrodada.arrayMesa9.length == 20 ?
                                                 (docrodada.arrayMesa9[4].id) + '-' +
                                                 (docrodada.arrayMesa9[5].id) + '-' +
                                                 (docrodada.arrayMesa9[6].id) + '-' +
                                                 (docrodada.arrayMesa9[7].id) + '-' +
                                                 (docrodada.arrayMesa9[8].id) + '-' +
                                                 (docrodada.arrayMesa9[9].id) + '-' +
                                                 (docrodada.arrayMesa9[10].id) + '-' +
                                                 (docrodada.arrayMesa9[11].id) + '-' +
                                                 (docrodada.arrayMesa9[12].id) + '-' +
                                                 (docrodada.arrayMesa9[13].id) + '-' +
                                                 (docrodada.arrayMesa9[14].id) + '-' +
                                                 (docrodada.arrayMesa9[15].id) + '-' +
                                                 (docrodada.arrayMesa9[16].id) + '-' +
                                                 (docrodada.arrayMesa9[17].id) + '-' +
                                                 (docrodada.arrayMesa9[18].id) + '-' +
                                                 (docrodada.arrayMesa9[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa10.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                           
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 10 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa10[0].id) + '-' +
                                 (docrodada.arrayMesa10[1].id) + '-' +
                                 (docrodada.arrayMesa10[2].id) + '-'} 
                             {   docrodada.arrayMesa10.length == 4 ?
                               (docrodada.arrayMesa10[3].id) + '-' 
                                :
                                docrodada.arrayMesa10.length == 5 ? 
                                 (docrodada.arrayMesa10[4].id)
                                  :
                                  docrodada.arrayMesa10.length == 6 ?
                                  (docrodada.arrayMesa10[4].id) + '-' +
                                  (docrodada.arrayMesa10[5].id)
                                   :
                                   docrodada.arrayMesa10.length == 7 ?
                                   (docrodada.arrayMesa10[4].id) + '-' +
                                   (docrodada.arrayMesa10[5].id) + '-' +
                                   (docrodada.arrayMesa10[6].id)
                                    :
                                    docrodada.arrayMesa10.length == 8 ?
                                    (docrodada.arrayMesa10[4].id) + '-' +
                                    (docrodada.arrayMesa10[5].id) + '-' +
                                    (docrodada.arrayMesa10[6].id) + '-' +
                                    (docrodada.arrayMesa10[7].id)
                                     : 
                                     docrodada.arrayMesa10.length == 9 ?
                                     (docrodada.arrayMesa10[4].id) + '-' +
                                     (docrodada.arrayMesa10[5].id) + '-' +
                                     (docrodada.arrayMesa10[6].id) + '-' +
                                     (docrodada.arrayMesa10[7].id) + '-' +
                                     (docrodada.arrayMesa10[8].id) 
                                      :
                                      docrodada.arrayMesa10.length == 10 ?
                                        (docrodada.arrayMesa10[4].id) + '-' +
                                        (docrodada.arrayMesa10[5].id) + '-' +
                                        (docrodada.arrayMesa10[6].id) + '-' +
                                        (docrodada.arrayMesa10[7].id) + '-' +
                                        (docrodada.arrayMesa10[8].id) + '-' +
                                        (docrodada.arrayMesa10[9].id)
                                            
                                         :
                                         docrodada.arrayMesa10.length == 11 ?
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa10[10].id)
                                         :
                                         docrodada.arrayMesa10.length == 12 ?
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa10[11].id)
                                         :
                                         docrodada.arrayMesa10.length == 13 ?
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa10[12].id) 
                                             :
                                             docrodada.arrayMesa10.length == 14 ?
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa10[12].id) + '-' +
                                             (docrodada.arrayMesa10[13].id)
                                             :
                                             docrodada.arrayMesa10.length == 15 ?
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa10[12].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa10[14].id)
                                             :
                                             docrodada.arrayMesa10.length == 16 ?
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa10[12].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa10[15].id) 
                                             :
                                             docrodada.arrayMesa10.length == 17 ?
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa10[12].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa10[15].id) + '-' +
                                             (docrodada.arrayMesa10[16].id)
                                                 :
                                                 docrodada.arrayMesa10.length == 18 ?
                                                 (docrodada.arrayMesa10[4].id) + '-' +
                                                 (docrodada.arrayMesa10[5].id) + '-' +
                                                 (docrodada.arrayMesa10[6].id) + '-' +
                                                 (docrodada.arrayMesa10[7].id) + '-' +
                                                 (docrodada.arrayMesa10[8].id) + '-' +
                                                 (docrodada.arrayMesa10[9].id) + '-' +
                                                 (docrodada.arrayMesa10[10].id) + '-' +
                                                 (docrodada.arrayMesa10[11].id) + '-' +
                                                 (docrodada.arrayMesa10[12].id) + '-' +
                                                 (docrodada.arrayMesa10[13].id) + '-' +
                                                 (docrodada.arrayMesa10[14].id) + '-' +
                                                 (docrodada.arrayMesa10[15].id) + '-' +
                                                 (docrodada.arrayMesa10[16].id) + '-' +
                                                 (docrodada.arrayMesa10[17].id)
                                                 :
                                                 docrodada.arrayMesa10.length == 19 ?
                                                 (docrodada.arrayMesa10[4].id) + '-' +
                                                 (docrodada.arrayMesa10[5].id) + '-' +
                                                 (docrodada.arrayMesa10[6].id) + '-' +
                                                 (docrodada.arrayMesa10[7].id) + '-' +
                                                 (docrodada.arrayMesa10[8].id) + '-' +
                                                 (docrodada.arrayMesa10[9].id) + '-' +
                                                 (docrodada.arrayMesa10[10].id) + '-' +
                                                 (docrodada.arrayMesa10[11].id) + '-' +
                                                 (docrodada.arrayMesa10[12].id) + '-' +
                                                 (docrodada.arrayMesa10[13].id) + '-' +
                                                 (docrodada.arrayMesa10[14].id) + '-' +
                                                 (docrodada.arrayMesa10[15].id) + '-' +
                                                 (docrodada.arrayMesa10[16].id) + '-' +
                                                 (docrodada.arrayMesa10[17].id) + '-' +
                                                 (docrodada.arrayMesa10[18].id) 
                                                 :
                                                 docrodada.arrayMesa10.length == 20 ?
                                                 (docrodada.arrayMesa10[4].id) + '-' +
                                                 (docrodada.arrayMesa10[5].id) + '-' +
                                                 (docrodada.arrayMesa10[6].id) + '-' +
                                                 (docrodada.arrayMesa10[7].id) + '-' +
                                                 (docrodada.arrayMesa10[8].id) + '-' +
                                                 (docrodada.arrayMesa10[9].id) + '-' +
                                                 (docrodada.arrayMesa10[10].id) + '-' +
                                                 (docrodada.arrayMesa10[11].id) + '-' +
                                                 (docrodada.arrayMesa10[12].id) + '-' +
                                                 (docrodada.arrayMesa10[13].id) + '-' +
                                                 (docrodada.arrayMesa10[14].id) + '-' +
                                                 (docrodada.arrayMesa10[15].id) + '-' +
                                                 (docrodada.arrayMesa10[16].id) + '-' +
                                                 (docrodada.arrayMesa10[17].id) + '-' +
                                                 (docrodada.arrayMesa10[18].id) + '-' +
                                                 (docrodada.arrayMesa10[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        {  docrodada.arrayMesa11.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                           
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 11 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa11[0].id) + '-' +
                                 (docrodada.arrayMesa11[1].id) + '-' +
                                 (docrodada.arrayMesa11[2].id) + '-'} 
                             {   docrodada.arrayMesa11.length == 4 ?
                               (docrodada.arrayMesa11[3].id) + '-' 
                                :
                                docrodada.arrayMesa11.length == 5 ? 
                                 (docrodada.arrayMesa11[4].id)
                                  :
                                  docrodada.arrayMesa11.length == 6 ?
                                  (docrodada.arrayMesa11[4].id) + '-' +
                                  (docrodada.arrayMesa11[5].id)
                                   :
                                   docrodada.arrayMesa11.length == 7 ?
                                   (docrodada.arrayMesa11[4].id) + '-' +
                                   (docrodada.arrayMesa11[5].id) + '-' +
                                   (docrodada.arrayMesa11[6].id)
                                    :
                                    docrodada.arrayMesa11.length == 8 ?
                                    (docrodada.arrayMesa11[4].id) + '-' +
                                    (docrodada.arrayMesa11[5].id) + '-' +
                                    (docrodada.arrayMesa11[6].id) + '-' +
                                    (docrodada.arrayMesa11[7].id)
                                     : 
                                     docrodada.arrayMesa11.length == 9 ?
                                     (docrodada.arrayMesa11[4].id) + '-' +
                                     (docrodada.arrayMesa11[5].id) + '-' +
                                     (docrodada.arrayMesa11[6].id) + '-' +
                                     (docrodada.arrayMesa11[7].id) + '-' +
                                     (docrodada.arrayMesa11[8].id) 
                                      :
                                      docrodada.arrayMesa11.length == 10 ?
                                        (docrodada.arrayMesa11[4].id) + '-' +
                                        (docrodada.arrayMesa11[5].id) + '-' +
                                        (docrodada.arrayMesa11[6].id) + '-' +
                                        (docrodada.arrayMesa11[7].id) + '-' +
                                        (docrodada.arrayMesa11[8].id) + '-' +
                                        (docrodada.arrayMesa11[9].id)
                                            
                                         :
                                         docrodada.arrayMesa11.length == 11 ?
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa11[10].id)
                                         :
                                         docrodada.arrayMesa11.length == 12 ?
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa11[11].id)
                                         :
                                         docrodada.arrayMesa11.length == 13 ?
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa11[12].id) 
                                             :
                                             docrodada.arrayMesa11.length == 14 ?
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa11[12].id) + '-' +
                                             (docrodada.arrayMesa11[13].id)
                                             :
                                             docrodada.arrayMesa11.length == 15 ?
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa11[12].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa11[14].id)
                                             :
                                             docrodada.arrayMesa11.length == 16 ?
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa11[12].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa11[15].id) 
                                             :
                                             docrodada.arrayMesa11.length == 17 ?
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa11[12].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa11[15].id) + '-' +
                                             (docrodada.arrayMesa11[16].id)
                                                 :
                                                 docrodada.arrayMesa11.length == 18 ?
                                                 (docrodada.arrayMesa11[4].id) + '-' +
                                                 (docrodada.arrayMesa11[5].id) + '-' +
                                                 (docrodada.arrayMesa11[6].id) + '-' +
                                                 (docrodada.arrayMesa11[7].id) + '-' +
                                                 (docrodada.arrayMesa11[8].id) + '-' +
                                                 (docrodada.arrayMesa11[9].id) + '-' +
                                                 (docrodada.arrayMesa11[10].id) + '-' +
                                                 (docrodada.arrayMesa11[11].id) + '-' +
                                                 (docrodada.arrayMesa11[12].id) + '-' +
                                                 (docrodada.arrayMesa11[13].id) + '-' +
                                                 (docrodada.arrayMesa11[14].id) + '-' +
                                                 (docrodada.arrayMesa11[15].id) + '-' +
                                                 (docrodada.arrayMesa11[16].id) + '-' +
                                                 (docrodada.arrayMesa11[17].id)
                                                 :
                                                 docrodada.arrayMesa11.length == 19 ?
                                                 (docrodada.arrayMesa11[4].id) + '-' +
                                                 (docrodada.arrayMesa11[5].id) + '-' +
                                                 (docrodada.arrayMesa11[6].id) + '-' +
                                                 (docrodada.arrayMesa11[7].id) + '-' +
                                                 (docrodada.arrayMesa11[8].id) + '-' +
                                                 (docrodada.arrayMesa11[9].id) + '-' +
                                                 (docrodada.arrayMesa11[10].id) + '-' +
                                                 (docrodada.arrayMesa11[11].id) + '-' +
                                                 (docrodada.arrayMesa11[12].id) + '-' +
                                                 (docrodada.arrayMesa11[13].id) + '-' +
                                                 (docrodada.arrayMesa11[14].id) + '-' +
                                                 (docrodada.arrayMesa11[15].id) + '-' +
                                                 (docrodada.arrayMesa11[16].id) + '-' +
                                                 (docrodada.arrayMesa11[17].id) + '-' +
                                                 (docrodada.arrayMesa11[18].id) 
                                                 :
                                                 docrodada.arrayMesa11.length == 20 ?
                                                 (docrodada.arrayMesa11[4].id) + '-' +
                                                 (docrodada.arrayMesa11[5].id) + '-' +
                                                 (docrodada.arrayMesa11[6].id) + '-' +
                                                 (docrodada.arrayMesa11[7].id) + '-' +
                                                 (docrodada.arrayMesa11[8].id) + '-' +
                                                 (docrodada.arrayMesa11[9].id) + '-' +
                                                 (docrodada.arrayMesa11[10].id) + '-' +
                                                 (docrodada.arrayMesa11[11].id) + '-' +
                                                 (docrodada.arrayMesa11[12].id) + '-' +
                                                 (docrodada.arrayMesa11[13].id) + '-' +
                                                 (docrodada.arrayMesa11[14].id) + '-' +
                                                 (docrodada.arrayMesa11[15].id) + '-' +
                                                 (docrodada.arrayMesa11[16].id) + '-' +
                                                 (docrodada.arrayMesa11[17].id) + '-' +
                                                 (docrodada.arrayMesa11[18].id) + '-' +
                                                 (docrodada.arrayMesa11[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa12.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                            
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 12 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa12[0].id) + '-' +
                                 (docrodada.arrayMesa12[1].id) + '-' +
                                 (docrodada.arrayMesa12[2].id) + '-'} 
                             {   docrodada.arrayMesa12.length == 4 ?
                               (docrodada.arrayMesa12[3].id) + '-' 
                                :
                                docrodada.arrayMesa12.length == 5 ? 
                                 (docrodada.arrayMesa12[4].id)
                                  :
                                  docrodada.arrayMesa12.length == 6 ?
                                  (docrodada.arrayMesa12[4].id) + '-' +
                                  (docrodada.arrayMesa12[5].id)
                                   :
                                   docrodada.arrayMesa12.length == 7 ?
                                   (docrodada.arrayMesa12[4].id) + '-' +
                                   (docrodada.arrayMesa12[5].id) + '-' +
                                   (docrodada.arrayMesa12[6].id)
                                    :
                                    docrodada.arrayMesa12.length == 8 ?
                                    (docrodada.arrayMesa12[4].id) + '-' +
                                    (docrodada.arrayMesa12[5].id) + '-' +
                                    (docrodada.arrayMesa12[6].id) + '-' +
                                    (docrodada.arrayMesa12[7].id)
                                     : 
                                     docrodada.arrayMesa12.length == 9 ?
                                     (docrodada.arrayMesa12[4].id) + '-' +
                                     (docrodada.arrayMesa12[5].id) + '-' +
                                     (docrodada.arrayMesa12[6].id) + '-' +
                                     (docrodada.arrayMesa12[7].id) + '-' +
                                     (docrodada.arrayMesa12[8].id) 
                                      :
                                      docrodada.arrayMesa12.length == 10 ?
                                        (docrodada.arrayMesa12[4].id) + '-' +
                                        (docrodada.arrayMesa12[5].id) + '-' +
                                        (docrodada.arrayMesa12[6].id) + '-' +
                                        (docrodada.arrayMesa12[7].id) + '-' +
                                        (docrodada.arrayMesa12[8].id) + '-' +
                                        (docrodada.arrayMesa12[9].id)
                                            
                                         :
                                         docrodada.arrayMesa12.length == 11 ?
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa12[10].id)
                                         :
                                         docrodada.arrayMesa12.length == 12 ?
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa12[11].id)
                                         :
                                         docrodada.arrayMesa12.length == 13 ?
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa12[12].id) 
                                             :
                                             docrodada.arrayMesa12.length == 14 ?
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa12[12].id) + '-' +
                                             (docrodada.arrayMesa12[13].id)
                                             :
                                             docrodada.arrayMesa12.length == 15 ?
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa12[12].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa12[14].id)
                                             :
                                             docrodada.arrayMesa12.length == 16 ?
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa12[12].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa12[15].id) 
                                             :
                                             docrodada.arrayMesa12.length == 17 ?
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa12[12].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa12[15].id) + '-' +
                                             (docrodada.arrayMesa12[16].id)
                                                 :
                                                 docrodada.arrayMesa12.length == 18 ?
                                                 (docrodada.arrayMesa12[4].id) + '-' +
                                                 (docrodada.arrayMesa12[5].id) + '-' +
                                                 (docrodada.arrayMesa12[6].id) + '-' +
                                                 (docrodada.arrayMesa12[7].id) + '-' +
                                                 (docrodada.arrayMesa12[8].id) + '-' +
                                                 (docrodada.arrayMesa12[9].id) + '-' +
                                                 (docrodada.arrayMesa12[10].id) + '-' +
                                                 (docrodada.arrayMesa12[11].id) + '-' +
                                                 (docrodada.arrayMesa12[12].id) + '-' +
                                                 (docrodada.arrayMesa12[13].id) + '-' +
                                                 (docrodada.arrayMesa12[14].id) + '-' +
                                                 (docrodada.arrayMesa12[15].id) + '-' +
                                                 (docrodada.arrayMesa12[16].id) + '-' +
                                                 (docrodada.arrayMesa12[17].id)
                                                 :
                                                 docrodada.arrayMesa12.length == 19 ?
                                                 (docrodada.arrayMesa12[4].id) + '-' +
                                                 (docrodada.arrayMesa12[5].id) + '-' +
                                                 (docrodada.arrayMesa12[6].id) + '-' +
                                                 (docrodada.arrayMesa12[7].id) + '-' +
                                                 (docrodada.arrayMesa12[8].id) + '-' +
                                                 (docrodada.arrayMesa12[9].id) + '-' +
                                                 (docrodada.arrayMesa12[10].id) + '-' +
                                                 (docrodada.arrayMesa12[11].id) + '-' +
                                                 (docrodada.arrayMesa12[12].id) + '-' +
                                                 (docrodada.arrayMesa12[13].id) + '-' +
                                                 (docrodada.arrayMesa12[14].id) + '-' +
                                                 (docrodada.arrayMesa12[15].id) + '-' +
                                                 (docrodada.arrayMesa12[16].id) + '-' +
                                                 (docrodada.arrayMesa12[17].id) + '-' +
                                                 (docrodada.arrayMesa12[18].id) 
                                                 :
                                                 docrodada.arrayMesa12.length == 20 ?
                                                 (docrodada.arrayMesa12[4].id) + '-' +
                                                 (docrodada.arrayMesa12[5].id) + '-' +
                                                 (docrodada.arrayMesa12[6].id) + '-' +
                                                 (docrodada.arrayMesa12[7].id) + '-' +
                                                 (docrodada.arrayMesa12[8].id) + '-' +
                                                 (docrodada.arrayMesa12[9].id) + '-' +
                                                 (docrodada.arrayMesa12[10].id) + '-' +
                                                 (docrodada.arrayMesa12[11].id) + '-' +
                                                 (docrodada.arrayMesa12[12].id) + '-' +
                                                 (docrodada.arrayMesa12[13].id) + '-' +
                                                 (docrodada.arrayMesa12[14].id) + '-' +
                                                 (docrodada.arrayMesa12[15].id) + '-' +
                                                 (docrodada.arrayMesa12[16].id) + '-' +
                                                 (docrodada.arrayMesa12[17].id) + '-' +
                                                 (docrodada.arrayMesa12[18].id) + '-' +
                                                 (docrodada.arrayMesa12[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        {  docrodada.arrayMesa13.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 13 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa13[0].id) + '-' +
                                 (docrodada.arrayMesa13[1].id) + '-' +
                                 (docrodada.arrayMesa13[2].id) + '-'} 
                             {   docrodada.arrayMesa13.length == 4 ?
                               (docrodada.arrayMesa13[3].id) + '-' 
                                :
                                docrodada.arrayMesa13.length == 5 ? 
                                 (docrodada.arrayMesa13[4].id)
                                  :
                                  docrodada.arrayMesa13.length == 6 ?
                                  (docrodada.arrayMesa13[4].id) + '-' +
                                  (docrodada.arrayMesa13[5].id)
                                   :
                                   docrodada.arrayMesa13.length == 7 ?
                                   (docrodada.arrayMesa13[4].id) + '-' +
                                   (docrodada.arrayMesa13[5].id) + '-' +
                                   (docrodada.arrayMesa13[6].id)
                                    :
                                    docrodada.arrayMesa13.length == 8 ?
                                    (docrodada.arrayMesa13[4].id) + '-' +
                                    (docrodada.arrayMesa13[5].id) + '-' +
                                    (docrodada.arrayMesa13[6].id) + '-' +
                                    (docrodada.arrayMesa13[7].id)
                                     : 
                                     docrodada.arrayMesa13.length == 9 ?
                                     (docrodada.arrayMesa13[4].id) + '-' +
                                     (docrodada.arrayMesa13[5].id) + '-' +
                                     (docrodada.arrayMesa13[6].id) + '-' +
                                     (docrodada.arrayMesa13[7].id) + '-' +
                                     (docrodada.arrayMesa13[8].id) 
                                      :
                                      docrodada.arrayMesa13.length == 10 ?
                                        (docrodada.arrayMesa13[4].id) + '-' +
                                        (docrodada.arrayMesa13[5].id) + '-' +
                                        (docrodada.arrayMesa13[6].id) + '-' +
                                        (docrodada.arrayMesa13[7].id) + '-' +
                                        (docrodada.arrayMesa13[8].id) + '-' +
                                        (docrodada.arrayMesa13[9].id)
                                            
                                         :
                                         docrodada.arrayMesa13.length == 11 ?
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa13[10].id)
                                         :
                                         docrodada.arrayMesa13.length == 12 ?
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa13[11].id)
                                         :
                                         docrodada.arrayMesa13.length == 13 ?
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa13[12].id) 
                                             :
                                             docrodada.arrayMesa13.length == 14 ?
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa13[12].id) + '-' +
                                             (docrodada.arrayMesa13[13].id)
                                             :
                                             docrodada.arrayMesa13.length == 15 ?
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa13[12].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa13[14].id)
                                             :
                                             docrodada.arrayMesa13.length == 16 ?
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa13[12].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa13[15].id) 
                                             :
                                             docrodada.arrayMesa13.length == 17 ?
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa13[12].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa13[15].id) + '-' +
                                             (docrodada.arrayMesa13[16].id)
                                                 :
                                                 docrodada.arrayMesa13.length == 18 ?
                                                 (docrodada.arrayMesa13[4].id) + '-' +
                                                 (docrodada.arrayMesa13[5].id) + '-' +
                                                 (docrodada.arrayMesa13[6].id) + '-' +
                                                 (docrodada.arrayMesa13[7].id) + '-' +
                                                 (docrodada.arrayMesa13[8].id) + '-' +
                                                 (docrodada.arrayMesa13[9].id) + '-' +
                                                 (docrodada.arrayMesa13[10].id) + '-' +
                                                 (docrodada.arrayMesa13[11].id) + '-' +
                                                 (docrodada.arrayMesa13[12].id) + '-' +
                                                 (docrodada.arrayMesa13[13].id) + '-' +
                                                 (docrodada.arrayMesa13[14].id) + '-' +
                                                 (docrodada.arrayMesa13[15].id) + '-' +
                                                 (docrodada.arrayMesa13[16].id) + '-' +
                                                 (docrodada.arrayMesa13[17].id)
                                                 :
                                                 docrodada.arrayMesa13.length == 19 ?
                                                 (docrodada.arrayMesa13[4].id) + '-' +
                                                 (docrodada.arrayMesa13[5].id) + '-' +
                                                 (docrodada.arrayMesa13[6].id) + '-' +
                                                 (docrodada.arrayMesa13[7].id) + '-' +
                                                 (docrodada.arrayMesa13[8].id) + '-' +
                                                 (docrodada.arrayMesa13[9].id) + '-' +
                                                 (docrodada.arrayMesa13[10].id) + '-' +
                                                 (docrodada.arrayMesa13[11].id) + '-' +
                                                 (docrodada.arrayMesa13[12].id) + '-' +
                                                 (docrodada.arrayMesa13[13].id) + '-' +
                                                 (docrodada.arrayMesa13[14].id) + '-' +
                                                 (docrodada.arrayMesa13[15].id) + '-' +
                                                 (docrodada.arrayMesa13[16].id) + '-' +
                                                 (docrodada.arrayMesa13[17].id) + '-' +
                                                 (docrodada.arrayMesa13[18].id) 
                                                 :
                                                 docrodada.arrayMesa13.length == 20 ?
                                                 (docrodada.arrayMesa13[4].id) + '-' +
                                                 (docrodada.arrayMesa13[5].id) + '-' +
                                                 (docrodada.arrayMesa13[6].id) + '-' +
                                                 (docrodada.arrayMesa13[7].id) + '-' +
                                                 (docrodada.arrayMesa13[8].id) + '-' +
                                                 (docrodada.arrayMesa13[9].id) + '-' +
                                                 (docrodada.arrayMesa13[10].id) + '-' +
                                                 (docrodada.arrayMesa13[11].id) + '-' +
                                                 (docrodada.arrayMesa13[12].id) + '-' +
                                                 (docrodada.arrayMesa13[13].id) + '-' +
                                                 (docrodada.arrayMesa13[14].id) + '-' +
                                                 (docrodada.arrayMesa13[15].id) + '-' +
                                                 (docrodada.arrayMesa13[16].id) + '-' +
                                                 (docrodada.arrayMesa13[17].id) + '-' +
                                                 (docrodada.arrayMesa13[18].id) + '-' +
                                                 (docrodada.arrayMesa13[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa14.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                          
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 14 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa14[0].id) + '-' +
                                 (docrodada.arrayMesa14[1].id) + '-' +
                                 (docrodada.arrayMesa14[2].id) + '-'} 
                             {   docrodada.arrayMesa14.length == 4 ?
                               (docrodada.arrayMesa14[3].id) + '-' 
                                :
                                docrodada.arrayMesa14.length == 5 ? 
                                 (docrodada.arrayMesa14[4].id)
                                  :
                                  docrodada.arrayMesa14.length == 6 ?
                                  (docrodada.arrayMesa14[4].id) + '-' +
                                  (docrodada.arrayMesa14[5].id)
                                   :
                                   docrodada.arrayMesa14.length == 7 ?
                                   (docrodada.arrayMesa14[4].id) + '-' +
                                   (docrodada.arrayMesa14[5].id) + '-' +
                                   (docrodada.arrayMesa14[6].id)
                                    :
                                    docrodada.arrayMesa14.length == 8 ?
                                    (docrodada.arrayMesa14[4].id) + '-' +
                                    (docrodada.arrayMesa14[5].id) + '-' +
                                    (docrodada.arrayMesa14[6].id) + '-' +
                                    (docrodada.arrayMesa14[7].id)
                                     : 
                                     docrodada.arrayMesa14.length == 9 ?
                                     (docrodada.arrayMesa14[4].id) + '-' +
                                     (docrodada.arrayMesa14[5].id) + '-' +
                                     (docrodada.arrayMesa14[6].id) + '-' +
                                     (docrodada.arrayMesa14[7].id) + '-' +
                                     (docrodada.arrayMesa14[8].id) 
                                      :
                                      docrodada.arrayMesa14.length == 10 ?
                                        (docrodada.arrayMesa14[4].id) + '-' +
                                        (docrodada.arrayMesa14[5].id) + '-' +
                                        (docrodada.arrayMesa14[6].id) + '-' +
                                        (docrodada.arrayMesa14[7].id) + '-' +
                                        (docrodada.arrayMesa14[8].id) + '-' +
                                        (docrodada.arrayMesa14[9].id)
                                            
                                         :
                                         docrodada.arrayMesa14.length == 11 ?
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa14[10].id)
                                         :
                                         docrodada.arrayMesa14.length == 12 ?
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa14[11].id)
                                         :
                                         docrodada.arrayMesa14.length == 13 ?
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa14[11].id) + '-' +
                                         (docrodada.arrayMesa14[12].id) 
                                             :
                                             docrodada.arrayMesa14.length == 14 ?
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa14[12].id) + '-' +
                                             (docrodada.arrayMesa14[13].id)
                                             :
                                             docrodada.arrayMesa14.length == 15 ?
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa14[12].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa14[14].id)
                                             :
                                             docrodada.arrayMesa14.length == 16 ?
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa14[12].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa14[15].id) 
                                             :
                                             docrodada.arrayMesa14.length == 17 ?
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa14[12].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa14[15].id) + '-' +
                                             (docrodada.arrayMesa14[16].id)
                                                 :
                                                 docrodada.arrayMesa14.length == 18 ?
                                                 (docrodada.arrayMesa14[4].id) + '-' +
                                                 (docrodada.arrayMesa14[5].id) + '-' +
                                                 (docrodada.arrayMesa14[6].id) + '-' +
                                                 (docrodada.arrayMesa14[7].id) + '-' +
                                                 (docrodada.arrayMesa14[8].id) + '-' +
                                                 (docrodada.arrayMesa14[9].id) + '-' +
                                                 (docrodada.arrayMesa14[10].id) + '-' +
                                                 (docrodada.arrayMesa14[11].id) + '-' +
                                                 (docrodada.arrayMesa14[12].id) + '-' +
                                                 (docrodada.arrayMesa14[13].id) + '-' +
                                                 (docrodada.arrayMesa14[14].id) + '-' +
                                                 (docrodada.arrayMesa14[15].id) + '-' +
                                                 (docrodada.arrayMesa14[16].id) + '-' +
                                                 (docrodada.arrayMesa14[17].id)
                                                 :
                                                 docrodada.arrayMesa14.length == 19 ?
                                                 (docrodada.arrayMesa14[4].id) + '-' +
                                                 (docrodada.arrayMesa14[5].id) + '-' +
                                                 (docrodada.arrayMesa14[6].id) + '-' +
                                                 (docrodada.arrayMesa14[7].id) + '-' +
                                                 (docrodada.arrayMesa14[8].id) + '-' +
                                                 (docrodada.arrayMesa14[9].id) + '-' +
                                                 (docrodada.arrayMesa14[10].id) + '-' +
                                                 (docrodada.arrayMesa14[11].id) + '-' +
                                                 (docrodada.arrayMesa14[12].id) + '-' +
                                                 (docrodada.arrayMesa14[13].id) + '-' +
                                                 (docrodada.arrayMesa14[14].id) + '-' +
                                                 (docrodada.arrayMesa14[15].id) + '-' +
                                                 (docrodada.arrayMesa14[16].id) + '-' +
                                                 (docrodada.arrayMesa14[17].id) + '-' +
                                                 (docrodada.arrayMesa14[18].id) 
                                                 :
                                                 docrodada.arrayMesa14.length == 20 ?
                                                 (docrodada.arrayMesa14[4].id) + '-' +
                                                 (docrodada.arrayMesa14[5].id) + '-' +
                                                 (docrodada.arrayMesa14[6].id) + '-' +
                                                 (docrodada.arrayMesa14[7].id) + '-' +
                                                 (docrodada.arrayMesa14[8].id) + '-' +
                                                 (docrodada.arrayMesa14[9].id) + '-' +
                                                 (docrodada.arrayMesa14[10].id) + '-' +
                                                 (docrodada.arrayMesa14[11].id) + '-' +
                                                 (docrodada.arrayMesa14[12].id) + '-' +
                                                 (docrodada.arrayMesa14[13].id) + '-' +
                                                 (docrodada.arrayMesa14[14].id) + '-' +
                                                 (docrodada.arrayMesa14[15].id) + '-' +
                                                 (docrodada.arrayMesa14[16].id) + '-' +
                                                 (docrodada.arrayMesa14[17].id) + '-' +
                                                 (docrodada.arrayMesa14[18].id) + '-' +
                                                 (docrodada.arrayMesa14[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa15.length != 0?                 
                         <Row xs={12} md={12} className="borderrow grande">
                       
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 15 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             
                             {(docrodada.arrayMesa15[0].id) + '-' +
                                 (docrodada.arrayMesa15[1].id) + '-' +
                                 (docrodada.arrayMesa15[2].id) + '-'} 
                             {   docrodada.arrayMesa15.length == 4 ?
                               (docrodada.arrayMesa15[3].id) + '-' 
                                :
                                docrodada.arrayMesa15.length == 5 ? 
                                 (docrodada.arrayMesa15[4].id)
                                  :
                                  docrodada.arrayMesa15.length == 6 ?
                                  (docrodada.arrayMesa15[4].id) + '-' +
                                  (docrodada.arrayMesa15[5].id)
                                   :
                                   docrodada.arrayMesa15.length == 7 ?
                                   (docrodada.arrayMesa15[4].id) + '-' +
                                   (docrodada.arrayMesa15[5].id) + '-' +
                                   (docrodada.arrayMesa15[6].id)
                                    :
                                    docrodada.arrayMesa15.length == 8 ?
                                    (docrodada.arrayMesa15[4].id) + '-' +
                                    (docrodada.arrayMesa15[5].id) + '-' +
                                    (docrodada.arrayMesa15[6].id) + '-' +
                                    (docrodada.arrayMesa15[7].id)
                                     : 
                                     docrodada.arrayMesa15.length == 9 ?
                                     (docrodada.arrayMesa15[4].id) + '-' +
                                     (docrodada.arrayMesa15[5].id) + '-' +
                                     (docrodada.arrayMesa15[6].id) + '-' +
                                     (docrodada.arrayMesa15[7].id) + '-' +
                                     (docrodada.arrayMesa15[8].id) 
                                      :
                                      docrodada.arrayMesa15.length == 10 ?
                                        (docrodada.arrayMesa15[4].id) + '-' +
                                        (docrodada.arrayMesa15[5].id) + '-' +
                                        (docrodada.arrayMesa15[6].id) + '-' +
                                        (docrodada.arrayMesa15[7].id) + '-' +
                                        (docrodada.arrayMesa15[8].id) + '-' +
                                        (docrodada.arrayMesa15[9].id)
                                            
                                         :
                                         docrodada.arrayMesa15.length == 11 ?
                                         (docrodada.arrayMesa15[4].id) + '-' +
                                         (docrodada.arrayMesa15[5].id) + '-' +
                                         (docrodada.arrayMesa15[6].id) + '-' +
                                         (docrodada.arrayMesa15[7].id) + '-' +
                                         (docrodada.arrayMesa15[8].id) + '-' +
                                         (docrodada.arrayMesa15[9].id) + '-' +
                                         (docrodada.arrayMesa15[10].id)
                                         :
                                         docrodada.arrayMesa15.length == 12 ?
                                         (docrodada.arrayMesa15[4].id) + '-' +
                                         (docrodada.arrayMesa15[5].id) + '-' +
                                         (docrodada.arrayMesa15[6].id) + '-' +
                                         (docrodada.arrayMesa15[7].id) + '-' +
                                         (docrodada.arrayMesa15[8].id) + '-' +
                                         (docrodada.arrayMesa15[9].id) + '-' +
                                         (docrodada.arrayMesa15[10].id) + '-' +
                                         (docrodada.arrayMesa15[11].id)
                                         :
                                         docrodada.arrayMesa15.length == 13 ?
                                         (docrodada.arrayMesa15[4].id) + '-' +
                                         (docrodada.arrayMesa15[5].id) + '-' +
                                         (docrodada.arrayMesa15[6].id) + '-' +
                                         (docrodada.arrayMesa15[7].id) + '-' +
                                         (docrodada.arrayMesa15[8].id) + '-' +
                                         (docrodada.arrayMesa15[9].id) + '-' +
                                         (docrodada.arrayMesa15[10].id) + '-' +
                                         (docrodada.arrayMesa15[11].id) + '-' +
                                         (docrodada.arrayMesa15[12].id) 
                                             :
                                             docrodada.arrayMesa15.length == 14 ?
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa15[12].id) + '-' +
                                             (docrodada.arrayMesa15[13].id)
                                             :
                                             docrodada.arrayMesa15.length == 15 ?
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa15[12].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa15[14].id)
                                             :
                                             docrodada.arrayMesa15.length == 16 ?
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa15[12].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa15[15].id) 
                                             :
                                             docrodada.arrayMesa15.length == 17 ?
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa15[12].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa15[15].id) + '-' +
                                             (docrodada.arrayMesa15[16].id)
                                                 :
                                                 docrodada.arrayMesa15.length == 18 ?
                                                 (docrodada.arrayMesa15[4].id) + '-' +
                                                 (docrodada.arrayMesa15[5].id) + '-' +
                                                 (docrodada.arrayMesa15[6].id) + '-' +
                                                 (docrodada.arrayMesa15[7].id) + '-' +
                                                 (docrodada.arrayMesa15[8].id) + '-' +
                                                 (docrodada.arrayMesa15[9].id) + '-' +
                                                 (docrodada.arrayMesa15[10].id) + '-' +
                                                 (docrodada.arrayMesa15[11].id) + '-' +
                                                 (docrodada.arrayMesa15[12].id) + '-' +
                                                 (docrodada.arrayMesa15[13].id) + '-' +
                                                 (docrodada.arrayMesa15[14].id) + '-' +
                                                 (docrodada.arrayMesa15[15].id) + '-' +
                                                 (docrodada.arrayMesa15[16].id) + '-' +
                                                 (docrodada.arrayMesa15[17].id)
                                                 :
                                                 docrodada.arrayMesa15.length == 19 ?
                                                 (docrodada.arrayMesa15[4].id) + '-' +
                                                 (docrodada.arrayMesa15[5].id) + '-' +
                                                 (docrodada.arrayMesa15[6].id) + '-' +
                                                 (docrodada.arrayMesa15[7].id) + '-' +
                                                 (docrodada.arrayMesa15[8].id) + '-' +
                                                 (docrodada.arrayMesa15[9].id) + '-' +
                                                 (docrodada.arrayMesa15[10].id) + '-' +
                                                 (docrodada.arrayMesa15[11].id) + '-' +
                                                 (docrodada.arrayMesa15[12].id) + '-' +
                                                 (docrodada.arrayMesa15[13].id) + '-' +
                                                 (docrodada.arrayMesa15[14].id) + '-' +
                                                 (docrodada.arrayMesa15[15].id) + '-' +
                                                 (docrodada.arrayMesa15[16].id) + '-' +
                                                 (docrodada.arrayMesa15[17].id) + '-' +
                                                 (docrodada.arrayMesa15[18].id) 
                                                 :
                                                 docrodada.arrayMesa15.length == 20 ?
                                                 (docrodada.arrayMesa15[4].id) + '-' +
                                                 (docrodada.arrayMesa15[5].id) + '-' +
                                                 (docrodada.arrayMesa15[6].id) + '-' +
                                                 (docrodada.arrayMesa15[7].id) + '-' +
                                                 (docrodada.arrayMesa15[8].id) + '-' +
                                                 (docrodada.arrayMesa15[9].id) + '-' +
                                                 (docrodada.arrayMesa15[10].id) + '-' +
                                                 (docrodada.arrayMesa15[11].id) + '-' +
                                                 (docrodada.arrayMesa15[12].id) + '-' +
                                                 (docrodada.arrayMesa15[13].id) + '-' +
                                                 (docrodada.arrayMesa15[14].id) + '-' +
                                                 (docrodada.arrayMesa15[15].id) + '-' +
                                                 (docrodada.arrayMesa15[16].id) + '-' +
                                                 (docrodada.arrayMesa15[17].id) + '-' +
                                                 (docrodada.arrayMesa15[18].id) + '-' +
                                                 (docrodada.arrayMesa15[19].id)
                                                 :
                                                 <span />
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }

 
                         </Col>    

           
                    )
                } )

                :
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                contarReuniao == 2 ?
                
                rodadas.sort((a,b)=> a.dataRodada > b.dataRodada ? 1 : -1).slice(-1).map((docrodada, indexrodada) => {
                    return(

                         
                    
                         <Col xs={6} md={6} className="mesas">
                            
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 1 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {(docrodada.arrayMesa1[0].id) + '-' +
                                 (docrodada.arrayMesa2[0].id) + '-' +
                                 (docrodada.arrayMesa3[0].id) + '-' +
                                 (docrodada.arrayMesa4[0].id) + '-'} 
                             {   docrodada.arrayMesa1.length == 5 ? 
                                 (docrodada.arrayMesa5[0].id)
                                  :
                                  docrodada.arrayMesa1.length == 6 ?
                                  (docrodada.arrayMesa5[0].id) + '-' +
                                  (docrodada.arrayMesa6[0].id)
                                   :
                                   docrodada.arrayMesa1.length == 7 ?
                                   (docrodada.arrayMesa5[0].id) + '-' +
                                   (docrodada.arrayMesa6[0].id) + '-' +
                                   (docrodada.arrayMesa7[0].id)
                                    :
                                    docrodada.arrayMesa1.length == 8 ?
                                    (docrodada.arrayMesa5[0].id) + '-' +
                                    (docrodada.arrayMesa6[0].id) + '-' +
                                    (docrodada.arrayMesa7[0].id) + '-' +
                                    (docrodada.arrayMesa8[0].id)
                                     : 
                                     docrodada.arrayMesa1.length == 9 ?
                                     (docrodada.arrayMesa5[0].id) + '-' +
                                     (docrodada.arrayMesa6[0].id) + '-' +
                                     (docrodada.arrayMesa7[0].id) + '-' +
                                     (docrodada.arrayMesa8[0].id) + '-' +
                                     (docrodada.arrayMesa9[0].id) 
                                      :
                                      docrodada.arrayMesa1.length == 10 ?
                                        (docrodada.arrayMesa5[0].id) + '-' +
                                        (docrodada.arrayMesa6[0].id) + '-' +
                                        (docrodada.arrayMesa7[0].id) + '-' +
                                        (docrodada.arrayMesa8[0].id) + '-' +
                                        (docrodada.arrayMesa9[0].id) + '-' +
                                        (docrodada.arrayMesa10[0].id)
                                            
                                         :
                                         docrodada.arrayMesa1.length == 11 ?
                                         (docrodada.arrayMesa5[0].id) + '-' +
                                         (docrodada.arrayMesa6[0].id) + '-' +
                                         (docrodada.arrayMesa7[0].id) + '-' +
                                         (docrodada.arrayMesa8[0].id) + '-' +
                                         (docrodada.arrayMesa9[0].id) + '-' +
                                         (docrodada.arrayMesa10[0].id) + '-' +
                                         (docrodada.arrayMesa11[0].id)
                                         :
                                         docrodada.arrayMesa1.length == 12 ?
                                         (docrodada.arrayMesa5[0].id) + '-' +
                                         (docrodada.arrayMesa6[0].id) + '-' +
                                         (docrodada.arrayMesa7[0].id) + '-' +
                                         (docrodada.arrayMesa8[0].id) + '-' +
                                         (docrodada.arrayMesa9[0].id) + '-' +
                                         (docrodada.arrayMesa10[0].id) + '-' +
                                         (docrodada.arrayMesa11[0].id) + '-' +
                                         (docrodada.arrayMesa12[0].id)
                                         :
                                         docrodada.arrayMesa1.length == 13 ?
                                         (docrodada.arrayMesa5[0].id) + '-' +
                                         (docrodada.arrayMesa6[0].id) + '-' +
                                         (docrodada.arrayMesa7[0].id) + '-' +
                                         (docrodada.arrayMesa8[0].id) + '-' +
                                         (docrodada.arrayMesa9[0].id) + '-' +
                                         (docrodada.arrayMesa10[0].id) + '-' +
                                         (docrodada.arrayMesa11[0].id) + '-' +
                                         (docrodada.arrayMesa12[0].id) + '-' +
                                         (docrodada.arrayMesa13[0].id) 
                                             :
                                             docrodada.arrayMesa1.length == 14 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id)
                                             :
                                             docrodada.arrayMesa1.length == 15 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id) + '-' +
                                             (docrodada.arrayMesa15[0].id)
                                             :
                                             docrodada.arrayMesa1.length == 16 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id) + '-' +
                                             (docrodada.arrayMesa15[0].id) + '-' +
                                             (docrodada.arrayMesa16[0].id) 
                                             :
                                             docrodada.arrayMesa1.length == 17 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id) + '-' +
                                             (docrodada.arrayMesa15[0].id) + '-' +
                                             (docrodada.arrayMesa16[0].id) + '-' +
                                             (docrodada.arrayMesa17[0].id)
                                                 :
                                                 docrodada.arrayMesa1.length == 18 ?
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa12[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id)
                                                 :
                                                 docrodada.arrayMesa1.length == 19 ?
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id) + '-' +
                                                 (docrodada.arrayMesa19[0].id) + '-' +
                                                 (docrodada.arrayMesa20[0].id) 
                                                 :
                                                 docrodada.arrayMesa1.length == 20 ?
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa12[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id) + '-' +
                                                 (docrodada.arrayMesa19[0].id) + '-' +
                                                 (docrodada.arrayMesa20[0].id)
                                                 :
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa12[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id) + '-' +
                                                 (docrodada.arrayMesa19[0].id) + '-' +
                                                 (docrodada.arrayMesa20[0].id) + '-' +
                                                 (docrodada.arrayMesa21[0].id)
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         {  docrodada.arrayMesa2.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 2 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[1].id) + '-' +
                             (docrodada.arrayMesa2[1].id) + '-' +
                             (docrodada.arrayMesa3[1].id) + '-' +
                             (docrodada.arrayMesa4[1].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[1].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[1].id) + '-' +
                              (docrodada.arrayMesa6[1].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[1].id) + '-' +
                               (docrodada.arrayMesa6[1].id) + '-' +
                               (docrodada.arrayMesa7[1].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[1].id) + '-' +
                                (docrodada.arrayMesa6[1].id) + '-' +
                                (docrodada.arrayMesa7[1].id) + '-' +
                                (docrodada.arrayMesa8[1].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[1].id) + '-' +
                                 (docrodada.arrayMesa6[1].id) + '-' +
                                 (docrodada.arrayMesa7[1].id) + '-' +
                                 (docrodada.arrayMesa8[1].id) + '-' +
                                 (docrodada.arrayMesa9[1].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[1].id) + '-' +
                                    (docrodada.arrayMesa6[1].id) + '-' +
                                    (docrodada.arrayMesa7[1].id) + '-' +
                                    (docrodada.arrayMesa8[1].id) + '-' +
                                    (docrodada.arrayMesa9[1].id) + '-' +
                                    (docrodada.arrayMesa10[1].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[1].id) + '-' +
                                     (docrodada.arrayMesa6[1].id) + '-' +
                                     (docrodada.arrayMesa7[1].id) + '-' +
                                     (docrodada.arrayMesa8[1].id) + '-' +
                                     (docrodada.arrayMesa9[1].id) + '-' +
                                     (docrodada.arrayMesa10[1].id) + '-' +
                                     (docrodada.arrayMesa11[1].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[1].id) + '-' +
                                     (docrodada.arrayMesa6[1].id) + '-' +
                                     (docrodada.arrayMesa7[1].id) + '-' +
                                     (docrodada.arrayMesa8[1].id) + '-' +
                                     (docrodada.arrayMesa9[1].id) + '-' +
                                     (docrodada.arrayMesa10[1].id) + '-' +
                                     (docrodada.arrayMesa11[1].id) + '-' +
                                     (docrodada.arrayMesa12[1].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[1].id) + '-' +
                                     (docrodada.arrayMesa6[1].id) + '-' +
                                     (docrodada.arrayMesa7[1].id) + '-' +
                                     (docrodada.arrayMesa8[1].id) + '-' +
                                     (docrodada.arrayMesa9[1].id) + '-' +
                                     (docrodada.arrayMesa10[1].id) + '-' +
                                     (docrodada.arrayMesa11[1].id) + '-' +
                                     (docrodada.arrayMesa12[1].id) + '-' +
                                     (docrodada.arrayMesa13[1].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id) + '-' +
                                         (docrodada.arrayMesa15[1].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id) + '-' +
                                         (docrodada.arrayMesa15[1].id) + '-' +
                                         (docrodada.arrayMesa16[1].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id) + '-' +
                                         (docrodada.arrayMesa15[1].id) + '-' +
                                         (docrodada.arrayMesa16[1].id) + '-' +
                                         (docrodada.arrayMesa17[1].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa12[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id) + '-' +
                                             (docrodada.arrayMesa19[1].id) + '-' +
                                             (docrodada.arrayMesa20[1].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa12[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id) + '-' +
                                             (docrodada.arrayMesa19[1].id) + '-' +
                                             (docrodada.arrayMesa20[1].id)
                                             :
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa12[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id) + '-' +
                                             (docrodada.arrayMesa19[1].id) + '-' +
                                             (docrodada.arrayMesa20[1].id) + '-' +
                                             (docrodada.arrayMesa21[1].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         { docrodada.arrayMesa3.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 3 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[2].id) + '-' +
                             (docrodada.arrayMesa2[2].id) + '-' +
                             (docrodada.arrayMesa3[2].id) + '-' +
                             (docrodada.arrayMesa4[2].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[2].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[2].id) + '-' +
                              (docrodada.arrayMesa6[2].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[2].id) + '-' +
                               (docrodada.arrayMesa6[2].id) + '-' +
                               (docrodada.arrayMesa7[2].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[2].id) + '-' +
                                (docrodada.arrayMesa6[2].id) + '-' +
                                (docrodada.arrayMesa7[2].id) + '-' +
                                (docrodada.arrayMesa8[2].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[2].id) + '-' +
                                 (docrodada.arrayMesa6[2].id) + '-' +
                                 (docrodada.arrayMesa7[2].id) + '-' +
                                 (docrodada.arrayMesa8[2].id) + '-' +
                                 (docrodada.arrayMesa9[2].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[2].id) + '-' +
                                    (docrodada.arrayMesa6[2].id) + '-' +
                                    (docrodada.arrayMesa7[2].id) + '-' +
                                    (docrodada.arrayMesa8[2].id) + '-' +
                                    (docrodada.arrayMesa9[2].id) + '-' +
                                    (docrodada.arrayMesa10[2].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[2].id) + '-' +
                                     (docrodada.arrayMesa6[2].id) + '-' +
                                     (docrodada.arrayMesa7[2].id) + '-' +
                                     (docrodada.arrayMesa8[2].id) + '-' +
                                     (docrodada.arrayMesa9[2].id) + '-' +
                                     (docrodada.arrayMesa10[2].id) + '-' +
                                     (docrodada.arrayMesa11[2].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[2].id) + '-' +
                                     (docrodada.arrayMesa6[2].id) + '-' +
                                     (docrodada.arrayMesa7[2].id) + '-' +
                                     (docrodada.arrayMesa8[2].id) + '-' +
                                     (docrodada.arrayMesa9[2].id) + '-' +
                                     (docrodada.arrayMesa10[2].id) + '-' +
                                     (docrodada.arrayMesa11[2].id) + '-' +
                                     (docrodada.arrayMesa12[2].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[2].id) + '-' +
                                     (docrodada.arrayMesa6[2].id) + '-' +
                                     (docrodada.arrayMesa7[2].id) + '-' +
                                     (docrodada.arrayMesa8[2].id) + '-' +
                                     (docrodada.arrayMesa9[2].id) + '-' +
                                     (docrodada.arrayMesa10[2].id) + '-' +
                                     (docrodada.arrayMesa11[2].id) + '-' +
                                     (docrodada.arrayMesa12[2].id) + '-' +
                                     (docrodada.arrayMesa13[2].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id) + '-' +
                                         (docrodada.arrayMesa15[2].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id) + '-' +
                                         (docrodada.arrayMesa15[2].id) + '-' +
                                         (docrodada.arrayMesa16[2].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id) + '-' +
                                         (docrodada.arrayMesa15[2].id) + '-' +
                                         (docrodada.arrayMesa16[2].id) + '-' +
                                         (docrodada.arrayMesa17[2].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa12[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id) + '-' +
                                             (docrodada.arrayMesa19[2].id) + '-' +
                                             (docrodada.arrayMesa20[2].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa12[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id) + '-' +
                                             (docrodada.arrayMesa19[2].id) + '-' +
                                             (docrodada.arrayMesa20[2].id)
                                             :
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa12[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id) + '-' +
                                             (docrodada.arrayMesa19[2].id) + '-' +
                                             (docrodada.arrayMesa20[2].id) + '-' +
                                             (docrodada.arrayMesa21[2].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         { docrodada.arrayMesa4.length != 0 ?
                          <Row xs={12} md={12} className="borderrow grande">
                          <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                          
                          <Card.Text>Mesa 4 </Card.Text>
                          </Col>
                          <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                          <Card.Text className="text-card ">
                          {(docrodada.arrayMesa1[3].id) + '-' +
                              (docrodada.arrayMesa2[3].id) + '-' +
                              (docrodada.arrayMesa3[3].id) + '-' +
                              (docrodada.arrayMesa4[3].id) + '-'} 
                          {   docrodada.arrayMesa1.length == 5 ? 
                              (docrodada.arrayMesa5[3].id)
                               :
                               docrodada.arrayMesa1.length == 6 ?
                               (docrodada.arrayMesa5[3].id) + '-' +
                               (docrodada.arrayMesa6[3].id)
                                :
                                docrodada.arrayMesa1.length == 7 ?
                                (docrodada.arrayMesa5[3].id) + '-' +
                                (docrodada.arrayMesa6[3].id) + '-' +
                                (docrodada.arrayMesa7[3].id)
                                 :
                                 docrodada.arrayMesa1.length == 8 ?
                                 (docrodada.arrayMesa5[3].id) + '-' +
                                 (docrodada.arrayMesa6[3].id) + '-' +
                                 (docrodada.arrayMesa7[3].id) + '-' +
                                 (docrodada.arrayMesa8[3].id)
                                  : 
                                  docrodada.arrayMesa1.length == 9 ?
                                  (docrodada.arrayMesa5[3].id) + '-' +
                                  (docrodada.arrayMesa6[3].id) + '-' +
                                  (docrodada.arrayMesa7[3].id) + '-' +
                                  (docrodada.arrayMesa8[3].id) + '-' +
                                  (docrodada.arrayMesa9[3].id) 
                                   :
                                   docrodada.arrayMesa1.length == 10 ?
                                     (docrodada.arrayMesa5[3].id) + '-' +
                                     (docrodada.arrayMesa6[3].id) + '-' +
                                     (docrodada.arrayMesa7[3].id) + '-' +
                                     (docrodada.arrayMesa8[3].id) + '-' +
                                     (docrodada.arrayMesa9[3].id) + '-' +
                                     (docrodada.arrayMesa10[3].id)
                                         
                                      :
                                      docrodada.arrayMesa1.length == 11 ?
                                      (docrodada.arrayMesa5[3].id) + '-' +
                                      (docrodada.arrayMesa6[3].id) + '-' +
                                      (docrodada.arrayMesa7[3].id) + '-' +
                                      (docrodada.arrayMesa8[3].id) + '-' +
                                      (docrodada.arrayMesa9[3].id) + '-' +
                                      (docrodada.arrayMesa10[3].id) + '-' +
                                      (docrodada.arrayMesa11[3].id)
                                      :
                                      docrodada.arrayMesa1.length == 12 ?
                                      (docrodada.arrayMesa5[3].id) + '-' +
                                      (docrodada.arrayMesa6[3].id) + '-' +
                                      (docrodada.arrayMesa7[3].id) + '-' +
                                      (docrodada.arrayMesa8[3].id) + '-' +
                                      (docrodada.arrayMesa9[3].id) + '-' +
                                      (docrodada.arrayMesa10[3].id) + '-' +
                                      (docrodada.arrayMesa11[3].id) + '-' +
                                      (docrodada.arrayMesa12[3].id)
                                      :
                                      docrodada.arrayMesa1.length == 13 ?
                                      (docrodada.arrayMesa5[3].id) + '-' +
                                      (docrodada.arrayMesa6[3].id) + '-' +
                                      (docrodada.arrayMesa7[3].id) + '-' +
                                      (docrodada.arrayMesa8[3].id) + '-' +
                                      (docrodada.arrayMesa9[3].id) + '-' +
                                      (docrodada.arrayMesa10[3].id) + '-' +
                                      (docrodada.arrayMesa11[3].id) + '-' +
                                      (docrodada.arrayMesa12[3].id) + '-' +
                                      (docrodada.arrayMesa13[3].id) 
                                          :
                                          docrodada.arrayMesa1.length == 14 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id)
                                          :
                                          docrodada.arrayMesa1.length == 15 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id) + '-' +
                                          (docrodada.arrayMesa15[3].id)
                                          :
                                          docrodada.arrayMesa1.length == 16 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id) + '-' +
                                          (docrodada.arrayMesa15[3].id) + '-' +
                                          (docrodada.arrayMesa16[3].id) 
                                          :
                                          docrodada.arrayMesa1.length == 17 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id) + '-' +
                                          (docrodada.arrayMesa15[3].id) + '-' +
                                          (docrodada.arrayMesa16[3].id) + '-' +
                                          (docrodada.arrayMesa17[3].id)
                                              :
                                              docrodada.arrayMesa1.length == 18 ?
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa12[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id)
                                              :
                                              docrodada.arrayMesa1.length == 19 ?
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id) + '-' +
                                              (docrodada.arrayMesa19[3].id) + '-' +
                                              (docrodada.arrayMesa20[3].id) 
                                              :
                                              docrodada.arrayMesa1.length == 20 ?
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa12[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id) + '-' +
                                              (docrodada.arrayMesa19[3].id) + '-' +
                                              (docrodada.arrayMesa20[3].id)
                                              :
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa12[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id) + '-' +
                                              (docrodada.arrayMesa19[3].id) + '-' +
                                              (docrodada.arrayMesa20[3].id) + '-' +
                                              (docrodada.arrayMesa21[3].id)
                                               
                                      }             
                          
                          </Card.Text>
                          </Col>
                          </Row>
                         :
                         <Row>

                         </Row>
                         }
                         {docrodada.arrayMesa5.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 5 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[4].id) + '-' +
                             (docrodada.arrayMesa2[4].id) + '-' +
                             (docrodada.arrayMesa3[4].id) + '-' +
                             (docrodada.arrayMesa4[4].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[4].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[4].id) + '-' +
                              (docrodada.arrayMesa6[4].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[4].id) + '-' +
                               (docrodada.arrayMesa6[4].id) + '-' +
                               (docrodada.arrayMesa7[4].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[4].id) + '-' +
                                (docrodada.arrayMesa6[4].id) + '-' +
                                (docrodada.arrayMesa7[4].id) + '-' +
                                (docrodada.arrayMesa8[4].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[4].id) + '-' +
                                 (docrodada.arrayMesa6[4].id) + '-' +
                                 (docrodada.arrayMesa7[4].id) + '-' +
                                 (docrodada.arrayMesa8[4].id) + '-' +
                                 (docrodada.arrayMesa9[4].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[4].id) + '-' +
                                    (docrodada.arrayMesa6[4].id) + '-' +
                                    (docrodada.arrayMesa7[4].id) + '-' +
                                    (docrodada.arrayMesa8[4].id) + '-' +
                                    (docrodada.arrayMesa9[4].id) + '-' +
                                    (docrodada.arrayMesa10[4].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[4].id) + '-' +
                                     (docrodada.arrayMesa6[4].id) + '-' +
                                     (docrodada.arrayMesa7[4].id) + '-' +
                                     (docrodada.arrayMesa8[4].id) + '-' +
                                     (docrodada.arrayMesa9[4].id) + '-' +
                                     (docrodada.arrayMesa10[4].id) + '-' +
                                     (docrodada.arrayMesa11[4].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[4].id) + '-' +
                                     (docrodada.arrayMesa6[4].id) + '-' +
                                     (docrodada.arrayMesa7[4].id) + '-' +
                                     (docrodada.arrayMesa8[4].id) + '-' +
                                     (docrodada.arrayMesa9[4].id) + '-' +
                                     (docrodada.arrayMesa10[4].id) + '-' +
                                     (docrodada.arrayMesa11[4].id) + '-' +
                                     (docrodada.arrayMesa12[4].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[4].id) + '-' +
                                     (docrodada.arrayMesa6[4].id) + '-' +
                                     (docrodada.arrayMesa7[4].id) + '-' +
                                     (docrodada.arrayMesa8[4].id) + '-' +
                                     (docrodada.arrayMesa9[4].id) + '-' +
                                     (docrodada.arrayMesa10[4].id) + '-' +
                                     (docrodada.arrayMesa11[4].id) + '-' +
                                     (docrodada.arrayMesa12[4].id) + '-' +
                                     (docrodada.arrayMesa13[4].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa15[4].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa15[4].id) + '-' +
                                         (docrodada.arrayMesa16[4].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa15[4].id) + '-' +
                                         (docrodada.arrayMesa16[4].id) + '-' +
                                         (docrodada.arrayMesa17[4].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id) + '-' +
                                             (docrodada.arrayMesa19[4].id) + '-' +
                                             (docrodada.arrayMesa20[4].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id) + '-' +
                                             (docrodada.arrayMesa19[4].id) + '-' +
                                             (docrodada.arrayMesa20[4].id)
                                             :
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id) + '-' +
                                             (docrodada.arrayMesa19[4].id) + '-' +
                                             (docrodada.arrayMesa20[4].id) + '-' +
                                             (docrodada.arrayMesa21[4].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         {docrodada.arrayMesa6.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 6 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[5].id) + '-' +
                             (docrodada.arrayMesa2[5].id) + '-' +
                             (docrodada.arrayMesa3[5].id) + '-' +
                             (docrodada.arrayMesa4[5].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[5].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[5].id) + '-' +
                              (docrodada.arrayMesa6[5].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[5].id) + '-' +
                               (docrodada.arrayMesa6[5].id) + '-' +
                               (docrodada.arrayMesa7[5].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[5].id) + '-' +
                                (docrodada.arrayMesa6[5].id) + '-' +
                                (docrodada.arrayMesa7[5].id) + '-' +
                                (docrodada.arrayMesa8[5].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[5].id) + '-' +
                                 (docrodada.arrayMesa6[5].id) + '-' +
                                 (docrodada.arrayMesa7[5].id) + '-' +
                                 (docrodada.arrayMesa8[5].id) + '-' +
                                 (docrodada.arrayMesa9[5].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[5].id) + '-' +
                                    (docrodada.arrayMesa6[5].id) + '-' +
                                    (docrodada.arrayMesa7[5].id) + '-' +
                                    (docrodada.arrayMesa8[5].id) + '-' +
                                    (docrodada.arrayMesa9[5].id) + '-' +
                                    (docrodada.arrayMesa10[5].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[5].id) + '-' +
                                     (docrodada.arrayMesa6[5].id) + '-' +
                                     (docrodada.arrayMesa7[5].id) + '-' +
                                     (docrodada.arrayMesa8[5].id) + '-' +
                                     (docrodada.arrayMesa9[5].id) + '-' +
                                     (docrodada.arrayMesa10[5].id) + '-' +
                                     (docrodada.arrayMesa11[5].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[5].id) + '-' +
                                     (docrodada.arrayMesa6[5].id) + '-' +
                                     (docrodada.arrayMesa7[5].id) + '-' +
                                     (docrodada.arrayMesa8[5].id) + '-' +
                                     (docrodada.arrayMesa9[5].id) + '-' +
                                     (docrodada.arrayMesa10[5].id) + '-' +
                                     (docrodada.arrayMesa11[5].id) + '-' +
                                     (docrodada.arrayMesa12[5].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[5].id) + '-' +
                                     (docrodada.arrayMesa6[5].id) + '-' +
                                     (docrodada.arrayMesa7[5].id) + '-' +
                                     (docrodada.arrayMesa8[5].id) + '-' +
                                     (docrodada.arrayMesa9[5].id) + '-' +
                                     (docrodada.arrayMesa10[5].id) + '-' +
                                     (docrodada.arrayMesa11[5].id) + '-' +
                                     (docrodada.arrayMesa12[5].id) + '-' +
                                     (docrodada.arrayMesa13[5].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa15[5].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa15[5].id) + '-' +
                                         (docrodada.arrayMesa16[5].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa15[5].id) + '-' +
                                         (docrodada.arrayMesa16[5].id) + '-' +
                                         (docrodada.arrayMesa17[5].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id) + '-' +
                                             (docrodada.arrayMesa19[5].id) + '-' +
                                             (docrodada.arrayMesa20[5].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id) + '-' +
                                             (docrodada.arrayMesa19[5].id) + '-' +
                                             (docrodada.arrayMesa20[5].id)
                                             :
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id) + '-' +
                                             (docrodada.arrayMesa19[5].id) + '-' +
                                             (docrodada.arrayMesa20[5].id) + '-' +
                                             (docrodada.arrayMesa21[5].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                        { docrodada.arrayMesa7.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 7 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[6].id) + '-' +
                             (docrodada.arrayMesa2[6].id) + '-' +
                             (docrodada.arrayMesa3[6].id) + '-' +
                             (docrodada.arrayMesa4[6].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[6].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[6].id) + '-' +
                              (docrodada.arrayMesa6[6].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[6].id) + '-' +
                               (docrodada.arrayMesa6[6].id) + '-' +
                               (docrodada.arrayMesa7[6].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[6].id) + '-' +
                                (docrodada.arrayMesa6[6].id) + '-' +
                                (docrodada.arrayMesa7[6].id) + '-' +
                                (docrodada.arrayMesa8[6].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[6].id) + '-' +
                                 (docrodada.arrayMesa6[6].id) + '-' +
                                 (docrodada.arrayMesa7[6].id) + '-' +
                                 (docrodada.arrayMesa8[6].id) + '-' +
                                 (docrodada.arrayMesa9[6].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[6].id) + '-' +
                                    (docrodada.arrayMesa6[6].id) + '-' +
                                    (docrodada.arrayMesa7[6].id) + '-' +
                                    (docrodada.arrayMesa8[6].id) + '-' +
                                    (docrodada.arrayMesa9[6].id) + '-' +
                                    (docrodada.arrayMesa10[6].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[6].id) + '-' +
                                     (docrodada.arrayMesa6[6].id) + '-' +
                                     (docrodada.arrayMesa7[6].id) + '-' +
                                     (docrodada.arrayMesa8[6].id) + '-' +
                                     (docrodada.arrayMesa9[6].id) + '-' +
                                     (docrodada.arrayMesa10[6].id) + '-' +
                                     (docrodada.arrayMesa11[6].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[6].id) + '-' +
                                     (docrodada.arrayMesa6[6].id) + '-' +
                                     (docrodada.arrayMesa7[6].id) + '-' +
                                     (docrodada.arrayMesa8[6].id) + '-' +
                                     (docrodada.arrayMesa9[6].id) + '-' +
                                     (docrodada.arrayMesa10[6].id) + '-' +
                                     (docrodada.arrayMesa11[6].id) + '-' +
                                     (docrodada.arrayMesa12[6].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[6].id) + '-' +
                                     (docrodada.arrayMesa6[6].id) + '-' +
                                     (docrodada.arrayMesa7[6].id) + '-' +
                                     (docrodada.arrayMesa8[6].id) + '-' +
                                     (docrodada.arrayMesa9[6].id) + '-' +
                                     (docrodada.arrayMesa10[6].id) + '-' +
                                     (docrodada.arrayMesa11[6].id) + '-' +
                                     (docrodada.arrayMesa12[6].id) + '-' +
                                     (docrodada.arrayMesa13[6].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa15[6].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa15[6].id) + '-' +
                                         (docrodada.arrayMesa16[6].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa15[6].id) + '-' +
                                         (docrodada.arrayMesa16[6].id) + '-' +
                                         (docrodada.arrayMesa17[6].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id) + '-' +
                                             (docrodada.arrayMesa19[6].id) + '-' +
                                             (docrodada.arrayMesa20[6].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id) + '-' +
                                             (docrodada.arrayMesa19[6].id) + '-' +
                                             (docrodada.arrayMesa20[6].id)
                                             :
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id) + '-' +
                                             (docrodada.arrayMesa19[6].id) + '-' +
                                             (docrodada.arrayMesa20[6].id) + '-' +
                                             (docrodada.arrayMesa21[6].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        
                        { docrodada.arrayMesa8.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 8 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[7].id) + '-' +
                             (docrodada.arrayMesa2[7].id) + '-' +
                             (docrodada.arrayMesa3[7].id) + '-' +
                             (docrodada.arrayMesa4[7].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[7].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[7].id) + '-' +
                              (docrodada.arrayMesa6[7].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[7].id) + '-' +
                               (docrodada.arrayMesa6[7].id) + '-' +
                               (docrodada.arrayMesa7[7].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[7].id) + '-' +
                                (docrodada.arrayMesa6[7].id) + '-' +
                                (docrodada.arrayMesa7[7].id) + '-' +
                                (docrodada.arrayMesa8[7].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[7].id) + '-' +
                                 (docrodada.arrayMesa6[7].id) + '-' +
                                 (docrodada.arrayMesa7[7].id) + '-' +
                                 (docrodada.arrayMesa8[7].id) + '-' +
                                 (docrodada.arrayMesa9[7].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[7].id) + '-' +
                                    (docrodada.arrayMesa6[7].id) + '-' +
                                    (docrodada.arrayMesa7[7].id) + '-' +
                                    (docrodada.arrayMesa8[7].id) + '-' +
                                    (docrodada.arrayMesa9[7].id) + '-' +
                                    (docrodada.arrayMesa10[7].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[7].id) + '-' +
                                     (docrodada.arrayMesa6[7].id) + '-' +
                                     (docrodada.arrayMesa7[7].id) + '-' +
                                     (docrodada.arrayMesa8[7].id) + '-' +
                                     (docrodada.arrayMesa9[7].id) + '-' +
                                     (docrodada.arrayMesa10[7].id) + '-' +
                                     (docrodada.arrayMesa11[7].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[7].id) + '-' +
                                     (docrodada.arrayMesa6[7].id) + '-' +
                                     (docrodada.arrayMesa7[7].id) + '-' +
                                     (docrodada.arrayMesa8[7].id) + '-' +
                                     (docrodada.arrayMesa9[7].id) + '-' +
                                     (docrodada.arrayMesa10[7].id) + '-' +
                                     (docrodada.arrayMesa11[7].id) + '-' +
                                     (docrodada.arrayMesa12[7].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[7].id) + '-' +
                                     (docrodada.arrayMesa6[7].id) + '-' +
                                     (docrodada.arrayMesa7[7].id) + '-' +
                                     (docrodada.arrayMesa8[7].id) + '-' +
                                     (docrodada.arrayMesa9[7].id) + '-' +
                                     (docrodada.arrayMesa10[7].id) + '-' +
                                     (docrodada.arrayMesa11[7].id) + '-' +
                                     (docrodada.arrayMesa12[7].id) + '-' +
                                     (docrodada.arrayMesa13[7].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa15[7].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa15[7].id) + '-' +
                                         (docrodada.arrayMesa16[7].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa15[7].id) + '-' +
                                         (docrodada.arrayMesa16[7].id) + '-' +
                                         (docrodada.arrayMesa17[7].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id) + '-' +
                                             (docrodada.arrayMesa19[7].id) + '-' +
                                             (docrodada.arrayMesa20[7].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id) + '-' +
                                             (docrodada.arrayMesa19[7].id) + '-' +
                                             (docrodada.arrayMesa20[7].id)
                                             :
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id) + '-' +
                                             (docrodada.arrayMesa19[7].id) + '-' +
                                             (docrodada.arrayMesa20[7].id) + '-' +
                                             (docrodada.arrayMesa21[7].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa9.length != 0  ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 9 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[8].id) + '-' +
                             (docrodada.arrayMesa2[8].id) + '-' +
                             (docrodada.arrayMesa3[8].id) + '-' +
                             (docrodada.arrayMesa4[8].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[8].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[8].id) + '-' +
                              (docrodada.arrayMesa6[8].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[8].id) + '-' +
                               (docrodada.arrayMesa6[8].id) + '-' +
                               (docrodada.arrayMesa7[8].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[8].id) + '-' +
                                (docrodada.arrayMesa6[8].id) + '-' +
                                (docrodada.arrayMesa7[8].id) + '-' +
                                (docrodada.arrayMesa8[8].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[8].id) + '-' +
                                 (docrodada.arrayMesa6[8].id) + '-' +
                                 (docrodada.arrayMesa7[8].id) + '-' +
                                 (docrodada.arrayMesa8[8].id) + '-' +
                                 (docrodada.arrayMesa9[8].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[8].id) + '-' +
                                    (docrodada.arrayMesa6[8].id) + '-' +
                                    (docrodada.arrayMesa7[8].id) + '-' +
                                    (docrodada.arrayMesa8[8].id) + '-' +
                                    (docrodada.arrayMesa9[8].id) + '-' +
                                    (docrodada.arrayMesa10[8].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[8].id) + '-' +
                                     (docrodada.arrayMesa6[8].id) + '-' +
                                     (docrodada.arrayMesa7[8].id) + '-' +
                                     (docrodada.arrayMesa8[8].id) + '-' +
                                     (docrodada.arrayMesa9[8].id) + '-' +
                                     (docrodada.arrayMesa10[8].id) + '-' +
                                     (docrodada.arrayMesa11[8].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[8].id) + '-' +
                                     (docrodada.arrayMesa6[8].id) + '-' +
                                     (docrodada.arrayMesa7[8].id) + '-' +
                                     (docrodada.arrayMesa8[8].id) + '-' +
                                     (docrodada.arrayMesa9[8].id) + '-' +
                                     (docrodada.arrayMesa10[8].id) + '-' +
                                     (docrodada.arrayMesa11[8].id) + '-' +
                                     (docrodada.arrayMesa12[8].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[8].id) + '-' +
                                     (docrodada.arrayMesa6[8].id) + '-' +
                                     (docrodada.arrayMesa7[8].id) + '-' +
                                     (docrodada.arrayMesa8[8].id) + '-' +
                                     (docrodada.arrayMesa9[8].id) + '-' +
                                     (docrodada.arrayMesa10[8].id) + '-' +
                                     (docrodada.arrayMesa11[8].id) + '-' +
                                     (docrodada.arrayMesa12[8].id) + '-' +
                                     (docrodada.arrayMesa13[8].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa15[8].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa15[8].id) + '-' +
                                         (docrodada.arrayMesa16[8].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa15[8].id) + '-' +
                                         (docrodada.arrayMesa16[8].id) + '-' +
                                         (docrodada.arrayMesa17[8].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id) + '-' +
                                             (docrodada.arrayMesa19[8].id) + '-' +
                                             (docrodada.arrayMesa20[8].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id) + '-' +
                                             (docrodada.arrayMesa19[8].id) + '-' +
                                             (docrodada.arrayMesa20[8].id)
                                             :
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id) + '-' +
                                             (docrodada.arrayMesa19[8].id) + '-' +
                                             (docrodada.arrayMesa20[8].id) + '-' +
                                             (docrodada.arrayMesa21[8].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa10.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 10 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[9].id) + '-' +
                             (docrodada.arrayMesa2[9].id) + '-' +
                             (docrodada.arrayMesa3[9].id) + '-' +
                             (docrodada.arrayMesa4[9].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[9].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[9].id) + '-' +
                              (docrodada.arrayMesa6[9].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[9].id) + '-' +
                               (docrodada.arrayMesa6[9].id) + '-' +
                               (docrodada.arrayMesa7[9].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[9].id) + '-' +
                                (docrodada.arrayMesa6[9].id) + '-' +
                                (docrodada.arrayMesa7[9].id) + '-' +
                                (docrodada.arrayMesa8[9].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[9].id) + '-' +
                                 (docrodada.arrayMesa6[9].id) + '-' +
                                 (docrodada.arrayMesa7[9].id) + '-' +
                                 (docrodada.arrayMesa8[9].id) + '-' +
                                 (docrodada.arrayMesa9[9].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[9].id) + '-' +
                                    (docrodada.arrayMesa6[9].id) + '-' +
                                    (docrodada.arrayMesa7[9].id) + '-' +
                                    (docrodada.arrayMesa8[9].id) + '-' +
                                    (docrodada.arrayMesa9[9].id) + '-' +
                                    (docrodada.arrayMesa10[9].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[9].id) + '-' +
                                     (docrodada.arrayMesa6[9].id) + '-' +
                                     (docrodada.arrayMesa7[9].id) + '-' +
                                     (docrodada.arrayMesa8[9].id) + '-' +
                                     (docrodada.arrayMesa9[9].id) + '-' +
                                     (docrodada.arrayMesa10[9].id) + '-' +
                                     (docrodada.arrayMesa11[9].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[9].id) + '-' +
                                     (docrodada.arrayMesa6[9].id) + '-' +
                                     (docrodada.arrayMesa7[9].id) + '-' +
                                     (docrodada.arrayMesa8[9].id) + '-' +
                                     (docrodada.arrayMesa9[9].id) + '-' +
                                     (docrodada.arrayMesa10[9].id) + '-' +
                                     (docrodada.arrayMesa11[9].id) + '-' +
                                     (docrodada.arrayMesa12[9].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[9].id) + '-' +
                                     (docrodada.arrayMesa6[9].id) + '-' +
                                     (docrodada.arrayMesa7[9].id) + '-' +
                                     (docrodada.arrayMesa8[9].id) + '-' +
                                     (docrodada.arrayMesa9[9].id) + '-' +
                                     (docrodada.arrayMesa10[9].id) + '-' +
                                     (docrodada.arrayMesa11[9].id) + '-' +
                                     (docrodada.arrayMesa12[9].id) + '-' +
                                     (docrodada.arrayMesa13[9].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa15[9].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa15[9].id) + '-' +
                                         (docrodada.arrayMesa16[9].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa15[9].id) + '-' +
                                         (docrodada.arrayMesa16[9].id) + '-' +
                                         (docrodada.arrayMesa17[9].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id) + '-' +
                                             (docrodada.arrayMesa19[9].id) + '-' +
                                             (docrodada.arrayMesa20[9].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id) + '-' +
                                             (docrodada.arrayMesa19[9].id) + '-' +
                                             (docrodada.arrayMesa20[9].id)
                                             :
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id) + '-' +
                                             (docrodada.arrayMesa19[9].id) + '-' +
                                             (docrodada.arrayMesa20[9].id) + '-' +
                                             (docrodada.arrayMesa21[9].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        {  docrodada.arrayMesa11.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 11 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[10].id) + '-' +
                             (docrodada.arrayMesa2[10].id) + '-' +
                             (docrodada.arrayMesa3[10].id) + '-' +
                             (docrodada.arrayMesa4[10].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[10].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[10].id) + '-' +
                              (docrodada.arrayMesa6[10].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[10].id) + '-' +
                               (docrodada.arrayMesa6[10].id) + '-' +
                               (docrodada.arrayMesa7[10].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[10].id) + '-' +
                                (docrodada.arrayMesa6[10].id) + '-' +
                                (docrodada.arrayMesa7[10].id) + '-' +
                                (docrodada.arrayMesa8[10].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[10].id) + '-' +
                                 (docrodada.arrayMesa6[10].id) + '-' +
                                 (docrodada.arrayMesa7[10].id) + '-' +
                                 (docrodada.arrayMesa8[10].id) + '-' +
                                 (docrodada.arrayMesa9[10].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[10].id) + '-' +
                                    (docrodada.arrayMesa6[10].id) + '-' +
                                    (docrodada.arrayMesa7[10].id) + '-' +
                                    (docrodada.arrayMesa8[10].id) + '-' +
                                    (docrodada.arrayMesa9[10].id) + '-' +
                                    (docrodada.arrayMesa10[10].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[10].id) + '-' +
                                     (docrodada.arrayMesa6[10].id) + '-' +
                                     (docrodada.arrayMesa7[10].id) + '-' +
                                     (docrodada.arrayMesa8[10].id) + '-' +
                                     (docrodada.arrayMesa9[10].id) + '-' +
                                     (docrodada.arrayMesa10[10].id) + '-' +
                                     (docrodada.arrayMesa11[10].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[10].id) + '-' +
                                     (docrodada.arrayMesa6[10].id) + '-' +
                                     (docrodada.arrayMesa7[10].id) + '-' +
                                     (docrodada.arrayMesa8[10].id) + '-' +
                                     (docrodada.arrayMesa9[10].id) + '-' +
                                     (docrodada.arrayMesa10[10].id) + '-' +
                                     (docrodada.arrayMesa11[10].id) + '-' +
                                     (docrodada.arrayMesa12[10].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[10].id) + '-' +
                                     (docrodada.arrayMesa6[10].id) + '-' +
                                     (docrodada.arrayMesa7[10].id) + '-' +
                                     (docrodada.arrayMesa8[10].id) + '-' +
                                     (docrodada.arrayMesa9[10].id) + '-' +
                                     (docrodada.arrayMesa10[10].id) + '-' +
                                     (docrodada.arrayMesa11[10].id) + '-' +
                                     (docrodada.arrayMesa12[10].id) + '-' +
                                     (docrodada.arrayMesa13[10].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa15[10].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa15[10].id) + '-' +
                                         (docrodada.arrayMesa16[10].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa15[10].id) + '-' +
                                         (docrodada.arrayMesa16[10].id) + '-' +
                                         (docrodada.arrayMesa17[10].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id) + '-' +
                                             (docrodada.arrayMesa19[10].id) + '-' +
                                             (docrodada.arrayMesa20[10].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id) + '-' +
                                             (docrodada.arrayMesa19[10].id) + '-' +
                                             (docrodada.arrayMesa20[10].id)
                                             :
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id) + '-' +
                                             (docrodada.arrayMesa19[10].id) + '-' +
                                             (docrodada.arrayMesa20[10].id) + '-' +
                                             (docrodada.arrayMesa21[10].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa12.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 12 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[11].id) + '-' +
                             (docrodada.arrayMesa2[11].id) + '-' +
                             (docrodada.arrayMesa3[11].id) + '-' +
                             (docrodada.arrayMesa4[11].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[11].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[11].id) + '-' +
                              (docrodada.arrayMesa6[11].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[11].id) + '-' +
                               (docrodada.arrayMesa6[11].id) + '-' +
                               (docrodada.arrayMesa7[11].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[11].id) + '-' +
                                (docrodada.arrayMesa6[11].id) + '-' +
                                (docrodada.arrayMesa7[11].id) + '-' +
                                (docrodada.arrayMesa8[11].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[11].id) + '-' +
                                 (docrodada.arrayMesa6[11].id) + '-' +
                                 (docrodada.arrayMesa7[11].id) + '-' +
                                 (docrodada.arrayMesa8[11].id) + '-' +
                                 (docrodada.arrayMesa9[11].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[11].id) + '-' +
                                    (docrodada.arrayMesa6[11].id) + '-' +
                                    (docrodada.arrayMesa7[11].id) + '-' +
                                    (docrodada.arrayMesa8[11].id) + '-' +
                                    (docrodada.arrayMesa9[11].id) + '-' +
                                    (docrodada.arrayMesa10[11].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[11].id) + '-' +
                                     (docrodada.arrayMesa6[11].id) + '-' +
                                     (docrodada.arrayMesa7[11].id) + '-' +
                                     (docrodada.arrayMesa8[11].id) + '-' +
                                     (docrodada.arrayMesa9[11].id) + '-' +
                                     (docrodada.arrayMesa10[11].id) + '-' +
                                     (docrodada.arrayMesa11[11].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[11].id) + '-' +
                                     (docrodada.arrayMesa6[11].id) + '-' +
                                     (docrodada.arrayMesa7[11].id) + '-' +
                                     (docrodada.arrayMesa8[11].id) + '-' +
                                     (docrodada.arrayMesa9[11].id) + '-' +
                                     (docrodada.arrayMesa10[11].id) + '-' +
                                     (docrodada.arrayMesa11[11].id) + '-' +
                                     (docrodada.arrayMesa12[11].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[11].id) + '-' +
                                     (docrodada.arrayMesa6[11].id) + '-' +
                                     (docrodada.arrayMesa7[11].id) + '-' +
                                     (docrodada.arrayMesa8[11].id) + '-' +
                                     (docrodada.arrayMesa9[11].id) + '-' +
                                     (docrodada.arrayMesa10[11].id) + '-' +
                                     (docrodada.arrayMesa11[11].id) + '-' +
                                     (docrodada.arrayMesa12[11].id) + '-' +
                                     (docrodada.arrayMesa13[11].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id) + '-' +
                                         (docrodada.arrayMesa15[11].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id) + '-' +
                                         (docrodada.arrayMesa15[11].id) + '-' +
                                         (docrodada.arrayMesa16[11].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id) + '-' +
                                         (docrodada.arrayMesa15[11].id) + '-' +
                                         (docrodada.arrayMesa16[11].id) + '-' +
                                         (docrodada.arrayMesa17[11].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id) + '-' +
                                             (docrodada.arrayMesa19[11].id) + '-' +
                                             (docrodada.arrayMesa20[11].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id) + '-' +
                                             (docrodada.arrayMesa19[11].id) + '-' +
                                             (docrodada.arrayMesa20[11].id)
                                             :
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id) + '-' +
                                             (docrodada.arrayMesa19[11].id) + '-' +
                                             (docrodada.arrayMesa20[11].id) + '-' +
                                             (docrodada.arrayMesa21[11].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        {  docrodada.arrayMesa13.length != 0 ?                 
                        <Row xs={12} md={12} className="borderrow grande">
                        <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                        
                        <Card.Text>Mesa 13 </Card.Text>
                        </Col>
                        <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                        <Card.Text className="text-card ">
                        {(docrodada.arrayMesa1[12].id) + '-' +
                            (docrodada.arrayMesa2[12].id) + '-' +
                            (docrodada.arrayMesa3[12].id) + '-' +
                            (docrodada.arrayMesa4[12].id) + '-'} 
                        {   docrodada.arrayMesa1.length == 5 ? 
                            (docrodada.arrayMesa5[12].id)
                             :
                             docrodada.arrayMesa1.length == 6 ?
                             (docrodada.arrayMesa5[12].id) + '-' +
                             (docrodada.arrayMesa6[12].id)
                              :
                              docrodada.arrayMesa1.length == 7 ?
                              (docrodada.arrayMesa5[12].id) + '-' +
                              (docrodada.arrayMesa6[12].id) + '-' +
                              (docrodada.arrayMesa7[12].id)
                               :
                               docrodada.arrayMesa1.length == 8 ?
                               (docrodada.arrayMesa5[12].id) + '-' +
                               (docrodada.arrayMesa6[12].id) + '-' +
                               (docrodada.arrayMesa7[12].id) + '-' +
                               (docrodada.arrayMesa8[12].id)
                                : 
                                docrodada.arrayMesa1.length == 9 ?
                                (docrodada.arrayMesa5[12].id) + '-' +
                                (docrodada.arrayMesa6[12].id) + '-' +
                                (docrodada.arrayMesa7[12].id) + '-' +
                                (docrodada.arrayMesa8[12].id) + '-' +
                                (docrodada.arrayMesa9[12].id) 
                                 :
                                 docrodada.arrayMesa1.length == 10 ?
                                   (docrodada.arrayMesa5[12].id) + '-' +
                                   (docrodada.arrayMesa6[12].id) + '-' +
                                   (docrodada.arrayMesa7[12].id) + '-' +
                                   (docrodada.arrayMesa8[12].id) + '-' +
                                   (docrodada.arrayMesa9[12].id) + '-' +
                                   (docrodada.arrayMesa10[12].id)
                                       
                                    :
                                    docrodada.arrayMesa1.length == 11 ?
                                    (docrodada.arrayMesa5[12].id) + '-' +
                                    (docrodada.arrayMesa6[12].id) + '-' +
                                    (docrodada.arrayMesa7[12].id) + '-' +
                                    (docrodada.arrayMesa8[12].id) + '-' +
                                    (docrodada.arrayMesa9[12].id) + '-' +
                                    (docrodada.arrayMesa10[12].id) + '-' +
                                    (docrodada.arrayMesa11[12].id)
                                    :
                                    docrodada.arrayMesa1.length == 12 ?
                                    (docrodada.arrayMesa5[12].id) + '-' +
                                    (docrodada.arrayMesa6[12].id) + '-' +
                                    (docrodada.arrayMesa7[12].id) + '-' +
                                    (docrodada.arrayMesa8[12].id) + '-' +
                                    (docrodada.arrayMesa9[12].id) + '-' +
                                    (docrodada.arrayMesa10[12].id) + '-' +
                                    (docrodada.arrayMesa11[12].id) + '-' +
                                    (docrodada.arrayMesa12[12].id)
                                    :
                                    docrodada.arrayMesa1.length == 13 ?
                                    (docrodada.arrayMesa5[12].id) + '-' +
                                    (docrodada.arrayMesa6[12].id) + '-' +
                                    (docrodada.arrayMesa7[12].id) + '-' +
                                    (docrodada.arrayMesa8[12].id) + '-' +
                                    (docrodada.arrayMesa9[12].id) + '-' +
                                    (docrodada.arrayMesa10[12].id) + '-' +
                                    (docrodada.arrayMesa11[12].id) + '-' +
                                    (docrodada.arrayMesa12[12].id) + '-' +
                                    (docrodada.arrayMesa13[12].id) 
                                        :
                                        docrodada.arrayMesa1.length == 14 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id)
                                        :
                                        docrodada.arrayMesa1.length == 15 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id) + '-' +
                                        (docrodada.arrayMesa15[12].id)
                                        :
                                        docrodada.arrayMesa1.length == 16 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id) + '-' +
                                        (docrodada.arrayMesa15[12].id) + '-' +
                                        (docrodada.arrayMesa16[12].id) 
                                        :
                                        docrodada.arrayMesa1.length == 17 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id) + '-' +
                                        (docrodada.arrayMesa15[12].id) + '-' +
                                        (docrodada.arrayMesa16[12].id) + '-' +
                                        (docrodada.arrayMesa17[12].id)
                                            :
                                            docrodada.arrayMesa1.length == 18 ?
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa12[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id)
                                            :
                                            docrodada.arrayMesa1.length == 19 ?
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id) + '-' +
                                            (docrodada.arrayMesa19[12].id) + '-' +
                                            (docrodada.arrayMesa20[12].id) 
                                            :
                                            docrodada.arrayMesa1.length == 20 ?
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa12[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id) + '-' +
                                            (docrodada.arrayMesa19[12].id) + '-' +
                                            (docrodada.arrayMesa20[12].id)
                                            :
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa12[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id) + '-' +
                                            (docrodada.arrayMesa19[12].id) + '-' +
                                            (docrodada.arrayMesa20[12].id) + '-' +
                                            (docrodada.arrayMesa21[12].id)
                                             
                                    }             
                        
                        </Card.Text>
                        </Col>
                        </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa14.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 14 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[13].id) + '-' +
                             (docrodada.arrayMesa2[13].id) + '-' +
                             (docrodada.arrayMesa3[13].id) + '-' +
                             (docrodada.arrayMesa4[13].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[13].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[13].id) + '-' +
                              (docrodada.arrayMesa6[13].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[13].id) + '-' +
                               (docrodada.arrayMesa6[13].id) + '-' +
                               (docrodada.arrayMesa7[13].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[13].id) + '-' +
                                (docrodada.arrayMesa6[13].id) + '-' +
                                (docrodada.arrayMesa7[13].id) + '-' +
                                (docrodada.arrayMesa8[13].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[13].id) + '-' +
                                 (docrodada.arrayMesa6[13].id) + '-' +
                                 (docrodada.arrayMesa7[13].id) + '-' +
                                 (docrodada.arrayMesa8[13].id) + '-' +
                                 (docrodada.arrayMesa9[13].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[13].id) + '-' +
                                    (docrodada.arrayMesa6[13].id) + '-' +
                                    (docrodada.arrayMesa7[13].id) + '-' +
                                    (docrodada.arrayMesa8[13].id) + '-' +
                                    (docrodada.arrayMesa9[13].id) + '-' +
                                    (docrodada.arrayMesa10[13].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[13].id) + '-' +
                                     (docrodada.arrayMesa6[13].id) + '-' +
                                     (docrodada.arrayMesa7[13].id) + '-' +
                                     (docrodada.arrayMesa8[13].id) + '-' +
                                     (docrodada.arrayMesa9[13].id) + '-' +
                                     (docrodada.arrayMesa10[13].id) + '-' +
                                     (docrodada.arrayMesa11[13].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[13].id) + '-' +
                                     (docrodada.arrayMesa6[13].id) + '-' +
                                     (docrodada.arrayMesa7[13].id) + '-' +
                                     (docrodada.arrayMesa8[13].id) + '-' +
                                     (docrodada.arrayMesa9[13].id) + '-' +
                                     (docrodada.arrayMesa10[13].id) + '-' +
                                     (docrodada.arrayMesa11[13].id) + '-' +
                                     (docrodada.arrayMesa12[13].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[13].id) + '-' +
                                     (docrodada.arrayMesa6[13].id) + '-' +
                                     (docrodada.arrayMesa7[13].id) + '-' +
                                     (docrodada.arrayMesa8[13].id) + '-' +
                                     (docrodada.arrayMesa9[13].id) + '-' +
                                     (docrodada.arrayMesa10[13].id) + '-' +
                                     (docrodada.arrayMesa11[13].id) + '-' +
                                     (docrodada.arrayMesa12[13].id) + '-' +
                                     (docrodada.arrayMesa13[13].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id) + '-' +
                                         (docrodada.arrayMesa15[13].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id) + '-' +
                                         (docrodada.arrayMesa15[13].id) + '-' +
                                         (docrodada.arrayMesa16[13].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id) + '-' +
                                         (docrodada.arrayMesa15[13].id) + '-' +
                                         (docrodada.arrayMesa16[13].id) + '-' +
                                         (docrodada.arrayMesa17[13].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id) + '-' +
                                             (docrodada.arrayMesa19[13].id) + '-' +
                                             (docrodada.arrayMesa20[13].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id) + '-' +
                                             (docrodada.arrayMesa19[13].id) + '-' +
                                             (docrodada.arrayMesa20[13].id)
                                             :
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id) + '-' +
                                             (docrodada.arrayMesa19[13].id) + '-' +
                                             (docrodada.arrayMesa20[13].id) + '-' +
                                             (docrodada.arrayMesa21[13].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa15.length != 0?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 15 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[14].id) + '-' +
                             (docrodada.arrayMesa2[14].id) + '-' +
                             (docrodada.arrayMesa3[14].id) + '-' +
                             (docrodada.arrayMesa4[14].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[14].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[14].id) + '-' +
                              (docrodada.arrayMesa6[14].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[14].id) + '-' +
                               (docrodada.arrayMesa6[14].id) + '-' +
                               (docrodada.arrayMesa7[14].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[14].id) + '-' +
                                (docrodada.arrayMesa6[14].id) + '-' +
                                (docrodada.arrayMesa7[14].id) + '-' +
                                (docrodada.arrayMesa8[14].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[14].id) + '-' +
                                 (docrodada.arrayMesa6[14].id) + '-' +
                                 (docrodada.arrayMesa7[14].id) + '-' +
                                 (docrodada.arrayMesa8[14].id) + '-' +
                                 (docrodada.arrayMesa9[14].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[14].id) + '-' +
                                    (docrodada.arrayMesa6[14].id) + '-' +
                                    (docrodada.arrayMesa7[14].id) + '-' +
                                    (docrodada.arrayMesa8[14].id) + '-' +
                                    (docrodada.arrayMesa9[14].id) + '-' +
                                    (docrodada.arrayMesa10[14].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[14].id) + '-' +
                                     (docrodada.arrayMesa6[14].id) + '-' +
                                     (docrodada.arrayMesa7[14].id) + '-' +
                                     (docrodada.arrayMesa8[14].id) + '-' +
                                     (docrodada.arrayMesa9[14].id) + '-' +
                                     (docrodada.arrayMesa10[14].id) + '-' +
                                     (docrodada.arrayMesa11[14].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[14].id) + '-' +
                                     (docrodada.arrayMesa6[14].id) + '-' +
                                     (docrodada.arrayMesa7[14].id) + '-' +
                                     (docrodada.arrayMesa8[14].id) + '-' +
                                     (docrodada.arrayMesa9[14].id) + '-' +
                                     (docrodada.arrayMesa10[14].id) + '-' +
                                     (docrodada.arrayMesa11[14].id) + '-' +
                                     (docrodada.arrayMesa12[14].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[14].id) + '-' +
                                     (docrodada.arrayMesa6[14].id) + '-' +
                                     (docrodada.arrayMesa7[14].id) + '-' +
                                     (docrodada.arrayMesa8[14].id) + '-' +
                                     (docrodada.arrayMesa9[14].id) + '-' +
                                     (docrodada.arrayMesa10[14].id) + '-' +
                                     (docrodada.arrayMesa11[14].id) + '-' +
                                     (docrodada.arrayMesa12[14].id) + '-' +
                                     (docrodada.arrayMesa13[14].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id) + '-' +
                                         (docrodada.arrayMesa15[14].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id) + '-' +
                                         (docrodada.arrayMesa15[14].id) + '-' +
                                         (docrodada.arrayMesa16[14].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id) + '-' +
                                         (docrodada.arrayMesa15[14].id) + '-' +
                                         (docrodada.arrayMesa16[14].id) + '-' +
                                         (docrodada.arrayMesa17[14].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id) + '-' +
                                             (docrodada.arrayMesa19[14].id) + '-' +
                                             (docrodada.arrayMesa20[14].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id) + '-' +
                                             (docrodada.arrayMesa19[14].id) + '-' +
                                             (docrodada.arrayMesa20[14].id)
                                             :
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id) + '-' +
                                             (docrodada.arrayMesa19[14].id) + '-' +
                                             (docrodada.arrayMesa20[14].id) + '-' +
                                             (docrodada.arrayMesa21[14].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }

 
                         </Col>    

           
                    )
                } )

                :
                contarReuniao ==3 ?
                rodadas.sort((a,b)=> a.dataRodada > b.dataRodada ? 1 : -1).slice(-1).map((docrodada, indexrodada) => {
                    return(

                         
                    
                         <Col xs={6} md={6} className="mesas">
                            
                         <Row xs={12} md={12} className="borderrow grande">
                             <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                             
                             <Card.Text>Mesa 1 </Card.Text>
                             </Col>
                             <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                             <Card.Text className="text-card ">
                             {   (docrodada.arrayMesa2[0].id) + '-' +
                                 (docrodada.arrayMesa3[0].id) + '-' +
                                 (docrodada.arrayMesa4[0].id) + '-'} 
                             {   docrodada.arrayMesa1.length == 5 ? 
                                 (docrodada.arrayMesa5[0].id) + '-' +
                                 (docrodada.arrayMesa1[0].id) 
                                  :
                                  docrodada.arrayMesa1.length == 6 ?
                                  (docrodada.arrayMesa5[0].id) + '-' +
                                  (docrodada.arrayMesa6[0].id) + '-' +
                                  (docrodada.arrayMesa1[0].id) 
                                   :
                                   docrodada.arrayMesa1.length == 7 ?
                                   (docrodada.arrayMesa5[0].id) + '-' +
                                   (docrodada.arrayMesa6[0].id) + '-' +
                                   (docrodada.arrayMesa7[0].id) + '-' +
                                   (docrodada.arrayMesa1[0].id) 
                                    :
                                    docrodada.arrayMesa1.length == 8 ?
                                    (docrodada.arrayMesa5[0].id) + '-' +
                                    (docrodada.arrayMesa6[0].id) + '-' +
                                    (docrodada.arrayMesa7[0].id) + '-' +
                                    (docrodada.arrayMesa8[0].id) + '-' +
                                    (docrodada.arrayMesa1[0].id) 
                                     : 
                                     docrodada.arrayMesa1.length == 9 ?
                                     (docrodada.arrayMesa5[0].id) + '-' +
                                     (docrodada.arrayMesa6[0].id) + '-' +
                                     (docrodada.arrayMesa7[0].id) + '-' +
                                     (docrodada.arrayMesa8[0].id) + '-' +
                                     (docrodada.arrayMesa9[0].id) + '-' +
                                     (docrodada.arrayMesa1[0].id)
                                      :
                                      docrodada.arrayMesa1.length == 10 ?
                                        (docrodada.arrayMesa5[0].id) + '-' +
                                        (docrodada.arrayMesa6[0].id) + '-' +
                                        (docrodada.arrayMesa7[0].id) + '-' +
                                        (docrodada.arrayMesa8[0].id) + '-' +
                                        (docrodada.arrayMesa9[0].id) + '-' +
                                        (docrodada.arrayMesa10[0].id) + '-' +
                                        (docrodada.arrayMesa1[0].id) 
                                            
                                         :
                                         docrodada.arrayMesa1.length == 11 ?
                                         (docrodada.arrayMesa5[0].id) + '-' +
                                         (docrodada.arrayMesa6[0].id) + '-' +
                                         (docrodada.arrayMesa7[0].id) + '-' +
                                         (docrodada.arrayMesa8[0].id) + '-' +
                                         (docrodada.arrayMesa9[0].id) + '-' +
                                         (docrodada.arrayMesa10[0].id) + '-' +
                                         (docrodada.arrayMesa11[0].id)  + '-' +
                                         (docrodada.arrayMesa1[0].id)
                                         :
                                         docrodada.arrayMesa1.length == 12 ?
                                         (docrodada.arrayMesa5[0].id) + '-' +
                                         (docrodada.arrayMesa6[0].id) + '-' +
                                         (docrodada.arrayMesa7[0].id) + '-' +
                                         (docrodada.arrayMesa8[0].id) + '-' +
                                         (docrodada.arrayMesa9[0].id) + '-' +
                                         (docrodada.arrayMesa10[0].id) + '-' +
                                         (docrodada.arrayMesa11[0].id) + '-' +
                                         (docrodada.arrayMesa12[0].id) + '-' +
                                         (docrodada.arrayMesa1[0].id)
                                         :
                                         docrodada.arrayMesa1.length == 13 ?
                                         (docrodada.arrayMesa5[0].id) + '-' +
                                         (docrodada.arrayMesa6[0].id) + '-' +
                                         (docrodada.arrayMesa7[0].id) + '-' +
                                         (docrodada.arrayMesa8[0].id) + '-' +
                                         (docrodada.arrayMesa9[0].id) + '-' +
                                         (docrodada.arrayMesa10[0].id) + '-' +
                                         (docrodada.arrayMesa11[0].id) + '-' +
                                         (docrodada.arrayMesa12[0].id) + '-' +
                                         (docrodada.arrayMesa13[0].id)  + '-' +
                                         (docrodada.arrayMesa1[0].id) 
                                             :
                                             docrodada.arrayMesa1.length == 14 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id)  + '-' +
                                             (docrodada.arrayMesa1[0].id) 
                                             :
                                             docrodada.arrayMesa1.length == 15 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id) + '-' +
                                             (docrodada.arrayMesa15[0].id)  + '-' +
                                             (docrodada.arrayMesa1[0].id) 
                                             :
                                             docrodada.arrayMesa1.length == 16 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id) + '-' +
                                             (docrodada.arrayMesa15[0].id) + '-' +
                                             (docrodada.arrayMesa16[0].id) + '-' +
                                             (docrodada.arrayMesa1[0].id) 
                                             :
                                             docrodada.arrayMesa1.length == 17 ?
                                             (docrodada.arrayMesa5[0].id) + '-' +
                                             (docrodada.arrayMesa6[0].id) + '-' +
                                             (docrodada.arrayMesa7[0].id) + '-' +
                                             (docrodada.arrayMesa8[0].id) + '-' +
                                             (docrodada.arrayMesa9[0].id) + '-' +
                                             (docrodada.arrayMesa10[0].id) + '-' +
                                             (docrodada.arrayMesa11[0].id) + '-' +
                                             (docrodada.arrayMesa12[0].id) + '-' +
                                             (docrodada.arrayMesa13[0].id) + '-' +
                                             (docrodada.arrayMesa14[0].id) + '-' +
                                             (docrodada.arrayMesa15[0].id) + '-' +
                                             (docrodada.arrayMesa16[0].id) + '-' +
                                             (docrodada.arrayMesa17[0].id) + '-' +
                                             (docrodada.arrayMesa1[0].id)
                                                 :
                                                 docrodada.arrayMesa1.length == 18 ?
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa12[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id)  + '-' +
                                                 (docrodada.arrayMesa1[0].id)
                                                 :
                                                 docrodada.arrayMesa1.length == 19 ?
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id) + '-' +
                                                 (docrodada.arrayMesa19[0].id) + '-' +
                                                 (docrodada.arrayMesa20[0].id)  + '-' +
                                                 (docrodada.arrayMesa1[0].id) 
                                                 :
                                                 docrodada.arrayMesa1.length == 20 ?
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa12[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id) + '-' +
                                                 (docrodada.arrayMesa19[0].id) + '-' +
                                                 (docrodada.arrayMesa20[0].id) + '-' +
                                                 (docrodada.arrayMesa1[0].id)
                                                 :
                                                 (docrodada.arrayMesa5[0].id) + '-' +
                                                 (docrodada.arrayMesa6[0].id) + '-' +
                                                 (docrodada.arrayMesa7[0].id) + '-' +
                                                 (docrodada.arrayMesa8[0].id) + '-' +
                                                 (docrodada.arrayMesa9[0].id) + '-' +
                                                 (docrodada.arrayMesa10[0].id) + '-' +
                                                 (docrodada.arrayMesa11[0].id) + '-' +
                                                 (docrodada.arrayMesa12[0].id) + '-' +
                                                 (docrodada.arrayMesa13[0].id) + '-' +
                                                 (docrodada.arrayMesa14[0].id) + '-' +
                                                 (docrodada.arrayMesa15[0].id) + '-' +
                                                 (docrodada.arrayMesa16[0].id) + '-' +
                                                 (docrodada.arrayMesa17[0].id) + '-' +
                                                 (docrodada.arrayMesa18[0].id) + '-' +
                                                 (docrodada.arrayMesa19[0].id) + '-' +
                                                 (docrodada.arrayMesa20[0].id) + '-' +
                                                 (docrodada.arrayMesa21[0].id) + '-' +
                                                 (docrodada.arrayMesa1[0].id)
                                                  
                                         }             
                             
                             </Card.Text>
                             </Col>
                         </Row>
                         {  docrodada.arrayMesa2.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 2 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[1].id) + '-' +
                             (docrodada.arrayMesa2[1].id) + '-' +
                             (docrodada.arrayMesa3[1].id) + '-' +
                             (docrodada.arrayMesa4[1].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[1].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[1].id) + '-' +
                              (docrodada.arrayMesa6[1].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[1].id) + '-' +
                               (docrodada.arrayMesa6[1].id) + '-' +
                               (docrodada.arrayMesa7[1].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[1].id) + '-' +
                                (docrodada.arrayMesa6[1].id) + '-' +
                                (docrodada.arrayMesa7[1].id) + '-' +
                                (docrodada.arrayMesa8[1].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[1].id) + '-' +
                                 (docrodada.arrayMesa6[1].id) + '-' +
                                 (docrodada.arrayMesa7[1].id) + '-' +
                                 (docrodada.arrayMesa8[1].id) + '-' +
                                 (docrodada.arrayMesa9[1].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[1].id) + '-' +
                                    (docrodada.arrayMesa6[1].id) + '-' +
                                    (docrodada.arrayMesa7[1].id) + '-' +
                                    (docrodada.arrayMesa8[1].id) + '-' +
                                    (docrodada.arrayMesa9[1].id) + '-' +
                                    (docrodada.arrayMesa10[1].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[1].id) + '-' +
                                     (docrodada.arrayMesa6[1].id) + '-' +
                                     (docrodada.arrayMesa7[1].id) + '-' +
                                     (docrodada.arrayMesa8[1].id) + '-' +
                                     (docrodada.arrayMesa9[1].id) + '-' +
                                     (docrodada.arrayMesa10[1].id) + '-' +
                                     (docrodada.arrayMesa11[1].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[1].id) + '-' +
                                     (docrodada.arrayMesa6[1].id) + '-' +
                                     (docrodada.arrayMesa7[1].id) + '-' +
                                     (docrodada.arrayMesa8[1].id) + '-' +
                                     (docrodada.arrayMesa9[1].id) + '-' +
                                     (docrodada.arrayMesa10[1].id) + '-' +
                                     (docrodada.arrayMesa11[1].id) + '-' +
                                     (docrodada.arrayMesa12[1].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[1].id) + '-' +
                                     (docrodada.arrayMesa6[1].id) + '-' +
                                     (docrodada.arrayMesa7[1].id) + '-' +
                                     (docrodada.arrayMesa8[1].id) + '-' +
                                     (docrodada.arrayMesa9[1].id) + '-' +
                                     (docrodada.arrayMesa10[1].id) + '-' +
                                     (docrodada.arrayMesa11[1].id) + '-' +
                                     (docrodada.arrayMesa12[1].id) + '-' +
                                     (docrodada.arrayMesa13[1].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id) + '-' +
                                         (docrodada.arrayMesa15[1].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id) + '-' +
                                         (docrodada.arrayMesa15[1].id) + '-' +
                                         (docrodada.arrayMesa16[1].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[1].id) + '-' +
                                         (docrodada.arrayMesa6[1].id) + '-' +
                                         (docrodada.arrayMesa7[1].id) + '-' +
                                         (docrodada.arrayMesa8[1].id) + '-' +
                                         (docrodada.arrayMesa9[1].id) + '-' +
                                         (docrodada.arrayMesa10[1].id) + '-' +
                                         (docrodada.arrayMesa11[1].id) + '-' +
                                         (docrodada.arrayMesa12[1].id) + '-' +
                                         (docrodada.arrayMesa13[1].id) + '-' +
                                         (docrodada.arrayMesa14[1].id) + '-' +
                                         (docrodada.arrayMesa15[1].id) + '-' +
                                         (docrodada.arrayMesa16[1].id) + '-' +
                                         (docrodada.arrayMesa17[1].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa12[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id) + '-' +
                                             (docrodada.arrayMesa19[1].id) + '-' +
                                             (docrodada.arrayMesa20[1].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa12[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id) + '-' +
                                             (docrodada.arrayMesa19[1].id) + '-' +
                                             (docrodada.arrayMesa20[1].id)
                                             :
                                             (docrodada.arrayMesa5[1].id) + '-' +
                                             (docrodada.arrayMesa6[1].id) + '-' +
                                             (docrodada.arrayMesa7[1].id) + '-' +
                                             (docrodada.arrayMesa8[1].id) + '-' +
                                             (docrodada.arrayMesa9[1].id) + '-' +
                                             (docrodada.arrayMesa10[1].id) + '-' +
                                             (docrodada.arrayMesa11[1].id) + '-' +
                                             (docrodada.arrayMesa12[1].id) + '-' +
                                             (docrodada.arrayMesa13[1].id) + '-' +
                                             (docrodada.arrayMesa14[1].id) + '-' +
                                             (docrodada.arrayMesa15[1].id) + '-' +
                                             (docrodada.arrayMesa16[1].id) + '-' +
                                             (docrodada.arrayMesa17[1].id) + '-' +
                                             (docrodada.arrayMesa18[1].id) + '-' +
                                             (docrodada.arrayMesa19[1].id) + '-' +
                                             (docrodada.arrayMesa20[1].id) + '-' +
                                             (docrodada.arrayMesa21[1].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         { docrodada.arrayMesa3.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 3 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[2].id) + '-' +
                             (docrodada.arrayMesa2[2].id) + '-' +
                             (docrodada.arrayMesa3[2].id) + '-' +
                             (docrodada.arrayMesa4[2].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[2].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[2].id) + '-' +
                              (docrodada.arrayMesa6[2].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[2].id) + '-' +
                               (docrodada.arrayMesa6[2].id) + '-' +
                               (docrodada.arrayMesa7[2].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[2].id) + '-' +
                                (docrodada.arrayMesa6[2].id) + '-' +
                                (docrodada.arrayMesa7[2].id) + '-' +
                                (docrodada.arrayMesa8[2].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[2].id) + '-' +
                                 (docrodada.arrayMesa6[2].id) + '-' +
                                 (docrodada.arrayMesa7[2].id) + '-' +
                                 (docrodada.arrayMesa8[2].id) + '-' +
                                 (docrodada.arrayMesa9[2].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[2].id) + '-' +
                                    (docrodada.arrayMesa6[2].id) + '-' +
                                    (docrodada.arrayMesa7[2].id) + '-' +
                                    (docrodada.arrayMesa8[2].id) + '-' +
                                    (docrodada.arrayMesa9[2].id) + '-' +
                                    (docrodada.arrayMesa10[2].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[2].id) + '-' +
                                     (docrodada.arrayMesa6[2].id) + '-' +
                                     (docrodada.arrayMesa7[2].id) + '-' +
                                     (docrodada.arrayMesa8[2].id) + '-' +
                                     (docrodada.arrayMesa9[2].id) + '-' +
                                     (docrodada.arrayMesa10[2].id) + '-' +
                                     (docrodada.arrayMesa11[2].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[2].id) + '-' +
                                     (docrodada.arrayMesa6[2].id) + '-' +
                                     (docrodada.arrayMesa7[2].id) + '-' +
                                     (docrodada.arrayMesa8[2].id) + '-' +
                                     (docrodada.arrayMesa9[2].id) + '-' +
                                     (docrodada.arrayMesa10[2].id) + '-' +
                                     (docrodada.arrayMesa11[2].id) + '-' +
                                     (docrodada.arrayMesa12[2].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[2].id) + '-' +
                                     (docrodada.arrayMesa6[2].id) + '-' +
                                     (docrodada.arrayMesa7[2].id) + '-' +
                                     (docrodada.arrayMesa8[2].id) + '-' +
                                     (docrodada.arrayMesa9[2].id) + '-' +
                                     (docrodada.arrayMesa10[2].id) + '-' +
                                     (docrodada.arrayMesa11[2].id) + '-' +
                                     (docrodada.arrayMesa12[2].id) + '-' +
                                     (docrodada.arrayMesa13[2].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id) + '-' +
                                         (docrodada.arrayMesa15[2].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id) + '-' +
                                         (docrodada.arrayMesa15[2].id) + '-' +
                                         (docrodada.arrayMesa16[2].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[2].id) + '-' +
                                         (docrodada.arrayMesa6[2].id) + '-' +
                                         (docrodada.arrayMesa7[2].id) + '-' +
                                         (docrodada.arrayMesa8[2].id) + '-' +
                                         (docrodada.arrayMesa9[2].id) + '-' +
                                         (docrodada.arrayMesa10[2].id) + '-' +
                                         (docrodada.arrayMesa11[2].id) + '-' +
                                         (docrodada.arrayMesa12[2].id) + '-' +
                                         (docrodada.arrayMesa13[2].id) + '-' +
                                         (docrodada.arrayMesa14[2].id) + '-' +
                                         (docrodada.arrayMesa15[2].id) + '-' +
                                         (docrodada.arrayMesa16[2].id) + '-' +
                                         (docrodada.arrayMesa17[2].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa12[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id) + '-' +
                                             (docrodada.arrayMesa19[2].id) + '-' +
                                             (docrodada.arrayMesa20[2].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa12[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id) + '-' +
                                             (docrodada.arrayMesa19[2].id) + '-' +
                                             (docrodada.arrayMesa20[2].id)
                                             :
                                             (docrodada.arrayMesa5[2].id) + '-' +
                                             (docrodada.arrayMesa6[2].id) + '-' +
                                             (docrodada.arrayMesa7[2].id) + '-' +
                                             (docrodada.arrayMesa8[2].id) + '-' +
                                             (docrodada.arrayMesa9[2].id) + '-' +
                                             (docrodada.arrayMesa10[2].id) + '-' +
                                             (docrodada.arrayMesa11[2].id) + '-' +
                                             (docrodada.arrayMesa12[2].id) + '-' +
                                             (docrodada.arrayMesa13[2].id) + '-' +
                                             (docrodada.arrayMesa14[2].id) + '-' +
                                             (docrodada.arrayMesa15[2].id) + '-' +
                                             (docrodada.arrayMesa16[2].id) + '-' +
                                             (docrodada.arrayMesa17[2].id) + '-' +
                                             (docrodada.arrayMesa18[2].id) + '-' +
                                             (docrodada.arrayMesa19[2].id) + '-' +
                                             (docrodada.arrayMesa20[2].id) + '-' +
                                             (docrodada.arrayMesa21[2].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         { docrodada.arrayMesa4.length != 0 ?
                          <Row xs={12} md={12} className="borderrow grande">
                          <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                          
                          <Card.Text>Mesa 4 </Card.Text>
                          </Col>
                          <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                          <Card.Text className="text-card ">
                          {(docrodada.arrayMesa1[3].id) + '-' +
                              (docrodada.arrayMesa2[3].id) + '-' +
                              (docrodada.arrayMesa3[3].id) + '-' +
                              (docrodada.arrayMesa4[3].id) + '-'} 
                          {   docrodada.arrayMesa1.length == 5 ? 
                              (docrodada.arrayMesa5[3].id)
                               :
                               docrodada.arrayMesa1.length == 6 ?
                               (docrodada.arrayMesa5[3].id) + '-' +
                               (docrodada.arrayMesa6[3].id)
                                :
                                docrodada.arrayMesa1.length == 7 ?
                                (docrodada.arrayMesa5[3].id) + '-' +
                                (docrodada.arrayMesa6[3].id) + '-' +
                                (docrodada.arrayMesa7[3].id)
                                 :
                                 docrodada.arrayMesa1.length == 8 ?
                                 (docrodada.arrayMesa5[3].id) + '-' +
                                 (docrodada.arrayMesa6[3].id) + '-' +
                                 (docrodada.arrayMesa7[3].id) + '-' +
                                 (docrodada.arrayMesa8[3].id)
                                  : 
                                  docrodada.arrayMesa1.length == 9 ?
                                  (docrodada.arrayMesa5[3].id) + '-' +
                                  (docrodada.arrayMesa6[3].id) + '-' +
                                  (docrodada.arrayMesa7[3].id) + '-' +
                                  (docrodada.arrayMesa8[3].id) + '-' +
                                  (docrodada.arrayMesa9[3].id) 
                                   :
                                   docrodada.arrayMesa1.length == 10 ?
                                     (docrodada.arrayMesa5[3].id) + '-' +
                                     (docrodada.arrayMesa6[3].id) + '-' +
                                     (docrodada.arrayMesa7[3].id) + '-' +
                                     (docrodada.arrayMesa8[3].id) + '-' +
                                     (docrodada.arrayMesa9[3].id) + '-' +
                                     (docrodada.arrayMesa10[3].id)
                                         
                                      :
                                      docrodada.arrayMesa1.length == 11 ?
                                      (docrodada.arrayMesa5[3].id) + '-' +
                                      (docrodada.arrayMesa6[3].id) + '-' +
                                      (docrodada.arrayMesa7[3].id) + '-' +
                                      (docrodada.arrayMesa8[3].id) + '-' +
                                      (docrodada.arrayMesa9[3].id) + '-' +
                                      (docrodada.arrayMesa10[3].id) + '-' +
                                      (docrodada.arrayMesa11[3].id)
                                      :
                                      docrodada.arrayMesa1.length == 12 ?
                                      (docrodada.arrayMesa5[3].id) + '-' +
                                      (docrodada.arrayMesa6[3].id) + '-' +
                                      (docrodada.arrayMesa7[3].id) + '-' +
                                      (docrodada.arrayMesa8[3].id) + '-' +
                                      (docrodada.arrayMesa9[3].id) + '-' +
                                      (docrodada.arrayMesa10[3].id) + '-' +
                                      (docrodada.arrayMesa11[3].id) + '-' +
                                      (docrodada.arrayMesa12[3].id)
                                      :
                                      docrodada.arrayMesa1.length == 13 ?
                                      (docrodada.arrayMesa5[3].id) + '-' +
                                      (docrodada.arrayMesa6[3].id) + '-' +
                                      (docrodada.arrayMesa7[3].id) + '-' +
                                      (docrodada.arrayMesa8[3].id) + '-' +
                                      (docrodada.arrayMesa9[3].id) + '-' +
                                      (docrodada.arrayMesa10[3].id) + '-' +
                                      (docrodada.arrayMesa11[3].id) + '-' +
                                      (docrodada.arrayMesa12[3].id) + '-' +
                                      (docrodada.arrayMesa13[3].id) 
                                          :
                                          docrodada.arrayMesa1.length == 14 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id)
                                          :
                                          docrodada.arrayMesa1.length == 15 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id) + '-' +
                                          (docrodada.arrayMesa15[3].id)
                                          :
                                          docrodada.arrayMesa1.length == 16 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id) + '-' +
                                          (docrodada.arrayMesa15[3].id) + '-' +
                                          (docrodada.arrayMesa16[3].id) 
                                          :
                                          docrodada.arrayMesa1.length == 17 ?
                                          (docrodada.arrayMesa5[3].id) + '-' +
                                          (docrodada.arrayMesa6[3].id) + '-' +
                                          (docrodada.arrayMesa7[3].id) + '-' +
                                          (docrodada.arrayMesa8[3].id) + '-' +
                                          (docrodada.arrayMesa9[3].id) + '-' +
                                          (docrodada.arrayMesa10[3].id) + '-' +
                                          (docrodada.arrayMesa11[3].id) + '-' +
                                          (docrodada.arrayMesa12[3].id) + '-' +
                                          (docrodada.arrayMesa13[3].id) + '-' +
                                          (docrodada.arrayMesa14[3].id) + '-' +
                                          (docrodada.arrayMesa15[3].id) + '-' +
                                          (docrodada.arrayMesa16[3].id) + '-' +
                                          (docrodada.arrayMesa17[3].id)
                                              :
                                              docrodada.arrayMesa1.length == 18 ?
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa12[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id)
                                              :
                                              docrodada.arrayMesa1.length == 19 ?
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id) + '-' +
                                              (docrodada.arrayMesa19[3].id) + '-' +
                                              (docrodada.arrayMesa20[3].id) 
                                              :
                                              docrodada.arrayMesa1.length == 20 ?
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa12[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id) + '-' +
                                              (docrodada.arrayMesa19[3].id) + '-' +
                                              (docrodada.arrayMesa20[3].id)
                                              :
                                              (docrodada.arrayMesa5[3].id) + '-' +
                                              (docrodada.arrayMesa6[3].id) + '-' +
                                              (docrodada.arrayMesa7[3].id) + '-' +
                                              (docrodada.arrayMesa8[3].id) + '-' +
                                              (docrodada.arrayMesa9[3].id) + '-' +
                                              (docrodada.arrayMesa10[3].id) + '-' +
                                              (docrodada.arrayMesa11[3].id) + '-' +
                                              (docrodada.arrayMesa12[3].id) + '-' +
                                              (docrodada.arrayMesa13[3].id) + '-' +
                                              (docrodada.arrayMesa14[3].id) + '-' +
                                              (docrodada.arrayMesa15[3].id) + '-' +
                                              (docrodada.arrayMesa16[3].id) + '-' +
                                              (docrodada.arrayMesa17[3].id) + '-' +
                                              (docrodada.arrayMesa18[3].id) + '-' +
                                              (docrodada.arrayMesa19[3].id) + '-' +
                                              (docrodada.arrayMesa20[3].id) + '-' +
                                              (docrodada.arrayMesa21[3].id)
                                               
                                      }             
                          
                          </Card.Text>
                          </Col>
                          </Row>
                         :
                         <Row>

                         </Row>
                         }
                         {docrodada.arrayMesa5.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 5 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[4].id) + '-' +
                             (docrodada.arrayMesa2[4].id) + '-' +
                             (docrodada.arrayMesa3[4].id) + '-' +
                             (docrodada.arrayMesa4[4].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[4].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[4].id) + '-' +
                              (docrodada.arrayMesa6[4].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[4].id) + '-' +
                               (docrodada.arrayMesa6[4].id) + '-' +
                               (docrodada.arrayMesa7[4].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[4].id) + '-' +
                                (docrodada.arrayMesa6[4].id) + '-' +
                                (docrodada.arrayMesa7[4].id) + '-' +
                                (docrodada.arrayMesa8[4].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[4].id) + '-' +
                                 (docrodada.arrayMesa6[4].id) + '-' +
                                 (docrodada.arrayMesa7[4].id) + '-' +
                                 (docrodada.arrayMesa8[4].id) + '-' +
                                 (docrodada.arrayMesa9[4].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[4].id) + '-' +
                                    (docrodada.arrayMesa6[4].id) + '-' +
                                    (docrodada.arrayMesa7[4].id) + '-' +
                                    (docrodada.arrayMesa8[4].id) + '-' +
                                    (docrodada.arrayMesa9[4].id) + '-' +
                                    (docrodada.arrayMesa10[4].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[4].id) + '-' +
                                     (docrodada.arrayMesa6[4].id) + '-' +
                                     (docrodada.arrayMesa7[4].id) + '-' +
                                     (docrodada.arrayMesa8[4].id) + '-' +
                                     (docrodada.arrayMesa9[4].id) + '-' +
                                     (docrodada.arrayMesa10[4].id) + '-' +
                                     (docrodada.arrayMesa11[4].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[4].id) + '-' +
                                     (docrodada.arrayMesa6[4].id) + '-' +
                                     (docrodada.arrayMesa7[4].id) + '-' +
                                     (docrodada.arrayMesa8[4].id) + '-' +
                                     (docrodada.arrayMesa9[4].id) + '-' +
                                     (docrodada.arrayMesa10[4].id) + '-' +
                                     (docrodada.arrayMesa11[4].id) + '-' +
                                     (docrodada.arrayMesa12[4].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[4].id) + '-' +
                                     (docrodada.arrayMesa6[4].id) + '-' +
                                     (docrodada.arrayMesa7[4].id) + '-' +
                                     (docrodada.arrayMesa8[4].id) + '-' +
                                     (docrodada.arrayMesa9[4].id) + '-' +
                                     (docrodada.arrayMesa10[4].id) + '-' +
                                     (docrodada.arrayMesa11[4].id) + '-' +
                                     (docrodada.arrayMesa12[4].id) + '-' +
                                     (docrodada.arrayMesa13[4].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa15[4].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa15[4].id) + '-' +
                                         (docrodada.arrayMesa16[4].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[4].id) + '-' +
                                         (docrodada.arrayMesa6[4].id) + '-' +
                                         (docrodada.arrayMesa7[4].id) + '-' +
                                         (docrodada.arrayMesa8[4].id) + '-' +
                                         (docrodada.arrayMesa9[4].id) + '-' +
                                         (docrodada.arrayMesa10[4].id) + '-' +
                                         (docrodada.arrayMesa11[4].id) + '-' +
                                         (docrodada.arrayMesa12[4].id) + '-' +
                                         (docrodada.arrayMesa13[4].id) + '-' +
                                         (docrodada.arrayMesa14[4].id) + '-' +
                                         (docrodada.arrayMesa15[4].id) + '-' +
                                         (docrodada.arrayMesa16[4].id) + '-' +
                                         (docrodada.arrayMesa17[4].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id) + '-' +
                                             (docrodada.arrayMesa19[4].id) + '-' +
                                             (docrodada.arrayMesa20[4].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id) + '-' +
                                             (docrodada.arrayMesa19[4].id) + '-' +
                                             (docrodada.arrayMesa20[4].id)
                                             :
                                             (docrodada.arrayMesa5[4].id) + '-' +
                                             (docrodada.arrayMesa6[4].id) + '-' +
                                             (docrodada.arrayMesa7[4].id) + '-' +
                                             (docrodada.arrayMesa8[4].id) + '-' +
                                             (docrodada.arrayMesa9[4].id) + '-' +
                                             (docrodada.arrayMesa10[4].id) + '-' +
                                             (docrodada.arrayMesa11[4].id) + '-' +
                                             (docrodada.arrayMesa12[4].id) + '-' +
                                             (docrodada.arrayMesa13[4].id) + '-' +
                                             (docrodada.arrayMesa14[4].id) + '-' +
                                             (docrodada.arrayMesa15[4].id) + '-' +
                                             (docrodada.arrayMesa16[4].id) + '-' +
                                             (docrodada.arrayMesa17[4].id) + '-' +
                                             (docrodada.arrayMesa18[4].id) + '-' +
                                             (docrodada.arrayMesa19[4].id) + '-' +
                                             (docrodada.arrayMesa20[4].id) + '-' +
                                             (docrodada.arrayMesa21[4].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                         {docrodada.arrayMesa6.length != 0 ?
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 6 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[5].id) + '-' +
                             (docrodada.arrayMesa2[5].id) + '-' +
                             (docrodada.arrayMesa3[5].id) + '-' +
                             (docrodada.arrayMesa4[5].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[5].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[5].id) + '-' +
                              (docrodada.arrayMesa6[5].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[5].id) + '-' +
                               (docrodada.arrayMesa6[5].id) + '-' +
                               (docrodada.arrayMesa7[5].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[5].id) + '-' +
                                (docrodada.arrayMesa6[5].id) + '-' +
                                (docrodada.arrayMesa7[5].id) + '-' +
                                (docrodada.arrayMesa8[5].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[5].id) + '-' +
                                 (docrodada.arrayMesa6[5].id) + '-' +
                                 (docrodada.arrayMesa7[5].id) + '-' +
                                 (docrodada.arrayMesa8[5].id) + '-' +
                                 (docrodada.arrayMesa9[5].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[5].id) + '-' +
                                    (docrodada.arrayMesa6[5].id) + '-' +
                                    (docrodada.arrayMesa7[5].id) + '-' +
                                    (docrodada.arrayMesa8[5].id) + '-' +
                                    (docrodada.arrayMesa9[5].id) + '-' +
                                    (docrodada.arrayMesa10[5].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[5].id) + '-' +
                                     (docrodada.arrayMesa6[5].id) + '-' +
                                     (docrodada.arrayMesa7[5].id) + '-' +
                                     (docrodada.arrayMesa8[5].id) + '-' +
                                     (docrodada.arrayMesa9[5].id) + '-' +
                                     (docrodada.arrayMesa10[5].id) + '-' +
                                     (docrodada.arrayMesa11[5].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[5].id) + '-' +
                                     (docrodada.arrayMesa6[5].id) + '-' +
                                     (docrodada.arrayMesa7[5].id) + '-' +
                                     (docrodada.arrayMesa8[5].id) + '-' +
                                     (docrodada.arrayMesa9[5].id) + '-' +
                                     (docrodada.arrayMesa10[5].id) + '-' +
                                     (docrodada.arrayMesa11[5].id) + '-' +
                                     (docrodada.arrayMesa12[5].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[5].id) + '-' +
                                     (docrodada.arrayMesa6[5].id) + '-' +
                                     (docrodada.arrayMesa7[5].id) + '-' +
                                     (docrodada.arrayMesa8[5].id) + '-' +
                                     (docrodada.arrayMesa9[5].id) + '-' +
                                     (docrodada.arrayMesa10[5].id) + '-' +
                                     (docrodada.arrayMesa11[5].id) + '-' +
                                     (docrodada.arrayMesa12[5].id) + '-' +
                                     (docrodada.arrayMesa13[5].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa15[5].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa15[5].id) + '-' +
                                         (docrodada.arrayMesa16[5].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[5].id) + '-' +
                                         (docrodada.arrayMesa6[5].id) + '-' +
                                         (docrodada.arrayMesa7[5].id) + '-' +
                                         (docrodada.arrayMesa8[5].id) + '-' +
                                         (docrodada.arrayMesa9[5].id) + '-' +
                                         (docrodada.arrayMesa10[5].id) + '-' +
                                         (docrodada.arrayMesa11[5].id) + '-' +
                                         (docrodada.arrayMesa12[5].id) + '-' +
                                         (docrodada.arrayMesa13[5].id) + '-' +
                                         (docrodada.arrayMesa14[5].id) + '-' +
                                         (docrodada.arrayMesa15[5].id) + '-' +
                                         (docrodada.arrayMesa16[5].id) + '-' +
                                         (docrodada.arrayMesa17[5].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id) + '-' +
                                             (docrodada.arrayMesa19[5].id) + '-' +
                                             (docrodada.arrayMesa20[5].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id) + '-' +
                                             (docrodada.arrayMesa19[5].id) + '-' +
                                             (docrodada.arrayMesa20[5].id)
                                             :
                                             (docrodada.arrayMesa5[5].id) + '-' +
                                             (docrodada.arrayMesa6[5].id) + '-' +
                                             (docrodada.arrayMesa7[5].id) + '-' +
                                             (docrodada.arrayMesa8[5].id) + '-' +
                                             (docrodada.arrayMesa9[5].id) + '-' +
                                             (docrodada.arrayMesa10[5].id) + '-' +
                                             (docrodada.arrayMesa11[5].id) + '-' +
                                             (docrodada.arrayMesa12[5].id) + '-' +
                                             (docrodada.arrayMesa13[5].id) + '-' +
                                             (docrodada.arrayMesa14[5].id) + '-' +
                                             (docrodada.arrayMesa15[5].id) + '-' +
                                             (docrodada.arrayMesa16[5].id) + '-' +
                                             (docrodada.arrayMesa17[5].id) + '-' +
                                             (docrodada.arrayMesa18[5].id) + '-' +
                                             (docrodada.arrayMesa19[5].id) + '-' +
                                             (docrodada.arrayMesa20[5].id) + '-' +
                                             (docrodada.arrayMesa21[5].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                         :
                         <Row>

                         </Row>
                         }
                        { docrodada.arrayMesa7.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 7 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[6].id) + '-' +
                             (docrodada.arrayMesa2[6].id) + '-' +
                             (docrodada.arrayMesa3[6].id) + '-' +
                             (docrodada.arrayMesa4[6].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[6].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[6].id) + '-' +
                              (docrodada.arrayMesa6[6].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[6].id) + '-' +
                               (docrodada.arrayMesa6[6].id) + '-' +
                               (docrodada.arrayMesa7[6].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[6].id) + '-' +
                                (docrodada.arrayMesa6[6].id) + '-' +
                                (docrodada.arrayMesa7[6].id) + '-' +
                                (docrodada.arrayMesa8[6].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[6].id) + '-' +
                                 (docrodada.arrayMesa6[6].id) + '-' +
                                 (docrodada.arrayMesa7[6].id) + '-' +
                                 (docrodada.arrayMesa8[6].id) + '-' +
                                 (docrodada.arrayMesa9[6].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[6].id) + '-' +
                                    (docrodada.arrayMesa6[6].id) + '-' +
                                    (docrodada.arrayMesa7[6].id) + '-' +
                                    (docrodada.arrayMesa8[6].id) + '-' +
                                    (docrodada.arrayMesa9[6].id) + '-' +
                                    (docrodada.arrayMesa10[6].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[6].id) + '-' +
                                     (docrodada.arrayMesa6[6].id) + '-' +
                                     (docrodada.arrayMesa7[6].id) + '-' +
                                     (docrodada.arrayMesa8[6].id) + '-' +
                                     (docrodada.arrayMesa9[6].id) + '-' +
                                     (docrodada.arrayMesa10[6].id) + '-' +
                                     (docrodada.arrayMesa11[6].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[6].id) + '-' +
                                     (docrodada.arrayMesa6[6].id) + '-' +
                                     (docrodada.arrayMesa7[6].id) + '-' +
                                     (docrodada.arrayMesa8[6].id) + '-' +
                                     (docrodada.arrayMesa9[6].id) + '-' +
                                     (docrodada.arrayMesa10[6].id) + '-' +
                                     (docrodada.arrayMesa11[6].id) + '-' +
                                     (docrodada.arrayMesa12[6].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[6].id) + '-' +
                                     (docrodada.arrayMesa6[6].id) + '-' +
                                     (docrodada.arrayMesa7[6].id) + '-' +
                                     (docrodada.arrayMesa8[6].id) + '-' +
                                     (docrodada.arrayMesa9[6].id) + '-' +
                                     (docrodada.arrayMesa10[6].id) + '-' +
                                     (docrodada.arrayMesa11[6].id) + '-' +
                                     (docrodada.arrayMesa12[6].id) + '-' +
                                     (docrodada.arrayMesa13[6].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa15[6].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa15[6].id) + '-' +
                                         (docrodada.arrayMesa16[6].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[6].id) + '-' +
                                         (docrodada.arrayMesa6[6].id) + '-' +
                                         (docrodada.arrayMesa7[6].id) + '-' +
                                         (docrodada.arrayMesa8[6].id) + '-' +
                                         (docrodada.arrayMesa9[6].id) + '-' +
                                         (docrodada.arrayMesa10[6].id) + '-' +
                                         (docrodada.arrayMesa11[6].id) + '-' +
                                         (docrodada.arrayMesa12[6].id) + '-' +
                                         (docrodada.arrayMesa13[6].id) + '-' +
                                         (docrodada.arrayMesa14[6].id) + '-' +
                                         (docrodada.arrayMesa15[6].id) + '-' +
                                         (docrodada.arrayMesa16[6].id) + '-' +
                                         (docrodada.arrayMesa17[6].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id) + '-' +
                                             (docrodada.arrayMesa19[6].id) + '-' +
                                             (docrodada.arrayMesa20[6].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id) + '-' +
                                             (docrodada.arrayMesa19[6].id) + '-' +
                                             (docrodada.arrayMesa20[6].id)
                                             :
                                             (docrodada.arrayMesa5[6].id) + '-' +
                                             (docrodada.arrayMesa6[6].id) + '-' +
                                             (docrodada.arrayMesa7[6].id) + '-' +
                                             (docrodada.arrayMesa8[6].id) + '-' +
                                             (docrodada.arrayMesa9[6].id) + '-' +
                                             (docrodada.arrayMesa10[6].id) + '-' +
                                             (docrodada.arrayMesa11[6].id) + '-' +
                                             (docrodada.arrayMesa12[6].id) + '-' +
                                             (docrodada.arrayMesa13[6].id) + '-' +
                                             (docrodada.arrayMesa14[6].id) + '-' +
                                             (docrodada.arrayMesa15[6].id) + '-' +
                                             (docrodada.arrayMesa16[6].id) + '-' +
                                             (docrodada.arrayMesa17[6].id) + '-' +
                                             (docrodada.arrayMesa18[6].id) + '-' +
                                             (docrodada.arrayMesa19[6].id) + '-' +
                                             (docrodada.arrayMesa20[6].id) + '-' +
                                             (docrodada.arrayMesa21[6].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        
                        { docrodada.arrayMesa8.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 8 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[7].id) + '-' +
                             (docrodada.arrayMesa2[7].id) + '-' +
                             (docrodada.arrayMesa3[7].id) + '-' +
                             (docrodada.arrayMesa4[7].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[7].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[7].id) + '-' +
                              (docrodada.arrayMesa6[7].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[7].id) + '-' +
                               (docrodada.arrayMesa6[7].id) + '-' +
                               (docrodada.arrayMesa7[7].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[7].id) + '-' +
                                (docrodada.arrayMesa6[7].id) + '-' +
                                (docrodada.arrayMesa7[7].id) + '-' +
                                (docrodada.arrayMesa8[7].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[7].id) + '-' +
                                 (docrodada.arrayMesa6[7].id) + '-' +
                                 (docrodada.arrayMesa7[7].id) + '-' +
                                 (docrodada.arrayMesa8[7].id) + '-' +
                                 (docrodada.arrayMesa9[7].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[7].id) + '-' +
                                    (docrodada.arrayMesa6[7].id) + '-' +
                                    (docrodada.arrayMesa7[7].id) + '-' +
                                    (docrodada.arrayMesa8[7].id) + '-' +
                                    (docrodada.arrayMesa9[7].id) + '-' +
                                    (docrodada.arrayMesa10[7].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[7].id) + '-' +
                                     (docrodada.arrayMesa6[7].id) + '-' +
                                     (docrodada.arrayMesa7[7].id) + '-' +
                                     (docrodada.arrayMesa8[7].id) + '-' +
                                     (docrodada.arrayMesa9[7].id) + '-' +
                                     (docrodada.arrayMesa10[7].id) + '-' +
                                     (docrodada.arrayMesa11[7].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[7].id) + '-' +
                                     (docrodada.arrayMesa6[7].id) + '-' +
                                     (docrodada.arrayMesa7[7].id) + '-' +
                                     (docrodada.arrayMesa8[7].id) + '-' +
                                     (docrodada.arrayMesa9[7].id) + '-' +
                                     (docrodada.arrayMesa10[7].id) + '-' +
                                     (docrodada.arrayMesa11[7].id) + '-' +
                                     (docrodada.arrayMesa12[7].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[7].id) + '-' +
                                     (docrodada.arrayMesa6[7].id) + '-' +
                                     (docrodada.arrayMesa7[7].id) + '-' +
                                     (docrodada.arrayMesa8[7].id) + '-' +
                                     (docrodada.arrayMesa9[7].id) + '-' +
                                     (docrodada.arrayMesa10[7].id) + '-' +
                                     (docrodada.arrayMesa11[7].id) + '-' +
                                     (docrodada.arrayMesa12[7].id) + '-' +
                                     (docrodada.arrayMesa13[7].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa15[7].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa15[7].id) + '-' +
                                         (docrodada.arrayMesa16[7].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[7].id) + '-' +
                                         (docrodada.arrayMesa6[7].id) + '-' +
                                         (docrodada.arrayMesa7[7].id) + '-' +
                                         (docrodada.arrayMesa8[7].id) + '-' +
                                         (docrodada.arrayMesa9[7].id) + '-' +
                                         (docrodada.arrayMesa10[7].id) + '-' +
                                         (docrodada.arrayMesa11[7].id) + '-' +
                                         (docrodada.arrayMesa12[7].id) + '-' +
                                         (docrodada.arrayMesa13[7].id) + '-' +
                                         (docrodada.arrayMesa14[7].id) + '-' +
                                         (docrodada.arrayMesa15[7].id) + '-' +
                                         (docrodada.arrayMesa16[7].id) + '-' +
                                         (docrodada.arrayMesa17[7].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id) + '-' +
                                             (docrodada.arrayMesa19[7].id) + '-' +
                                             (docrodada.arrayMesa20[7].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id) + '-' +
                                             (docrodada.arrayMesa19[7].id) + '-' +
                                             (docrodada.arrayMesa20[7].id)
                                             :
                                             (docrodada.arrayMesa5[7].id) + '-' +
                                             (docrodada.arrayMesa6[7].id) + '-' +
                                             (docrodada.arrayMesa7[7].id) + '-' +
                                             (docrodada.arrayMesa8[7].id) + '-' +
                                             (docrodada.arrayMesa9[7].id) + '-' +
                                             (docrodada.arrayMesa10[7].id) + '-' +
                                             (docrodada.arrayMesa11[7].id) + '-' +
                                             (docrodada.arrayMesa12[7].id) + '-' +
                                             (docrodada.arrayMesa13[7].id) + '-' +
                                             (docrodada.arrayMesa14[7].id) + '-' +
                                             (docrodada.arrayMesa15[7].id) + '-' +
                                             (docrodada.arrayMesa16[7].id) + '-' +
                                             (docrodada.arrayMesa17[7].id) + '-' +
                                             (docrodada.arrayMesa18[7].id) + '-' +
                                             (docrodada.arrayMesa19[7].id) + '-' +
                                             (docrodada.arrayMesa20[7].id) + '-' +
                                             (docrodada.arrayMesa21[7].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa9.length != 0  ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 9 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[8].id) + '-' +
                             (docrodada.arrayMesa2[8].id) + '-' +
                             (docrodada.arrayMesa3[8].id) + '-' +
                             (docrodada.arrayMesa4[8].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[8].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[8].id) + '-' +
                              (docrodada.arrayMesa6[8].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[8].id) + '-' +
                               (docrodada.arrayMesa6[8].id) + '-' +
                               (docrodada.arrayMesa7[8].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[8].id) + '-' +
                                (docrodada.arrayMesa6[8].id) + '-' +
                                (docrodada.arrayMesa7[8].id) + '-' +
                                (docrodada.arrayMesa8[8].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[8].id) + '-' +
                                 (docrodada.arrayMesa6[8].id) + '-' +
                                 (docrodada.arrayMesa7[8].id) + '-' +
                                 (docrodada.arrayMesa8[8].id) + '-' +
                                 (docrodada.arrayMesa9[8].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[8].id) + '-' +
                                    (docrodada.arrayMesa6[8].id) + '-' +
                                    (docrodada.arrayMesa7[8].id) + '-' +
                                    (docrodada.arrayMesa8[8].id) + '-' +
                                    (docrodada.arrayMesa9[8].id) + '-' +
                                    (docrodada.arrayMesa10[8].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[8].id) + '-' +
                                     (docrodada.arrayMesa6[8].id) + '-' +
                                     (docrodada.arrayMesa7[8].id) + '-' +
                                     (docrodada.arrayMesa8[8].id) + '-' +
                                     (docrodada.arrayMesa9[8].id) + '-' +
                                     (docrodada.arrayMesa10[8].id) + '-' +
                                     (docrodada.arrayMesa11[8].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[8].id) + '-' +
                                     (docrodada.arrayMesa6[8].id) + '-' +
                                     (docrodada.arrayMesa7[8].id) + '-' +
                                     (docrodada.arrayMesa8[8].id) + '-' +
                                     (docrodada.arrayMesa9[8].id) + '-' +
                                     (docrodada.arrayMesa10[8].id) + '-' +
                                     (docrodada.arrayMesa11[8].id) + '-' +
                                     (docrodada.arrayMesa12[8].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[8].id) + '-' +
                                     (docrodada.arrayMesa6[8].id) + '-' +
                                     (docrodada.arrayMesa7[8].id) + '-' +
                                     (docrodada.arrayMesa8[8].id) + '-' +
                                     (docrodada.arrayMesa9[8].id) + '-' +
                                     (docrodada.arrayMesa10[8].id) + '-' +
                                     (docrodada.arrayMesa11[8].id) + '-' +
                                     (docrodada.arrayMesa12[8].id) + '-' +
                                     (docrodada.arrayMesa13[8].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa15[8].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa15[8].id) + '-' +
                                         (docrodada.arrayMesa16[8].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[8].id) + '-' +
                                         (docrodada.arrayMesa6[8].id) + '-' +
                                         (docrodada.arrayMesa7[8].id) + '-' +
                                         (docrodada.arrayMesa8[8].id) + '-' +
                                         (docrodada.arrayMesa9[8].id) + '-' +
                                         (docrodada.arrayMesa10[8].id) + '-' +
                                         (docrodada.arrayMesa11[8].id) + '-' +
                                         (docrodada.arrayMesa12[8].id) + '-' +
                                         (docrodada.arrayMesa13[8].id) + '-' +
                                         (docrodada.arrayMesa14[8].id) + '-' +
                                         (docrodada.arrayMesa15[8].id) + '-' +
                                         (docrodada.arrayMesa16[8].id) + '-' +
                                         (docrodada.arrayMesa17[8].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id) + '-' +
                                             (docrodada.arrayMesa19[8].id) + '-' +
                                             (docrodada.arrayMesa20[8].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id) + '-' +
                                             (docrodada.arrayMesa19[8].id) + '-' +
                                             (docrodada.arrayMesa20[8].id)
                                             :
                                             (docrodada.arrayMesa5[8].id) + '-' +
                                             (docrodada.arrayMesa6[8].id) + '-' +
                                             (docrodada.arrayMesa7[8].id) + '-' +
                                             (docrodada.arrayMesa8[8].id) + '-' +
                                             (docrodada.arrayMesa9[8].id) + '-' +
                                             (docrodada.arrayMesa10[8].id) + '-' +
                                             (docrodada.arrayMesa11[8].id) + '-' +
                                             (docrodada.arrayMesa12[8].id) + '-' +
                                             (docrodada.arrayMesa13[8].id) + '-' +
                                             (docrodada.arrayMesa14[8].id) + '-' +
                                             (docrodada.arrayMesa15[8].id) + '-' +
                                             (docrodada.arrayMesa16[8].id) + '-' +
                                             (docrodada.arrayMesa17[8].id) + '-' +
                                             (docrodada.arrayMesa18[8].id) + '-' +
                                             (docrodada.arrayMesa19[8].id) + '-' +
                                             (docrodada.arrayMesa20[8].id) + '-' +
                                             (docrodada.arrayMesa21[8].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa10.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 10 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[9].id) + '-' +
                             (docrodada.arrayMesa2[9].id) + '-' +
                             (docrodada.arrayMesa3[9].id) + '-' +
                             (docrodada.arrayMesa4[9].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[9].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[9].id) + '-' +
                              (docrodada.arrayMesa6[9].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[9].id) + '-' +
                               (docrodada.arrayMesa6[9].id) + '-' +
                               (docrodada.arrayMesa7[9].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[9].id) + '-' +
                                (docrodada.arrayMesa6[9].id) + '-' +
                                (docrodada.arrayMesa7[9].id) + '-' +
                                (docrodada.arrayMesa8[9].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[9].id) + '-' +
                                 (docrodada.arrayMesa6[9].id) + '-' +
                                 (docrodada.arrayMesa7[9].id) + '-' +
                                 (docrodada.arrayMesa8[9].id) + '-' +
                                 (docrodada.arrayMesa9[9].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[9].id) + '-' +
                                    (docrodada.arrayMesa6[9].id) + '-' +
                                    (docrodada.arrayMesa7[9].id) + '-' +
                                    (docrodada.arrayMesa8[9].id) + '-' +
                                    (docrodada.arrayMesa9[9].id) + '-' +
                                    (docrodada.arrayMesa10[9].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[9].id) + '-' +
                                     (docrodada.arrayMesa6[9].id) + '-' +
                                     (docrodada.arrayMesa7[9].id) + '-' +
                                     (docrodada.arrayMesa8[9].id) + '-' +
                                     (docrodada.arrayMesa9[9].id) + '-' +
                                     (docrodada.arrayMesa10[9].id) + '-' +
                                     (docrodada.arrayMesa11[9].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[9].id) + '-' +
                                     (docrodada.arrayMesa6[9].id) + '-' +
                                     (docrodada.arrayMesa7[9].id) + '-' +
                                     (docrodada.arrayMesa8[9].id) + '-' +
                                     (docrodada.arrayMesa9[9].id) + '-' +
                                     (docrodada.arrayMesa10[9].id) + '-' +
                                     (docrodada.arrayMesa11[9].id) + '-' +
                                     (docrodada.arrayMesa12[9].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[9].id) + '-' +
                                     (docrodada.arrayMesa6[9].id) + '-' +
                                     (docrodada.arrayMesa7[9].id) + '-' +
                                     (docrodada.arrayMesa8[9].id) + '-' +
                                     (docrodada.arrayMesa9[9].id) + '-' +
                                     (docrodada.arrayMesa10[9].id) + '-' +
                                     (docrodada.arrayMesa11[9].id) + '-' +
                                     (docrodada.arrayMesa12[9].id) + '-' +
                                     (docrodada.arrayMesa13[9].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa15[9].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa15[9].id) + '-' +
                                         (docrodada.arrayMesa16[9].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[9].id) + '-' +
                                         (docrodada.arrayMesa6[9].id) + '-' +
                                         (docrodada.arrayMesa7[9].id) + '-' +
                                         (docrodada.arrayMesa8[9].id) + '-' +
                                         (docrodada.arrayMesa9[9].id) + '-' +
                                         (docrodada.arrayMesa10[9].id) + '-' +
                                         (docrodada.arrayMesa11[9].id) + '-' +
                                         (docrodada.arrayMesa12[9].id) + '-' +
                                         (docrodada.arrayMesa13[9].id) + '-' +
                                         (docrodada.arrayMesa14[9].id) + '-' +
                                         (docrodada.arrayMesa15[9].id) + '-' +
                                         (docrodada.arrayMesa16[9].id) + '-' +
                                         (docrodada.arrayMesa17[9].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id) + '-' +
                                             (docrodada.arrayMesa19[9].id) + '-' +
                                             (docrodada.arrayMesa20[9].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id) + '-' +
                                             (docrodada.arrayMesa19[9].id) + '-' +
                                             (docrodada.arrayMesa20[9].id)
                                             :
                                             (docrodada.arrayMesa5[9].id) + '-' +
                                             (docrodada.arrayMesa6[9].id) + '-' +
                                             (docrodada.arrayMesa7[9].id) + '-' +
                                             (docrodada.arrayMesa8[9].id) + '-' +
                                             (docrodada.arrayMesa9[9].id) + '-' +
                                             (docrodada.arrayMesa10[9].id) + '-' +
                                             (docrodada.arrayMesa11[9].id) + '-' +
                                             (docrodada.arrayMesa12[9].id) + '-' +
                                             (docrodada.arrayMesa13[9].id) + '-' +
                                             (docrodada.arrayMesa14[9].id) + '-' +
                                             (docrodada.arrayMesa15[9].id) + '-' +
                                             (docrodada.arrayMesa16[9].id) + '-' +
                                             (docrodada.arrayMesa17[9].id) + '-' +
                                             (docrodada.arrayMesa18[9].id) + '-' +
                                             (docrodada.arrayMesa19[9].id) + '-' +
                                             (docrodada.arrayMesa20[9].id) + '-' +
                                             (docrodada.arrayMesa21[9].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        {  docrodada.arrayMesa11.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 11 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[10].id) + '-' +
                             (docrodada.arrayMesa2[10].id) + '-' +
                             (docrodada.arrayMesa3[10].id) + '-' +
                             (docrodada.arrayMesa4[10].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[10].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[10].id) + '-' +
                              (docrodada.arrayMesa6[10].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[10].id) + '-' +
                               (docrodada.arrayMesa6[10].id) + '-' +
                               (docrodada.arrayMesa7[10].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[10].id) + '-' +
                                (docrodada.arrayMesa6[10].id) + '-' +
                                (docrodada.arrayMesa7[10].id) + '-' +
                                (docrodada.arrayMesa8[10].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[10].id) + '-' +
                                 (docrodada.arrayMesa6[10].id) + '-' +
                                 (docrodada.arrayMesa7[10].id) + '-' +
                                 (docrodada.arrayMesa8[10].id) + '-' +
                                 (docrodada.arrayMesa9[10].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[10].id) + '-' +
                                    (docrodada.arrayMesa6[10].id) + '-' +
                                    (docrodada.arrayMesa7[10].id) + '-' +
                                    (docrodada.arrayMesa8[10].id) + '-' +
                                    (docrodada.arrayMesa9[10].id) + '-' +
                                    (docrodada.arrayMesa10[10].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[10].id) + '-' +
                                     (docrodada.arrayMesa6[10].id) + '-' +
                                     (docrodada.arrayMesa7[10].id) + '-' +
                                     (docrodada.arrayMesa8[10].id) + '-' +
                                     (docrodada.arrayMesa9[10].id) + '-' +
                                     (docrodada.arrayMesa10[10].id) + '-' +
                                     (docrodada.arrayMesa11[10].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[10].id) + '-' +
                                     (docrodada.arrayMesa6[10].id) + '-' +
                                     (docrodada.arrayMesa7[10].id) + '-' +
                                     (docrodada.arrayMesa8[10].id) + '-' +
                                     (docrodada.arrayMesa9[10].id) + '-' +
                                     (docrodada.arrayMesa10[10].id) + '-' +
                                     (docrodada.arrayMesa11[10].id) + '-' +
                                     (docrodada.arrayMesa12[10].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[10].id) + '-' +
                                     (docrodada.arrayMesa6[10].id) + '-' +
                                     (docrodada.arrayMesa7[10].id) + '-' +
                                     (docrodada.arrayMesa8[10].id) + '-' +
                                     (docrodada.arrayMesa9[10].id) + '-' +
                                     (docrodada.arrayMesa10[10].id) + '-' +
                                     (docrodada.arrayMesa11[10].id) + '-' +
                                     (docrodada.arrayMesa12[10].id) + '-' +
                                     (docrodada.arrayMesa13[10].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa15[10].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa15[10].id) + '-' +
                                         (docrodada.arrayMesa16[10].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[10].id) + '-' +
                                         (docrodada.arrayMesa6[10].id) + '-' +
                                         (docrodada.arrayMesa7[10].id) + '-' +
                                         (docrodada.arrayMesa8[10].id) + '-' +
                                         (docrodada.arrayMesa9[10].id) + '-' +
                                         (docrodada.arrayMesa10[10].id) + '-' +
                                         (docrodada.arrayMesa11[10].id) + '-' +
                                         (docrodada.arrayMesa12[10].id) + '-' +
                                         (docrodada.arrayMesa13[10].id) + '-' +
                                         (docrodada.arrayMesa14[10].id) + '-' +
                                         (docrodada.arrayMesa15[10].id) + '-' +
                                         (docrodada.arrayMesa16[10].id) + '-' +
                                         (docrodada.arrayMesa17[10].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id) + '-' +
                                             (docrodada.arrayMesa19[10].id) + '-' +
                                             (docrodada.arrayMesa20[10].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id) + '-' +
                                             (docrodada.arrayMesa19[10].id) + '-' +
                                             (docrodada.arrayMesa20[10].id)
                                             :
                                             (docrodada.arrayMesa5[10].id) + '-' +
                                             (docrodada.arrayMesa6[10].id) + '-' +
                                             (docrodada.arrayMesa7[10].id) + '-' +
                                             (docrodada.arrayMesa8[10].id) + '-' +
                                             (docrodada.arrayMesa9[10].id) + '-' +
                                             (docrodada.arrayMesa10[10].id) + '-' +
                                             (docrodada.arrayMesa11[10].id) + '-' +
                                             (docrodada.arrayMesa12[10].id) + '-' +
                                             (docrodada.arrayMesa13[10].id) + '-' +
                                             (docrodada.arrayMesa14[10].id) + '-' +
                                             (docrodada.arrayMesa15[10].id) + '-' +
                                             (docrodada.arrayMesa16[10].id) + '-' +
                                             (docrodada.arrayMesa17[10].id) + '-' +
                                             (docrodada.arrayMesa18[10].id) + '-' +
                                             (docrodada.arrayMesa19[10].id) + '-' +
                                             (docrodada.arrayMesa20[10].id) + '-' +
                                             (docrodada.arrayMesa21[10].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa12.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 12 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[11].id) + '-' +
                             (docrodada.arrayMesa2[11].id) + '-' +
                             (docrodada.arrayMesa3[11].id) + '-' +
                             (docrodada.arrayMesa4[11].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[11].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[11].id) + '-' +
                              (docrodada.arrayMesa6[11].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[11].id) + '-' +
                               (docrodada.arrayMesa6[11].id) + '-' +
                               (docrodada.arrayMesa7[11].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[11].id) + '-' +
                                (docrodada.arrayMesa6[11].id) + '-' +
                                (docrodada.arrayMesa7[11].id) + '-' +
                                (docrodada.arrayMesa8[11].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[11].id) + '-' +
                                 (docrodada.arrayMesa6[11].id) + '-' +
                                 (docrodada.arrayMesa7[11].id) + '-' +
                                 (docrodada.arrayMesa8[11].id) + '-' +
                                 (docrodada.arrayMesa9[11].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[11].id) + '-' +
                                    (docrodada.arrayMesa6[11].id) + '-' +
                                    (docrodada.arrayMesa7[11].id) + '-' +
                                    (docrodada.arrayMesa8[11].id) + '-' +
                                    (docrodada.arrayMesa9[11].id) + '-' +
                                    (docrodada.arrayMesa10[11].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[11].id) + '-' +
                                     (docrodada.arrayMesa6[11].id) + '-' +
                                     (docrodada.arrayMesa7[11].id) + '-' +
                                     (docrodada.arrayMesa8[11].id) + '-' +
                                     (docrodada.arrayMesa9[11].id) + '-' +
                                     (docrodada.arrayMesa10[11].id) + '-' +
                                     (docrodada.arrayMesa11[11].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[11].id) + '-' +
                                     (docrodada.arrayMesa6[11].id) + '-' +
                                     (docrodada.arrayMesa7[11].id) + '-' +
                                     (docrodada.arrayMesa8[11].id) + '-' +
                                     (docrodada.arrayMesa9[11].id) + '-' +
                                     (docrodada.arrayMesa10[11].id) + '-' +
                                     (docrodada.arrayMesa11[11].id) + '-' +
                                     (docrodada.arrayMesa12[11].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[11].id) + '-' +
                                     (docrodada.arrayMesa6[11].id) + '-' +
                                     (docrodada.arrayMesa7[11].id) + '-' +
                                     (docrodada.arrayMesa8[11].id) + '-' +
                                     (docrodada.arrayMesa9[11].id) + '-' +
                                     (docrodada.arrayMesa10[11].id) + '-' +
                                     (docrodada.arrayMesa11[11].id) + '-' +
                                     (docrodada.arrayMesa12[11].id) + '-' +
                                     (docrodada.arrayMesa13[11].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id) + '-' +
                                         (docrodada.arrayMesa15[11].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id) + '-' +
                                         (docrodada.arrayMesa15[11].id) + '-' +
                                         (docrodada.arrayMesa16[11].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[11].id) + '-' +
                                         (docrodada.arrayMesa6[11].id) + '-' +
                                         (docrodada.arrayMesa7[11].id) + '-' +
                                         (docrodada.arrayMesa8[11].id) + '-' +
                                         (docrodada.arrayMesa9[11].id) + '-' +
                                         (docrodada.arrayMesa10[11].id) + '-' +
                                         (docrodada.arrayMesa11[11].id) + '-' +
                                         (docrodada.arrayMesa12[11].id) + '-' +
                                         (docrodada.arrayMesa13[11].id) + '-' +
                                         (docrodada.arrayMesa14[11].id) + '-' +
                                         (docrodada.arrayMesa15[11].id) + '-' +
                                         (docrodada.arrayMesa16[11].id) + '-' +
                                         (docrodada.arrayMesa17[11].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id) + '-' +
                                             (docrodada.arrayMesa19[11].id) + '-' +
                                             (docrodada.arrayMesa20[11].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id) + '-' +
                                             (docrodada.arrayMesa19[11].id) + '-' +
                                             (docrodada.arrayMesa20[11].id)
                                             :
                                             (docrodada.arrayMesa5[11].id) + '-' +
                                             (docrodada.arrayMesa6[11].id) + '-' +
                                             (docrodada.arrayMesa7[11].id) + '-' +
                                             (docrodada.arrayMesa8[11].id) + '-' +
                                             (docrodada.arrayMesa9[11].id) + '-' +
                                             (docrodada.arrayMesa10[11].id) + '-' +
                                             (docrodada.arrayMesa11[11].id) + '-' +
                                             (docrodada.arrayMesa12[11].id) + '-' +
                                             (docrodada.arrayMesa13[11].id) + '-' +
                                             (docrodada.arrayMesa14[11].id) + '-' +
                                             (docrodada.arrayMesa15[11].id) + '-' +
                                             (docrodada.arrayMesa16[11].id) + '-' +
                                             (docrodada.arrayMesa17[11].id) + '-' +
                                             (docrodada.arrayMesa18[11].id) + '-' +
                                             (docrodada.arrayMesa19[11].id) + '-' +
                                             (docrodada.arrayMesa20[11].id) + '-' +
                                             (docrodada.arrayMesa21[11].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        {  docrodada.arrayMesa13.length != 0 ?                 
                        <Row xs={12} md={12} className="borderrow grande">
                        <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                        
                        <Card.Text>Mesa 13 </Card.Text>
                        </Col>
                        <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                        <Card.Text className="text-card ">
                        {(docrodada.arrayMesa1[12].id) + '-' +
                            (docrodada.arrayMesa2[12].id) + '-' +
                            (docrodada.arrayMesa3[12].id) + '-' +
                            (docrodada.arrayMesa4[12].id) + '-'} 
                        {   docrodada.arrayMesa1.length == 5 ? 
                            (docrodada.arrayMesa5[12].id)
                             :
                             docrodada.arrayMesa1.length == 6 ?
                             (docrodada.arrayMesa5[12].id) + '-' +
                             (docrodada.arrayMesa6[12].id)
                              :
                              docrodada.arrayMesa1.length == 7 ?
                              (docrodada.arrayMesa5[12].id) + '-' +
                              (docrodada.arrayMesa6[12].id) + '-' +
                              (docrodada.arrayMesa7[12].id)
                               :
                               docrodada.arrayMesa1.length == 8 ?
                               (docrodada.arrayMesa5[12].id) + '-' +
                               (docrodada.arrayMesa6[12].id) + '-' +
                               (docrodada.arrayMesa7[12].id) + '-' +
                               (docrodada.arrayMesa8[12].id)
                                : 
                                docrodada.arrayMesa1.length == 9 ?
                                (docrodada.arrayMesa5[12].id) + '-' +
                                (docrodada.arrayMesa6[12].id) + '-' +
                                (docrodada.arrayMesa7[12].id) + '-' +
                                (docrodada.arrayMesa8[12].id) + '-' +
                                (docrodada.arrayMesa9[12].id) 
                                 :
                                 docrodada.arrayMesa1.length == 10 ?
                                   (docrodada.arrayMesa5[12].id) + '-' +
                                   (docrodada.arrayMesa6[12].id) + '-' +
                                   (docrodada.arrayMesa7[12].id) + '-' +
                                   (docrodada.arrayMesa8[12].id) + '-' +
                                   (docrodada.arrayMesa9[12].id) + '-' +
                                   (docrodada.arrayMesa10[12].id)
                                       
                                    :
                                    docrodada.arrayMesa1.length == 11 ?
                                    (docrodada.arrayMesa5[12].id) + '-' +
                                    (docrodada.arrayMesa6[12].id) + '-' +
                                    (docrodada.arrayMesa7[12].id) + '-' +
                                    (docrodada.arrayMesa8[12].id) + '-' +
                                    (docrodada.arrayMesa9[12].id) + '-' +
                                    (docrodada.arrayMesa10[12].id) + '-' +
                                    (docrodada.arrayMesa11[12].id)
                                    :
                                    docrodada.arrayMesa1.length == 12 ?
                                    (docrodada.arrayMesa5[12].id) + '-' +
                                    (docrodada.arrayMesa6[12].id) + '-' +
                                    (docrodada.arrayMesa7[12].id) + '-' +
                                    (docrodada.arrayMesa8[12].id) + '-' +
                                    (docrodada.arrayMesa9[12].id) + '-' +
                                    (docrodada.arrayMesa10[12].id) + '-' +
                                    (docrodada.arrayMesa11[12].id) + '-' +
                                    (docrodada.arrayMesa12[12].id)
                                    :
                                    docrodada.arrayMesa1.length == 13 ?
                                    (docrodada.arrayMesa5[12].id) + '-' +
                                    (docrodada.arrayMesa6[12].id) + '-' +
                                    (docrodada.arrayMesa7[12].id) + '-' +
                                    (docrodada.arrayMesa8[12].id) + '-' +
                                    (docrodada.arrayMesa9[12].id) + '-' +
                                    (docrodada.arrayMesa10[12].id) + '-' +
                                    (docrodada.arrayMesa11[12].id) + '-' +
                                    (docrodada.arrayMesa12[12].id) + '-' +
                                    (docrodada.arrayMesa13[12].id) 
                                        :
                                        docrodada.arrayMesa1.length == 14 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id)
                                        :
                                        docrodada.arrayMesa1.length == 15 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id) + '-' +
                                        (docrodada.arrayMesa15[12].id)
                                        :
                                        docrodada.arrayMesa1.length == 16 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id) + '-' +
                                        (docrodada.arrayMesa15[12].id) + '-' +
                                        (docrodada.arrayMesa16[12].id) 
                                        :
                                        docrodada.arrayMesa1.length == 17 ?
                                        (docrodada.arrayMesa5[12].id) + '-' +
                                        (docrodada.arrayMesa6[12].id) + '-' +
                                        (docrodada.arrayMesa7[12].id) + '-' +
                                        (docrodada.arrayMesa8[12].id) + '-' +
                                        (docrodada.arrayMesa9[12].id) + '-' +
                                        (docrodada.arrayMesa10[12].id) + '-' +
                                        (docrodada.arrayMesa11[12].id) + '-' +
                                        (docrodada.arrayMesa12[12].id) + '-' +
                                        (docrodada.arrayMesa13[12].id) + '-' +
                                        (docrodada.arrayMesa14[12].id) + '-' +
                                        (docrodada.arrayMesa15[12].id) + '-' +
                                        (docrodada.arrayMesa16[12].id) + '-' +
                                        (docrodada.arrayMesa17[12].id)
                                            :
                                            docrodada.arrayMesa1.length == 18 ?
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa12[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id)
                                            :
                                            docrodada.arrayMesa1.length == 19 ?
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id) + '-' +
                                            (docrodada.arrayMesa19[12].id) + '-' +
                                            (docrodada.arrayMesa20[12].id) 
                                            :
                                            docrodada.arrayMesa1.length == 20 ?
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa12[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id) + '-' +
                                            (docrodada.arrayMesa19[12].id) + '-' +
                                            (docrodada.arrayMesa20[12].id)
                                            :
                                            (docrodada.arrayMesa5[12].id) + '-' +
                                            (docrodada.arrayMesa6[12].id) + '-' +
                                            (docrodada.arrayMesa7[12].id) + '-' +
                                            (docrodada.arrayMesa8[12].id) + '-' +
                                            (docrodada.arrayMesa9[12].id) + '-' +
                                            (docrodada.arrayMesa10[12].id) + '-' +
                                            (docrodada.arrayMesa11[12].id) + '-' +
                                            (docrodada.arrayMesa12[12].id) + '-' +
                                            (docrodada.arrayMesa13[12].id) + '-' +
                                            (docrodada.arrayMesa14[12].id) + '-' +
                                            (docrodada.arrayMesa15[12].id) + '-' +
                                            (docrodada.arrayMesa16[12].id) + '-' +
                                            (docrodada.arrayMesa17[12].id) + '-' +
                                            (docrodada.arrayMesa18[12].id) + '-' +
                                            (docrodada.arrayMesa19[12].id) + '-' +
                                            (docrodada.arrayMesa20[12].id) + '-' +
                                            (docrodada.arrayMesa21[12].id)
                                             
                                    }             
                        
                        </Card.Text>
                        </Col>
                        </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa14.length != 0 ?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 14 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[13].id) + '-' +
                             (docrodada.arrayMesa2[13].id) + '-' +
                             (docrodada.arrayMesa3[13].id) + '-' +
                             (docrodada.arrayMesa4[13].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[13].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[13].id) + '-' +
                              (docrodada.arrayMesa6[13].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[13].id) + '-' +
                               (docrodada.arrayMesa6[13].id) + '-' +
                               (docrodada.arrayMesa7[13].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[13].id) + '-' +
                                (docrodada.arrayMesa6[13].id) + '-' +
                                (docrodada.arrayMesa7[13].id) + '-' +
                                (docrodada.arrayMesa8[13].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[13].id) + '-' +
                                 (docrodada.arrayMesa6[13].id) + '-' +
                                 (docrodada.arrayMesa7[13].id) + '-' +
                                 (docrodada.arrayMesa8[13].id) + '-' +
                                 (docrodada.arrayMesa9[13].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[13].id) + '-' +
                                    (docrodada.arrayMesa6[13].id) + '-' +
                                    (docrodada.arrayMesa7[13].id) + '-' +
                                    (docrodada.arrayMesa8[13].id) + '-' +
                                    (docrodada.arrayMesa9[13].id) + '-' +
                                    (docrodada.arrayMesa10[13].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[13].id) + '-' +
                                     (docrodada.arrayMesa6[13].id) + '-' +
                                     (docrodada.arrayMesa7[13].id) + '-' +
                                     (docrodada.arrayMesa8[13].id) + '-' +
                                     (docrodada.arrayMesa9[13].id) + '-' +
                                     (docrodada.arrayMesa10[13].id) + '-' +
                                     (docrodada.arrayMesa11[13].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[13].id) + '-' +
                                     (docrodada.arrayMesa6[13].id) + '-' +
                                     (docrodada.arrayMesa7[13].id) + '-' +
                                     (docrodada.arrayMesa8[13].id) + '-' +
                                     (docrodada.arrayMesa9[13].id) + '-' +
                                     (docrodada.arrayMesa10[13].id) + '-' +
                                     (docrodada.arrayMesa11[13].id) + '-' +
                                     (docrodada.arrayMesa12[13].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[13].id) + '-' +
                                     (docrodada.arrayMesa6[13].id) + '-' +
                                     (docrodada.arrayMesa7[13].id) + '-' +
                                     (docrodada.arrayMesa8[13].id) + '-' +
                                     (docrodada.arrayMesa9[13].id) + '-' +
                                     (docrodada.arrayMesa10[13].id) + '-' +
                                     (docrodada.arrayMesa11[13].id) + '-' +
                                     (docrodada.arrayMesa12[13].id) + '-' +
                                     (docrodada.arrayMesa13[13].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id) + '-' +
                                         (docrodada.arrayMesa15[13].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id) + '-' +
                                         (docrodada.arrayMesa15[13].id) + '-' +
                                         (docrodada.arrayMesa16[13].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[13].id) + '-' +
                                         (docrodada.arrayMesa6[13].id) + '-' +
                                         (docrodada.arrayMesa7[13].id) + '-' +
                                         (docrodada.arrayMesa8[13].id) + '-' +
                                         (docrodada.arrayMesa9[13].id) + '-' +
                                         (docrodada.arrayMesa10[13].id) + '-' +
                                         (docrodada.arrayMesa11[13].id) + '-' +
                                         (docrodada.arrayMesa12[13].id) + '-' +
                                         (docrodada.arrayMesa13[13].id) + '-' +
                                         (docrodada.arrayMesa14[13].id) + '-' +
                                         (docrodada.arrayMesa15[13].id) + '-' +
                                         (docrodada.arrayMesa16[13].id) + '-' +
                                         (docrodada.arrayMesa17[13].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id) + '-' +
                                             (docrodada.arrayMesa19[13].id) + '-' +
                                             (docrodada.arrayMesa20[13].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id) + '-' +
                                             (docrodada.arrayMesa19[13].id) + '-' +
                                             (docrodada.arrayMesa20[13].id)
                                             :
                                             (docrodada.arrayMesa5[13].id) + '-' +
                                             (docrodada.arrayMesa6[13].id) + '-' +
                                             (docrodada.arrayMesa7[13].id) + '-' +
                                             (docrodada.arrayMesa8[13].id) + '-' +
                                             (docrodada.arrayMesa9[13].id) + '-' +
                                             (docrodada.arrayMesa10[13].id) + '-' +
                                             (docrodada.arrayMesa11[13].id) + '-' +
                                             (docrodada.arrayMesa12[13].id) + '-' +
                                             (docrodada.arrayMesa13[13].id) + '-' +
                                             (docrodada.arrayMesa14[13].id) + '-' +
                                             (docrodada.arrayMesa15[13].id) + '-' +
                                             (docrodada.arrayMesa16[13].id) + '-' +
                                             (docrodada.arrayMesa17[13].id) + '-' +
                                             (docrodada.arrayMesa18[13].id) + '-' +
                                             (docrodada.arrayMesa19[13].id) + '-' +
                                             (docrodada.arrayMesa20[13].id) + '-' +
                                             (docrodada.arrayMesa21[13].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }
                        { docrodada.arrayMesa15.length != 0?                 
                         <Row xs={12} md={12} className="borderrow grande">
                         <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                         
                         <Card.Text>Mesa 15 </Card.Text>
                         </Col>
                         <Col xs={9} md={9} style={{ textAlign: 'center'}}>    
                         <Card.Text className="text-card ">
                         {(docrodada.arrayMesa1[14].id) + '-' +
                             (docrodada.arrayMesa2[14].id) + '-' +
                             (docrodada.arrayMesa3[14].id) + '-' +
                             (docrodada.arrayMesa4[14].id) + '-'} 
                         {   docrodada.arrayMesa1.length == 5 ? 
                             (docrodada.arrayMesa5[14].id)
                              :
                              docrodada.arrayMesa1.length == 6 ?
                              (docrodada.arrayMesa5[14].id) + '-' +
                              (docrodada.arrayMesa6[14].id)
                               :
                               docrodada.arrayMesa1.length == 7 ?
                               (docrodada.arrayMesa5[14].id) + '-' +
                               (docrodada.arrayMesa6[14].id) + '-' +
                               (docrodada.arrayMesa7[14].id)
                                :
                                docrodada.arrayMesa1.length == 8 ?
                                (docrodada.arrayMesa5[14].id) + '-' +
                                (docrodada.arrayMesa6[14].id) + '-' +
                                (docrodada.arrayMesa7[14].id) + '-' +
                                (docrodada.arrayMesa8[14].id)
                                 : 
                                 docrodada.arrayMesa1.length == 9 ?
                                 (docrodada.arrayMesa5[14].id) + '-' +
                                 (docrodada.arrayMesa6[14].id) + '-' +
                                 (docrodada.arrayMesa7[14].id) + '-' +
                                 (docrodada.arrayMesa8[14].id) + '-' +
                                 (docrodada.arrayMesa9[14].id) 
                                  :
                                  docrodada.arrayMesa1.length == 10 ?
                                    (docrodada.arrayMesa5[14].id) + '-' +
                                    (docrodada.arrayMesa6[14].id) + '-' +
                                    (docrodada.arrayMesa7[14].id) + '-' +
                                    (docrodada.arrayMesa8[14].id) + '-' +
                                    (docrodada.arrayMesa9[14].id) + '-' +
                                    (docrodada.arrayMesa10[14].id)
                                        
                                     :
                                     docrodada.arrayMesa1.length == 11 ?
                                     (docrodada.arrayMesa5[14].id) + '-' +
                                     (docrodada.arrayMesa6[14].id) + '-' +
                                     (docrodada.arrayMesa7[14].id) + '-' +
                                     (docrodada.arrayMesa8[14].id) + '-' +
                                     (docrodada.arrayMesa9[14].id) + '-' +
                                     (docrodada.arrayMesa10[14].id) + '-' +
                                     (docrodada.arrayMesa11[14].id)
                                     :
                                     docrodada.arrayMesa1.length == 12 ?
                                     (docrodada.arrayMesa5[14].id) + '-' +
                                     (docrodada.arrayMesa6[14].id) + '-' +
                                     (docrodada.arrayMesa7[14].id) + '-' +
                                     (docrodada.arrayMesa8[14].id) + '-' +
                                     (docrodada.arrayMesa9[14].id) + '-' +
                                     (docrodada.arrayMesa10[14].id) + '-' +
                                     (docrodada.arrayMesa11[14].id) + '-' +
                                     (docrodada.arrayMesa12[14].id)
                                     :
                                     docrodada.arrayMesa1.length == 13 ?
                                     (docrodada.arrayMesa5[14].id) + '-' +
                                     (docrodada.arrayMesa6[14].id) + '-' +
                                     (docrodada.arrayMesa7[14].id) + '-' +
                                     (docrodada.arrayMesa8[14].id) + '-' +
                                     (docrodada.arrayMesa9[14].id) + '-' +
                                     (docrodada.arrayMesa10[14].id) + '-' +
                                     (docrodada.arrayMesa11[14].id) + '-' +
                                     (docrodada.arrayMesa12[14].id) + '-' +
                                     (docrodada.arrayMesa13[14].id) 
                                         :
                                         docrodada.arrayMesa1.length == 14 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id)
                                         :
                                         docrodada.arrayMesa1.length == 15 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id) + '-' +
                                         (docrodada.arrayMesa15[14].id)
                                         :
                                         docrodada.arrayMesa1.length == 16 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id) + '-' +
                                         (docrodada.arrayMesa15[14].id) + '-' +
                                         (docrodada.arrayMesa16[14].id) 
                                         :
                                         docrodada.arrayMesa1.length == 17 ?
                                         (docrodada.arrayMesa5[14].id) + '-' +
                                         (docrodada.arrayMesa6[14].id) + '-' +
                                         (docrodada.arrayMesa7[14].id) + '-' +
                                         (docrodada.arrayMesa8[14].id) + '-' +
                                         (docrodada.arrayMesa9[14].id) + '-' +
                                         (docrodada.arrayMesa10[14].id) + '-' +
                                         (docrodada.arrayMesa11[14].id) + '-' +
                                         (docrodada.arrayMesa12[14].id) + '-' +
                                         (docrodada.arrayMesa13[14].id) + '-' +
                                         (docrodada.arrayMesa14[14].id) + '-' +
                                         (docrodada.arrayMesa15[14].id) + '-' +
                                         (docrodada.arrayMesa16[14].id) + '-' +
                                         (docrodada.arrayMesa17[14].id)
                                             :
                                             docrodada.arrayMesa1.length == 18 ?
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id)
                                             :
                                             docrodada.arrayMesa1.length == 19 ?
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id) + '-' +
                                             (docrodada.arrayMesa19[14].id) + '-' +
                                             (docrodada.arrayMesa20[14].id) 
                                             :
                                             docrodada.arrayMesa1.length == 20 ?
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id) + '-' +
                                             (docrodada.arrayMesa19[14].id) + '-' +
                                             (docrodada.arrayMesa20[14].id)
                                             :
                                             (docrodada.arrayMesa5[14].id) + '-' +
                                             (docrodada.arrayMesa6[14].id) + '-' +
                                             (docrodada.arrayMesa7[14].id) + '-' +
                                             (docrodada.arrayMesa8[14].id) + '-' +
                                             (docrodada.arrayMesa9[14].id) + '-' +
                                             (docrodada.arrayMesa10[14].id) + '-' +
                                             (docrodada.arrayMesa11[14].id) + '-' +
                                             (docrodada.arrayMesa12[14].id) + '-' +
                                             (docrodada.arrayMesa13[14].id) + '-' +
                                             (docrodada.arrayMesa14[14].id) + '-' +
                                             (docrodada.arrayMesa15[14].id) + '-' +
                                             (docrodada.arrayMesa16[14].id) + '-' +
                                             (docrodada.arrayMesa17[14].id) + '-' +
                                             (docrodada.arrayMesa18[14].id) + '-' +
                                             (docrodada.arrayMesa19[14].id) + '-' +
                                             (docrodada.arrayMesa20[14].id) + '-' +
                                             (docrodada.arrayMesa21[14].id)
                                              
                                     }             
                         
                         </Card.Text>
                         </Col>
                         </Row>
                        :
                         <Row>

                         </Row> 
                        }

 
                         </Col>    

           
                    )
                } )

                :
                <span/>
                
                }



          
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
            </Row>


           
        </Card>
        )
    })}
    </>
   );
}
 
export default ApresentacaoGrupo
