import React, { useState, useRef, useEffect } from 'react';

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
import { FontAwesomeIcon }             
    from '@fortawesome/react-fontawesome';
import { faWallet, faCoins, faTrophy } 
    from '@fortawesome/free-solid-svg-icons';

function MainContent({
    winner, 
    bannerPrincipal,
    betAmount,
    hasPlayed,
    finishHandler,
    child1,
    child2,
    child3,
    walletAmount,
    totalWinnings,
    handleDecreaseBet,
    handleClick,
    handleIncreaseBet,
    
    hasCheated,
    forcedSymbol,
    winnerIndexesPosArr,
    winnerIndexesSymbolsArr,
}) {
    return (
        <div className="container-fluid h-100">
            <Navbar />
            {winner === true && <WinningSound />}
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 parent-container">
                    <div className="gif-container row">
                        <img src={bannerPrincipal} />                    
                    </div>

                    <div className="spinner-container row">
                        {winner && <div className="winner-overlay"></div>}

                        <div className="lateral-column-left col-1"></div>
                        <Spinner 
                            className="col"
                            id          = "0"
                            timer       = "850"
                            ref         = {child1} 
                            betAmount   = {betAmount} 
                            hasPlayed   = {hasPlayed} 
                            onFinish    = {finishHandler} 

                            hasCheated       = {hasCheated}
                            forcedSymbol     = {1}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[0]}
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[0]}
                        />

                        <Spinner 
                            className="col"
                            id          = "1"
                            timer       = "800" 
                            ref         = {child2} 
                            betAmount   = {betAmount} 
                            hasPlayed   = {hasPlayed} 
                            onFinish    = {finishHandler} 

                            hasCheated       = {hasCheated}
                            forcedSymbol     = {forcedSymbol}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[1]}
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[1]}
                        />
                        
                        <Spinner 
                            className   ="col"
                            id          = "2"
                            timer       = "900" 
                            ref         = {child3} 
                            betAmount   = {betAmount} 
                            hasPlayed   = {hasPlayed} 
                            onFinish    = {finishHandler}

                            hasCheated       = {hasCheated}
                            forcedSymbol     = {8}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[2]} 
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[2]}
                        />
                        <div className="lateral-column-right col-1"></div>
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

export default MainContent;
