import React from 'react';

function RepeatButton(props) {
    return (
        <button 
            aria-label='Play again.' 
            id='repeatButton' 
            onClick={props.onClick}>
        </button>
    );
}

export default RepeatButton;
