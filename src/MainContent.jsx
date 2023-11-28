import 'bootstrap/dist/css/bootstrap.css';
import './base.css';
import './BetBarContainer.css';
import './BetHeaderBarContainer.css';
import './BetStatusBarContainer.css';

import Navbar         from './Navbar';
import WinningSound   from './WinningSound'; 
import Spinner        from './Spinner';
import ActionBar      from './ActionBar';       
import RepeatButton   from './RepeatBtn'; 
import BetIncreaseBtn from './BetIncreaseBtn';
import BetDecreaseBtn from './BetDecreaseBtn';
import AutoPlayBtn    from './AutoPlayBtn';
import FastPlayBtn    from './FastPlayBtn';
import { FontAwesomeIcon }             
    from '@fortawesome/react-fontawesome';
import { faWallet, faCoins, faTrophy } 
    from '@fortawesome/free-solid-svg-icons';

import BetDisplayOverlay from './BetDisplayOverlay';  

function MainContent({
    winner, 
    bannerPrincipal,
    betAmount,
    hasPlayed,
    finishHandler,
    walletAmount,
    totalWinnings,
    handleDecreaseBet,
    handleSpin,
    handleIncreaseBet,
    hasCheated,
    forcedSymbol,
    winnerIndexesPosArr,
    winnerIndexesSymbolsArr,
    actualPayout,
    spinnerRefs
}) {
    return (
        <div className="container-fluid h-100">
            {/* <Navbar /> */}
            {winner === true && <WinningSound />}
            <div className="row h-100 align-items-center justify-content-center">
                <div className="custom-container parent-container">
                    <div className="gif-container">
                        <img src={bannerPrincipal} />                    
                    </div>
                    <div className="spinners-container">
                        <div className="lateral-column-wrapper-left">
                            {/* <div className="icon-container">
                                <div className="icon icon-mult-1">4</div>
                            </div> */}
                            <div className="lateral-column-left"></div>
                        </div>

                        <Spinner 
                            id               = {0}
                            timer            = "850"
                            ref              = {spinnerRefs.current[0]} 
                            hasPlayed        = {hasPlayed} 
                            onFinish         = {finishHandler} 
                            hasCheated       = {hasCheated}
                            forcedSymbol     = {forcedSymbol+1}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[0]}
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[0]}
                        />

                        <Spinner 
                            id               = {1}
                            timer            = "800" 
                            ref              = {spinnerRefs.current[1]} 
                            hasPlayed        = {hasPlayed} 
                            onFinish         = {finishHandler} 
                            hasCheated       = {hasCheated}
                            forcedSymbol     = {forcedSymbol}
                            showOverlay      = {winner}
                            overlayIdx       = {winnerIndexesPosArr[1]}
                            overlaySymbolIdx = {winnerIndexesSymbolsArr[1]}
                            actualPayout     = {actualPayout}
                        />
                        
                        <Spinner 
                            id               = {2}
                            timer            = "900" 
                            ref              = {spinnerRefs.current[2]} 
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
                            {winner && <BetDisplayOverlay />}

                            {!winner && (
                                <div className="scrolling-text">
                                    "Jogue Shark Win para ganhar diversos prêmios!"
                                </div>
                            )}
                            
                            {winner && (
                                <div className="winner-text">
                                    {"Ganhou " + totalWinnings.toFixed(2)}
                                </div>
                            )}
                        </div>
                        <div className="bet-status-bar-container">
                            <div className="col">
                                <FontAwesomeIcon icon={faWallet} /> {walletAmount.toFixed(2)}
                            </div>
                            <div className="col">
                                <FontAwesomeIcon icon={faCoins} /> {betAmount.toFixed(2)}
                            </div>
                            <div className="col">
                                <FontAwesomeIcon icon={faTrophy} /> {totalWinnings.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="action-bar-container">
                        <ActionBar>
                            <FastPlayBtn />
                            <BetDecreaseBtn onClick={handleDecreaseBet} />
                            
                            <RepeatButton   onClick={handleSpin} winner={winner} />

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
