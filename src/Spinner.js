import React, { useState, useRef, useEffect } from 'react';

const Spinner = React.forwardRef((props, ref) => {
    const [position, setPosition]           = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(props.timer);
    const iconHeight = 188;
    const totalIcons = 3;
    // const multiplier = Math.floor(Math.random()*(4-1)+1); 
    const multiplier = 1;

    const [localHasPlayed, setLocalHasPlayed] = useState(false);

    const setStartPosition = () => {
        return ((Math.floor((Math.random()*totalIcons))) * iconHeight)*-1;
    }
    const start = useRef(setStartPosition());

    const getIconPositions = () => {
        const positions = [];
    
        for(let i = 0; i < totalIcons; i++) {
            positions.push(-i * iconHeight);
        }
    
        return positions;
    }
    const iconPositions = getIconPositions();

    const forceToIcon = (iconIndex) => {
        if (iconIndex >= 0 && iconIndex < totalIcons) { 
            setPosition(iconPositions[iconIndex]);
        }
    }

    useEffect(() => {
        if (props.hasPlayed) {
            setLocalHasPlayed(true);
        }
    }, [props.hasPlayed]);

    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 100);

        return () => clearInterval(timer);
    }, [timeRemaining, position]);

    const tick = () => {
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
        setPosition(position - iconHeight * multiplier);
        setTimeRemaining(timeRemaining - 100);
    }

    const stopSpinner = () => {
        let moved = (props.timer/100) * multiplier;
        let startPosition = start.current;
        let currentPosition = startPosition;
        const maxPosition = (iconHeight * (totalIcons-1)*-1);
    
        for (let i = 0; i < moved; i++) {              
            currentPosition -= iconHeight;
            if (currentPosition < maxPosition) {
                currentPosition = 0;
            }      
        }
    
        // setPosition(0); 
        setPosition(currentPosition); 
    }
    
    const getSymbolFromPosition = () => {
        const totalIcons = 3;
        // Determina qual ícone está na janela visível, dado a posição final.
        let index = Math.abs(position) % (iconHeight * totalIcons);
        index = Math.floor(index / iconHeight);

    
        props.onFinish(index);
    }

    React.useImperativeHandle(ref, () => ({
        forceUpdateHandler(forcedTimer, forcedMultiplier) {
            if(forcedTimer && forcedMultiplier) {
                start.current = 0;
                setPosition(start.current);
                setTimeRemaining(props.timer);
            } else {
                start.current = setStartPosition();
                setPosition(start.current);
                setTimeRemaining(props.timer);
            }
        },
        moveToIcon: forceToIcon
    }));

    return (            
        <div 
            style={{backgroundPosition: 'center ' + position + 'px'}}
            className={`icons`}          
        />
    )
});

export default Spinner;
