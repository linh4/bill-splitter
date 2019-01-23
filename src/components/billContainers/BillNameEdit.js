import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { changeName} from '../../actions/billAction'

class BillNameEdit extends Component {

  state = {
    name: this.props.bill.date
  }

  handleChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.changeName(this.props.bill.id, this.state.name, this.props.bill.tax, this.props.bill.tip)
    .then(() => this.props.onClose())
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="add-form">
          <div className="input">
          <input type="text" value={this.state.name} onChange={this.handleChange}/>
        </div>
        <div className="add-btn add-tax-btn">
          <input type="submit" value="EDIT"/>
        </div>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, {changeName})(BillNameEdit))
