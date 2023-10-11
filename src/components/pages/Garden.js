import React, { useState, useEffect } from 'react';
import logo from '../images/AQUA.png';
import { db } from '../firebase/config';
import { ref, set } from 'firebase/database';
import Switch from 'react-switch';

function Garden() {
  const [tap1, setTap1] = useState(false);
  const [tap2, setTap2] = useState(false);
  const [tap3, setTap3] = useState(false);
  const [overrideTap, setOverrideTap] = useState(false);


  const handleToggleChange1 = () => {
    const newShowerValue = !tap1;
    set(ref(db, 'Tap1'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setTap1(newShowerValue);
  };

  const handleToggleChange2 = () => {
    const newShowerValue = !tap2;
    set(ref(db, 'Tap2'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setTap2(newShowerValue);
  };

  const handleToggleChange3 = () => {
    const newShowerValue = !tap3;
    set(ref(db, 'Tap3'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setTap3(newShowerValue);
  };

  const overrideToggleChange = () => {
    const newShowerValue = !overrideTap;
    set(ref(db, 'overrideGarden'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setOverrideTap(newShowerValue);
  };


  return (
    <div className="home-div">
      <img src={logo} alt="aqua" className="img" />
      <h1 className="heading">GARDEN CONTROL PANEL</h1>

      <div className="toggle-container">
        <div className="toggle-item">
          <p className="para">TAP 1</p>
          <Switch
            checked={tap1}
            onChange={handleToggleChange1}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </div>

        <div className="toggle-item">
          <span className="para">TAP 2</span>
          <Switch
            checked={tap2}
            onChange={handleToggleChange2}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </div>

        <div className="toggle-item">
          <span className="para">TAP 3</span>
          <Switch
            checked={tap3}
            onChange={handleToggleChange3}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </div>

        <div className="toggle-item">
          <span className="para">Override</span>
          <Switch
            checked={overrideTap}
            onChange={overrideToggleChange}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </div>
      </div>
    </div>
  );
}

export default Garden;
