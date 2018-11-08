import React, { Component } from 'react';
import PayerForm from '../components/PayerForm'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import CheckBoxForm from '../components/CheckBoxForm';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {getItem} from '../actions/itemAction'
import {clearBill} from '../actions/billAction'
import { fetchPayer, deletePayer, postItemPayer, selectPayers } from '../actions/payerAction'

class PayerFormContainer extends Component {

  state = {
    renderForm: false,
    isChecked: false,
    payerArr: [],
  }

  componentDidMount() {
    console.log("inside payer form fetching")
    let itemId = this.props.match.params.id
    this.props.getItem(itemId)
    this.props.fetchPayer()
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
    e.target.style.display = 'none'
    this.setState({renderForm: true})
  }

  handleDeletePayer = (e, payer) => {
    let text = e.target.parentNode.textContent.slice(0, -1)
    const newPayers = this.state.payerArr.filter(payer => payer !== text)
    this.setState({payerArr: newPayers })
    return this.props.deletePayer(payer.id)
  }

  handleDone = () => {
    let id = this.props.selectedItem.id
    let billId = this.props.selectedItem.bill_id
    this.props.postItemPayer(id, this.state.payerArr)
    .then(() => this.props.clearBill())
    .then(() => this.props.history.push(`/bills/${billId}/assignPayers`))
  }

  render() {
    console.log(this.state.payerArr)
    if (this.props.payers.length < 1 ) {
      return (<div>
        <button onClick={(e) => this.handleAddPayer(e)}>Add Payer</button>
        {this.state.renderForm ?
          <PayerForm />
          : null
        }
      </div>)
    }
    else {
      const payers = this.props.payers;
      const payerList = payers.map((payer, idx) =>
        <div key={idx}>
          <input type="checkbox" id={payer.id} value={payer.name || ''} onChange={this.onAddingItem} />
          {payer.name}
          <button onClick={(e) => this.handleDeletePayer(e, payer)}>X</button>
        </div>
      )
      return (
        <div>
          {payerList}
          <PayerForm />
          ***Names should be different****
          <br/>
          <button onClick={this.handleDone}>Done</button>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log("inside PayerFormContainer", state)
  return {
    bill: state.text.bill,
    items: state.text.items,
    payers: state.payer.payers,
    selectedItem: state.text.selectedItem
    };
};

export default withRouter(connect(mapStateToProps, {fetchPayer, deletePayer, postItemPayer,selectPayers, getItem, clearBill})(PayerFormContainer))
