import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './base.css';
import './ActionBar.css';
import './BetStatusBar.css';
import './Spinner.css';
// import './mediaqueries.css';
import myGif from './assets/shark-gif-1.gif';

// import { loser, getLoser } from './helpers';
import Navbar         from './Navbar';
import WinningSound   from './WinningSound'; 
import Spinner        from './Spinner';
import ActionBar      from './ActionBar';       
import RepeatButton   from './RepeatButton'; 
import BetIncreaseBtn from './BetIncreaseBtn';
import BetDecreaseBtn from './BetDecreaseBtn';
import AutoPlayBtn    from './AutoPlayBtn';
import FastPlayBtn    from './FastPlayBtn';
import { FontAwesomeIcon }             from '@fortawesome/react-fontawesome';
import { faWallet, faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons';

function App() {
    const matches                           = useRef([]);
    const [winner, setWinner]               = useState(false);
    const [hasPlayed, setHasPlayed]         = useState(false);
    const [walletAmount, setWalletAmount]   = useState(1000); 
    const [betAmount, setBetAmount]         = useState(0);         
    const [totalWinnings, setTotalWinnings] = useState(0); 

    const finishHandler = (value) => {
        if (!hasPlayed) return;  

        matches.current.push(value);  
        if (matches.current.length === 3 && hasPlayed) {
            const first = matches.current[0];
            let results = matches.current.every(match => match === first);
            setWinner(results);
            setTotalWinnings(totalWinnings+200)
            setHasPlayed(false);
        }
    }

    const emptyMatchesArray = () => {
        matches.current = [];
    }

    const handleClick = () => { 
        emptyMatchesArray();
        setWinner(null);
        setHasPlayed(true);
        setWalletAmount(walletAmount-50);
        child1.current.forceUpdateHandler();
        child2.current.forceUpdateHandler();
        child3.current.forceUpdateHandler();
    }

    const handleIncreaseBet = () => {
        setBetAmount(prevBet => {
            if (prevBet < 50) {
                return prevBet + 10;
            } else {
                return prevBet;
            }
        });
    };

    const handleDecreaseBet = () => {
        setBetAmount(prevBet => {
            if (prevBet >= 10) {
                return prevBet -= 10;
            } else {
                return prevBet; 
            }
        });
    };

    const child1 = useRef(null);
    const child2 = useRef(null);
    const child3 = useRef(null);
    
    return (
        <div className="container-fluid h-100">
            <Navbar />
            {winner === true && <WinningSound />}
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 parent-container">
                <div className="gif-container">
                    <img src={myGif} alt="Descrição do GIF" />
                </div>

                    <div className="spinner-container row">
                        <Spinner betAmount={betAmount} hasPlayed={hasPlayed} onFinish={finishHandler} ref={child1} timer="1000" />
                        <Spinner betAmount={betAmount} hasPlayed={hasPlayed} onFinish={finishHandler} ref={child2} timer="500" />
                        <Spinner betAmount={betAmount} hasPlayed={hasPlayed} onFinish={finishHandler} ref={child3} timer="900" />
                        <div className="gradient-fade"></div>
                    </div>
    
                    <div className="bet-status-bar-container row">
                        <div className="col">
                            <FontAwesomeIcon icon={faWallet} /> {walletAmount}
                        </div>
                        <div className="col">
                            <FontAwesomeIcon icon={faCoins} />  {betAmount}
                        </div>
                        <div className="col">
                            <FontAwesomeIcon icon={faTrophy} /> {totalWinnings}
                        </div>
                    </div>
    
                    <div className="action-bar-container row">
                        <ActionBar>
                            <FastPlayBtn />
                            
                            <BetDecreaseBtn onClick={handleDecreaseBet} />

                            {winner !== null && <RepeatButton onClick={handleClick} />}

                            <BetIncreaseBtn onClick={handleIncreaseBet} />
                        
                            <AutoPlayBtn />
                        </ActionBar>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
