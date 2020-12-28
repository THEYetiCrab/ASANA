import React from 'react'; 
import Transaction from './Transaction.jsx';
import ScrollToBottom from 'react-scroll-to-bottom';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'merchant_name', headerName: 'Transaction', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'date_of_transaction', headerName: 'Date', width: 150 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 90 }
];

const rows = [
  {
      id: 1,
      merchant_name: "ASANA",
      category: "Entertainment",
      date_of_transaction: "12-19-2020",
      amount: 100,
  },
  {
      id: 2,
      merchant_name: "ASANA",
      amount: 100,
      account_type: "Credit",
      date_of_transaction: "12-19-2020",
      category: "Entertainment"
  },
  {
      id: 3,
      account_id: "id26",
      merchant_name: "ASANA1",
      amount: 102,
      account_type: "Debit",
      date_of_transaction: "12-19-2020",
      category: "Entertainment"
  },
  {
      id: 4,
      account_id: "id26",
      merchant_name: "ASANA3",
      amount: 10,
      account_type: "Credit",
      date_of_transaction: "12-20-2020",
      category: "Entertainment"
  }
];




// const Transactions = ({transactions}) => (
//   <ScrollToBottom className="transactions">
//     <h3>Transactions</h3>
//     {/* {transactions.map((transaction, i) => <div key={i}><Transaction name={transaction.name} category={transaction.category} date={transaction.date} amount={transactions.amount}/></div>)} */}
//   </ScrollToBottom>
// )


export default function Transactions() {
  return (
    <ScrollToBottom className="transactions">
      <h3>Transactions</h3>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={6}/>
      </div>
    </ScrollToBottom>
  );
}



// export default Transactions;