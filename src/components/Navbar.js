import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, currentUser } from '../actions/userAction'
import { createBill } from '../actions/billAction'


class Navbar extends React.Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      return this.props.currentUser(token)
    }
  }

  handleLogout = () => {
    console.log('logged out')
    this.props.logoutUser()
    this.props.history.push('/login')
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

        <Link to="/bills">
        <button>My Bills</button>
      </Link>
        <button onClick={this.handleLogout}>Log Out</button>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    currentUserI: state.user.currentUser
    };
};

export default withRouter(connect(mapStateToProps, {logoutUser, createBill, currentUser})(Navbar))
