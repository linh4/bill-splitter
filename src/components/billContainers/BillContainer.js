import React, { Component } from 'react';
import BillCard from './BillCard'
import Tax from './Tax'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill, clearItems, clearBill} from '../../actions/billAction'


class BillContainer extends Component {

  state = {
    renderForm: false
  }

  componentDidMount() {
    console.log('wait to fetch')
    // if (this.props.items.length < 1) {
      let billId = this.props.match.params.id
      this.props.fetchBill(billId)
      .catch(() => console.log('error'))
    // }
  }

  total = (props) => {
    let arr = []
    for ( let i in props) {
      arr.push(props[i].price)
    }
    let sum = arr.reduce((a,b) => a + b, 0)
    return sum
  }

  handleEdit = () => {
    let id = this.props.match.params.id
    this.props.clearItems()
    this.props.history.push(`/bills/${id}/items`)
  }

  handleTax = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/bills/${id}/tax`)
  }

  handleNext = () => {
    let id = this.props.match.params.id
    this.props.clearItems()
    this.props.clearBill()
    this.props.history.push(`/bills/${id}/assignPayers`)
  }

  toggle = () => {
    this.setState({renderForm: !this.state.renderForm})
  }

  render() {
    if (this.props.wholeBill === null) {
      return <div>Loading</div>
    }
    else if (this.props.wholeBill.items.length === 0) {
      return (<div className="home-page">
        <p>No item yet...</p>
        <div onClick={this.props.history.goBack} id="back">
          <span>&#10229;</span>
          Go Back
        </div>
      </div>)
    }
    else {
      console.log("inside tax", this.props.tax)
      // let finalTotal = this.total(this.props.wholeBill.items) + this.props.tax
      let total = this.total(this.props.wholeBill.items)
      let finalTotal = total + (total * this.props.tax / 100)
      let sortedItems = this.props.wholeBill.items.sort((a,b) => a.id - b.id)
      return (
        <div className="home-page">
          {sortedItems.map((item, idx) => <BillCard key={idx} item={item} />)}
          <div className="row tax-box">
            <div className="item-title">
              TAX
            </div>
            <div className="item-price">
              <span>$</span>
              <p className="price-number">{parseFloat(this.props.tax).toFixed(2)}</p>
            </div>
          </div>
          <div className="row total-box">
            <div className="item-title">
              TOTAL
            </div>
            <div className="item-price">
              <span>$</span>
              <p className="price-number">{parseFloat(finalTotal).toFixed(2)}</p>
            </div>
          </div>

          {this.state.renderForm ? <Tax toggle={this.toggle} taxFromBill={this.props.tax} /> : null}
          <button onClick={this.handleEdit}>Modify</button>
          <button onClick={this.toggle}>Tax</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
        )
      }
    }
  }

const mapStateToProps = (state) => {
  console.log("inside bill container", state)
  return {
    // items: state.text.items,
    bill: state.text.bill,
    wholeBill: state.text.wholeBill,
    tax: state.text.tax
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, clearItems, clearBill})(BillContainer))
