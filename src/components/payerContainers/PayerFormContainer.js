import React, { Component } from 'react';
import PayerForm from './PayerForm'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {getItem} from '../../actions/itemAction'
import {fetchBill, clearBill} from '../../actions/billAction'
import { deletePayer, postItemPayer, getPayer } from '../../actions/payerAction'
import Modal from 'react-responsive-modal';

class PayerFormContainer extends Component {

  state = {
    renderForm: false,
    isChecked: false,
    payerArr: [],
    openDeleteModal: false,
    payer: {},
  }

  onAddingItem = (payer) => {
    const isChecked = payer.target.checked
    const id = payer.target.id
    this.setState({isChecked: !this.state.isChecked})
    if (isChecked) {
      console.log('checked!')
      return this.setState({payerArr: [...this.state.payerArr, id]})
    } else {
      console.log('not checked')
      const newPayers = this.state.payerArr.filter(payer => payer !== id)
      return this.setState({payerArr: newPayers })
    }
  }

  handleAddPayer = (e) => {
    document.getElementById("back").style.display = 'none'
    e.target.style.display = 'none'
    this.setState({renderForm: true})
  }

  handleDeletePayer = (payer) => {
    const newPayers = this.state.payerArr.filter(payer => payer !== payer.id)
    this.setState({payerArr: newPayers })
    this.props.deletePayer(payer.id)
    .then(() => this.props.fetchBill(this.props.match.params.id))
    .then(() => this.onCloseDeleteModal())
  }

  handleDone = () => {
    let id = this.props.item.id
    let ibd = this.props.item.bill_id
    this.props.postItemPayer(id, this.state.payerArr)
    .then(() => this.props.fetchBill(ibd))
    .then(() => this.props.onClose())
  }

  onOpenDeleteModal = (payer) => {
   this.setState({ openDeleteModal: true, payer: payer });
  }

  onCloseDeleteModal = () => {
   this.setState({ openDeleteModal: false });
  }

  modalDeleteItem = () => {
    return (
      <Modal open={this.state.openDeleteModal} onClose={this.onCloseDeleteModal} payer={this.state.payer} center>
        <div className="asking-box">
          <p className="asking-delete">Are you sure about deleting it?</p>
          <button className="btn cancel" onClick={this.onCloseDeleteModal}>Cancel</button>
          <button className="btn yes" onClick={() => this.handleDeletePayer(this.state.payer)} >Delete</button>
        </div>
      </Modal>
    )
  }

  renderPayerList = (payer,idx) => {
    return (<div key={idx} className="checkbox-box">
      <input type="checkbox" id={payer.id} value={payer.name || ''} onChange={this.onAddingItem} />
      <p className="payer-render-name">{payer.name}</p>

      <span className="icon-delete-btn" onClick={() => this.onOpenDeleteModal(payer)}><i className="far fa-trash-alt icon-trash"></i></span>
        {this.modalDeleteItem()}

    </div>
    )
  }

  render() {
    console.log("inside render payer form", this.props.item)
    let payerArr = this.props.payers.concat(...this.props.billPayers)
    let uniquePayers = _.uniqBy(payerArr, 'id').sort((a,b) => a.id - b.id)
      return (<div className="payer-modal-box">
        <div className="item-name">
          {this.props.item && this.props.item.title}
        </div>
        <p className="click-name">***Names should be different****</p>
        {uniquePayers.map((payer, idx) => this.renderPayerList(payer, idx))}
        <PayerForm />
        <button className="btn signup payer-done" onClick={this.handleDone}>Done</button>
      </div>)
    }
  }


export default withRouter(connect(null, {fetchBill, deletePayer, postItemPayer, getItem, clearBill, getPayer})(PayerFormContainer))
