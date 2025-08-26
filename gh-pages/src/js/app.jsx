/*
  From
  https://github.com/javierbyte/react-number-easing
  Refactored to use React class.
*/
import React from "react";

import { createRoot } from "react-dom/client";

import { NumberEasing } from "che-react-number-easing";

import { useState, useEffect } from "react";

function ReactDemoPage() {
  const [inputValue, setInputValue] = useState(0);
  const [number, setNumber] = useState(0);
  const [precision, setPrecision] = useState(2);

  useEffect(() => {
    setNumber(1000);
  }, []);

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const updateNumber = (e) => {
    e.preventDefault();
    setNumber(inputValue);
  };

  const updatePrecision = (e) => {
    setPrecision(e.target.value);
  };

  const generateRandom = () => {
    const prec = precision > -1 ? precision : 0;
    setInputValue(
      parseFloat(Math.min(0 + Math.random() * (3000 - 0), 3000).toFixed(prec))
    );
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">React Number Easing Demo</h2>
      <div className="number-display">
        <NumberEasing
          precision={parseInt(precision, 10)}
          speed={2000}
          trail={true}
          useLocaleString={true}
          value={number}
        />
      </div>
      <form className="controls" onSubmit={updateNumber}>
        <div className="input-group">
          <label htmlFor="value-input">Value</label>
          <input
            id="value-input"
            className="big"
            onChange={onChangeInputValue}
            step="any"
            type="number"
            value={inputValue}
          />
          <button type="submit" className="primary-btn">Update</button>
        </div>
        <div className="input-group">
          <label htmlFor="precision-input">Precision</label>
          <input
            id="precision-input"
            max="5"
            min="0"
            onChange={updatePrecision}
            step="1"
            type="number"
            value={precision}
          />
          <button onClick={generateRandom} type="button" className="secondary-btn">
            <span role="img" aria-label="dice">🎲</span> Random Value
          </button>
        </div>
      </form>
      <footer className="demo-footer">
        <div style={{ color: '#888', fontSize: '0.95em', marginTop: '2em' }}>
          by <a href="http://javierbyte.com/">javierbyte</a> &middot; modified by <a href="https://github.com/che-wf">che-wf</a>
        </div>
        <div style={{ marginTop: '1em' }}>
          <a href="https://github.com/che-wf/react-number-easing" className="forkme" style={{ color: '#888', fontSize: '0.95em', textDecoration: 'none' }}>
            Fork me on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ReactDemoPage;

const container = document.getElementById("demo");
const root = createRoot(container);
root.render(<ReactDemoPage />);
