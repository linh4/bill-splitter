import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postTax, clearTax} from '../actions/billAction'

class Tax extends Component {

  state = {
    tax: 0
  }

  componentDidUpdate (prevState, prevProps) {
    console.log("inside didupdate", typeof prevProps.tax)
    console.log('props', this.props)
    if (prevProps.tax !== this.props.tax) {
      // debugger
      this.setState({
        tax: this.props.tax
      })
    }
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
    console.log("inside tax", this.props)
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="number" step="any" onChange={(e) => this.handleChange(e)}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(state => ({tax: state.text.wholeBill.tax}), {postTax, clearTax})(Tax))
