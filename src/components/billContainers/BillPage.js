import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAllBills, deleteBill} from '../../actions/billAction'
import { clearPayers } from '../../actions/payerAction'
import Modal from 'react-responsive-modal';

class BillPage extends Component {

  state = {
    open: false,
    bill: {}
  }

  componentDidMount() {
    this.props.getAllBills()
  }

  renderPayers = (bill) => [].concat(...bill.payers)

  handleClick = (bill) => {
    if (this.renderPayers(bill).length === 0) {
      this.props.clearPayers()
      this.props.history.push(`/bills/${bill.id}`)
    } else {
      this.props.clearPayers()
      this.props.history.push(`/bills/${bill.id}/payers`)
    }
  }

  handleDelete = (id) => {
    this.props.deleteBill(id)
    this.onCloseModal()
  }

  onOpenModal = (bill) => {
   this.setState({ open: true, bill: bill });
  }

  onCloseModal = () => {
   this.setState({ open: false });
  }

  modalBox = () => {
    return (
      <Modal open={this.state.open} onClose={this.onCloseModal} bill={this.state.bill} center>
        <div className="asking-box">
          <p className="asking-delete">Are you sure about deleting it?</p>
          <button className="btn cancel" onClick={this.onCloseModal}>Cancel</button>
          <button className="btn yes" onClick={() => this.handleDelete(this.state.bill.id)} >Delete</button>
        </div>
      </Modal>
    )
  }

  render() {
    const filterBills = this.props.allBill.filter(bill => bill.user_id === this.props.currentUser.id)
    const billList = filterBills.sort((a,b) => b.id - a.id)
    if (this.props.allBill.length === 0) {
      return <div>You have no bill yet....</div>
    }
    else if (billList.length === 0) {
      return <div>You have no bill yet....</div>
    }
    return (
      <React.Fragment>
        <p className="bill-title">Bill from __</p>
        {billList.map(bill => (<div key={bill.id} className="row">
          {this.renderPayers(bill).length === 0 ? (
            <React.Fragment>
              <div className="bill-box" onClick={() => this.handleClick(bill)}>
                <p> __{bill.date} <span className="uncomplete">Uncompleted</span></p>
              </div>

              <div className="delete-btn" >
                <span onClick={() => this.onOpenModal(bill)}><i className="far fa-trash-alt icons"></i></span>
                {this.modalBox()}
              </div>

            </React.Fragment>
            )
          : (
            <React.Fragment>
              <div className="bill-box" onClick={() => this.handleClick(bill)}>
                <p> __{bill.date}</p>
              </div>
              <div className="delete-btn" >
                <span onClick={() => this.onOpenModal(bill)}><i className="far fa-trash-alt icons"></i></span>
                {this.modalBox()}
              </div>
            </React.Fragment>)
          }
          <hr/>
        </div>))
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside homepage", state)
  return {
    currentUser: state.user.currentUser,
    allBill: state.text.allBill,
    name: state.text.name
    };
};

export default withRouter(connect(mapStateToProps, {getAllBills, deleteBill, clearPayers})(BillPage))
