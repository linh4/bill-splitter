import React from 'react';

const BillCard = (props) => {
  return (
    <div>
      {props.bill.title} - ${props.bill.price}
    </div>
  )
}

export default BillCard;
