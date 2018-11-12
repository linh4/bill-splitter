import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAllBills, deleteBill} from '../../actions/billAction'

class BillPage extends Component {


  componentDidMount() {
    this.props.getAllBills()
  }

  renderPayers = (bill) => [].concat(...bill.payers)

  handleClick = (bill) => {
    if (this.renderPayers(bill).length === 0) {
      this.props.history.push(`/bills/${bill.id}`)
    } else {
      this.props.history.push(`/bills/${bill.id}/payers`)
    }
  }

  handleDelete = (id) => {
    this.props.deleteBill(id)
  }

  render() {
    if (!this.props.allBill) {
      return <div>No bill yet....</div>
    }
    const filterBills = this.props.allBill.filter(bill => bill.user_id === this.props.currentUser.id)
    const billList = filterBills.sort((a,b) => b.id - a.id)
    return (
      <div>
        {billList.map(bill => (<div key={bill.id}>
          {this.renderPayers(bill).length === 0 ? (<div>
            <p onClick={() => this.handleClick(bill)}> - {bill.date} Uncompleted</p>
            <button onClick={() => this.handleDelete(bill.id)}>Delete</button>
          </div>)
          : (<div>
            <p onClick={() => this.handleClick(bill)}> - {bill.date}</p>
            <button onClick={() => this.handleDelete(bill.id)}>Delete</button>
            </div>)
          }
          <hr/>
        </div>))
        }
      </div>
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

export default withRouter(connect(mapStateToProps, {getAllBills, deleteBill})(BillPage))
