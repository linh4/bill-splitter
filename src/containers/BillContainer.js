import React, { Component } from 'react';
import BillCard from '../components/BillCard'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill} from '../actions/billAction'


class BillContainer extends Component {

  state = {
    render: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ render: true });
      this.props.fetchBill(this.props.match.params.id)
    }, 800)
  }

  total = (props) => {
    let arr = []
    for ( let i in props) {
      arr.push(props[i].price)
    }
    let sum = arr.reduce((a,b) => a + b, 0)
    return parseFloat(sum).toFixed(2)
  }

  render() {
  if (!this.props.items) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        {this.props.items.map((bill, idx) => <BillCard key={idx} bill={bill} />)}
        TOTAL - ${this.total(this.props.items)}
        <br/>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log("inside bill container", state)
  return {
    items: state.text.items,
    bill: state.text.bill
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill})(BillContainer))
