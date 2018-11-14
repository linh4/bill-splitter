import React, { Component } from 'react';
import ItemCreateFormContainer from './ItemCreateFormContainer'
import ItemEditForm from './ItemEditForm'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import { fetchBill} from '../../actions/billAction'
import { getItem, deleteItem } from '../../actions/itemAction'
import '../../style/Form.css'
import Modal from 'react-responsive-modal';

class ItemEditFormContainer extends Component {

  state = {
    openAddModal: false,
    openDeleteModal: false,
    openEditModal: false
  }

  componentDidMount() {
    // if (this.props.items.length === 0) {
      let billId = this.props.match.params.id
      this.props.fetchBill(billId)
      .catch(() => console.log('error'))
    // }
  }

  // handleEdit = (item) => {
  //   console.log("inside handleselect form ItemFormContainer", item)
  //   this.props.history.push(`/items/${item.id}/edit`)
  // }

  handleItemDelete = (id) => {
    this.props.deleteItem(id)
    this.onCloseDeleteModal()
  }

  handleDone = () => {
    let billId = this.props.match.params.id
    return this.props.history.push(`/bills/${billId}`)
  }

  handleAdd = () => {
    document.getElementById('add').style.display = 'none'
    this.setState({renderForm: true})
  }

  onOpenAddModal = () => {
   this.setState({ openAddModal: true });
  }

  onCloseAddModal = () => {
   this.setState({ openAddModal: false });
  }

  onOpenEditModal = () => {
   this.setState({ openEditModal: true });
  }

  onCloseEditModal = () => {
   this.setState({ openEditModal: false });
  }

  onOpenDeleteModal = () => {
   this.setState({ openDeleteModal: true });
  }

  onCloseDeleteModal = () => {
   this.setState({ openDeleteModal: false });
  }

  modalAddItem = () => {
    return (
      <Modal open={this.state.openAddModal} onClose={this.onCloseAddModal} center>
        <ItemCreateFormContainer onClose={this.onCloseAddModal} />
      </Modal>
    )
  }

  modalEditItem = (item) => {
    return (
      <Modal open={this.state.openEditModal} onClose={this.onCloseEditModal} center>
        <ItemEditForm onClose={this.onCloseEditModal} item={item} />
      </Modal>
    )
  }

  modalDeleteItem = (item) => {
    return (
      <Modal open={this.state.openDeleteModal} onClose={this.onCloseDeleteModal} center>
        <div className="asking-box">
          <p>Are you Sure about deleting it?</p>
          <button className="btn cancel" onClick={this.onCloseDeleteModal}>Cancel</button>
          <button className="btn yes" onClick={() => this.handleItemDelete(item.id)} >Delete</button>
        </div>
      </Modal>
    )
  }

  render() {
    if (this.props.items.length === 0) {
      return (
        <div className="container">
          <div className="home-page">
            <button className="btn submit" id="add" onClick={this.onOpenAddModal}>Add Item</button>
            {this.modalAddItem()}
            <br/>
            <div onClick={this.props.history.goBack} id="back">
              <span>&#10229;</span>
              Go Back
            </div>
          </div>
        </div>)
    }
    let sortedItems = this.props.items.sort((a,b) => a.id - b.id)
    const renderItems = sortedItems.map(item => {
      return (
        <div key={item.id}>
          <div className="row-items row-edit">

            <div className="item-title">
              {item.title}
            </div>
            <div className="item-price">
              <span>$</span>
              <p className="price-number">{parseFloat(item.price).toFixed(2)}</p>

              <span className="icon-edit-item" onClick={this.onOpenEditModal}><i className="fas fa-pen"></i></span>
              {this.modalEditItem(item)}

              <span className="icon-edit-item" onClick={this.onOpenDeleteModal}><i className="far fa-trash-alt icons"></i></span>
              {this.modalDeleteItem(item)}

            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="home-page">
          {renderItems}
          <div className="btn-box">
            <button className="btn signup done-btn" onClick={this.handleDone}>Done</button>
            <button className="btn submit" id="add" onClick={this.onOpenAddModal}>Add Item</button>
            {this.modalAddItem()}
          </div>
        </div>
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
