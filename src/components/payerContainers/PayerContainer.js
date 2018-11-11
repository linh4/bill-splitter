import React, { Component } from 'react';
import PayerPage from './PayerPage'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill} from '../../actions/billAction'
import { fetchPayers } from '../../actions/payerAction'

class PayerContainer extends Component {

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.fetchPayers()
    this.props.fetchBill(id)
  }

  totalPrice = (items) => {
    let arr = []
    for ( let i in items) {
      arr.push(items[i].price/items[i].payers.length)
    }
    let sum = arr.reduce((a,b) => a + b, 0)
    let result = sum + (sum * this.props.wholeBill.tax / 100) + (sum * this.props.wholeBill.tip / 100)
    return result
  }

  handlePayer = (id) => {
    let billId = this.props.match.params.id
    this.props.history.push(`/bills/${billId}/payers/${id}`)
    // console.log('hi')
  }

  handleDone = () => {
    this.props.history.push('/home')
  }

  render() {
    if (this.props.payerArr.length === 0) {
      return <div>Loading....</div>
    }
    const filterPayers = this.props.payerArr.filter(payer => payer.bill_id[0] == this.props.match.params.id)
    console.log(filterPayers)
    return(
      <div>
        {/* <PayerPage payer={payer} /> */}
        {/* {payer.items.map(item => <p key={item.id}>{item.title} - ${item.price/item.payers.length}</p>)} */}
        {filterPayers.map(payer => (<div key={payer.id}>
          {/* <PayerPage payer={payer} /> */}
          <p onClick={() => this.handlePayer(payer.id)}>{payer.name}</p>
          ${parseFloat(this.totalPrice(payer.items)).toFixed(2)}
          <hr/>
        </div>))
        }
        <button onClick={this.handleDone}>Done</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside payers page", state)
  return {
    wholeBill: state.text.wholeBill,
    payerArr: state.payer.payerArr,
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, fetchPayers})(PayerContainer))
