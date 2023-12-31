import React, { useState, useEffect } from 'react';
import logo from '../images/AQUA.png';
import { db } from '../firebase/config';
import { ref, onValue } from 'firebase/database';
import GaugeChart from 'react-gauge-chart'

function Monitor() {
  const [data, setData] = useState({ FlowRate: 0, TotalMilliLitres: 0 });

  useEffect(() => {
    const starCountRef = ref(db);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log('flow: ', data.FlowRate);
      console.log(data);
      setData(data);
    });
  }, []);

  const limit = () => {
    if (data.TotalMilliLitres > 3500) {
      return <p style={{color: 'red'}}>Your daily consumption limit has exceeded!</p>;
    }
  };

  return (
    <div className="home-div">
      <img src={logo} alt="aqua" className="img" />
      <h1 className='para'>REAL TIME MONITOR</h1>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
          <p style={{color: '#00FFFF'}} >Flow Rate</p>
          <GaugeChart
            id="gauge-chart1"
            nrOfLevels={420}
            arcsLength={[0.9]}
            colors={['#00FFFF']}
            percent={data.FlowRate / 100} // Adjust this based on your data scale
            arcPadding={0.02}
            formatTextValue={() => ''}
          />
          <p style={{color: '#00FFFF'}}>{data.FlowRate} ml/min</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{color: '#00FFFF'}} >Total Consumption</p>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={420}
            arcsLength={[0.7,0.3]}
            colors={['#00FFFF', '#EA4228']}
            percent={data.TotalMilliLitres / 5000} // Adjust this based on your data scale
            arcPadding={0.01}
            formatTextValue={() => ''}
          />
          <p style={{color: '#00FFFF'}}>{data.TotalMilliLitres} ml/min</p>
          {limit()}
        </div>
      </div>
    </div>
  );
}

export default Monitor;
