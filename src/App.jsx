import React from 'react';
import useSlotMachine from './useSlotMachine'; // Import the hook
import bannerPrincipal from './assets/tela/banner-tuba.png';
import MainContent from './MainContent';
import { CHOSEN_INDEX } from './constants';

function App() {
  // Use the hook to get states and handlers
  const {
    winner,
    hasPlayed,
    walletAmount,
    betAmount,
    totalWinnings,
    winnerIndexesPosArr,
    winnerIndexesSymbolsArr,
    actualPayout,
    finishHandler,
    handleDecreaseBet,
    handleIncreaseBet,
    handleSpin,
    spinnerRefs
  } = useSlotMachine();

  return (
    <MainContent
      bannerPrincipal={bannerPrincipal}
      betAmount={betAmount}
      hasPlayed={hasPlayed}
      walletAmount={walletAmount}
      totalWinnings={totalWinnings}
      finishHandler={finishHandler}
      handleDecreaseBet={handleDecreaseBet}
      handleSpin={handleSpin} 
      handleIncreaseBet={handleIncreaseBet}
      winner={winner}
      hasCheated={1}
      forcedSymbol={CHOSEN_INDEX}
      winnerIndexesPosArr={winnerIndexesPosArr}
      winnerIndexesSymbolsArr={winnerIndexesSymbolsArr}
      actualPayout={actualPayout}
      spinnerRefs={spinnerRefs}
    />
  );
}

export default App;
