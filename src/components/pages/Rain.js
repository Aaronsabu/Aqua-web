import React, { useState, useEffect } from 'react';
import logo from '../images/AQUA.png';
import { db } from '../firebase/config';
import { ref, onValue, set } from 'firebase/database';
import Tank from '../tank/liquid';
import Switch from 'react-switch';

function Rain() {
  const [isEnable, setIsEnable] = useState(false);
  const [relay, setRelay] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleChange = (isChecked) => {
    setChecked(isChecked);
  };

  const toggleSwitch = () => {
    setIsEnable((previousState) => !previousState);
    const relayValue = isEnable ? 0 : 1;
    console.log('value is', relayValue);
    setRelay(relayValue);
  };

  set(ref(db, 'relay'), relay);

  const [data, setData] = useState([]);
  const starCountRef = ref(db);
  console.log(data);
  console.log('rain', data['rainTank ']);

  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data.TotalMilliLitres > 3500) {
        alert('Your daily water consumption limit has exceeded!');
      }
    });
  }, []);


  const labelStyles = {
    fontSize: '16px',
    marginLeft: '10px',
  };

  const tanksContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  };

  const tankStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
  };

  return (
    <div className="home-div">
      <img src={logo} alt="aqua" className="img" />
      <h1 className="heading">WATER SOURCE FOR HOME</h1>
      <div style={tanksContainerStyles}>
        <div style={tankStyles}>
          <p className='para'>Rain water tank level</p>
          <Tank percentage={(data['rainTank ']/20)*100} />
          <p className='para'>{(data['rainTank ']/20)*100}%</p>
        </div>
        <div style={tankStyles}>
          <p className='para'>Corporation tank level</p>
          <Tank percentage={(data.mainTank/20)*100} />
          <p className='para'>{(data.mainTank/20)*100}%</p>
        </div>
      </div>
      <div className='switchStyles'>
        <p style={{color: "aqua", fontSize: "larger"}}>Rain tank override</p>
        <label htmlFor="material-switch" style={labelStyles}>
          <Switch
            checked={checked}
            onChange={handleChange}
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
        </label>
      </div>
    </div>
  );
}

export default Rain;
