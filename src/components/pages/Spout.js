import React, { useState, useEffect } from 'react';
import logo from '../images/AQUA.png';
import { db } from '../firebase/config';
import { ref, set, onValue } from 'firebase/database';
import Switch from 'react-switch';

function Spout() {
  const [Spout1, setShower1] = useState(false);
  const [Spout2, setShower2] = useState(false);
  const [Spout3, setShower3] = useState(false);
  const [override, setOverride] = useState(false);

  useEffect(() => {
    // Set the initial state from Firebase or some other data source
    // For example, you can use the `onValue` function here to listen for changes
    // and update the state accordingly.
  }, []);

  const handleToggleChange1 = () => {
    const newShowerValue = !Spout1;
    set(ref(db, 'Spout1'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setShower1(newShowerValue);
  };

  const handleToggleChange2 = () => {
    const newShowerValue = !Spout2;
    set(ref(db, 'Spout2'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setShower2(newShowerValue);
  };

  const handleToggleChange3 = () => {
    const newShowerValue = !Spout3;
    set(ref(db, 'Spout3'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setShower3(newShowerValue);
  };

  const overrideToggleChange = () => {
    const newShowerValue = !override;
    set(ref(db, 'overrideSpout'), newShowerValue ? 1 : 0); // Send 1 if on, 0 if off
    setOverride(newShowerValue);
  };
  
  useEffect(() => {
    const starCountRef = ref(db);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data.TotalMilliLitres > 3500) {
        alert('Your daily water consumption limit has exceeded!');
      }
    });
  }, []);

  return (
    <div className="home-div">
      <img src={logo} alt="aqua" className="img" />
      <h1 className="heading">BATHROOM CONTROL PANEL</h1>

      <div className="toggle-container">
        <div className="toggle-item">
          <span className="para">Spout 1</span>
          <Switch
            checked={Spout1}
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
          <span className="para">Spout 2</span>
          <Switch
            checked={Spout2}
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
          <span className="para">Spout 3</span>
          <Switch
            checked={Spout3}
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
            checked={override}
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

export default Spout;
