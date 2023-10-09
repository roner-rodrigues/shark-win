import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './base.css';
import './ActionBar.css';
import './Spinner.css';
// import './mediaqueries.css';
import WinningSound   from './WinningSound'; 
import Spinner        from './Spinner';
import ActionBar      from './ActionBar';       
import RepeatButton   from './RepeatButton'; 
import BetIncreaseBtn from './BetIncreaseBtn';
import BetDecreaseBtn from './BetDecreaseBtn';

const loser = [
    'Not quite', 
    'Stop gambling', 
    'Hey, you lost!', 
    'Ouch! I felt that',      
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
];

function App() {
    const matches = useRef([]);
    const [winner, setWinner]       = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [totalBet, setTotalBet]   = useState(10);

    const finishHandler = (value) => {
        if (!hasPlayed) return;  

        matches.current.push(value);  
        if (matches.current.length === 3 && hasPlayed) {
            const first = matches.current[0];
            let results = matches.current.every(match => match === first);
            setWinner(results);
            setHasPlayed(false);
        }
    }

    const emptyMatchesArray = () => {
        matches.current = [];
    }

    const handleClick = () => { 
        setWinner(null);
        emptyMatchesArray();
        // child1.current.moveToIcon(5);
        // child1.current.forceUpdateHandler(1000,1);
        child1.current.forceUpdateHandler();
        child2.current.forceUpdateHandler();
        child3.current.forceUpdateHandler();
        setHasPlayed(true);

    }

    const getLoser = () => {
        return loser[Math.floor(Math.random()*loser.length)];
    }

    const child1 = useRef(null);
    const child2 = useRef(null);
    const child3 = useRef(null);
    
    return (
        <div className="container-fluid h-100">
            {winner === true && <WinningSound />}
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 parent-container">
                    <h1 style={{ color: 'white' }}>
                        <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
                    </h1>
    
                    <div className="spinner-container">
                        <Spinner hasPlayed={hasPlayed} onFinish={finishHandler} ref={child1} timer="1000" />
                        <Spinner hasPlayed={hasPlayed} onFinish={finishHandler} ref={child2} timer="900" />
                        <Spinner hasPlayed={hasPlayed} onFinish={finishHandler} ref={child3} timer="1200" />
                        <div className="gradient-fade"></div>
                    </div>
    
                    <div className="user-status-container">
                        <h2>Total Bet: {totalBet}</h2>
                    </div>
    
                    <div className="action-bar-container">
                        <ActionBar>
                            <BetDecreaseBtn onClick={() => setTotalBet(prevBet => prevBet - 1)} />

                            {winner !== null && <RepeatButton onClick={handleClick} />}

                            <BetIncreaseBtn onClick={() => setTotalBet(prevBet => prevBet + 1)} />
                        </ActionBar>
                    </div>
                </div>
            </div>
        </div>
    );
        
    

    
}

export default App;
