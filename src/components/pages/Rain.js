import React from 'react';
import logo from '../images/AQUA.png';

function Rain() {

    return (
        <div className="home-div">
            <img src={logo} alt="aqua" className="img" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 className='para'>RAIN WATER HARVEST</h1>
            </div>
        </div>
    );
}

export default Rain;
