import React, { Component } from 'react';
import Slider from 'react-rangeslider'

class Tip extends Component {

  state = {
    volume: 0
  }

  handleCancel = (e) => {
    this.props.handleDisplay()
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
  }

  render() {
    let { volume } = this.state
    return (
      <div>
        <h1>Tip Component</h1>
        <Slider
          min={0}
          max={10}
          value={volume}
          orientation="vertical"
          onChange={this.handleOnChange}
        />
        <button onClick={(e) =>this.handleCancel(e)}>Cancel</button>
      </div>
    )
  }
}

export default Tip;
