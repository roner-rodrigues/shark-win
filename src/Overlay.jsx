import React, { useEffect, useState } from 'react';
import './Overlay.css';
import { useLottie } from 'lottie-react';
import { ANIMATION_INDEXES, ICON_HEIGHT } from './constants'; 

function Overlay({ yPosition, animationIndex }) {
    const animations = Object.values(ANIMATION_INDEXES);
    // console.log(animations);

    const options = {
        animationData: animations[animationIndex],
        loop: true,
        autoplay: true,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const { View } = useLottie(options);
    
    // return (
    //     <div className="icon-overlay scale-animation" style={{ top: yPosition * ICON_HEIGHT + 23 + 'px' }}>
    //         {View}
    //     </div>
    // );   

    return (
        <div className="payout-overlay">
            1.80
        </div>
    );
}

export default Overlay;
