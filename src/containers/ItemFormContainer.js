import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchBill} from '../actions/billAction'
import { getItem, deleteItem } from '../actions/itemAction'

class ItemFormContainer extends Component {

  componentDidMount() {
    let billId = this.props.match.params.id
    this.props.fetchBill(billId)
  }

  handleSelect = (item) => {
    console.log("inside handleselect form ItemFormContainer", item)
    this.props.history.push(`/items/${item.id}/edit`)
  }

  handleItemDelete = (id) => {
    this.props.deleteItem(id)
  }

  render() {
    if (this.props.items.length < 0) {
      return <div>Loading...</div>
    }
    let sortedItems = this.props.items.sort((a,b) => a.id - b.id)
    const renderItems = sortedItems.map(item => {
      return (
        <div key={item.id}>
        {item.title} - ${parseFloat(item.price).toFixed(2)}
        <button onClick={() => this.handleSelect(item)}>Edit</button>
        <button onClick={() => this.handleItemDelete(item.id)}>Delete</button>
      </div>
      )
    })
    return (
      <div>
        {renderItems}
        <button onClick={this.props.history.goBack}>Done</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside form container", state)
  return {
    bill: state.text.bill,
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, deleteItem, getItem})(ItemFormContainer))
