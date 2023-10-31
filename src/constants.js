import Estrela     from "./assets/lottie/estrela.json";
import Coral       from "./assets/lottie/coral.json";
// import Coral       from "./assets/lottie/coral-148x148.json";
// import Coral       from "./assets/lottie/coral-148x148-menor.json";
import Bonus1      from "./assets/lottie/luz_bonus.json";
import Perola      from "./assets/lottie/ostra.json";
import Mergulhador from "./assets/lottie/capacete.json";
import Tubarao     from "./assets/lottie/wild_tuba.json";
// import Tubarao     from "./assets/lottie/numeros.json";
import Camarao     from "./assets/lottie/camarao.json";
import Peixe       from "./assets/lottie/peixe_amarelo.json";
import Bonus2      from "./assets/lottie/bolha_bonus.json";

export const TOTAL_ICONS = 9;
export const ICON_HEIGHT = 188;
export const MULTIPLIER  = Math.floor(Math.random() * (4 - 1) + 1);

export const SYMBOLS_INDEXES = {
    Estrela:     -1504,    
    Coral:       0,  
    Bonus1:      -188,  
    Perola:      -376,  
    Mergulhador: -564,  
    Tubarao:     -752,  
    Camarao:     -940,  
    Peixe:       -1128, 
    Bonus2:      -1316  
}
export const WILD_INDEX = 5;

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