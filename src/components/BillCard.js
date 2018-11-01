import React from 'react';

const BillCard = (props) => {
  return (
    <div>
      {props.bills[0]} - ${props.bills[1]}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}

export default BillCard;
