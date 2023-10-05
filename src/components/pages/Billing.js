import React, { useState, useEffect } from 'react';
import logo from '../images/AQUA.png';
import { db } from '../firebase/config';
import { ref, onValue, set } from 'firebase/database';
import '../../../src/App.css';

function Billing() {
    
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [billAmount, setBillAmount] = useState(null);
  const [compareValue, setCompareValue] = useState('');
  const [compareData, setCompareData] = useState(null);
  const [comparePressed, setComparePressed] = useState(false);
  const [showCompareInput, setShowCompareInput] = useState(false);
  const [comparisonText, setComparisonText] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleInputSubmit = () => {
    fetchData();
  };

  const fetchData = () => {
    const starCountRef = ref(db, `/billing/month/${inputValue}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
      setBillAmount(data * 2); // Calculate bill amount based on liters of water used
    });
  };

  const handleCompareInputChange = (text) => {
    setCompareValue(text);
  };

  const handleCompareInputSubmit = () => {
    compareFetchData();
  };

  const compareFetchData = () => {
    const starCountRef = ref(db, `/billing/month/${compareValue}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setCompareData(data);
      calculateComparison(data);
    });
  };

  const calculateComparison = (compareData) => {
    if (data < compareData) {
      setComparisonText(`You have saved ${compareData - data} litres of water!`);
    } else if (data > compareData) {
      setComparisonText(`You have used ${data - compareData} litres of water extra`);
    } else {
      setComparisonText('Water usage is the same in both months');
    }
  };

  const toggleCompareInput = () => {
    setShowCompareInput(!showCompareInput);
  };

  useEffect(() => {
    if (inputValue !== '') {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    if (billAmount !== null) {
      set(ref(db, '/amount/month/may'), billAmount)
        .then(() => console.log('Bill amount uploaded to Firebase'))
        .catch((error) => console.log(error));
    }
  }, [billAmount]);

  return (
    <div className="home-div">
      <img src={logo} alt="aqua" className="img" />
      <h1 className="billing-h">BILLING HISTORY</h1>
      <p className='para'>ENTER A MONTH:</p>
      <input
        type="text"
        className="input"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleInputSubmit();
          }
        }}
      />
      <p className='para'>LITRES OF WATER USED:</p>
      <input
        value={data !== null ? data.toString() : ''}
        contentEditable={false}
      />
      <p className='para'>BILL AMOUNT(Rs):</p>
      <input
        value={billAmount !== null ? billAmount.toString() : ''}
        contentEditable={false}
      />
      <br />
      <button onClick={toggleCompareInput}>Compare</button>
      {showCompareInput && (
        <div>
          <p className='para'>ENTER A MONTH TO COMPARE:</p>
          <input
            type="text"
            value={compareValue}
            onChange={(e) => handleCompareInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCompareInputSubmit();
              }
            }}
          />
          <p className='para'>{comparisonText}</p>
        </div>
      )}
    </div>
  );
}

export default Billing;
