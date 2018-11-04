import React, { Component } from 'react';
import BillCard from '../components/BillCard'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'


class BillContainer extends Component {

  // total = () => {
  //   let arr = []
  //   for ( let i in this.props.billList) {
  //     arr.push(Number(this.props.billList[i][1]))
  //   }
  //   let sum = arr.reduce((a,b) => a + b, 0)
  //   return parseFloat(sum).toFixed(2)
  // }
// const timer = ms => new Promise(res => setTimeout(res, ms));
filterItems = (props) => props.items.filter(item => item.bill_id === props.bill.id)

  render() {
    return (
      <div>
        {this.props.items ? this.filterItems(this.props).map((bill, idx) => <BillCard key={idx} bill={bill} />) : console.log('hi')}
        {/* TOTAL - ${this.total()} */}
        <button>next</button>
        <br/>
        {/* <button onClick={this.props.history.push('/home')}>Back</button> */}
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  // console.log("inside bill container", state)
  return {
    items: state.text.items,
    bill: state.text.bills.slice(-1)[0]
    };
};

export default withRouter(connect(mapStateToProps)(BillContainer))
