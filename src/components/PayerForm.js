import React from 'react';

const PayerForm = (props) => {
  return (
    props.payers.map((val, idx)=> {
      let name = `payer-${idx}`
      return (
        <div key={idx}>
          <label>Name</label>
          <input
            type="text"
            name={name}
            data-id={idx}
          />
        </div>
      )
    })
  )
}
//
// class PayerForm extends Component {
//   render() {
//     return (
//       <div>
//         <h1>PayerForm Component</h1>
//       </div>
//     )
//   }
// }

export default PayerForm;
