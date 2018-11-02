import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/userAction'


class Navbar extends React.Component {

  handleLogout = () => {
    console.log('logged out')
    this.props.logoutUser()
    this.props.history.push('/')
  }

  render() {
  return (
    <div>
        <Link to="/bills/upload">
        <button>New Bill</button>
      </Link>

        <Link to="bills">
        <button>My Bills</button>
      </Link>
        <button onClick={this.handleLogout}>Log Out</button>
    </div>
    )
  }
}

export default withRouter(connect(state => ({currentUser: state.user.currentUser}), {logoutUser})(Navbar))
