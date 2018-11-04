import React from 'react';

const BillCard = (props) => {
  return (
    <div>
      {props.bill.title} - ${props.bill.price}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}

export default BillCard;
