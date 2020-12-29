import React, { useState, useEffect } from 'react';

function AccountInfo (props) {

  console.log(props.accounts[0])




  return (
    <div className = "accInfo">
      <h3>Account Information</h3>
      <p><strong>Name: </strong>{props.accounts[0].account_name}</p>
      <p><strong>Type: </strong>{props.accounts[0].account_subtype}</p>
      <p><strong>Balance: </strong>${props.accounts[0].acount_balance}</p>
   </div>
  )
}


export default AccountInfo;