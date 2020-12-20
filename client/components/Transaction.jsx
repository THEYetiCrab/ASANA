import React from 'react';




const Transaction = ({name, category, date, amount}) => {
  return (
    <div className = "transaction">
      <span>{name}</span>
      <span>{category}</span>
      <span>{date}</span>
      <span>{amount}</span>
    </div>
  )


  export default Transaction;
}