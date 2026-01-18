import React, { useState } from 'react';
import './SoundButton.css';

const SoundButton = ({ label, image, soundSrc }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 150);

        // Play sound if src exists
        if (soundSrc) {
            const audio = new Audio(soundSrc);
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed', e));
        }
    };

    return (
        <button
            className={`sound-button ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <div className="button-bg-container">
                <img src={image} alt="" className="button-bg-img" />
            </div>
            <span className="button-label">{label}</span>
        </button>
    );
};

export default SoundButton;
