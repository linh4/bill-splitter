import React, { Component } from 'react';
import BillCard from '../components/BillCard'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill} from '../actions/billAction'


class BillContainer extends Component {

  componentDidMount() {
    console.log('wait to fetch')
    setTimeout(() => {
      this.props.fetchBill(this.props.match.params.id)
    }, 700)
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
    this.props.history.push(`/bills/${id}/edit`)
  }

  render() {
  if (this.props.items.length < 1) {
    return <div>No item yet...</div>
  }
    return (
      <div>
        {this.props.items.map((bill, idx) => <BillCard key={idx} bill={bill} />)}
        TOTAL - ${this.total(this.props.items)}
        <br/>
        <button onClick={this.handleEdit}>Modify</button>
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

export default withRouter(connect(mapStateToProps, {fetchBill})(BillContainer))
