import React, { Component } from 'react';
import BillCard from '../components/BillCard'
import {connect} from 'react-redux'


class BillContainer extends Component {

  render() {
    return (
      <div>
        {this.props.billList && this.props.billList.map((bills, idx) => <BillCard key={idx} bills={bills} />)}
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
