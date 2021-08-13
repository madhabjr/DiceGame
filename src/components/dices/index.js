import { useState, useRef, useEffect } from 'react';
import dice1 from '../../images/dice1.svg';
import dice2 from '../../images/dice2.svg';
import dice3 from '../../images/dice3.svg';
import dice4 from '../../images/dice4.svg';
import dice5 from '../../images/dice5.svg';
import dice6 from '../../images/dice6.svg';

import './index.css';

let i = 0;
var first = []; var second = [];
let fir = 0, sec = 0

function Dices() {



  useEffect(() => {
    Reset();
    Name();

  }, []);


  const [result, setResult] = useState('Click this button below to start');
  const [user1History, setUser1History] = useState([]);
  const [user2History, setUser2History] = useState([]);
  const [user1name, setUser1name] = useState("Player 1")
  const [user2name, setUser2name] = useState("Player 2")
  const [chance, setChance] = useState(true)  // true player 1 false player 2 

  const user1 = useRef(null);
  const user2 = useRef(null);
  const resultDice = useRef(null);
  const titleHistoryResult = useRef(null);

  let diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const Roll = () => {

    chance ? setChance(false) : setChance(true);
    setResult(`Your chance : ${chance ? user2name ? user2name : "Player 2" : user1name ? user1name : "Player 1"} `);
    // Generate random number
    const firstRandomNum = Math.floor(Math.random() * 6) + 1; //  Player 1 dice valuse
    const secondRandomNum = Math.floor(Math.random() * 6) + 1; // Player 2 dice value
    first[i] = firstRandomNum;
    second[i] = secondRandomNum;
    i++;
    chance ? fir += firstRandomNum : sec += secondRandomNum;
    console.log(fir, sec)
    if (chance) setUser1History(prev => [...prev, {
      id: user1History.length,
      value: `${user1name ? user1name : "Player 1"} - ${fir} \u00A0  `,
    }])
    else setUser2History(prev => [...prev, {
      id: user2History.length,
      value: `${user2name ? user2name : "Player 2"} - ${sec} \u00A0   `,
    }])


    if (((i) % 10) === 0) {
      if (fir > sec) {
        setResult(`The winner is ${user1name ? user1name : "Player 1"} with ${fir} points`)
        alert(`The winner is ${user1name ? user1name : "Player 1"} with ${fir} points`)
        Reset();
      }
      else if (fir < sec) {
        setResult(`The winner is ${user2name ? user2name : "Player 2"} with ${sec} points`)
        alert(`The winner is ${user2name ? user2name : "Player 2"} with ${sec} points`)
        Reset();
      }
      else {
        setResult(`It is a draw!! Better luch next time`)
        alert(`It is a draw!! Better luch next time`)
        Reset();
      }

    }
    chance ? user1.current.setAttribute('src', diceImages[firstRandomNum - 1]) : user2.current.setAttribute('src', diceImages[secondRandomNum - 1]);
  };

  const Reset = () => {
    i = 0;
    setUser1History([])
    setUser2History([])
    fir = 0; sec = 0
    user1.current.setAttribute('src', diceImages[0]);
    user2.current.setAttribute('src', diceImages[0]);
    setResult('Click this button below to start');
    setChance(true)

  };


  const Name = () => {

    alert("Hello Welcome to Play ROLL THE DICE");
    const user1 = prompt("Please enter your name ", "Player 1")
    setUser1name(user1)
    const user2 = prompt("Please enter your name ", "Player 2")
    setUser2name(user2)
  }

  return (
    <>
      <div className='dice-wrapper'>
        <div className='dice-area'>
          <p><b> {chance ? "🔴" : ""} {user1name ? user1name : "Player 1"} {chance ? "🔴" : ""}</b></p>
          <img src={dice1} ref={user1} alt='Dice' />
        </div>
        <div className='dice-area' >
          <p> <b> {chance ? "" : "🔴"} {user2name ? user2name : "Player 2 "} {chance ? "" : "🔴"}</b></p>
          <img src={dice1} ref={user2} alt='Dice' />
        </div>
      </div>
      <p className='result' ref={resultDice}>
        <h2><b>{result}</b></h2>
      </p>


      <button onClick={Roll} className='btn' on >
        Roll the Dice
      </button>
      <span>&nbsp;&nbsp;</span><span>&nbsp;&nbsp;</span>
      <button onClick={Reset} className='btn reset'>
        Reset
      </button>

      <h2 ref={titleHistoryResult}>Score</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>


        <div style={{ display: 'flex', flexDirection: 'column', }}>
          {user1History.map((item, index) =>
            <h3>{item.value}</h3>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          {
            user2History.map((item, index) =>
              <h3>{item.value}</h3>)
          }
        </div>
      </div>
    </>
  );
}

export default Dices;
