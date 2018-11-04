import React, { Component } from 'react';
import './App.css';
// import CameraContainer from './containers/CameraContainer'
import {Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import ImageContainer from './containers/ImageContainer'
import BillContainer from './containers/BillContainer'
import Form from './containers/Form'
import HomePage from './containers/HomePage'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import BillPage from './containers/BillPage'
import { Redirect } from 'react-router-dom';
import { currentUser } from './actions/userAction'


class App extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token');
    if (token) {
        return this.props.currentUser(token)
    } else if (!token && this.props.currentUserI != null) {
        console.log(this.props.currentUserI)
    }
  }

  render() {
    // if (!localStorage.getItem('token') && !this.props.currentUser.id) {
    //   return <Route exact path="/" component={Login} />
    // }else {
    return (
      <div className="App">
        {localStorage.token && this.props.loggedIn ? (
          <div>
            <Navbar />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/bills/upload" component={ImageContainer} />
            <Route exact path="/bills" component={BillContainer} />
            <Route exact path="/login" component={HomePage} />
          </div>
        )
          : (
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
          </div>
          )
        }
        <Route exact path="/signup" component={SignUp} />
      </div>
    );
  }
// }
}

const mapStateToProps = (state) => {
  return {
    currentUserI: state.user.currentUser,
    loggedIn: state.user.loggedIn
  };
}


export default withRouter(connect(mapStateToProps, {currentUser})(App))
