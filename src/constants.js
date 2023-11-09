import Estrela     from "./assets/lottie/estrela.json";
import Coral       from "./assets/lottie/coral.json";
import Bonus1      from "./assets/lottie/luz_bonus.json";
import Perola      from "./assets/lottie/ostra.json";
import Mergulhador from "./assets/lottie/capacete.json";

import Tubarao     from "./assets/lottie/wild_tuba.json";
// import Tubarao     from "./assets/lottie/umoitenta.json";

import Camarao     from "./assets/lottie/camarao.json";
import Peixe       from "./assets/lottie/peixe_amarelo.json";
import Bonus2      from "./assets/lottie/bolha_bonus.json";

export const TOTAL_ICONS = 9;
export const ICON_HEIGHT = 188;
export const MULTIPLIER  = Math.floor(Math.random() * (4 - 1) + 1);

export const SYMBOLS_INDEXES = {
    Estrela_idx:     -1504,    
    Coral_idx:       0,  
    Bonus1_idx:      -188,  
    Perola_idx:      -376,  
    Mergulhador_idx: -564,  
    Tubarao_idx:     -752,  
    Camarao_idx:     -940,  
    Peixe_idx:       -1128, 
    Bonus2_idx:      -1316  
}
export const WILD_INDEX   = 5;
export const CHOSEN_INDEX = 6;

const getSymbolsPositions = () => {
    const positionsArr = [];
    
    for(let key in SYMBOLS_INDEXES) {
        positionsArr.push(SYMBOLS_INDEXES[key]);
    }
    
    return positionsArr;
}
export const symbolsPositions = getSymbolsPositions();

export const SYMBOLS_PAYOUTS = {
    Estrela_x:     3,    
    Coral_x:       5,  
    Bonus1_x:      8,  
    Perola_x:      10,  
    Mergulhador_x: 25,  
    Tubarao_x:     100,  
    Camarao_x:     3,  
    Peixe_x:       1, 
    Bonus2_x:      1 
}

export const ANIMATION_INDEXES = {
    Estrela,   
    Coral,    
    Bonus1,    
    Perola,    
    Mergulhador,
    Tubarao,   
    Camarao,   
    Peixe,     
    Bonus2
};

const getSymbolsPayouts = () => {
    const payoutsArr = [];

    for(let key in SYMBOLS_PAYOUTS) {
      payoutsArr.push(SYMBOLS_PAYOUTS[key]);
    }

    return payoutsArr;
}
export const symbolsPayouts = getSymbolsPayouts();