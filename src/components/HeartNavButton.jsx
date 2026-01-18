import React from 'react';
import { Link } from 'react-router-dom';
import heartImg from '../assets/heart.png';

const HeartNavButton = () => {
    return (
        <div style={{ marginTop: '40px', marginBottom: '20px' }}>
            <Link to="/heart">
                <img
                    src={heartImg}
                    alt="Go to Heart Page"
                    style={{
                        width: '50px',
                        height: 'auto',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}
                    className="heart-nav-btn"
                />
            </Link>
            <style>{`
                .heart-nav-btn:hover {
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default HeartNavButton;
