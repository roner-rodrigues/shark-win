import React, { useState, useRef, useEffect } from 'react';
import Overlay from './Overlay';  

const Spinner = React.forwardRef((props, ref) => {
    const [position, setPosition]             = useState(0);
    const [localHasPlayed, setLocalHasPlayed] = useState(false);
    const [timeRemaining, setTimeRemaining]   = useState(props.timer);
    const multiplier                          = Math.floor(Math.random()*(4-1)+1); 
    const iconHeight                          = 188;
    const totalIcons                          = 9;
    let   alreadyPlayed                       = false;
    let   cheated                             = false;

    const setStartPosition = () => {
        return ((Math.floor((Math.random()*totalIcons))) * iconHeight)*-1;
    }
    const start = useRef(setStartPosition());

    const symbolsIndex = {
        Cereja:        0,    
        Hamburguer: -188,  
        Pizza:      -376,  
        Couve:      -564,  
        Abacaxi:    -752,  
        Banana:     -940,  
        Cerveja:    -1128, 
        Abacate:    -1316, 
        Milho:      -1504  
    }
    const wildIndex = 2;
    
    const getIconPositions = () => {
        const positionsArr = [];
        
        for(let key in symbolsIndex) {
            positionsArr.push(-symbolsIndex[key] * iconHeight);
        }
        
        return positionsArr;
    }
    const iconPositions = getIconPositions();    
    
    useEffect(() => {
        if (props.hasPlayed) {
            setLocalHasPlayed(true);
            alreadyPlayed = false;
        }
    }, [props.hasPlayed]);

    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 100);

        return () => clearInterval(timer);
    }, [timeRemaining, position]);

    const calculateProbability = (betAmount) => {
        const minAmount = 1.50;
        const maxAmount = 50;
        const minProbability = 0.15; // 15%
        const maxProbability = 1;    // 100%
    
        const slope = (maxProbability - minProbability) / (maxAmount - minAmount);
        const prob = slope * (betAmount - minAmount) + minProbability;
        return prob;
    }


    const tick = () => {
        if(alreadyPlayed) return;
        
        if (timeRemaining <= 0) {
            stopSpinner();
            if (localHasPlayed) {
                getSymbolFromPosition();
                setLocalHasPlayed(false); 
                alreadyPlayed = true;
            }
        } else {
            moveBackground();
        }      
    }

    const moveBackground = () => {
        setPosition(position - iconHeight * multiplier);
        setTimeRemaining(timeRemaining - 100);
    }

    const stopSpinner = () => {
        let currentPosition = Math.abs(position);
        currentPosition %= (iconHeight * totalIcons);
        currentPosition *= -1;

        const chance = Math.random(); 
        const activationProbability = calculateProbability(props.betAmount);
        
        if(chance <= activationProbability) {
            setPosition(iconPositions[wildIndex]);
            cheated = true;
        }
        else {
            setPosition(currentPosition); 
            cheated = false;
        }
        
        alreadyPlayed = true;
    }
    
    const getSymbolFromPosition = () => {
        // Determina qual ícone está na janela visível, dado a posição final.
        let index;
        if(cheated)
            index = Math.abs(iconPositions[wildIndex]) % (iconHeight * totalIcons);
        else
            index = Math.abs(position) % (iconHeight * totalIcons);
        
        index = Math.floor(index / iconHeight);
        props.onFinish(index);
    }

    React.useImperativeHandle(ref, () => ({
        forceUpdateHandler() {
            start.current = setStartPosition();
            setPosition(start.current);
            setTimeRemaining(props.timer);
        }
    }));

    return (            
        <div 
            style={{backgroundPosition: 'center ' + position + 'px'}}
            className={`icons no-stack-col`}              
        >
           {props.showOverlay && <Overlay yPosition={111} />}
        </div>
   )   
});

export default Spinner;
