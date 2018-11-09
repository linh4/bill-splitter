import React, { Component } from 'react';
import Slider, { Range, createSliderWithTooltip  } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderWithTooltip = createSliderWithTooltip(Slider);
const marks = {
  0: {
    style: {
      color: 'olive',
    },
    label: <strong>0</strong>,
  },
  5: '5',
  10: '10',
  15: '15',
  20: '20',
  25: '25',
  30: {
    style: {
      color: 'olive',
    },
    label: <strong>30</strong>,
  },
}

class Tip extends Component {

  state = {
    value: 0,
    min: 0,
    max: 30,
  }

  handleCancel = (e) => {
    this.props.handleDisplay()
  }

  onSliderChange = (value) => {
   this.setState({
     value,
   });
  }
   // onAfterChange = (value) => {
   //   console.log(value); //eslint-disable-line
   // }
   onMinChange = (e) => {
      this.setState({
      min: +e.target.value || 0,
    });
  }
  onMaxChange = (e) => {
    this.setState({
      max: +e.target.value || 30,
    });
  }

  percentFormatter = (v) => {
    return `${v} %`;
  }

  handleNext = () => {
    console.log(this.state.value)
  }

  render() {
    return (
      <div>
        <h1>Tip Component</h1>
        <SliderWithTooltip
          value={this.state.value}
          min={this.state.min} max={this.state.max}
          marks={marks}
          dots step={5}
          dotStyle={{ borderColor: 'orange' }}
          activeDotStyle={{ borderColor: 'yellow' }}
          tipFormatter={this.percentFormatter}
          tipProps={{ overlayClassName: 'foo' }}
          onChange={this.onSliderChange}
          onAfterChange={this.onAfterChange}
      />
      <br/>
      <button onClick={(e) =>this.handleCancel(e)}>Cancel</button>
      <button onClick={this.handleNext}>Next</button>
      </div>
    )
  }
}

export default Tip;
