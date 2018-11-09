import React, { Component } from 'react';
import BillCard from '../components/BillCard'
import Tax from '../components/Tax'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill, clearItems} from '../actions/billAction'


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
    this.props.history.push(`/bills/${id}/edit`)
  }

  handleTax = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/bills/${id}/tax`)
  }

  handleNext = () => {
    let id = this.props.match.params.id
    this.props.clearItems()
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
      return <div>No item yet...</div>
    }
    else {
      let finalTotal = this.total(this.props.wholeBill.items) + this.props.tax
      let sortedItems = this.props.wholeBill.items.sort((a,b) => a.id - b.id)
      return (
        <div>
          {sortedItems.map((item, idx) => <BillCard key={idx} item={item} />)}
          TAX - ${this.props.tax}
          <br/>
          TOTAL - ${parseFloat(finalTotal).toFixed(2)}
          <br/>
          {this.state.renderForm ? <Tax toggle={this.toggle} total={this.total(this.props.items)} /> : null}
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
    items: state.text.items,
    bill: state.text.bill,
    wholeBill: state.text.wholeBill,
    tax: state.text.tax
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, clearItems})(BillContainer))
