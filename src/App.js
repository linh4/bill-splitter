import React, { Component } from 'react';
import './App.css';
// import CameraContainer from './containers/CameraContainer'
import {Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import ImageContainer from './components/imageContainers/ImageContainer.js'
import BillContainer from './components/billContainers/BillContainer.js'
import ItemEditFormContainer from './components/itemContainers/ItemEditFormContainer.js'
import ItemEditForm from './components/itemContainers/ItemEditForm.js'
import ItemCreateFormContainer from './components/itemContainers/ItemCreateFormContainer.js'
import HomePage from './components/HomePage'
import Login from './components/userContainers/Login.js'
import SignUp from './components/userContainers/SignUp.js'
import Navbar from './components/Navbar'
// import BillPage from './components/billContainers/BillPage'
import PayerFormContainer from './components/payerContainers/PayerFormContainer.js'
import BillPayerContainer from './components/payerContainers/BillPayerContainer.js'
import PayerContainer from './components/payerContainers/PayerContainer.js'
import PayerPage from './components/payerContainers/PayerPage.js'
import { currentUser } from './actions/userAction'


class App extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token');
    if (token) {
        return this.props.currentUser(token)
    } else if (!token && this.props.currentUserI != null) {
        console.log("????")
    }
  }

  render() {
  //   if (!localStorage.getItem('token') && !this.props.currentUser.id) {
  //   return this.props.history.push('/login')}
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
              <Route exac path="/bills/:id/items" render={(routerProps) => <ItemCreateFormContainer {...routerProps} />} />
              <Route exact path="/bills/:id/edit" render={(routerProps) => <ItemEditFormContainer {...routerProps} />}  />
              <Route exact path="/items/:id/edit" render={(routerProps) => <ItemEditForm {...routerProps} />} />
              <Route exact path="/items/:id/payers" render={(routerProps) => <PayerFormContainer {...routerProps} />} />
              <Route exac path="/bills/:id/assignPayers" render={(routerProps) => <BillPayerContainer {...routerProps} />} />
              <Route exac path="/bills/:id/payers/:id" render={(routerProps) => <PayerPage {...routerProps} />} />
              <Route exac path="/bills/:id/payers" render={(routerProps) => <PayerContainer {...routerProps} />} />
              <Route exact path="/login" component={HomePage} />
          </Switch>
          </div>
        )
          : (
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserI: state.user.currentUser,
    loggedIn: state.user.loggedIn
  };
}


export default withRouter(connect(mapStateToProps, {currentUser})(App))
