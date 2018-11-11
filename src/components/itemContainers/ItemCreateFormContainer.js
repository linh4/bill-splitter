import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchBill } from '../../actions/billAction'
import { createItem } from '../../actions/itemAction'

class ItemCreateFormContainer extends Component {

  state = {
    title: '',
    price: 0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.title !== '' && this.state.price !== '') {
      let billId = this.props.match.params.id
      let arr = []
      arr.push(this.state)
      this.props.createItem(billId, arr)
      .then(() => this.props.fetchBill(billId))
      return this.setState({
          title: '',
          price: 0})
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
          <label>Price</label>
          <input type="number" name="price" step="any" value={this.state.price} onChange={this.handleChange}/>
          <br/>
          <input type="submit" value="Add Item"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside create form", state)
  return {
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {createItem, fetchBill})(ItemCreateFormContainer))
