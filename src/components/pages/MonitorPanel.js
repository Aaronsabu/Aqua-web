import React from 'react';
import logo from '../images/AQUA.png';
import { Link } from 'react-router-dom';

function MonitorPanel() {

    return (
        <div className="home-div">
            <img src={logo} alt="aqua" className="img" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link to="/Rain">
                  <button className="btn btn-primary">RAIN WATER HARVEST</button>
                </Link>
                <Link to="/Monitor">
                  <button className="btn btn-primary">REAL TIME MONITOR</button>
                </Link>
                <Link to="/billing">
                <button className="btn btn-primary">BILLING HISTORY</button>
                </Link>
            </div>
        </div>
    );
}

export default MonitorPanel;
