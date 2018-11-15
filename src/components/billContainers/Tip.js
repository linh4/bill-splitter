import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Slider, { createSliderWithTooltip  } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { postTip } from '../../actions/billAction'

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
    let id = this.props.match.params.id
    this.props.postTip(id, this.props.wholeBill.date, this.props.wholeBill.tax, this.state.value)
    .then(() => this.props.history.push(`/bills/${id}/payers`))
  }

  render() {
    return (
      <div className="tip-box">
        <p className="tip-name">ADD TIP</p>
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
      <div className="asking-box">
        <button className="btn cancel" onClick={(e) =>this.handleCancel(e)}>Cancel</button>
        <button className="btn yes" onClick={this.handleNext}>Next</button>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tax: state.text.tax,
    wholeBill: state.text.wholeBill
    };
};

export default withRouter(connect(mapStateToProps, {postTip})(Tip))
