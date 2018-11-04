import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, currentUser } from '../actions/userAction'
import { createBill } from '../actions/billAction'

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
    console.log('created bill')
    this.props.createBill(this.props.currentUserI.id)
    this.props.history.push('/bills/upload')

  }

  render() {
    return (
      <div>
        <button onClick={this.handleCreateBill}>New Bill</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserI: state.user.currentUser,
    }
};

export default withRouter(connect(mapStateToProps, {createBill, currentUser})(HomePage))
