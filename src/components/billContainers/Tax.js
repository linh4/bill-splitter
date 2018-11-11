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
    this.props.postTax(billId, this.state.tax)
    this.props.toggle()
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="number" value={this.state.tax} step="any" onChange={(e) => this.handleChange(e)}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, {postTax})(Tax))
