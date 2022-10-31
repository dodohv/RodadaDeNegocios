
import { Link } from 'react-router-dom';
import {Form,Container,Row, Col, Card ,Button  } from 'react-bootstrap'
import {useState, useEffect, useRef} from "react"
import NegocioDataService from "../services/negocio.services"
import NotificationSound3 from "../assets/bass.aac";
import NotificationSound2 from "../assets/alarm.aac";
import NotificationSound from "../assets/alarm.aac";
import { BsPlayCircle, BsPauseCircle} from 'react-icons/bs'
import RodadaDataService from "../services/rodada.service";
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
import { map } from '@firebase/util';
const ApresentacaoGrupo = () => {
    const [dodohvbr, setDodohvbr] = useState(null)
    const [dodohv, setDodohv] = useState(undefined)
    const [rodadas, setRodadas] = useState([]);
    const [rodadasFlat, setRodadasFlat] = useState([]);
    
    const [rodadasBoa, setRodadasBoa] = useState([]);
    const [rodadas2, setRodadas2] = useState([]);
    const [rodadas3, setRodadas3] = useState([]);
    const [rodadas4, setRodadas4] = useState([]);
    const [rodadas5, setRodadas5] = useState([]);
    const [rodadas6, setRodadas6] = useState([]);
    const [rodadas7, setRodadas7] = useState([]);
    const [rodadas8, setRodadas8] = useState([]);
    const [rodadas9, setRodadas9] = useState([]);
    const [rodadas10, setRodadas10] = useState([]);
    const [rodadas11, setRodadas11] = useState([]);
    const [rodadas12, setRodadas12] = useState([]);
    const [rodadas13, setRodadas13] = useState([]);
    const [rodadas14, setRodadas14] = useState([]);
    const [rodadas15, setRodadas15] = useState([]);
    const [rodadas16, setRodadas16] = useState([]);
    const [rodadas17, setRodadas17] = useState([]);
    const [rodadas18, setRodadas18] = useState([]);
    const [rodadas19, setRodadas19] = useState([]);
    const [rodadas20, setRodadas20] = useState([]);
    const [pause, setPause] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const [manual, setManual] = useState(true);
    const [iniciar,setIniciar] = useState(true);
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
    const[minhaReuniao,setMinhaReuniao] = useState('');
    const [negocios, setNegocios] = useState([]);
    const [newSeconds, setNewSeconds] = useState(0);
    const [newMinutes, setNewMinutes] = useState(0);
    const [newSecondsWait, setNewSecondsWait] = useState(0);
    const [newMinutesWait, setNewMinutesWait] = useState(0);
    const [contarReuniao, setContarReuniao] = useState(1);
    const [contarApresentacao, setContarApresentacao] = useState(1);
    const [flagTempo, setFlagTempo] = useState(true);
    const [meuNumMesas, setMeuNumMesas] = useState(0);
    const [meuPartMesas, setMeuPartMesas] = useState(0);
    const [meuIntIndMin, setMeuIntIndMin] = useState(0);
    const [meuIntIndSeg, setMeuIntIndSeg] = useState(0);
    const [meuIntGrupoMin, setMeuIntGrupoMin] = useState(0);
    const [meuIntGrupoSeg, setMeuIntGrupoSeg] = useState(0);
    const [meuTempoPartMin, setMeuTempoPartMin] = useState(0);
    const [meuTempoPartSeg, setMeuTempoPartSeg] = useState(0);
    const Ref = useRef(null);

    
    const resetTimerEspera = () => {
    if (flagTempo == true) {
        clearInterval(timer2.current);
        timer2.current= undefined;
        setSecondsLeft(newSecondsWait);
        setMinutesLeft(newMinutesWait);
    } else {
        clearInterval(timer2.current);
        timer2.current= undefined;
        setSecondsLeft(newSecondsWait);
        setMinutesLeft(newMinutesWait);
    }
    
   
    }
    const resetTimer = () => {
        if (flagTempo == true) {

            console.log("Tempo false",flagTempo);
        clearInterval(timer2.current);
        timer2.current= undefined;
        setSecondsLeft(newSeconds);
        setMinutesLeft(newMinutes);

        }
        else {

            console.log("Tempo true",flagTempo);
            clearInterval(timer2.current);
            timer2.current= undefined;
            setSecondsLeft(newSecondsWait);
            setMinutesLeft(newMinutesWait);         
    }
     
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
            if (minutesLeft == 0 && secondsLeft == 1 && pause != true ) {
                console.log(newSecondsWait) 
            
                newSecondsWait == parseInt(meuIntGrupoSeg) & newMinutesWait == parseInt(meuIntGrupoMin) ?
                setFlagTempo((flagTempo) => flagTempo)
                :
                setFlagTempo((flagTempo) => !flagTempo)
                

                
            }
            if (minutesLeft == 0 && secondsLeft == 0 && pause != true ) {

 
                        contarApresentacao !== parseInt(meuPartMesas) ?
                        setContarApresentacao( contarApresentacao !== parseInt(meuPartMesas) && flagTempo == true ? 
                        contarApresentacao + 1 : contarApresentacao) & setNewSecondsWait(parseInt(meuIntIndSeg)) & setNewMinutesWait(meuIntIndMin)
                        :
                        setContarReuniao( contarReuniao !== (parseInt(meuNumMesas)) ? contarReuniao + 1: contarReuniao )
                         & setContarApresentacao( contarApresentacao !== parseInt(meuPartMesas) && flagTempo == true ? 
                         parseInt(meuPartMesas) : (contarApresentacao - contarApresentacao)) & 
                         setNewSecondsWait(parseInt(meuIntGrupoSeg)) & setNewMinutesWait(meuIntGrupoMin)


        
                playAudio()
                
                resetTimer()
                


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

        console.log("pause ",flagTempo);
        resetTimer
        setPause((pause) => !pause);
        setIniciar ((iniciar) => !iniciar)
        console.log(newSeconds)
        console.log(secondsLeft)
            if(iniciar === true && newSeconds <= secondsLeft && newMinutes <= minutesLeft) {
                playAudio2()
                
                console.log("pause inicio if",flagTempo);
            }
    };
    useEffect(timer2, [ minutesLeft,secondsLeft, pause]);
    useEffect(() => {
        meuTempoDecorrido();
    },[timer3,timer3Hra,timer3Min,timer3Seg])
    useEffect(() => {

        getNegocios();
        getRodadas7();
        getRodadasBoa();
        getRodadas();
        getRodadas2();
        getRodadas3();
        getRodadas4();
        getRodadas5();
        getRodadas6();
        
        getRodadas8();
        getRodadas9();
        getRodadas10();
        getRodadas11();
        getRodadas12();
        getRodadas13();
        getRodadas14();
        getRodadas15();
        getRodadas16();
        getRodadas17();
        getRodadas18();
        getRodadas19();
        getRodadas20();

        

    }, []);

    

    const getNegocios = async () => {
        const data = await NegocioDataService.getAllNegocios();
        console.log("data.docs",data.docs);
            setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            const meuNegocios = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            if (negocios != ""){

                console.log("Puxando negocios")             
            negocios.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc,index) => {
                return( 
                    console.log("Chamou negocios") &
                    setMeuNumMesas(doc.numMesas) &
                    setMeuPartMesas(doc.partMesa) & 
                    setMeuTempoPartMin(doc.tempoPartMin) &
                    setMeuTempoPartSeg(doc.tempoPartSeg) &
                    setMeuIntIndMin(doc.intIndMin) &
                    setMeuIntIndSeg(doc.intIndSeg) &
                    setMeuIntGrupoMin(doc.intGrupMin) &
                    setMeuIntGrupoSeg(doc.intGrupSeg) &
                    setMinhaReuniao(doc.reuniao) &
                    console.log("Chamou negocios numMesas", meuNumMesas) &
                    console.log("Chamou negocios partMesas", meuPartMesas) &
                    console.log("Chamou negocios tempoPartMin", meuTempoPartMin) &
                    console.log("Chamou negocios tempoPartSeg", meuTempoPartSeg) &
                    console.log("Chamou negocios meuIntGrupoMin", meuIntGrupoMin) &    
                    console.log("Chamou negocios meuIntIndSeg", meuIntIndSeg) &
                    console.log("Chamou negocios meuIntGrupoMin", meuIntGrupoMin) &
                    console.log("Chamou negocios meuIntGrupoSeg", meuIntGrupoSeg) &
                    setMinutesLeft(doc.tempoPartMin) 
                    &
                    setNewSeconds(parseInt(doc.tempoPartSeg))
                    &
                    setSecondsLeft(parseInt(doc.tempoPartSeg)) 
                    &
                    setNewMinutes(parseInt(doc.tempoPartMin))
                )
                } )
            }
            else {
                console.log("não puxou negocios")
                meuNegocios.sort((a,b) =>(a.dataRodada > b.dataRodada) ? 1 : -1).slice(-1).map((doc,index) => {
                    return( 
                        console.log("Chamou negocios") &
                        setMeuNumMesas(doc.numMesas) &
                        setMeuPartMesas(doc.partMesa) & 
                        setMeuTempoPartMin(doc.tempoPartMin) &
                        setMeuTempoPartSeg(doc.tempoPartSeg) &
                        setMeuIntIndMin(doc.intIndMin) &
                        setMeuIntIndSeg(doc.intIndSeg) &
                        setMeuIntGrupoMin(doc.intGrupMin) &
                        setMeuIntGrupoSeg(doc.intGrupSeg) &
                        setMinhaReuniao(doc.reuniao) &
                        console.log("Chamou negocios numMesas", meuNumMesas) &
                        console.log("Chamou negocios partMesas", meuPartMesas) &
                        console.log("Chamou negocios tempoPartMin", meuTempoPartMin) &
                        console.log("Chamou negocios tempoPartSeg", meuTempoPartSeg) &
                        console.log("Chamou negocios meuIntGrupoMin", meuIntGrupoMin) &    
                        console.log("Chamou negocios meuIntIndSeg", meuIntIndSeg) &
                        console.log("Chamou negocios meuIntGrupoMin", meuIntGrupoMin) &
                        console.log("Chamou negocios meuIntGrupoSeg", meuIntGrupoSeg) &
                        setMinutesLeft(doc.tempoPartMin) 
                        &
                        setNewSeconds(parseInt(doc.tempoPartSeg))
                        &
                        setSecondsLeft(parseInt(doc.tempoPartSeg)) 
                        &
                        setNewMinutes(parseInt(doc.tempoPartMin))
                    )
                    } )
            
            }

    };
    const getRodadas = async () => {
        const data = await RodadaDataService.getAllRodadas();
            setRodadas(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            const minhaRodadas = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            if (rodadas != ""){
                console.log("não puxou rodadas")
                setRodadasFlat(minhaRodadas)
            }else {
                console.log("Puxou rodadas")
                setRodadasFlat(minhaRodadas.flatMap((flatrodada) => ({...flatrodada.data(), id: flatrodada.id})))

            }
    }
    const getRodadasBoa = async () => {
        const data = await RodadaBoaDataService.getAllRodadasBoa();
            setRodadasBoa(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas2 = async () => {
        const data = await Rodada2DataService.getAllRodadas2();
            setRodadas2(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas3 = async () => {
        const data = await Rodada3DataService.getAllRodadas3();
            setRodadas3(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas4 = async () => {
        const data = await Rodada4DataService.getAllRodadas4();
            setRodadas4(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas5 = async () => {
        const data = await Rodada5DataService.getAllRodadas5();
            setRodadas5(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas6 = async () => {
        const data = await Rodada6DataService.getAllRodadas6();
            setRodadas6(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas7 = async () => {
        const data = await Rodada7DataService.getAllRodadas7();
            setRodadas7(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas8 = async () => {
        const data = await Rodada8DataService.getAllRodadas8();
            setRodadas8(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas9 = async () => {
        const data = await Rodada9DataService.getAllRodadas9();
            setRodadas9(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas10 = async () => {
        const data = await Rodada10DataService.getAllRodadas10();
            setRodadas10(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas11 = async () => {
        const data = await Rodada11DataService.getAllRodadas11();
            setRodadas11(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas12 = async () => {
        const data = await Rodada12DataService.getAllRodadas12();
            setRodadas12(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas13 = async () => {
        const data = await Rodada13DataService.getAllRodadas13();
            setRodadas13(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas14 = async () => {
        const data = await Rodada14DataService.getAllRodadas14();
            setRodadas14(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas15 = async () => {
        const data = await Rodada15DataService.getAllRodadas15();
            setRodadas15(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas16 = async () => {
        const data = await Rodada16DataService.getAllRodadas16();
            setRodadas16(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas17 = async () => {
        const data = await Rodada17DataService.getAllRodadas17();
            setRodadas17(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas18 = async () => {
        const data = await Rodada18DataService.getAllRodadas18();
            setRodadas18(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas19 = async () => {
        const data = await Rodada19DataService.getAllRodadas19();
            setRodadas19(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    const getRodadas20 = async () => {
        const data = await Rodada20DataService.getAllRodadas20();
            setRodadas20(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
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
           onLoad={() =>
            {
                getNegocios;
                
            }
        } 
           
           > 
            <Row xs={12} md={12} className="">
                <Col xs={12} md={12} style={{ marginLeft: '10px' , textAlign: 'start'}}>
                    <div>
                        <Card.Title className='title-card'>
                            {minhaReuniao}
                        </Card.Title>
                    </div>
                </Col>
            </Row>
            <Row xs={12} md={12}>
                <Col xs={4} md={4}>
                    <Row xs={12} md={12} style={{marginLeft:'0px'}}>
                        <Col xs={6} md={6} style={{ textAlign: 'start'}}>
                           <Card.Text className="text-card medio">
                                Reuniao {contarReuniao}/{meuNumMesas}          
                            </Card.Text>
                        </Col>
                        <Col xs={3} md={3}> 
                            <Button 
                                onClick ={() => {
                                    setMinutesLeft(meuIntGrupoMin) 
                                    ; 
                                    setSecondsLeft(meuIntGrupoSeg)
                                    ;
                                    setNewSeconds(meuIntGrupoSeg)
                                    ;
                                    setNewMinutes(meuIntGrupoMin)
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
                                    setMinutesLeft(meuIntGrupoMin) 
                                    ; 
                                    setSecondsLeft(meuIntGrupoSeg)
                                    ;
                                    setNewSeconds(meuIntGrupoSeg)
                                    ;
                                    setNewMinutes(meuIntGrupoMin)
                                    ;
                                setContarReuniao( contarReuniao !== (parseInt(meuNumMesas)) ? contarReuniao + 1: contarReuniao )
                                
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
                                Apresentação {contarApresentacao}/{parseInt(meuPartMesas)}
                            </Card.Text>         
                        </Col>
                        <Col xs={3} md={3}> 
                            <Button 
                                onClick ={() => {
                                    setMinutesLeft(meuTempoPartMin) 
                                    ; 
                                    setSecondsLeft(meuTempoPartSeg)
                                    ;
                                    setNewSeconds(meuTempoPartSeg)
                                    ;
                                    setNewMinutes(meuTempoPartMin)   
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
                                setMinutesLeft(meuTempoPartMin) 
                                ; 
                                setSecondsLeft(meuTempoPartSeg)
                                ;
                                setNewSeconds(meuTempoPartSeg)
                                ;
                                setNewMinutes(meuTempoPartMin)
                                ; 
                                setContarApresentacao(contarApresentacao !== (parseInt(meuPartMesas)) ? contarApresentacao + 1: contarApresentacao) 
                          
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
                        {meuTempoPartMin.length > 1 && meuTempoPartSeg.length > 1 ?
                        "00:" + meuTempoPartMin + ":" + meuTempoPartSeg
                        :
                         meuTempoPartMin.length == 1 && meuTempoPartSeg.length < 2  ?
                          "00:0" + meuTempoPartMin + ":0" + meuTempoPartSeg + "aa"
                              :
                              meuTempoPartMin.length == 1 && meuTempoPartSeg.length > 1 ?
                                "00:0" + meuTempoPartMin + ":" + meuTempoPartSeg
                                    :
                                    meuTempoPartMin.length == null && meuTempoPartSeg.length > 1 ?
                                    "00:0" + meuTempoPartMin + ":" + meuTempoPartSeg
                                    :
                                    meuTempoPartMin.length >1 && meuTempoPartSeg.length == null ?
                                    "00:" + meuTempoPartMin + ":0" + meuTempoPartSeg
                                    :
                                    meuTempoPartMin.length <2 && meuTempoPartSeg.length == null ?
                                    "00:0" + meuTempoPartMin + ":0" + meuTempoPartSeg
                                    :
                                    "00:0" + meuTempoPartMin + ":0" + meuTempoPartSeg

                        
                        }
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                        {
                        meuIntIndMin.length > 1 && meuIntIndSeg.length > 1 ?
                        "00:" + meuIntIndMin + ":" + meuIntIndSeg
                            :
                            meuIntIndMin.length != 2 && meuIntIndSeg.length != 2  ?
                            "00:0" + meuIntIndMin + ":0" + meuIntIndSeg
                                :
                                meuIntIndMin.length == 1 && meuIntIndSeg.length > 1 ?
                                "00:0" + meuIntIndMin + ":" + meuIntIndSeg
                                    :
                                    meuIntIndMin.length == null && meuIntIndSeg.length > 1 ?
                                    "00:0" + meuIntIndMin + ":" + meuIntIndSeg
                                    :
                                    meuIntIndMin.length >1 && meuIntIndSeg.length == null ?
                                    "00:" + meuIntIndMin + ":0" + meuIntIndSeg
                                    :
                                    meuIntIndMin.length <2 && meuIntIndSeg.length == null ?
                                    "00:0" + meuIntIndMin + ":0" + meuIntIndSeg
                                    :

                                    "00:0" + meuIntIndMin + ":0" + meuIntIndSeg
                                    
                        }
                    </Card.Text>
                    
                    <Card.Text className="text-card">
                    {
                        meuIntGrupoMin.length > 1 && meuIntGrupoSeg.length > 1 ?
                        "00:" + meuIntGrupoMin + ":" + meuIntGrupoSeg
                            :
                            meuIntGrupoMin.length != 2 && meuIntGrupoSeg.length != 2  ?
                            "00:0" + meuIntGrupoMin + ":0" + meuIntGrupoSeg
                                :
                                meuIntGrupoMin.length == 1 && meuIntGrupoSeg.length > 1 ?
                                "00:0" + meuIntGrupoMin + ":" + meuIntGrupoSeg
                                    :
                                    meuIntGrupoMin.length == null && meuIntGrupoSeg.length > 1 ?
                                    "00:0" + meuIntGrupoMin + ":" + meuIntGrupoSeg
                                    :
                                    meuIntGrupoMin.length >1 && meuIntGrupoSeg.length == null ?
                                    "00:" + meuIntGrupoMin + ":0" + meuIntGrupoSeg
                                    :
                                    meuIntGrupoMin.length <2 && meuIntGrupoSeg.length == null ?
                                    "00:0" + meuIntGrupoMin + ":0" + meuIntGrupoSeg
                                    :

                                    "00:0" + meuIntGrupoMin + ":0" + meuIntGrupoSeg
                                    
                        }
                    </Card.Text>
                </Col>
            </Row>    
         
            
            <Row xs={12} md={12}>  
                {/* <Col xs={3} md={3}>
                        <img src ="" />
                </Col> */}
                <Col xs={3} md={3}>
               
                <pre>{ JSON.stringify(rodadasFlat, undefined, 2) }</pre>      
                
                </Col>
                
                {
                 contarReuniao == 1 ?

                    rodadasFlat.sort((a,b)=> a.dataRodada > b.dataRodada ? 1 : -1).slice(-1).flatMap((docrodada, indexrodada) => {
                        return(
                            <Col xs={6} md={6} key={indexrodada} className="mesas">
                                <Row xs={12} md={12} className="borderrow grande">
                                    <Col xs={2} md={2} style={{ textAlign: 'start'}} >
                                        <Card.Text>Mesa 1 </Card.Text>
                                    </Col>
                                    <Col xs={9} md={9} style={{ textAlign: 'center'}}>
                                      <Card.Text className="text-card ">
                                         {/*{docrodada.arrayMesa1[0].id}*/}
                                         { JSON.stringify(docrodada, undefined, 2)}
                                         {
                                            
                                         }
                                         {/* { `${docrodada.arrayMesa1[0].id}`}
                                         { docrodada.arrayMesa2[indexrodada].id}
                                         { docrodada.arrayMesa1[indexrodada].idParticipante} */}
                                      </Card.Text>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    })
                :
                <span/>
                
                }



          
                <Col xs={3} md={3}>
                <pre>{ JSON.stringify(rodadasFlat, undefined, 4) }</pre>  
                </Col>
                {/* <Col xs={3} md={3}>
                        <img src ="" />
                </Col> */}
            </Row>


           
        </Card>
        )
    })}
    </>
   );
}
 
export default ApresentacaoGrupo
