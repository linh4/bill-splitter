import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import CameraContainer from './containers/CameraContainer'
import ImageContainer from './containers/ImageContainer'
import BillContainer from './containers/BillContainer'
import Form from './containers/Form'
import HomePage from './containers/HomePage'
import {Route} from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <CameraContainer /> */}
        {/* <HomePage />
        <ImageContainer />
        <BillContainer /> */}
        {/* <Form /> */}

        <Route exact path="/login" render={()=> <Login />} />
        <Route exact path="/signup" render={()=> <SignUp />} />

        <Route exact path="/" component={HomePage} />
        <Route exact path="/bills/:id" render={(routerProps) => <ImageContainer {...routerProps} />} />


      </div>
    );
  }
}

export default App;
