import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TOTAL_ICONS, WILD_INDEX, symbolsPayouts } from './constants';

function useSlotMachine() {
  const [winner, setWinner]                           = useState(false);
  const [hasPlayed, setHasPlayed]                     = useState(false);
  const [hasCheated, setHasCheated]                   = useState(false);
  const [walletAmount, setWalletAmount]               = useState(1000);
  const [betAmount, setBetAmount]                     = useState(0);
  const [totalWinnings, setTotalWinnings]             = useState(0);
  const [winnerSymbolPayout, setWinnerSymbolPayout]   = useState(null);
  const [winnerIndexesPosArr, setWinnerIndexesPosArr] = useState([]);
  const [winnerIndexesSymbolsArr, setWinnerIndexesSymbolsArr] 
    = useState([]);
  const matches                                       = useRef([null, null, null]);
  const spinnerRefs 
    = useRef([React.createRef(), React.createRef(), React.createRef()]);


  const calculateProbability = useCallback((betAmount) => {
    const minAmount = 1.50;
    const maxAmount = 50;
    const minProbability = 0.15; // 15%
    const maxProbability = 1;    // 100%

    const slope = (maxProbability - minProbability) / (maxAmount - minAmount);
    const prob = slope * (betAmount - minAmount) + minProbability;
    return prob;
  }, []);

  const computeVisibleIndicesTransposed = useCallback(() => {
    const topValues = [];
    const values = [];
    const bottomValues = [];

    for (let value of matches.current) {
      const topValue = (value - 1 + TOTAL_ICONS) % TOTAL_ICONS;
      const bottomValue = (value + 1) % TOTAL_ICONS;
      topValues.push(topValue);
      values.push(value);
      bottomValues.push(bottomValue);
    }

    return [topValues, values, bottomValues];
  }, []);

  const emptyMatchesArray = useCallback(() => {
    matches.current = [null, null, null];
  }, []);

  const checkBetLines = useCallback((matrix) => {
    let foundWinner = false;

    // Check horizontal and diagonal lines for a win
    const checkLine = (index1, index2, index3) => {
      const arrSymbols = [matrix[index1][0], matrix[index2][1], matrix[index3][2]];
      const wildCount = arrSymbols.filter(x => x === WILD_INDEX).length;

      if (wildCount > 0) {
        if (wildCount == 3) {
          setWinnerIndexesPosArr([index1, index2, index3]);
          setWinnerIndexesSymbolsArr([arrSymbols[0], arrSymbols[1], arrSymbols[2]]);
          setWinnerSymbolPayout(symbolsPayouts[WILD_INDEX]);
          
          foundWinner = true;
          return;
        } else {
          if (wildCount == 2) {
            const referencePayout = arrSymbols.filter(x => x !== WILD_INDEX);

            let a = 1;

          }

        }
      }




      if (matrix[index1][0] === matrix[index2][1] && matrix[index2][1] === matrix[index3][2]) {
        setWinnerIndexesPosArr([index1, index2, index3]);
        setWinnerIndexesSymbolsArr([matrix[index1][0], matrix[index2][1], matrix[index3][2]]);
        foundWinner = true;
      }
    };

    // Middle row
    checkLine(1, 1, 1);
    // // Top row
    // checkLine(0, 0, 0);
    // // Bottom row
    // checkLine(2, 2, 2);
    // // Diagonal left-to-right
    // checkLine(0, 1, 2);
    // // Diagonal right-to-left
    // checkLine(2, 1, 0);

    foundWinner = true;
    setWinner(foundWinner);
  }, []);

  const handleSpin = useCallback(() => {
    emptyMatchesArray();
    setWinner(false);
    setHasPlayed(true);
    setWalletAmount(prevWallet => prevWallet - betAmount);

    let chance = Math.random(); 
    let activationProbability = calculateProbability(betAmount);
    
    setHasCheated(chance <= activationProbability);

    spinnerRefs.current.forEach(ref => {
      ref.current?.forceUpdateHandler(); 
    });
  }, [betAmount, calculateProbability, emptyMatchesArray]);

  const handleIncreaseBet = useCallback(() => {
    setBetAmount(prevBet => Math.min(prevBet + 10, 50));
  }, []);

  const handleDecreaseBet = useCallback(() => {
    setBetAmount(prevBet => Math.max(prevBet - 10, 0));
  }, []);
  


  useEffect(() => {
    if (winner) {
      const winningSymbolKey = winnerIndexesSymbolsArr[0] + "_x"; 
      const winnings = symbolsPayouts[0] || 0; 

      setTotalWinnings(prevWinnings => prevWinnings + winnings);
    }
  }, [winner, winnerIndexesSymbolsArr]);


  



  const finishHandler = useCallback((value, spinnerId) => {
    if (!hasPlayed) return;  
    matches.current[spinnerId] = value;

    if (matches.current.every(match => match !== null)) {
      setHasPlayed(false);
      const visibleMatrix = computeVisibleIndicesTransposed();
      checkBetLines(visibleMatrix);
    }
  }, [hasPlayed, computeVisibleIndicesTransposed, checkBetLines]);

  return {
    winner,
    hasPlayed,
    hasCheated,
    walletAmount,
    betAmount,
    totalWinnings,
    winnerIndexesPosArr,
    winnerIndexesSymbolsArr,
    finishHandler,
    handleDecreaseBet,
    handleIncreaseBet,
    spinnerRefs,
    handleSpin
  };
}

export default useSlotMachine;
