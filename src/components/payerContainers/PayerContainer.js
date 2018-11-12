import React, { Component } from 'react';
import BillNameEdit from '../billContainers/BillNameEdit'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill, deleteBill} from '../../actions/billAction'
import { fetchPayers } from '../../actions/payerAction'

class PayerContainer extends Component {

    state = {
      renderForm: false
    }

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
  }

  handleDone = () => {
    this.props.history.push('/home')
  }

  handleEdit = () => {
    this.setState({renderForm: true})
  }

  handleClose = () => {
    this.setState({renderForm: false})
  }

  renderBill = (bill) => {
    if (this.props.name) {
      return (<div>
        <p onClick={() => this.handleClick(bill)}> {this.props.name}</p>
      </div>)
    }
    else {
      return (<div>
        <p onClick={() => this.handleClick(bill)}> {bill.date}</p>
      </div>)
    }
  }

  render() {
    if (this.props.payerArr.length === 0) {
      return <div>Loading....</div>
    }
    const filterPayers = this.props.payerArr.filter(payer => payer.bill_id[0] == this.props.match.params.id)
    return(
      <div>
        {this.renderBill(this.props.wholeBill)}
        <button onClick={this.handleEdit}>Edit</button>

        {this.state.renderForm ? <BillNameEdit handleClose={this.handleClose} bill={this.props.wholeBill} /> : null}

        {filterPayers.map(payer => (<div key={payer.id}>
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
    items: state.text.items,
    name: state.text.name
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, fetchPayers, deleteBill})(PayerContainer))
