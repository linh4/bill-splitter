import React, { Component } from 'react'
import Webcam from 'react-webcam'
import {connect} from 'react-redux'
import {convertImg} from '../actions'

class CameraCapture extends Component {

  // state = {
  //   pic: null
  // }

  setRef = (webcam) => {
    this.webcam = webcam
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    // this.setState({pic: imageSrc})
    this.props.convertImg(imageSrc)

  }

  render() {
    // console.log(this.state.pic)
    const videoConstraints = {
      width: 1600,
      height: 900,
      facingMode: 'environment',
    }

    return (
      <div>
        <Webcam 
          audio={false}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}/>
        <br/>
        <button onClick={this.capture}>Take Photo</button>
      </div>
    )
  }
}

export default connect(state => ({imgData: state.text.imgData}), {convertImg})(CameraCapture)
