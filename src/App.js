import React, { Component } from 'react';
import './App.css';
// import CameraContainer from './containers/CameraContainer'
import {Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import ImageContainer from './containers/ImageContainer'
import BillContainer from './containers/BillContainer'
import FormContainer from './containers/FormContainer'
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
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/bills/:id/upload" render={(routerProps) => <ImageContainer {...routerProps} /> } />
              <Route exact path="/bills/:id" render={(routerProps) => <BillContainer {...routerProps} /> } />
              <Route exact path="/bills/:id/edit" render={(routerProps) => <FormContainer {...routerProps} />}  />
              <Route exact path="/login" component={HomePage} />
          </Switch>
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
