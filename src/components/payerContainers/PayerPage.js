import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getThisPayer } from '../../actions/payerAction'
import { fetchBill } from '../../actions/billAction'
import { convertNum } from '../../actions/convertFunction'
import _ from 'lodash'

class PayerPage extends Component {

  componentDidMount() {
    let billId = this.props.match.url.slice(7, 9)
    this.props.fetchBill(billId)
    let id = this.props.match.params.id
    this.props.getThisPayer(id)
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

  costEachItem = (item) => {
    return parseFloat(item.price/item.payers.length).toFixed(2)
  }

  numToFraction = (item) => {
    let num = parseFloat(this.costEachItem(item)/item.price).toFixed(2)
    return convertNum(num)
  }

  render() {
    if (!this.props.selectedPayer) {
      return <div className="home-page">Loading...</div>
    }
    const filterItems = _.uniqBy(this.props.selectedPayer.items, 'id')
    return (
      <div className="home-page">
        <p className="payer-top-name">{this.props.selectedPayer.name}</p>
        <hr/>
        {filterItems.map(item => {
          return (
            <div key={item.id} className="row-items">
            <div className="item-title">
              <p> {this.numToFraction(item)} {item.title}</p>
            </div>
            <div className="item-price">
              <span>$</span>
              <p className="price-number">{this.costEachItem(item)}</p>
            </div>

          </div>)
          })
        }
        {this.props.wholeBill && (<div>
          <div className="row-items tax-box">
            <div className="empty-div tax-div"></div>
            <div className="item-total">
              TAX
            </div>
            <div className="item-total-price">
              <span>%</span>
              <p className="price-number tax">{this.props.wholeBill.tax}</p>
            </div>
          </div>

          <div className="row-items tax-box">
            <div className="empty-div tax-div"></div>
            <div className="item-total">
              TIP
            </div>
            <div className="item-total-price">
              <span>%</span>
              <p className="price-number tax">{this.props.wholeBill.tip}</p>
            </div>
          </div>

          <div className="row-items total-box">
          <div className="empty-div"></div>
          <div className="item-total">
            TOTAL
          </div>
          <div className="item-total-price">
            <span>$</span>
            <p className="price-number total">{parseFloat(this.totalPrice(this.props.selectedPayer.items)).toFixed(2)}</p>
          </div>
        </div>

        </div>)}

        <div onClick={this.props.history.goBack} id="back-upload">
          <span>&#10229;</span>
          Go Back
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPayer: state.payer.selectedPayer,
    wholeBill: state.text.wholeBill
    };
};


export default withRouter(connect(mapStateToProps, {getThisPayer, fetchBill})(PayerPage))
