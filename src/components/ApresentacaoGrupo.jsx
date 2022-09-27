
import { Link } from 'react-router-dom';
import {FloatingLabel, Form,Container,Row, Col, Card ,Table,Button  } from 'react-bootstrap'
import {useState, useEffect, useRef} from "react"
import NegocioDataService from "../services/negocio.services"
import NotificationSound from "../assets/counter.wav";
import {BsClockHistory, BsFillPeopleFill, BsPeople, BsPlayCircle, BsPauseCircle, BsArrowLeftCircle} from 'react-icons/bs'

const ApresentacaoGrupo = () => {
    const audioPlayer = useRef(null);
    const [negocios, setNegocios] = useState([]);
    const [datadeHj,setDatadeHj] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [reuniaocount, setReuniaoCount] = useState('');
    const [reuniaototal, setReuniaoTotal] = useState('');
    const [apresentacaoCount, setApresentacaoCount] = useState('');
    const [tempo,setTempo] = useState('00');
    const [intTempo, setIntTempo] = useState(0);
    const [contador, setContador] = useState(1);
    const Ref = useRef(null);
    const [timer,setTimer] = useState('00:00:00')
    const [ iteracao, setIteracao] = useState(1)
    function playAudio() {
        audioPlayer.current.play();
    }
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
    const handlePause = () => {
        setIsPaused(!isPaused);
      };
      useEffect(() => {
        getNegocios();
/*         console.log(isActive)
        if (isActive ===true) {
            console.log('1 useEffect clearTimer')
            clearTimer(getDeadTime()); 
        }*/
    }, []);
 
    const getNegocios = async () => {
        const data = await NegocioDataService.getAllNegocios();
        console.log(data.docs);
        setNegocios(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    const getDeadTime = () => {
        console.log('1 getDeadTime')
        let deadline = new Date();
        
        deadline.setSeconds(deadline.getSeconds() + 40);
        return deadline;
    }
    const clearTimer = (e) => {
        console.log('1 clearTimer')
        setTimer('00:00:40');
        
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const startTimer = (e) => {
        console.log('1 startTimer')
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':' + 
                (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
    const getTimeRemaining = (e) => {
        console.log('1 getTimeRemaining')
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        
        return {
            total, hours, minutes, seconds
        };
        
    }
    const onClickReset = () => {
        console.log('1 onClickReset')
        clearTimer(getDeadTime());
    }
    const database = [
        {
            contador: 20
        }
    ]

    return (  
        <>
        <div>
            <button
            variant="dark edit"
            onClick={getNegocios}
            >Atualizar</button>
        </div>

        {negocios.slice().map((doc, index) => {
            return (

           <Card  key={doc.id} style={{width:'1000px'}} > 
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
                    <Button variant="danger"  className="mini">
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
{negocios.slice(1,2).map((doc, index) => {
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
                })}


        
    </>
        
   );
}
 
export default ApresentacaoGrupo
