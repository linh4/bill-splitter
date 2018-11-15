import React, { Component } from 'react';
import Tip from '../billContainers/Tip'
import PayerFormContainer from './PayerFormContainer'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill} from '../../actions/billAction'
import _ from 'lodash'
import Modal from 'react-responsive-modal';
import '../../style/Payer.css'

class BillPayerContainer extends Component {

  state = {
    // renderTip: false,
    openPayerModal: false,
    openTipModal: false,
    item: {}
  }

  componentDidMount() {
    if (!this.props.wholeBill) {
      let billId = this.props.match.params.id
      this.props.fetchBill(billId)
      .catch(() => console.log('error'))
    }
  }

  selectPayers = (id) => {
    this.props.history.push(`/items/${id}/payers`)
  }


  handleBack = () => {
    let billId = this.props.match.params.id
    this.props.history.push(`/bills/${billId}`)
  }

  handleNext = () => {
    let payer = document.querySelector('.unassigned')
    if (payer) {
      alert('All items need to be assigned')
    } else {
      this.setState({renderTip: true})
    }
  }

  handleDisplay = () => {
    this.setState({renderTip: false})
  }


  renderPayers = (item) => {
    if (item.payers.length === 0 ) {
      return <div className="unassigned row-bill-payers row-unassigned">Unassigned</div>
    } else {
      let payers = _.uniqBy(item.payers, 'id')
      return (<div className="row-bill-payers row-payers">
          {
            payers.map(payer => {
             return <div className="payer-name" key={payer.id}>{payer.name} -- </div>
           })
         } got this
      </div>)
    }
  }

  onOpenPayerModal = (item) => {
   this.setState({ openPayerModal: true, item: item });
  }

  onClosePayerModal = () => {
   this.setState({ openPayerModal: false });
  }

  onOpenTipModal = () => {
    let payer = document.querySelector('.unassigned')
    if (payer) {
      alert('All items need to be assigned')
    } else {
      // this.setState({renderTip: true})
      this.setState({ openTipModal: true });
    }
  }

  onCloseTipModal = () => {
   this.setState({ openTipModal: false });
  }

  modalPayer = () => {
    return (
      <Modal open={this.state.openPayerModal} onClose={this.onClosePayerModal} item={this.state.item} center>
        <PayerFormContainer onClose={this.onClosePayerModal} item={this.state.item} billPayers={this.props.wholeBill.payers} payers={this.props.payers} />
      </Modal>
    )
  }

  modalTip = () => {
    return (
      <Modal open={this.state.openTipModal} onClose={this.onCloseTipModal} center>
        <Tip />
      </Modal>
    )
  }

  render() {
    if (!this.props.wholeBill) {
      return <div>Loading...</div>
    }
    const renderItems = this.props.wholeBill.items.map(item => {
      return (
        <div key={item.id} onClick={() => this.onOpenPayerModal(item)} className="bill-payer-box">
          <div className="row-items row-item-payer">
            <div className="item-title">
              {item.title}
            </div>
            <div className="item-price">
              <span>$</span>
              <p className="price-number">{parseFloat(item.price).toFixed(2)}</p>
            </div>
          </div>
        {this.renderPayers(item)}
        <hr/>
      </div>
      )
    })
    return (
      <div className="home-page">
        {this.modalPayer()}
        <p className="click-payer">****Click each item to assign payers***</p>
          {renderItems}

        <button className="btn submit" onClick={this.onOpenTipModal}>Next</button>
        {this.modalTip()}

        <div onClick={this.handleBack} id="back">
          <span>&#10229;</span>
          Go Back
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("inside assignPayers state", state.text.wholeBill)
  return {
    items: state.text.items,
    selectedPayers: state.payer.selectedPayers,
    wholeBill: state.text.wholeBill,
    payers: state.payer.payers
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill})(BillPayerContainer))
