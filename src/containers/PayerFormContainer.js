import React, { Component } from 'react';
import PayerForm from '../components/PayerForm'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { fetchPayer, deletePayer } from '../actions/payerAction'
import CheckBoxForm from '../components/CheckBoxForm';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class PayerFormContainer extends Component {

  state = {
    isChecked: false,
    arr: [],
    renderForm: false
  }

  componentDidMount() {
    this.props.fetchPayer()
  }

  onAddingItem = (item) => {
    const isChecked = item.target.checked;
    const value =  item.target.value;
    console.log(value)
    this.setState({isChecked: !this.state.isChecked});
    if (isChecked) {
      console.log('checked!')
      console.log(this.state.arr)
      return this.state.arr.push(value)
    } else {
      console.log('not checked')
    }
    // if (isChecked)
      // this.setState(prevState => ({payers: [...prevState.payers, value] }));
    // else {
      // const newPayers = this.state.payers.filter(payer => payer !== value)
      // this.setState({ addedPayers: newAddedPayers });
    // }
  }

  handleAddPayer = (e) => {
    // debugger
    e.target.style.display = 'none'
    this.setState({renderForm: true})
  }

  handleDeletePayer = (id) => {
    this.props.deletePayer(id)
  }

  render() {
    // console.log(this.state)
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
      const payerList = payers.map((payer, i) =>
        <div key={i}>
          <label>
            <input type="checkbox" value={payer.name || ''} onChange={this.onAddingItem} />
          </label>
          {payer.name}
          <button onClick={() => this.handleDeletePayer(payer.id)}>X</button>
        </div>
      )
      return (
        <div>
          {payerList}
          <PayerForm />
          <button onClick={this.props.history.goBack}>Done</button>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log("inside PayerFormContainer", state.payer)
  return {
    payers: state.payer.payers
    };
};

export default withRouter(connect(mapStateToProps, {fetchPayer, deletePayer})(PayerFormContainer))
