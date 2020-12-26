import React from 'react'; 
import Transaction from './Transaction.jsx';




const Transactions = ({transactions}) => (
  <div className="transactions">
    {transactions.map((transaction, i) => <div key={i}><Transaction name={transaction.name} category={transaction.category} date={transaction.date} amount={transactions.amount}/></div>)}
  </div>
)



export default Transactions;