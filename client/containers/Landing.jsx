import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom';
import Connect from '../components/NavBar.jsx';
import AccountInfo from '../components/AccountInfo.jsx';
import NavBar from '../components/NavBar.jsx';
import DisplayData from '../components/DisplayData.jsx';
import Transactions from '../components/Transactions.jsx';


function Landing () {
  return (
    <div className ="landing">
      <div className = "leftSide">
        <NavBar /> 
      </div>
      <div className = "rightSide">
       <AccountInfo />
       <DisplayData />
      <Transactions /> 
      </div>
    </div>
  )
}








export default Landing;