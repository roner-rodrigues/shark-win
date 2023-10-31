import React, { useState, useRef, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './base.css';
import './BetBarContainer.css';
import barraDourada from './assets/tela/barra_dourada.png';

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
                <div className="custom-container parent-container">
                    <div className="gif-container">
                        <img src={bannerPrincipal} />                    
                    </div>

                    <div className="spinner-container">
                        {winner && <div className="winner-overlay"></div>}

                        <div className="lateral-column-left"></div>
                        <Spinner 
                            id               = "0"
                            timer            = "850"
                            ref              = {child1} 
                            betAmount        = {betAmount} 
                            hasPlayed        = {hasPlayed} 
                            onFinish         = {finishHandler} 
                            hasCheated       = {hasCheated}
                            forcedSymbol     = {forcedSymbol}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[0]}
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[0]}
                        />

                        <Spinner 
                            id               = "1"
                            timer            = "800" 
                            ref              = {child2} 
                            betAmount        = {betAmount} 
                            hasPlayed        = {hasPlayed} 
                            onFinish         = {finishHandler} 
                            hasCheated       = {hasCheated}
                            forcedSymbol     = {forcedSymbol}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[1]}
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[1]}
                        />
                        
                        <Spinner 
                            id               = "2"
                            timer            = "900" 
                            ref              = {child3} 
                            betAmount        = {betAmount} 
                            hasPlayed        = {hasPlayed} 
                            onFinish         = {finishHandler}
                            hasCheated       = {hasCheated}
                            forcedSymbol     = {forcedSymbol}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[2]} 
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[2]}
                        />
                        <div className="lateral-column-right"></div>
                    </div>

                    <div className="bet-bar-container">
                        <div className="bet-header-bar-container">
                            <div className={ winner !== true ? 
                                "scrolling-text" : 
                                "" 
                            }>

                            { winner ? 
                                totalWinnings : 
                                "Jogue Shark Win para ganhar diversos prêmios!"
                            }
                            </div>
                        </div>
                        <div className="bet-status-bar-container">
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

                    <div className="action-bar-container">
                        <ActionBar>
                            <FastPlayBtn />
                            <BetDecreaseBtn onClick={handleDecreaseBet} />
                            
                            <RepeatButton 
                                onClick={handleClick} 
                                className={winner === null ? "disabled" : ""}
                            />

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
