import Estrela     from "./assets/lottie/estrela.json";
import Bau         from "./assets/lottie/ostra.json";
import Ostra       from "./assets/lottie/ostra.json";
import Mergulhador from "./assets/lottie/capacete.json";
import Tubarao     from "./assets/lottie/wild_tuba.json";
import Camarao     from "./assets/lottie/camarao.json";
import Peixe       from "./assets/lottie/peixe_amarelo.json";

export const TOTAL_ICONS = 7;
export const ICON_HEIGHT = 142;
export const MULTIPLIER  = Math.floor(Math.random() * (4 - 1) + 1);

export const SYMBOLS_INDEXES = {
    Estrela_idx:     -ICON_HEIGHT * 6,    
    Bau_idx:         0,  
    Ostra_idx:       -ICON_HEIGHT,        
    Mergulhador_idx: -ICON_HEIGHT * 2,    
    Tubarao_idx:     -ICON_HEIGHT * 3,    
    Camarao_idx:     -ICON_HEIGHT * 4,    
    Peixe_idx:       -ICON_HEIGHT * 5,    
}
export const WILD_INDEX   = 4;
export const CHOSEN_INDEX = 4;


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
    Bau_x:         100,  
    Ostra_x:       25,  
    Mergulhador_x: 10,  
    Tubarao_x:     250,  
    Camarao_x:     8,  
    Peixe_x:       5,  
}

export const ANIMATION_INDEXES = {
    Estrela,
    Bau,         
    Ostra,       
    Mergulhador, 
    Tubarao,    
    Camarao,     
    Peixe       
};

const getSymbolsPayouts = () => {
    const payoutsArr = [];

    for(let key in SYMBOLS_PAYOUTS) {
      payoutsArr.push(SYMBOLS_PAYOUTS[key]);
    }

    return payoutsArr;
}
export const symbolsPayouts = getSymbolsPayouts();