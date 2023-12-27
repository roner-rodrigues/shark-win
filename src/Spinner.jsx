import React, { useState, useRef, useEffect } from 'react';
import { MULTIPLIER as INITIAL_MULTIPLIER, TOTAL_ICONS, ICON_HEIGHT, symbolsPositions } 
    from './constants';
import AnimationOverlay from './AnimationOverlay';  
import PayoutOverlay    from './PayoutOverlay';  

const Spinner = React.forwardRef((props, ref) => {
    const [position, setPosition]               = useState(0);
    const [timeRemaining, setTimeRemaining]     = useState(props.timer);
    const [localHasPlayed,  setLocalHasPlayed]  = useState(false);
    const [localMultiplier, setLocalMultiplier] = useState(INITIAL_MULTIPLIER);
    const [turboMode, setTurboMode]             = useState(false);
    
    const setStartPosition = () => {
        return ((Math.floor((Math.random()*TOTAL_ICONS))) * ICON_HEIGHT)*-1;
    }
    const start      = useRef(setStartPosition());
    const firstRound = useRef(true);

    useEffect(() => {
        if (turboMode) {
          setLocalMultiplier(INITIAL_MULTIPLIER * 3);
        } else {
          setLocalMultiplier(INITIAL_MULTIPLIER / 3);
        }
    }, [turboMode]);
    
    useEffect(() => {
        if (firstRound.current) {
            setPosition(start.current);
            firstRound.current = false;
        }

        setLocalHasPlayed(props.hasPlayed);
    }, [props.hasPlayed]);

    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 100);

        return () => clearInterval(timer);
    }, [timeRemaining, position]);

    // const handleTurboMode = useCallback(() => {
    //     setTurboMode(currentState => !currentState);
    //   }, []);
    
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
        setPosition(position - ICON_HEIGHT * localMultiplier);
        setTimeRemaining(timeRemaining - 100);
    }

    const stopSpinner = () => {
        if(props.hasCheated) {
            setPosition(symbolsPositions[props.forcedSymbol]);
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
            index = Math.abs(symbolsPositions[props.forcedSymbol]) % (ICON_HEIGHT * TOTAL_ICONS);
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

    const shouldRenderPayoutOverlay = (props.id === 1 && props.showOverlay && props.actualPayout);
    return (            
        <div 
            style={{backgroundPosition: 'center ' + position + 'px'}}
            className={`icons`} >

            {/* {props.showOverlay && <div className="winner-overlay"></div>} */}

            {props.showOverlay && <AnimationOverlay 
                yPosition={props.overlayIdx} 
                animationIndex={props.overlaySymbolIdx} />
            }

            {shouldRenderPayoutOverlay && <PayoutOverlay 
                yPosition={props.overlayIdx} 
                payoutValue={props.actualPayout} />
            }
                        
            {/* {props.showOverlay && <LineOverlay 
                yPosition={props.overlayIdx} 
                slopeDegree={45} />
            } */}
           
        </div>
   )   
});
export default Spinner;
