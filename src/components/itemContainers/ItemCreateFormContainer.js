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
      this.props.onClose()
      this.props.createItem(billId, arr)
      .then(() => this.props.fetchBill(billId))
      return this.setState({
          title: '',
          price: 0})
    }
  }

  handleFocus = (e) => {
    e.persist()
    setTimeout(function() {
      e.target.parentElement.lastElementChild.style.opacity = '0'
    }, 100)
  }

  handleBlur = (e) => {
    e.persist()
    setTimeout(function() {
      e.target.parentElement.lastElementChild.style.opacity = '1'
    }, 300)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="add-form" onFocus={this.handleFocus} onBlur={this.handleBlur} >
          <div className="input add-title">
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="title"/>
            <span><i className="fas fa-tag"></i></span>
          </div>
          <div className="input add-price">
            <input type="number" name="price" min="0" step="any" value={this.state.price} onChange={this.handleChange}/>
            <span><i className="fas fa-dollar-sign"></i></span>
          </div>
          <div className="add-btn">
            <input type="submit" value="ADD"/>
          </div>
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
