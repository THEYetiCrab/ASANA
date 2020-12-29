import React, {useState, useEffect} from 'react';


export default function Account() {

  const [accounts, setAccounts] = useState([1, 2, 3]);
  console.log(accounts)
  
  
  return (
    <div>
      <ul>
        {accounts.map(account => {
          
          return <li key={account.id}>{account.name}</li>
          
        })}
      </ul>
    </div>
  )
}