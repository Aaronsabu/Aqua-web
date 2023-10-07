import React from 'react';
import logo from '../images/AQUA.png';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMonitorAdditionalButtons: false,
      showControlAdditionalButtons: false
    };
  }

  toggleMonitorAdditionalButtons = () => {
    this.setState((prevState) => ({
      showMonitorAdditionalButtons: !prevState.showMonitorAdditionalButtons,
      showControlAdditionalButtons: false // Close Control additional buttons when Monitor is clicked
    }));
  };

  toggleControlAdditionalButtons = () => {
    this.setState((prevState) => ({
      showControlAdditionalButtons: !prevState.showControlAdditionalButtons,
      showMonitorAdditionalButtons: false // Close Monitor additional buttons when Control is clicked
    }));
  };

  render() {
    return (
      <div className="home-div">
        <img src={logo} alt="aqua" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className='heading' >Choose Your Application</p>
          <div className="button-container">         
              <button className="btn-custom" onClick={this.toggleMonitorAdditionalButtons}>
                Monitor
              </button>            
              <button className="btn-custom control-button" onClick={this.toggleControlAdditionalButtons}>
                Control
              </button>      
          </div>

          {(this.state.showMonitorAdditionalButtons || this.state.showControlAdditionalButtons) && (
            <div className="additional-buttons">
              {/* Add your additional buttons here */}
              {this.state.showMonitorAdditionalButtons && (
                <div className="additional-buttons">
                  <Link to="/Rain" >
                    <button className="btn-custom">Water Source</button>
                  </Link>
                  <Link to="/Monitor" >
                  <button className="btn-custom">Real Time Monitor</button>
                  </Link>
                  <Link to="/Billing" >
                  <button className="btn-custom">Billing History</button>
                  </Link>
                </div>
              )}
              {this.state.showControlAdditionalButtons && (
                <div className="additional-buttons">
                  <button className="btn-custom">Shower</button>
                  <button className="btn-custom">Spout</button>
                  <button className="btn-custom">Garden</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
