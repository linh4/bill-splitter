import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { postTax, clearTax} from '../actions/billAction'

class Tax extends Component {

  state = {
    amount: 0
  }

  componentDidUpdate (prevState, prevProps) {
    // console.log("props", typeof prevProps.amount)
    // if (prevProps.amount !== this.props.tax) {
    //   this.setState({
    //     amount: this.props.tax
    //   })
    //   console.log("prev", prevProps.amount, "this props", this.props.tax)
    // }
  }

  handleChange = (e) => {
    this.setState({amount: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.clearTax()
    let billId = this.props.match.params.id
    this.props.postTax(billId, this.state.amount)
    this.props.toggle()
  }

  render() {
    console.log(this.props.total)
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="number" onChange={(e) => this.handleChange(e)}/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(state => ({tax: state.text.tax}), {postTax, clearTax})(Tax))
