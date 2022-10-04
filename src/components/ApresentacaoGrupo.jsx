
import { Link } from 'react-router-dom';
import {FloatingLabel, Form,Container,Row, Col, Card ,Table,Button  } from 'react-bootstrap'
import {useState, useEffect, useRef} from "react"
import NegocioDataService from "../services/negocio.services"
import NotificationSound from "../assets/counter.wav";
import {BsClockHistory, BsFillPeopleFill, BsPeople, BsPlayCircle, BsPauseCircle, BsArrowLeftCircle} from 'react-icons/bs'
import MinutoDataService from "../services/minuto.services"
import Test from '../components/test'
const ApresentacaoGrupo = () => {

    const [minutos, setMinutos] = useState([]);
    const [pause, setPause] = useState(true);
    const [disableButton, setDisableButton] = useState(false);
    const [manual, setManual] = useState(true);
    const [leftright, setLeftRight] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(0);
    const audioPlayer = useRef(null);
    const [negocios, setNegocios] = useState([]);
    const [datadeHj,setDatadeHj] = useState("");
    const [reuniaocount, setReuniaoCount] = useState('');
    const [reuniaototal, setReuniaoTotal] = useState('');
    const [apresentacaoCount, setApresentacaoCount] = useState('');
    const [newSeconds, setNewSeconds] = useState(0);
    const [newMinutes, setNewMinutes] = useState(0);
    const Ref = useRef(null);

    const resetTime = (myminute, mysecond) => {
        setNewSeconds(mysecond);
        setNewMinutes(myminute);
    
    }
    const resetTimer = () => {
        clearInterval(timer2.current);
        timer2.current= undefined;
        setSecondsLeft(newSeconds);
        setMinutesLeft(newMinutes);
      }

    function playAudio() {
        audioPlayer.current.play();
    }
      
      const timer2 = () => {
        var countdown = setInterval(() => {


            if (minutesLeft == 0 && secondsLeft == 0 && pause != true ) {
                playAudio()
                pauseTimer()

            }

            if (secondsLeft < 1 && minutesLeft > 0 && pause != true) {
                console.log(secondsLeft)
                setMinutesLeft((min) => min - 1);
                setSecondsLeft(59);
            }
          if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
          }
    
          if (pause === true) {
            
            clearInterval(countdown);
            return;
          }
    
          setSecondsLeft((sec) => sec - 1);
        }, 1000);
        if (secondsLeft.toString().length == 1 ) {
            setSecondsLeft("0" + secondsLeft.toString())
            
        } else {
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

      const stopleftright = () => {
        setLeftRight((leftright) => !leftright )
        console.log("Test")
      }
      const pauseTimer = () => {
        setPause((pause) => !pause);
      };
      useEffect(timer2, [ minutesLeft,secondsLeft, pause]);

      useEffect(() => {
        getMinutos();
        getNegocios();

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


    const database = [
        {
            contador: 20
        }
    ]
    return (  
        <>
        {negocios.slice(-1).map((doc, index) => {
            return (

           <Card  key={index} style={{width:'1000px'}} 
           onLoadedData ={() =>
                {
                setMinutesLeft(doc.tempoPartMin) 
                ;
                setNewSeconds(doc.tempoPartSeg)
                ;
                stopleftright
                ;
                setSecondsLeft(doc.tempoPartSeg) 
                ;
                setNewMinutes(doc.tempoPartMin)
        }
        } 
           
           > 
            <Row xs={1} md={12} className="">
                <Col xs={12} md={12} style={{ marginLeft: '10px' , textAlign: 'start'}}>
                    <div>
                    
                        <Card.Title className='title-card'>
                        {doc.reuniao}
                        </Card.Title>
                           </div>
                </Col>
            </Row>
        <Row>
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
                        stopleftright
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
                    stopleftright
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
                    stopleftright
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
                        stopleftright
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
      <span></span>
      <p className="timernovo">
        0:{ minutesLeft.toString().length == 1 ? 
         "0" + minutesLeft
        : 
         minutesLeft 
        }
        :
        { secondsLeft.toString.lenght == 1 ?
        "0" + secondsLeft  
        : 
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
           Pausar
           </p>
           </>
            : 
            <>  
            <BsPauseCircle className="botão" onClick={pauseTimer} />
            <p>
            Iniciar
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
        onClick =  {resetTimer  } 
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
                00:00:00
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
            
            <Card.Text className="text-card">
                00:00:00
            </Card.Text>
        </Col>

        </Row>
        
            <Row xs={12} md={12} className="borderrow grande">
                {minutos.slice(1,5 +1).map((doc3, index3) => {
                    return(
                        <>
                        <Col xs={1} md={1} className="mesas">
                            
                        <Card.Text className="text-card ">{doc3.minuto} - </Card.Text>
                        </Col>
                        </>
                    )
                })}
        
            </Row>
        
        <Row xs={12} md={12} className="borderrow grande">
        
        

        {minutos.slice(1, (1 + parseInt(doc.participantes)) ).map((doc2, index2) => {
            return(
                <>
                
                <Col xs={1} md={1} key ={doc2.minuto} className="mesas">
                    <Card.Text className="text-card ">{doc2.minuto} - </Card.Text>
                </Col>
                </>
            )

        })

        }
                        <Col xs={4} md={4}  className="mesas">
                    
                </Col>
         </Row>
     {database.map((contar, index) => {
        return(
            <Row xs={12} md={12} className="borderrow grande">
            
            <Col xs={2} md={2}>
    
            <Card.Text className="text-card ">
                Mesa 1
            </Card.Text>
            </Col>
            <Col xs={10} md={10}>
                
{/*             { 1 < contar.contador

            ?
                
            <Card.Text className="text-card ">
                
            </Card.Text>
            : 
                           
            <Card.Text className="text-card ">
                Teste 
            </Card.Text>


            } */}
            </Col>
          </Row>

        )
     })}

      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card ">
            Mesa 1
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            1-2-3-4-5-6-7
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card ">
            Mesa 2
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            8-9-10-11-12-13-14
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande" >
        <Col xs={2} md={2}>

        <Card.Text className="text-card " >
            Mesa 3
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            15-16-17-18-19-20-21
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card ">
            Mesa 4
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            22-23-24-25-26-27-28
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card">
            Mesa 5
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card">
            29-30-31-32
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card">
            Mesa 6
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card">
           
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card">
            Mesa 7
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
           
        </Card.Text>
        </Col>
      </Row>

            </Card>
                   )
        
        })}
{/* {negocios.slice(1,2).map((doc, index) => {
            return (


           <Card bg={'outline-primary'} key={doc.id} style={{width:'1000px'}} > 
            <Row xs={1} md={12} className="">
                <Col xs={12} md={12} >
                    <div>
                        <h3>{doc.reuniao}</h3>
                           </div>
                </Col>
            </Row>
        <Row>
        <Col xs={4} md={4}>
            <Row xs={12} md={12} style={{marginLeft:'0px'}}>
                <Col xs={6} md={6} style={{ textAlign: 'start'}}>
                    <Card.Text className="text-card medio">
                      Reuniao 1/8          
                    </Card.Text>
                </Col>
                <Col xs={3} md={3}> 
                    <Button className="mini">
                        Anterior
                    </Button>
                </Col>
                <Col xs={3} md={3}> 
                    <Button className="mini">
                        Próximo
                    </Button>
                </Col>
            </Row>
            <Row xs={12} md={12} style={{marginLeft:'0px'}}>
                <Col xs={6} md={6}>
                    <Card.Text className="text-card medio">
                        Apresentação 1/ {doc.numMesas}
                    </Card.Text>         
                </Col>
                <Col xs={3} md={3}> 
                    <Button className="mini">
                        Anterior
                    </Button>
                </Col>
                <Col xs={3} md={3}> 
                    <Button className="mini">
                        Próximo
                    </Button>
                </Col>
            </Row>
        </Col>
        <Col xs={3} md={3}>
            <Row xs={12} md={12}>

        <p className="timernovo">{timer}</p>
            </Row>
            <Row xs={12} md={12}>
                <Col xs={4} md={4} className="mini">
                    
                        <BsPlayCircle className="botão" onClick ={onClickReset}/>
                  
                    <p>
                        Continuar
                    </p>
                </Col>
                <Col xs={4} md={4} className="mini">
                    <BsPauseCircle className="botão" onClick ={handleStart}/>
                    <p>
                        Pausar
                    </p>

                </Col>
                <Col xs={4} md={4} className="mini">
                    {isActive ? 
                    <div>

                        <BsPlayCircle className="botãoReverso" onClick ={handlePause} />
                        <p>
                        Reiniciar
                    </p>

                    </div>
                    
                    :
                    <div>
             <BsPlayCircle className="botãoReverso" onClick={playAudio} />
             <audio ref={audioPlayer} src={NotificationSound} />
                        <p>
                        Voltar
                    </p>

                    </div>
                    }      
                </Col>
            </Row>
            <Row xs={12} md={12}>
                <Col xs={4} md={4} className="medio">
                    <Form.Check             
                    />
                </Col>
                <Col xs={6} md={6} className="medio" >
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
                00:00:00
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
            
            <Card.Text className="text-card">
                00:00:00
            </Card.Text>
        </Col>

        </Row>
        
     {database.map((contar, index) => {
        return(
            <Row xs={12} md={12} className="borderrow grande">
            <Col xs={2} md={2}>
    
            <Card.Text className="text-card ">
                Mesa 1
            </Card.Text>
            </Col>
            <Col xs={10} md={10}>
                

            </Col>
          </Row>

        )
     })}
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card ">
            Mesa 1
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            1-2-3-4-5-6-7
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card ">
            Mesa 2
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            8-9-10-11-12-13-14
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande" >
        <Col xs={2} md={2}>

        <Card.Text className="text-card " >
            Mesa 3
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            15-16-17-18-19-20-21
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card ">
            Mesa 4
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
            22-23-24-25-26-27-28
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card">
            Mesa 5
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card">
            29-30-31-32
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card">
            Mesa 6
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card">
           
        </Card.Text>
        </Col>
      </Row>
      <Row xs={12} md={12} className="borderrow grande">
        <Col xs={2} md={2}>

        <Card.Text className="text-card">
            Mesa 7
        </Card.Text>
        </Col>
        <Col xs={10} md={10}>

        <Card.Text className="text-card ">
           
        </Card.Text>
        </Col>
      </Row>

            </Card>
                   )
                })} */}


        
    </>
        
   );
}
 
export default ApresentacaoGrupo
