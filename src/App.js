import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function RepeatButton(props) {
    return (
        <button 
            aria-label='Play again.' 
            id='repeatButton' 
            onClick={props.onClick}>
        </button>
    );
}

function WinningSound() {
    return (
        <audio autoplay="autoplay" className="player" preload="false">
            <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
        </audio>
    );
}

const loser = [
    'Not quite', 
    'Stop gambling', 
    'Hey, you lost!', 
    'Ouch! I felt that',      
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
];

function App() {
    const matches = useRef([]);
    const [winner, setWinner]       = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    const finishHandler = (value) => {
        if (!hasPlayed) return;  

        matches.current.push(value);  
        if (matches.current.length === 3 && hasPlayed) {
            const first = matches.current[0];
            let results = matches.current.every(match => match === first);
            setWinner(results);
            setHasPlayed(false);
        }
    }

    const emptyArray = () => {
        matches.current = [];
    }

    const handleClick = () => { 
        setWinner(null);
        emptyArray();
        // child1.current.moveToIcon(5);
        child1.current.forceUpdateHandler();
        
        child2.current.forceUpdateHandler();
        child3.current.forceUpdateHandler();
        setHasPlayed(true);

    }

    const getLoser = () => {
        return loser[Math.floor(Math.random()*loser.length)];
    }

    const child1 = useRef(null);
    const child2 = useRef(null);
    const child3 = useRef(null);
    
    return (
        <div>
            {winner === true && <WinningSound />}
            <h1 style={{ color: 'white'}}>
                <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
            </h1>

            <div className={`spinner-container`}>
                <Spinner hasPlayed={hasPlayed} onFinish={finishHandler} ref={child1} timer="1000" />
                <Spinner hasPlayed={hasPlayed} onFinish={finishHandler} ref={child2} timer="1400" />
                <Spinner hasPlayed={hasPlayed} onFinish={finishHandler} ref={child3} timer="2200" />
                <div className="gradient-fade"></div>
            </div>
            {winner !== null && <RepeatButton onClick={handleClick} />}
        </div>
    );
}

const Spinner = React.forwardRef((props, ref) => {
    const [position, setPosition] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(props.timer);
    const iconHeight = 188;
    const multiplier = Math.floor(Math.random()*(4-1)+1); 

    const setStartPosition = () => {
        return ((Math.floor((Math.random()*9))) * iconHeight)*-1;
    }
    const start = useRef(setStartPosition());

    const getIconPositions = () => {
        const iconHeight = 188;
        const totalIcons = 9;
        const positions = [];
    
        for(let i = 0; i < totalIcons; i++) {
            positions.push(-i * iconHeight);
        }
    
        return positions;
    }
    const iconPositions = getIconPositions();

    const forceToIcon = (iconIndex) => {
        if (iconIndex >= 0 && iconIndex < 9) { 
            setPosition(iconPositions[iconIndex]);
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            tick();
        }, 100);

        return () => clearInterval(timer);
    }, [timeRemaining, position]);

    const tick = () => {
        if (timeRemaining <= 0) {
            stopSpinner();  
            if (props.hasPlayed) {
                getSymbolFromPosition();
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
        const totalSymbols = 9;
        const maxPosition = (iconHeight * (totalSymbols-1)*-1);
    
        for (let i = 0; i < moved; i++) {              
            currentPosition -= iconHeight;
            if (currentPosition < maxPosition) {
                currentPosition = 0;
            }      
        }
    
        setPosition(currentPosition);  // isso efetivamente para a roleta
    }
    
    const getSymbolFromPosition = () => {
        // props.onFinish(position);

        const totalSymbols = 9;
        // Esta linha de código determina qual ícone está na janela visível, dado a posição final.
        let index = Math.abs(position) % (iconHeight * totalSymbols);
        index = Math.floor(index / iconHeight);
        props.onFinish(index);
    }


    React.useImperativeHandle(ref, () => ({
        forceUpdateHandler() {
            start.current = setStartPosition();
            setPosition(start.current);
            setTimeRemaining(props.timer);
        },
        moveToIcon: forceToIcon
    }));

    return (            
        <div 
            style={{backgroundPosition: '0px ' + position + 'px'}}
            className={`icons`}          
        />
    )
});

export default App;
