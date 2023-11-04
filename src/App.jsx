import React, { useState, useRef, useEffect } from 'react';
import bannerPrincipal                        from './assets/tela/banner-tuba.png';
import MainContent                            from './MainContent'; 
import { TOTAL_ICONS, WILD_INDEX }            from './constants';

function App() {
    const matches = useRef([null, null, null]); 
    // const matches                                   = useRef([]);
    const child1                                    = useRef(null);
    const child2                                    = useRef(null);
    const child3                                    = useRef(null);
    const [winner, setWinner]                       = useState(false);
    const [hasPlayed, setHasPlayed]                 = useState(false);
    const [hasCheated, setHasCheated]               = useState(false);         
    const [walletAmount, setWalletAmount]           = useState(1000); 
    const [betAmount, setBetAmount]                 = useState(0);         
    const [totalWinnings, setTotalWinnings]         = useState(0); 
    const [winnerIndexesPosArr, setWinnerIndexesPosArr] 
                                                    = useState([]);
    const [winnerIndexesSymbolsArr, setWinnerIndexesSymbolsArr]         
                                                    = useState([]);                                                
    useEffect(() => {
        if (winner) {
            setTotalWinnings(prevWinnings => prevWinnings + 200);
        }
    }, [winner]);

    const calculateProbability = (betAmount) => {
        const minAmount = 1.50;
        const maxAmount = 50;
        const minProbability = 0.15; // 15%
        const maxProbability = 1;    // 100%
    
        const  slope = (maxProbability - minProbability) / (maxAmount - minAmount);
        const  prob = slope * (betAmount - minAmount) + minProbability;
        return prob;
    }

    // const computeVisibleIndices = () => {
    //     const visibleIndices = [];
        
    //     for (let value of matches.current) {
    //         const topValue = (value - 1 + TOTAL_ICONS) % TOTAL_ICONS;
    //         const bottomValue = (value + 1) % TOTAL_ICONS;
    //         visibleIndices.push([topValue, value, bottomValue]);
    //     }

    //     return visibleIndices;
    // }        

    const computeVisibleIndicesTransposed = () => {
        // Inicializa três arrays para armazenar os valores topValue, value e bottomValue
        const topValues = [];
        const values = [];
        const bottomValues = [];
    
        for (let value of matches.current) {
            const topValue = (value - 1 + TOTAL_ICONS) % TOTAL_ICONS;
            const bottomValue = (value + 1) % TOTAL_ICONS;
            // Adiciona o valor calculado no array correspondente
            topValues.push(topValue);
            values.push(value);
            bottomValues.push(bottomValue);
        }
    
        // Combina os três arrays em um array de arrays (matriz transposta)
        const transposedVisibleIndices = [topValues, values, bottomValues];
    
        return transposedVisibleIndices;
    };
    

    const finishHandler = (value, spinnerId) => {
        if (!hasPlayed) return;  

        // matches.current.push(value);    
        matches.current[spinnerId] = value;

        // if (matches.current.length === 3 && hasPlayed) {
        if (matches.current.every(match => match !== null) && hasPlayed) {
            setHasPlayed(false);

            const visibleMatrix = computeVisibleIndicesTransposed();
            console.log(visibleMatrix);

            identifyPatterns(visibleMatrix);
        
            // const first = matches.current[0];
            // let results = matches.current.every(match => match === first);
            // setWinner(results);
        }
    }

    const emptyMatchesArray = () => {
        // matches.current = [];
        matches.current = [null, null, null];
    }

    const handleClick = () => { 
        emptyMatchesArray();
        setWinner(null);
        setHasPlayed(true);
        setWalletAmount(prevWallet => prevWallet - betAmount);

        let chance = Math.random(); 
        let activationProbability = calculateProbability(betAmount);
        
        if(chance <= activationProbability) {
            setHasCheated(true);
        } else {
            setHasCheated(false);
        }

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

    const identifyPatterns = (matrix) => {
        // Linha do meio 
        if (matrix[0][1] === matrix[1][1] && matrix[1][1] === matrix[2][1]) {
            setWinnerIndexesPosArr([1,1,1]);
            setWinnerIndexesSymbolsArr([matrix[0][1],matrix[1][1],matrix[2][1]]);
            setWinner(true);
        }
        // Diagonal esq-dir
        else if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
            setWinnerIndexesPosArr([0,1,2]);
            setWinnerIndexesSymbolsArr([matrix[0][0],matrix[1][1],matrix[2][2]]);
            setWinner(true);
        }
        // Diagonal dir-esq 
        else if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
            setWinnerIndexesPosArr([2,1,0]);
            setWinnerIndexesSymbolsArr([matrix[0][2],matrix[1][1],matrix[2][0]]);
            setWinner(true);
        }
        else
            setWinner(false);
    }    

    return (
        <MainContent 
            child1              = {child1}
            child2              = {child2}
            child3              = {child3}
            winner              = {winner}
            bannerPrincipal     = {bannerPrincipal}
            betAmount           = {betAmount}
            hasPlayed           = {hasPlayed}
            walletAmount        = {walletAmount}
            totalWinnings       = {totalWinnings}
            finishHandler       = {finishHandler}
            handleDecreaseBet   = {handleDecreaseBet}
            handleClick         = {handleClick}
            handleIncreaseBet   = {handleIncreaseBet}

            hasCheated              = {hasCheated}
            forcedSymbol            = {WILD_INDEX}
            winnerIndexesPosArr     = {winnerIndexesPosArr}
            winnerIndexesSymbolsArr = {winnerIndexesSymbolsArr}
        />
    );
}

export default App;
