import React, {useState, useEffect} from 'react';


export default function Account() {

  const [accounts, setAccounts] = useState([1, 2, 3]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => console.log(data))
      .then(data => setAccounts(data))
  }, [])

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