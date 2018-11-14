import React, { Component } from 'react';
import BillCard from './BillCard'
import Tax from './Tax'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill, clearItems, clearBill} from '../../actions/billAction'
import Modal from 'react-responsive-modal';


class BillContainer extends Component {

  state = {
    renderForm: false,
    openTax: false,
    openAdd: false
  }

  componentDidMount() {
    console.log('wait to fetch')
    // if (this.props.items.length < 1) {
      let billId = this.props.match.params.id
      this.props.fetchBill(billId)
      .catch(() => console.log('error'))
    // }
  }

  total = (props) => {
    let arr = []
    for ( let i in props) {
      arr.push(props[i].price)
    }
    let sum = arr.reduce((a,b) => a + b, 0)
    return sum
  }

  handleEdit = () => {
    let id = this.props.match.params.id
    this.props.clearItems()
    this.props.history.push(`/bills/${id}/items`)
  }

  handleTax = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/bills/${id}/tax`)
  }

  handleNext = () => {
    let id = this.props.match.params.id
    this.props.clearItems()
    this.props.clearBill()
    this.props.history.push(`/bills/${id}/assignPayers`)
  }

  onOpenTaxModal = () => {
   this.setState({ openTax: true });
  }

  onCloseTaxModal = () => {
   this.setState({ openTax: false });
  }

  onOpenAddModal = () => {
   this.setState({ openAdd: true });
  }

  onCloseAddModal = () => {
   this.setState({ openAdd: false });
  }

  handleCreateManual = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/bills/${id}/items`)
  }

  handleAttach = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/bills/${id}/upload`)
  }

  addButton = () => {
    return (
      <Modal open={this.state.openAdd} onClose={this.onCloseAddModal} center>
        <div onClick={this.handleCreateManual} className="create-box">
          <span className="menu-icons"><i className="far fa-edit"></i></span>
          <p className="create-bill">WRITE MANUALLY</p>
        </div>
        <div onClick={this.handleAttach} className="create-box">
          <span className="menu-icons"><i className="far fa-image"></i></span>
          <p className="create-bill">ATTACH FILE</p>
        </div>
      </Modal>
    )
  }

  render() {
    if (this.props.wholeBill === null) {
      return <div>Loading</div>
    }
    else if (this.props.wholeBill.items.length === 0) {
      return (<div className="home-page">
        <p>No item yet...</p>

        <span className="plus-icon" onClick={this.onOpenAddModal}><i className="fas fa-plus-circle fa-spin-hover"></i></span>
        {this.addButton()}

        <div onClick={this.props.history.goBack} id="back">
          <span>&#10229;</span>
          Go Back
        </div>
      </div>)
    }
    else {
      let total = this.total(this.props.wholeBill.items)
      let finalTotal = total + (total * this.props.tax / 100)
      let sortedItems = this.props.wholeBill.items.sort((a,b) => a.id - b.id)
      return (
        <div className="home-page">
          {sortedItems.map((item, idx) => <BillCard key={idx} item={item} />)}
          <div className="row-items tax-box">
            <div className="empty-div tax-div">
              <button className="tax-btn" onClick={this.onOpenTaxModal}>+ ADD TAX</button>
              <Modal open={this.state.openTax} onClose={this.onCloseTaxModal} center>
                <Tax taxFromBill={this.props.tax} onClose={this.onCloseTaxModal} />
              </Modal>
            </div>
            <div className="item-total">
              TAX
            </div>
            <div className="item-total-price">
              <span>$</span>
              <p className="price-number tax">{parseFloat(this.props.tax).toFixed(2)}</p>
            </div>
          </div>
          <div className="row-items total-box">
            <div className="empty-div"></div>
            <div className="item-total">
              TOTAL
            </div>
            <div className="item-total-price">
              <span>$</span>
              <p className="price-number total">{parseFloat(finalTotal).toFixed(2)}</p>
            </div>
          </div>

          <div className="btn-box">
            <button className="btn signup modify" onClick={this.handleEdit}>Modify</button>
            <button className="btn submit next" onClick={this.handleNext}>Next</button>
          </div>
        </div>
        )
      }
    }
  }

const mapStateToProps = (state) => {
  console.log("inside bill container", state)
  return {
    // items: state.text.items,
    bill: state.text.bill,
    wholeBill: state.text.wholeBill,
    tax: state.text.tax
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill, clearItems, clearBill})(BillContainer))
