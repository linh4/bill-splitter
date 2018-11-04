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

  render() {
    return (
      <div>
        {this.props.billList && this.props.bill.items.map((bill, idx) => <BillCard key={idx} bill={bill} />)}
        {/* TOTAL - ${this.total()} */}
        <button>next</button>
        <br/>
        {/* <button onClick={this.props.history.push('/home')}>Back</button> */}
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    // imgData: state.imgData,
    // billList: state.text.billList
    bill: state.text.bill
    };
};

export default withRouter(connect(mapStateToProps)(BillContainer))
