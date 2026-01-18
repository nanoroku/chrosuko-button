import React, { useMemo } from 'react';
import SoundButton from './SoundButton';
import defaultButtonBg from '../images/long_b-tb028-pinkA.png';
import buttonConfig from '../assets/button_config.json'; // Import config

const SoundBoard = () => {
    // Dynamically import all images and sounds from assets
    // Eager loading ensures they are available immediately
    const buttonImages = import.meta.glob('../assets/buttons/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });
    const buttonSounds = import.meta.glob('../assets/sounds/*.{mp3,wav,ogg}', { eager: true, query: '?url', import: 'default' });

    const sounds = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const id = i + 1;

            // Find matching image (e.g., "1.png", "01.png")
            // We check for various file extensions just in case
            const imagePathKey = Object.keys(buttonImages).find(key => {
                const name = key.split('/').pop().split('.')[0];
                return parseInt(name) === id;
            });

            // Find matching sound
            const soundPathKey = Object.keys(buttonSounds).find(key => {
                const name = key.split('/').pop().split('.')[0];
                return parseInt(name) === id;
            });

            // Get label from config or default
            const customLabel = buttonConfig.main && buttonConfig.main[id];
            const label = customLabel !== undefined ? customLabel : `Button ${id}`;

            return {
                id: id,
                label: label,
                // Use found image or fallback to default
                image: imagePathKey ? buttonImages[imagePathKey] : defaultButtonBg,
                // Use found sound or empty string
                src: soundPathKey ? buttonSounds[soundPathKey] : '',
            };
        });
    }, [buttonImages, buttonSounds]);

    return (
        <div className="sound-board">
            <div className="sound-grid">
                {sounds.map((sound) => (
                    <SoundButton
                        key={sound.id}
                        label={sound.label}
                        image={sound.image}
                        soundSrc={sound.src}
                    />
                ))}
            </div>
        </div>
    );
};

export default SoundBoard;
