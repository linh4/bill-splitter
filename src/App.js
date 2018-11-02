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
      // debugger
        return this.props.currentUser(token)
    } else if (!token && this.props.currentUserI != null) {
        console.log(this.props.currentUserI)
    }
  }

  render() {
    // if (!localStorage.getItem('token') && !this.props.currentUser.id) {
    //   return <Redirect to='/login' />
    // }else {
    return (
      <div className="App">
        {localStorage.token ? <Navbar /> : null}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />

          <Route exact path="/home" component={HomePage} />

          <Route exact path="/bills/upload" render={(routerProps) => <ImageContainer {...routerProps} />} />
          <Route exact path="/bills/:id" component={BillContainer} />
          <Route exact path="/bills" component={BillPage} />
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    currentUserI: state.user.currentUser,
    loggedIn: state.user.loggedIn
    // loading: state.user.loading
  };
}


export default withRouter(connect(mapStateToProps, {currentUser})(App))
