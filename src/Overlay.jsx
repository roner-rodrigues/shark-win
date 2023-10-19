import React from 'react';
import './Overlay.css';

function Overlay({ yPosition }) {
    return (
        <div className="overlay" style={{ top: yPosition + 'px' }}></div>
    );
}


export default Overlay;
