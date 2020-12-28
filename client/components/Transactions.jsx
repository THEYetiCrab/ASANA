import React, { useState, useEffect } from 'react'; 
import Transaction from './Transaction.jsx';
import ScrollToBottom from 'react-scroll-to-bottom';
import { DataGrid } from '@material-ui/data-grid';
import { element } from 'prop-types';


const columns = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'merchant_name', headerName: 'Transaction', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'date_of_transaction', headerName: 'Date', width: 120 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 90 },
  { field: 'account_type', headerName: 'Account Type', width: 130 }
];

// const rows = [
//   {
//       id: 1,
//       merchant_name: "ASANA",
//       category: "Entertainment",
//       date_of_transaction: "12-19-2020",
//       amount: 100,
//   },
//   {
//       id: 2,
//       merchant_name: "ASANA",
//       amount: 100,
//       account_type: "Credit",
//       date_of_transaction: "12-19-2020",
//       category: "Entertainment"
//   },
//   {
//       id: 3,
//       account_id: "id26",
//       merchant_name: "ASANA1",
//       amount: 102,
//       account_type: "Debit",
//       date_of_transaction: "12-19-2020",
//       category: "Entertainment"
//   },
//   {
//       id: 4,
//       account_id: "id26",
//       merchant_name: "ASANA3",
//       amount: 10,
//       account_type: "Credit",
//       date_of_transaction: "12-20-2020",
//       category: "Entertainment"
//   }
// ];




// const Transactions = ({transactions}) => (
//   <ScrollToBottom className="transactions">
//     <h3>Transactions</h3>
//     {/* {transactions.map((transaction, i) => <div key={i}><Transaction name={transaction.name} category={transaction.category} date={transaction.date} amount={transactions.amount}/></div>)} */}
//   </ScrollToBottom>
// )


export default function Transactions() {

  const [transactions, setTransactions] = useState([]);
  const rows = [];

  useEffect(() => {
    fetch('http://localhost:3000/test/get_transactions')
      .then(res => res.json())
      .then(res => setTransactions(res.map((ele) => {
        return {
          id: ele.row_id,
          account_id: ele.account_id,
          merchant_name: ele.merchant_name,
          amount: ele.amount,
          account_type: ele.account_type,
          date_of_transaction: ele.date_of_transaction,
          category: ele.category
        }
      })))
  }, [])

  console.log(transactions)

  return (
    <ScrollToBottom className="transactions">
      <h3>Transactions</h3>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid rows={transactions} columns={columns} pageSize={25}/>
      </div>
    </ScrollToBottom>
  );
}



// export default Transactions;