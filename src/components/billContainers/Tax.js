import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postTax} from '../../actions/billAction'

class Tax extends Component {

  state = {
    tax: this.props.taxFromBill
  }

  handleChange = (e) => {
    this.setState({tax: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let billId = this.props.match.params.id
    this.props.postTax(billId, this.props.wholeBill.date, this.state.tax)
    .then(() => this.props.toggle())
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="number" value={this.state.tax} step="any" onChange={this.handleChange}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    wholeBill: state.text.wholeBill
    };
};

export default withRouter(connect(mapStateToProps, {postTax})(Tax))
