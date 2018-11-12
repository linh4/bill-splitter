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
    this.props.changeName(this.props.bill.id, this.state.name)
    .then(() => this.props.handleClose())
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.name} onChange={this.handleChange}/>
          <br/>
          <input type="submit"/>
          <button onClick={() => this.props.handleClose()}>Close</button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, {changeName})(BillNameEdit))
