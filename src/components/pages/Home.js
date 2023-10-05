import React from 'react';
import styles from './home.module.css';
import logo from '../images/AQUA.png';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  render() {
    return (
      <div className="home-div">
        <img src={logo} alt="aqua" class={styles.img}/>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ color: '#00FFFF', textAlign: 'center' }}>Choose Your Application</p>
          <Link to="/MonitorPanel" >
          <button class="btn btn-primary">Monitor</button>
          </Link>
          <button class="btn btn-primary">Control</button>
        </div>
      </div>
    );  
  }
}

export default Home;