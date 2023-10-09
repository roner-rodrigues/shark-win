import React from 'react';

function BetIncreaseBtn(props) {
    return (
        <button 
            aria-label='Increase Bet.' 
            id='betIncreaseBtn' 
            onClick={props.onClick}
        >
        </button>
    );
}

export default BetIncreaseBtn;
