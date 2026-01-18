import React from 'react';
import SoundBoard from './SoundBoard';
import chrosukoIcon from '../images/chrosuko_icon.png';
import HeartNavButton from './HeartNavButton';
import '../App.css';

function Home() {
    return (
        <div className="app-container">
            <h1>Chrosuko Button</h1>
            <img src={chrosukoIcon} alt="Chrosuko Icon" className="chrosuko-icon" />
            <SoundBoard />
            <HeartNavButton />
        </div>
    );
}

export default Home;
