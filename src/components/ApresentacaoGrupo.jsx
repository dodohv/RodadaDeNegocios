import { Link } from 'react-router-dom';
import {FloatingLabel, Form,Container,Row, Col, Card ,Table  } from 'react-bootstrap'
import {useState, useEffect, useRef} from 'react'
import {BsClockHistory, BsFillPeopleFill, BsPeople} from 'react-icons/bs'
const ApresentacaoGrupo = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [reuniaocount, setReuniaoCount] = useState('');
    const [reuniaototal, setReuniaoTotal] = useState('');
    const [apresentacaoCount, setApresentacaoCount] = useState('');
    const [tempo,setTempo] = useState('00');
    const [intTempo, setIntTempo] = useState(0);
    const Ref = useRef(null);
    const [timer,setTimer] = useState('00:00:00')
    

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
    };
    const handlePause = () => {
        setIsPaused(!isPaused);
      };

      useEffect(() => {
        console.log(isActive)
        if (isActive ===true) {
            console.log('1 useEffect clearTimer')
            clearTimer(getDeadTime());
            
        }

    }, []);
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

    return (  
        <Container className='configurador'>
            <Row xs={1} md={12} className="g-4">
                <Col xs={12}>

                    <div>

                        <h3>Apresentação em grupo!</h3>
                    </div>
                    <h2>{timer}</h2>
                    <button onClick ={onClickReset}>RESET</button>
    
                        {isActive ? 
                        <div>
                            <button onClick ={handlePause}>Pausar</button>
                        </div>
                        :
                         <div>
                            <button onClick ={handleStart}>Começar</button>
                         </div>

                    }
           
                    
                </Col>
            </Row>
        </Container>
    );
}
 
export default ApresentacaoGrupo
