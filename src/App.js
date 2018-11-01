import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import CameraContainer from './containers/CameraContainer'
import ImageContainer from './containers/ImageContainer'
import BillContainer from './containers/BillContainer'
import Form from './containers/Form'


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <CameraContainer /> */}
        <ImageContainer />
        <BillContainer />
        {/* <Form /> */}
      </div>
    );
  }
}

export default App;
