//How fazer um random em react


import { useEffect, useState, useRef } from "react";
import NotificationSound from "../assets/counter.wav";

const test = () => {
  const audioPlayer = useRef(null);
  const [pause, setPause] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(1);
  const [minutesLeft, setMinutesLeft] = useState(1);
  const Ref = useRef(null);
  function playAudio() {
    audioPlayer.current.play();
}

  const resetTimer = () => {
    clearInterval(timer.current);
    timer.current= undefined;
    setSecondsLeft(59);
  }
  const timer = () => {
    
    var countdown = setInterval(() => {
        console.log(secondsLeft)
        if (minutesLeft == 0 && secondsLeft == 0) {
            playAudio()
        }
        if (secondsLeft < 1 && minutesLeft > 0) {
            console.log(secondsLeft)
            setMinutesLeft((min) => min - 1);
            setSecondsLeft(59);
        }

        if (secondsLeft <= 0) {

        clearInterval(countdown);

        return ;
      }

      if (pause === true) {
        clearInterval(countdown);

        return;
      }

      setSecondsLeft((sec) => sec - 1);
      
    }, 1000);
    return () => {
      clearInterval(countdown);

    };
  };
  useEffect(
    
    timer, [minutesLeft,secondsLeft, pause]);

  const pauseTimer = () => {
    setPause((pause) => !pause);
  };

  return (
    <div>
      <span>Seconds Left</span>
      <p>{minutesLeft}:{secondsLeft}</p>
      <button  onClick={pauseTimer}>{pause ? "Start" : "Pause"}</button>
      <button onClick={resetTimer}>Reset</button>
      <audio ref={audioPlayer} src={NotificationSound} />
    </div>
  );
}

export default test