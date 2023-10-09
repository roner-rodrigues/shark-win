import React from 'react';

function BetDecreaseBtn(props) {
    return (
        <button 
            aria-label='Decrease Bet.' 
            id='betDecreaseBtn' 
            onClick={props.onClick}
        >
        </button>
    );
}

export default BetDecreaseBtn;
