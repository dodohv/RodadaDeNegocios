
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
import Test from '../components/test'
const ApresentacaoGrupo = () => {

    const [minutos, setMinutos] = useState([]);
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
    const [reuniaocount, setReuniaoCount] = useState('');
    const [reuniaototal, setReuniaoTotal] = useState('');
    const [apresentacaoCount, setApresentacaoCount] = useState('');
    const [newSeconds, setNewSeconds] = useState(0);
    const [newMinutes, setNewMinutes] = useState(0);
    const [contarReuniao, setContarReuniao] = useState(0);
    const [contarApresentacao, setContarApresentacao] = useState(0);
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
            if (minutesLeft == 0 && secondsLeft == 15 && pause != true) {
                playAudio3();
            }
            if (minutesLeft == 0 && secondsLeft == 0 && pause != true ) {
                playAudio()
                pauseTimer()
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
        
    }, []);
    const getNegocios = async () => {
        const data = await NegocioDataService.getAllNegocios();
        console.log(data.docs);
            setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
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
                                Reuniao 1/{doc.numMesas}          
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
                                Apresentação 1/ {doc.partMesa}
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
                                    } 
                                }
                                variant="outline-secondary" 
                                className="mini">
                                    Próximo
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={3} md={3}>
                    <Row xs={12} md={12}>
                        <span>TIMER</span>
                        <p className="timernovo">
                            0:{ minutesLeft.toString().length == 1 ? 
                            "0" + minutesLeft
                            : 
                            minutesLeft 
                            }
                            :
                            {
                            secondsLeft  
                            }
                        </p>
                        <Col xs={4} md={4} className="mini">
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
                        <Col xs={4} md={4} className="mini">   
                            <BsPauseCircle className="botãoReversoDisabled"   disabled= {disableButton} />
                            <p>
                                Pausar
                            </p>
                        </Col>
                        
                        }
                
                        <Col xs={4} md={4} className="mini">
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
                <Col xs={3} md={3} style={{ textAlign: 'start'}} >
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
                <Col xs={2} md={2} className="medio">
                    <Card.Text className="text-card">
                        {doc.tempoTotal}
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                         {tempoDecorrido}
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                        00:00:00
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                        00:00:00
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                        00:00:00
                    </Card.Text>
                </Col>
            </Row>    


            <Row xs={12} md={12} className="borderrow grande">  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                <Col xs={1} md={1}>
                    <Card.Text>Mesa 1 </Card.Text>
                </Col>  


                    {mesas.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
                    return(
                        <Col xs={5} md={5} className="mesas">
                            <Card.Text className="text-card ">
                            {doc.arrayMesas.slice(0, doc.partMesa ).join('-')}
                            </Card.Text>
                        </Col>
                        )
                    })}    
               
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>


            </Row>

            <Row xs={12} md={12} className="borderrow grande">  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                <Col xs={1} md={1}>
                    <Card.Text>Mesa 2 </Card.Text>
                </Col>  


                    {mesas.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
                    return(
                        <Col xs={5} md={5} className="mesas">
                            <Card.Text className="text-card ">
                            {doc.arrayMesas.slice(5,10).join('-')}
                            </Card.Text>
                        </Col>
                        )
                    })}    
               
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>


            </Row>

            <Row xs={12} md={12} className="borderrow grande">  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                <Col xs={1} md={1}>
                    <Card.Text>Mesa 3 </Card.Text>
                </Col>  


                    {mesas.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
                    return(
                        <Col xs={5} md={5} className="mesas">
                            <Card.Text className="text-card ">
                            {doc.arrayMesas.slice(10,15 ).join('-')}
                            </Card.Text>
                        </Col>
                        )
                    })}    
               
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>


            </Row>

            <Row xs={12} md={12} className="borderrow grande">  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                <Col xs={1} md={1}>
                    <Card.Text>Mesa 4 </Card.Text>
                </Col>  


                    {mesas.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
                    return(
                        <Col xs={5} md={5} className="mesas">
                            <Card.Text className="text-card ">
                            {doc.arrayMesas.slice(15,20 ).join('-')}
                            </Card.Text>
                        </Col>
                        )
                    })}    
               
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>


            </Row>

            <Row xs={12} md={12} className="borderrow grande">  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                <Col xs={1} md={1}>
                    <Card.Text>Mesa 5 </Card.Text>
                </Col>  


                    {mesas.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
                    return(
                        <Col xs={5} md={5} className="mesas">
                            <Card.Text className="text-card ">
                            {doc.arrayMesas.slice(20,25 ).join('-')}
                            </Card.Text>
                        </Col>
                        )
                    })}    
               
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>


            </Row>

            <Row xs={12} md={12} className="borderrow grande">  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                <Col xs={1} md={1}>
                    <Card.Text>Mesa 6 </Card.Text>
                </Col>  


                    {mesas.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
                    return(
                        <Col xs={5} md={5} className="mesas">
                            <Card.Text className="text-card ">
                            {doc.arrayMesas.slice(25,30 ).join('-')}
                            </Card.Text>
                        </Col>
                        )
                    })}    
               
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>


            </Row>
            <Row xs={12} md={12} className="borderrow grande">  
                <Col xs={3} md={3}>
                        <img src ="" />
                </Col>
                <Col xs={1} md={1}>
                    <Card.Text>Mesa 7 </Card.Text>
                </Col>  


                    {mesas.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc, index) => {
                    return(
                        <Col xs={5} md={5} className="mesas">
                            <Card.Text className="text-card ">
                            {doc.arrayMesas.slice(30,35 ).join('-')}
                            </Card.Text>
                        </Col>
                        )
                    })}    
               
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
