import React, { Component } from 'react';
import BillPage from './billContainers/BillPage'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { currentUser } from '../actions/userAction'
import {clearPayers} from '../actions/payerAction'
import { createBill, getBill, clearItems, clearBill } from '../actions/billAction'
import '../style/BillPage.css'
import Modal from 'react-responsive-modal';

class HomePage extends Component {

  state = {
    open: false,
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      return this.props.currentUser(token)
    } else {
      console.log('error')
    }
  }

  onOpenModal = () => {
   this.setState({ open: true });
  }

  onCloseModal = () => {
   this.setState({ open: false });
  }

  cleanBill = () => {
    this.props.clearItems()
    this.props.clearBill()
    this.props.clearPayers()
  }

  handleCreateManual = () => {
    this.cleanBill()
    this.props.createBill(this.props.currentUserI.id)
    .then(data => this.props.history.push(`/bills/${data.id}/items`))
  }

  handleAttach = () => {
    this.cleanBill()
    this.props.createBill(this.props.currentUserI.id)
    .then(data => this.props.history.push(`/bills/${data.id}/upload`))
  }

  render() {
    const { open } = this.state;
    return (
      <React.Fragment>
        <div className="slideshow__indicator"></div>
        <div className="home-page">
          <p className="bill-title">Bill from __</p>
          <BillPage />
          <span className="plus-icon" onClick={this.onOpenModal}><i class="fas fa-plus-circle fa-spin-hover"></i></span>
          <Modal open={open} onClose={this.onCloseModal} center>
            <div onClick={this.handleCreateManual} className="create-box">
              <span className="menu-icons"><i class="far fa-edit"></i></span>
              <p className="create-bill">WRITE MANUALLY</p>
            </div>
            <div onClick={this.handleAttach} className="create-box">
              <span className="menu-icons"><i className="far fa-image"></i></span>
              <p className="create-bill">ATTACH FILE</p>
            </div>
        </Modal>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("in homepage", state)
  return {
    currentUserI: state.user.currentUser,
    bill: state.text.bill,
    items: state.text.items
    }
};

export default withRouter(connect(mapStateToProps, {createBill, currentUser, getBill, clearItems, clearBill, clearPayers})(HomePage))
