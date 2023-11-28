import React from 'react';
import './RepeatBtn.css';

function RepeatButton(props) {
    return (
        <button 
            aria-label='Play again.' 
            id='repeatButton' 
            onClick={props.onClick}
            className={props.winner === null ? "disabled" : ""} 
            >
        </button>
    );
}
export default RepeatButton;
