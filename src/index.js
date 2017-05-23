import React from 'react';
import ReactDOM from 'react-dom';
import CurrTemp from './CurrTemp';
import './index.css';

  var currentTemp = (
    <div className="container">
    <CurrTemp /></div>
    );
  ReactDOM.render( currentTemp,
    document.getElementById('root')
  );
