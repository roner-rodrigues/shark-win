import React, { useState, useRef, useEffect } from 'react';
import { TOTAL_ICONS, ICON_HEIGHT, MULTIPLIER, SYMBOLS_INDEXES } 
    from './constants';
import Overlay from './Overlay';  
import './Spinner.css';

const Spinner = React.forwardRef((props, ref) => {
    const [position, setPosition]               = useState(0);
    const [timeRemaining, setTimeRemaining]     = useState(props.timer);
    const [localHasPlayed,  setLocalHasPlayed]  = useState(false);

    const setStartPosition = () => {
        return ((Math.floor((Math.random()*TOTAL_ICONS))) * ICON_HEIGHT)*-1;
    }
    const start = useRef(setStartPosition());

    const getIconPositions = () => {
        const positionsArr = [];
        
        for(let key in SYMBOLS_INDEXES) {
            positionsArr.push(SYMBOLS_INDEXES[key]);
        }
        
        return positionsArr;
    }
    const iconPositions = getIconPositions();    
    
    useEffect(() => {
        setLocalHasPlayed(props.hasPlayed);
    }, [props.hasPlayed]);

    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 100);

        return () => clearInterval(timer);
    }, [timeRemaining, position]);
    
    const tick = () => {
        if(!props.hasPlayed) return;
        
        if (timeRemaining <= 0) {
            stopSpinner();
            if (localHasPlayed) {
                getSymbolFromPosition();
                setLocalHasPlayed(false); 
            }
        } else {
            moveBackground();
        }      
    }

    const moveBackground = () => {
        setPosition(position - ICON_HEIGHT * MULTIPLIER);
        setTimeRemaining(timeRemaining - 100);
    }

    const stopSpinner = () => {
        if(props.hasCheated) {
            setPosition(iconPositions[props.forcedSymbol]);
        } else {
            let currentPosition = Math.abs(position);
            currentPosition %= (ICON_HEIGHT * TOTAL_ICONS);
            currentPosition *= -1;
            setPosition(currentPosition); 
        }
    }
    
    // Determina qual ícone está na linha do meio da esteira, dado a posição final.
    const getSymbolFromPosition = () => {
        let index;
        if(props.hasCheated)
            index = Math.abs(iconPositions[props.forcedSymbol]) % (ICON_HEIGHT * TOTAL_ICONS);
        else
            index = Math.abs(position) % (ICON_HEIGHT * TOTAL_ICONS);
        
        index = (index / ICON_HEIGHT + 1) % TOTAL_ICONS;
        props.onFinish(index, props.id);
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
            className={`icons`}              
        >
           {props.showOverlay && <Overlay 
                yPosition={props.overlayIdx} 
                animationIndex={props.overlaySymbolIdx} />
            }
        </div>
   )   
});

export default Spinner;
