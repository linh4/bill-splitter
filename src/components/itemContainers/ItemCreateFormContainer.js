import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { itemArr } from '../../actions/billAction'

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
      this.props.itemArr(this.state)
      return this.setState({
        title: '',
        price: ''})
    }
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" onChange={this.handleChange}/>
          <label>Price</label>
          <input type="number" name="price" step="any" onChange={this.handleChange}/>
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

export default withRouter(connect(mapStateToProps, {itemArr})(ItemCreateFormContainer))
