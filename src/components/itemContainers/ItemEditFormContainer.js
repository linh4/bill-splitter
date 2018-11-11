import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchBill} from '../../actions/billAction'
import { getItem, deleteItem } from '../../actions/itemAction'

class ItemEditFormContainer extends Component {

  componentDidMount() {
    // if (this.props.items.length === 0) {
      let billId = this.props.match.params.id
      this.props.fetchBill(billId)
      .catch(() => console.log('error'))
    // }
  }

  handleEdit = (item) => {
    console.log("inside handleselect form ItemFormContainer", item)
    this.props.history.push(`/items/${item.id}/edit`)
  }

  handleItemDelete = (e, id) => {
    this.props.deleteItem(id)
    // return e.target.parentElement.remove()
  }

  handleDone = () => {
    let billId = this.props.match.params.id
    return this.props.history.push(`/bills/${billId}`)
  }


  render() {
    if (this.props.items.length === 0) {
      return (<div>
        <p>No item yet...</p>
        <button onClick={this.props.history.goBack}>Back</button>
      </div>)
    }
    // let sortedItems = this.props.items.sort((a,b) => a.id - b.id)
    const renderItems = this.props.items.map(item => {
      return (
        <div key={item.id}>
        {item.title} - ${parseFloat(item.price).toFixed(2)}
        <button onClick={() => this.handleEdit(item)}>Edit</button>
        <button onClick={(e) => this.handleItemDelete(e, item.id)}>Delete</button>
      </div>
      )
    })
    return (
      <div>
        {renderItems}
        <button onClick={this.handleDone}>Done</button>
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

export default withRouter(connect(mapStateToProps, {fetchBill, deleteItem, getItem})(ItemEditFormContainer))
