import React from 'react'; 
import ScrollToBottom from 'react-scroll-to-bottom';
import Transaction from './Transaction.jsx';




const Transactions = ({transactions}) => (
  <ScrollToBottom className="transactions">
    {transactions.map((transaction, i) => <div key={i}><Transaction name={transaction.name} category={transaction.category} date={transaction.date} amount={transactions.amount}/></div>)}
  </ScrollToBottom>
)



export default Transactions;