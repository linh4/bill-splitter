import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CameraContainer from './containers/CameraContainer'
// import ImageContainer from './containers/ImageContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CameraContainer />
        {/* <ImageContainer /> */}
      </div>
    );
  }
}

export default App;
