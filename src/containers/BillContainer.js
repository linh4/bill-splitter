import React, { Component } from 'react';
import BillCard from '../components/BillCard'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill, clearItems} from '../actions/billAction'


class BillContainer extends Component {

  componentDidMount() {
    console.log('wait to fetch')
    if (this.props.items.length < 1) {
      let billId = this.props.match.params.id
      this.props.fetchBill(billId)
    }
  }

  total = (props) => {
    let arr = []
    for ( let i in props) {
      arr.push(props[i].price)
    }
    let sum = arr.reduce((a,b) => a + b, 0)
    return parseFloat(sum).toFixed(2)
  }

  handleEdit = () => {
    let id = this.props.match.params.id
    this.props.clearItems()
    this.props.history.push(`/bills/${id}/edit`)
  }

  handleNext = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/bills/${id}/payers`)
  }

  render() {
  if (this.props.items.length < 1) {
    return <div>No item yet...</div>
  }
    let sortedItems = this.props.items.sort((a,b) => a.id - b.id)
    let billId = this.props.match.params.id
    return (
      <div>
        {sortedItems.map((item, idx) => <BillCard key={idx} item={item} />)}
        TOTAL - ${this.total(this.props.items)}
        <br/>
        <button onClick={this.handleEdit}>Modify</button>
        <button onClick={this.handleNext}>Next</button>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  console.log("inside bill container", state)
  return {
    items: state.text.items,
    bill: state.text.bill
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, clearItems})(BillContainer))
