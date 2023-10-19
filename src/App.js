import React, { useState, useRef, useEffect } from 'react';
import { useLottie }        from "lottie-react";
// import groovyWalkAnimation  from "./assets/groovyWalk.json";
import myGif   from './assets/shark-1.jpg';

import 'bootstrap/dist/css/bootstrap.css';
import './base.css';
import './Spinner.css';
import './BetBarContainer.css';
import './ActionBar.css';
// import './mediaqueries.css';
import Navbar         from './Navbar';
import WinningSound   from './WinningSound'; 
import Spinner        from './Spinner';
import ActionBar      from './ActionBar';       
import RepeatButton   from './RepeatButton'; 
import BetIncreaseBtn from './BetIncreaseBtn';
import BetDecreaseBtn from './BetDecreaseBtn';
import AutoPlayBtn    from './AutoPlayBtn';
import FastPlayBtn    from './FastPlayBtn';
import Overlay        from './Overlay';
import { FontAwesomeIcon }             from '@fortawesome/react-fontawesome';
import { faWallet, faCoins, faTrophy } from '@fortawesome/free-solid-svg-icons';


function App() {
    const totalIcons                          = 9;
    const matches                             = useRef([]);
    const [winner, setWinner]                 = useState(false);
    const [hasPlayed, setHasPlayed]           = useState(false);
    const [walletAmount, setWalletAmount]     = useState(1000); 
    const [betAmount, setBetAmount]           = useState(0);         
    const [totalWinnings, setTotalWinnings]   = useState(0); 
    const spinnerRef = useRef(null);

    useEffect(() => {
        if (winner) {
            setTotalWinnings(prevWinnings => prevWinnings + 200);
        }
    }, [winner]);

    const computeVisibleIndices = () => {
        const visibleIndices = [];
    
        for (let value of matches.current) {
            const topValue = (value - 1 + totalIcons) % totalIcons;
            const bottomValue = (value + 1) % totalIcons;
            visibleIndices.push([topValue, value, bottomValue]);
        }
    
        return visibleIndices;
    }        

    const finishHandler = (value) => {
        if (!hasPlayed) return;  

        matches.current.push(value);  
        if (matches.current.length === 3 && hasPlayed) {
            const visibleMatrix = computeVisibleIndices();
            console.log(visibleMatrix);
            
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
        emptyMatchesArray();
        setWinner(null);
        setHasPlayed(true);
        setWalletAmount(prevWallet => prevWallet - betAmount);
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

    // const options = {
    //     animationData: groovyWalkAnimation,
    //     loop: true
    // };    
    // const { View } = useLottie(options);

    return (
        <div className="container-fluid h-100">
            <Navbar />
            {winner === true && <WinningSound />}
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 parent-container">
                    <div className="gif-container row">
                        <img src={myGif} />                    
                    </div>

                    <div className="spinner-container row">
                        {/* <div className="lateral-column no-stack-col"></div> */}
                        <Spinner 
                            betAmount={betAmount} 
                            hasPlayed={hasPlayed} 
                            onFinish={finishHandler} 
                            ref={child1} 
                            timer="1000"
                            showOverlay={true} 
                        />

                        <Spinner betAmount={betAmount} hasPlayed={hasPlayed} onFinish={finishHandler} ref={child2} timer="500" />
                        
                        <Spinner betAmount={betAmount} hasPlayed={hasPlayed} onFinish={finishHandler} ref={child3} timer="900" />
                        {/* <div className="lateral-column no-stack-col"></div> */}
                    </div>


                    <div className="bet-bar-container">
                        <div className="bet-header-bar-container row">
                            <div className="scrolling-text">
                                Jogue Shark Win para ganhar diversos prêmios!
                            </div>
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
