import React, { Component } from 'react';
import BillPage from './billContainers/BillPage'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { currentUser } from '../actions/userAction'
import {clearPayers} from '../actions/payerAction'
import { createBill, getBill, clearItems, clearBill } from '../actions/billAction'

class HomePage extends Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      return this.props.currentUser(token)
    } else {
      console.log('error')
    }
  }

  handleCreateBill = () => {
    this.props.clearItems()
    this.props.clearBill()
    this.props.clearPayers()
    this.props.createBill(this.props.currentUserI.id)
    .then(data => this.props.history.push(`/bills/${data.id}/upload`))
  }

  render() {
    return (
      <div>
        <BillPage />
        <button onClick={this.handleCreateBill}>New Bill</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("in homepage", state)
  return {
    currentUserI: state.user.currentUser,
    bill: state.text.bill,
    items: state.text.items
    }
};

export default withRouter(connect(mapStateToProps, {createBill, currentUser, getBill, clearItems, clearBill, clearPayers})(HomePage))
