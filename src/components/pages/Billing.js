import React, { useState, useEffect } from 'react';
import logo from '../images/AQUA.png';
import { db } from '../firebase/config';
import { ref, onValue, set } from 'firebase/database';
import '../../../src/App.css';

function Billing() {
    
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [billAmount, setBillAmount] = useState(null);
  const [ComparebillAmount, setCompareBillAmount] = useState(null);
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
    fetchCompareData(text);
  };

  const fetchCompareData = (compareMonth) => {
    const starCountRef = ref(db, `/billing/month/${compareMonth}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setCompareData(data);
      setCompareBillAmount(data * 2);
    });
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
      setComparisonText(`Warning!! You have used ${data - compareData} litres of water extra`);
    } else {
      setComparisonText('Water usage is same in both months');
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
      <h1 className="heading">BILLING HISTORY</h1>
      <div className="input-container">
        <div className="input-group">
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
        </div>
        <div className="input-group">
          <p className='para'>LITRES OF WATER USED:</p>
          <input className='input'
            value={data !== null ? data.toString() : ''}
            contentEditable={false}
          />
        </div>
        <div className="input-group">
          <p className='para'>BILL AMOUNT(Rs):</p>
          <input className='input'
            value={billAmount !== null ? billAmount.toString() : ''}
            contentEditable={false}
          />
        </div>
      </div>
      <button onClick={toggleCompareInput} className="btn-custom ">
          Compare
        </button>
      {showCompareInput && (
        <div className="input-container">
        <div className='input-group'>
          <p className='para'>ENTER A MONTH TO COMPARE:</p>
          <input className='input'
            type="text"
            value={compareValue}
            onChange={(e) => handleCompareInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCompareInputSubmit();
              }
            }}
          />
          </div>
          <div className="input-group">
          <p className='para'>LITRES OF WATER USED:</p>
          <input className='input'
            value={compareData !== null ? compareData.toString() : ''}
            contentEditable={false}
          />
        </div>
        <div className="input-group">
          <p className='para'>BILL AMOUNT(Rs):</p>
          <input className='input'
            value={ComparebillAmount !== null ? ComparebillAmount.toString() : ''}
            contentEditable={false}
          />
        </div>
          <p className='comparison-text'>{comparisonText}</p>
        </div>
      )}
    </div>
  );
}

export default Billing;
