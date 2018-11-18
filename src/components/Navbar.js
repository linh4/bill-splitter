import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser, currentUser } from '../actions/userAction'
import { slide as Menu } from 'react-burger-menu'
import '../style/Navbar.css'


class Navbar extends React.Component {

  state = {
    menuOpen: false
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})
  }

  closeMenu () {
    this.setState({menuOpen: false})
  }

  handleLogout = () => {
    this.props.logoutUser()
    this.props.history.push('/login')
  }

  handleHome = () => {
    this.closeMenu()
    this.props.history.push('/home')
  }

  render() {
  return (
    <React.Fragment>
      <div id="outer-container">
        <Menu right isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}>
          <p className="menu-item" onClick={this.handleHome}>HOME</p>
          <p className="menu-item" onClick={this.handleLogout}>LOG OUT</p>
        </Menu>
      </div>
    </React.Fragment>
    )
  }
}

export default withRouter(connect(null, {logoutUser, currentUser})(Navbar))
