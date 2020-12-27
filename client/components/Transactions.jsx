import React from 'react'; 
import Transaction from './Transaction.jsx';
import ScrollToBottom from 'react-scroll-to-bottom';
import { DataGrid } from '@material-ui/data-grid';



const Transactions = ({transactions}) => (
  <ScrollToBottom className="transactions">
    <h3>Transactions</h3>
    {/* {transactions.map((transaction, i) => <div key={i}><Transaction name={transaction.name} category={transaction.category} date={transaction.date} amount={transactions.amount}/></div>)} */}
  </ScrollToBottom>
)



export default Transactions;