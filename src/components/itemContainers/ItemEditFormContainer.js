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
    // renderForm: false,
    open: false
  }

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
  }

  handleDone = () => {
    let billId = this.props.match.params.id
    return this.props.history.push(`/bills/${billId}`)
  }

  handleAdd = () => {
    document.getElementById('add').style.display = 'none'
    this.setState({renderForm: true})
  }

  // handleSave = () => {
  //   let billId = this.props.match.params.id
  //   let arr = this.props.items
  //   this.props.postItems(billId, arr)
  //   .then(() => this.props.history.push(`/bills/${billId}`))
  // }

  onOpenModal = () => {
   this.setState({ open: true });
  }

  onCloseModal = () => {
   this.setState({ open: false });
  }

  // onClick={this.handleAdd}

  render() {
    const {open} = this.state
    if (this.props.items.length === 0) {
      return (
        <div className="container">
          <div className="home-page">
            <button class="btn submit" id="add" onClick={this.onOpenModal}>Add Item</button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <ItemCreateFormContainer />
            </Modal>
            {/* {this.state.renderForm ? (<div>
              <ItemCreateFormContainer />
            </div>)
            : null
            } */}
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
          <div className="row-items">
            <div className="item-title">
              {item.title}
            </div>
            <div className="item-price">
              <span>$</span>
              <p className="price-number">{parseFloat(item.price).toFixed(2)}</p>
              <button onClick={() => this.handleEdit(item)}><i class="fas fa-pen"></i></button>
              <button onClick={(e) => this.handleItemDelete(e, item.id)}><i class="far fa-trash-alt"></i></button>
            </div>
          </div>
          {/* <button onClick={this.onOpenModal}>Edit</button>
          <Modal open={open} onClose={this.onCloseModal} center>
            <ItemEditForm />
          </Modal> */}


        </div>
      )
    })
    return (
      <div className="container">
        <div className="home-page">
          {renderItems}
          {/* <ItemCreateFormContainer /> */}
          <button className="btn signup done-btn" onClick={this.handleDone}>Done</button>
          <button class="btn submit add-item-btn" id="add" onClick={this.onOpenModal}>Add Item</button>
          <Modal open={open} onClose={this.onCloseModal} center>
            <ItemCreateFormContainer />
          </Modal>
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
