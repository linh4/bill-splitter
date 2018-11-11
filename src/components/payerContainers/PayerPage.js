import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getThisPayer } from '../../actions/payerAction'
import { fetchBill } from '../../actions/billAction'
import { convertNum } from '../../actions/convertFunction'

class PayerPage extends Component {

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.getThisPayer(id)
    let billId = this.props.match.url.slice(7, 9)
    this.props.fetchBill(billId)
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

  totalBeforeTax = (item) => {
    return parseFloat(item.price/item.payers.length).toFixed(2)
  }

  render() {
    if (!this.props.selectedPayer) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <p>{this.props.selectedPayer.name}</p>
        <hr/>
        {this.props.selectedPayer.items.map(item => {
          return (<div key={item.id}>
            <p> {convertNum(this.totalBeforeTax(item)/item.price)} {item.title} - ${this.totalBeforeTax(item)}</p>
          </div>)
          })
        }
        {this.props.wholeBill && (<div>
          <hr/>
          <p>TAX - %{this.props.wholeBill.tax}</p>
          <p>TIP - %{this.props.wholeBill.tip}</p>
          <hr/>
          <p>TOTAL - ${parseFloat(this.totalPrice(this.props.selectedPayer.items)).toFixed(2)}</p>
        </div>)}
        <button onClick={this.props.history.goBack}>Back</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside payerPage", state)
  return {
    selectedPayer: state.payer.selectedPayer,
    wholeBill: state.text.wholeBill
    };
};


export default withRouter(connect(mapStateToProps, {getThisPayer, fetchBill})(PayerPage))
