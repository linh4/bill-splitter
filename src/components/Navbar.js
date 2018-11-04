import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, currentUser } from '../actions/userAction'


class Navbar extends React.Component {



  handleLogout = () => {
    console.log('logged out')
    this.props.logoutUser()
    this.props.history.push('/login')
  }

  render() {
  return (
    <div>
        <Link to="/home">
        <button>Home</button>
      </Link>
        <button onClick={this.handleLogout}>Log Out</button>
    </div>
    )
  }
}

export default withRouter(connect(null, {logoutUser, currentUser})(Navbar))
