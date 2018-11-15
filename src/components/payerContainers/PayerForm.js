import React from 'react';
import {connect} from 'react-redux'
import {createPayer} from '../../actions/payerAction.js'
import { withRouter } from 'react-router-dom'


class PayerForm extends React.Component {

  state = {
    name: ''
  }

  handleChange = (e) => {
    this.setState({name :e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.name !== '') {
      this.props.createPayer(this.state)
      return this.setState({name: ''})
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="input add-title">
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="enter payer name"/>
          </div>
          <div className="add-btn">
            <input type="submit" value="ADD PAYER"/>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, {createPayer})(PayerForm))
