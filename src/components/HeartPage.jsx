import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultButtonBg from '../images/long_b-tb028-pinkA.png';
import buttonConfig from '../assets/button_config.json'; // Import config
import '../components/SoundButton.css'; // Reuse existing button styles

const HeartPage = () => {
    // Dynamic assets for Heart Page
    const pageIcons = import.meta.glob('../assets/heart_page/icons/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });
    const pageButtons = import.meta.glob('../assets/heart_page/buttons/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });
    const pageSounds = import.meta.glob('../assets/heart_page/sounds/*.{mp3,wav,ogg}', { eager: true, query: '?url', import: 'default' });

    const rows = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const id = i + 1;

            // Find asset util
            const findAsset = (globObj) => {
                const key = Object.keys(globObj).find(k => {
                    const name = k.split('/').pop().split('.')[0];
                    return parseInt(name) === id;
                });
                return key ? globObj[key] : null;
            };

            // Get label from config or default
            const customLabel = buttonConfig.heart && buttonConfig.heart[id];
            const label = customLabel !== undefined ? customLabel : `Button ${id}`;

            return {
                id,
                label,
                icon: findAsset(pageIcons) || null, // Placeholder if missing
                buttonImage: findAsset(pageButtons) || defaultButtonBg,
                sound: findAsset(pageSounds) || '',
            };
        });
    }, []);

    const playSound = (src) => {
        if (src) {
            const audio = new Audio(src);
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio error:', e));
        }
    };

    return (
        <div className="app-container" style={{ paddingBottom: '50px' }}>
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem' }}>🔙</Link>
            </div>
            <h1></h1>

            <div className="heart-grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {rows.map((row) => (
                    <RowItem
                        key={row.id}
                        icon={row.icon}
                        buttonImage={row.buttonImage}
                        sound={row.sound}
                        label={row.label}
                        playSound={playSound}
                    />
                ))}
            </div>
        </div>
    );
};

const RowItem = ({ icon, buttonImage, sound, label, playSound }) => {
    const [isActive, setIsActive] = useState(false);

    const handlePress = () => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 150);
        playSound(sound);
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            background: 'rgba(255,255,255,0.1)',
            padding: '10px',
            borderRadius: '15px'
        }}>
            {/* Left Icon Area */}
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                border: '3px solid #ff66b2',
                flexShrink: 0
            }}>
                {icon ? (
                    <img src={icon} alt="Icon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <span style={{ color: '#ccc', fontSize: '2rem' }}>?</span>
                )}
            </div>

            {/* Right Button Area */}
            <button
                className={`sound-button ${isActive ? 'active' : ''}`}
                onClick={handlePress}
                style={{ flexGrow: 1, height: '80px' }} // reuse class but override specific styles
            >
                <div className="button-bg-container">
                    <img src={buttonImage} alt="" className="button-bg-img" />
                </div>
                <span className="button-label" style={{ zIndex: 2, position: 'relative' }}>{label}</span>
            </button>
        </div>
    );
};

export default HeartPage;
