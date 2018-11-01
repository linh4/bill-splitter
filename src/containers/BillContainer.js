import React, { Component } from 'react';
import BillCard from '../components/BillCard'
import {connect} from 'react-redux'


class BillContainer extends Component {

  total = () => {
    let arr = []
    for ( let i in this.props.billList) {
      arr.push(Number(this.props.billList[i][1]))
    }
    let sum = arr.reduce((a,b) => a + b, 0)
    return parseFloat(sum).toFixed(2)
  }

  render() {
    return (
      <div>
        {this.props.billList && this.props.billList.map((bills, idx) => <BillCard key={idx} bills={bills} total={this.total} />)}
        TOTAL - ${this.total()}
        <button>next</button>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    imgData: state.imgData,
    billList: state.text.billList
    };
};

export default connect(mapStateToProps)(BillContainer)
