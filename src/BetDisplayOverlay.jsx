// import './BetDisplayOverlay.css';
import { useLottie } from 'lottie-react';
import { BET_HEADER_DISPLAY_INDEX } from './constants'; 

function BetDisplayOverlay() {
    const animationLine = Object.values(BET_HEADER_DISPLAY_INDEX);

    const options = {
        animationData: animationLine,
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const { View } = useLottie(options);
    
    return (
        <div className="" >
            { View }
        </div>
    );   
}
export default BetDisplayOverlay;
