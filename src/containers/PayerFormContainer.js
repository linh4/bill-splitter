import React, { Component } from 'react';
import PayerForm from '../components/PayerForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPayer } from '../actions/payerAction'
import CheckBoxForm from '../components/CheckBoxForm';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class PayerFormContainer extends Component {

  state = {
    isChecked: false,
    arr: []
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

  render() {
    // console.log(this.state)
    const payers = this.props.payers;
    console.log(payers)
    const payerList = payers.map((payer, i) =>
      <div key={i}>
        <label>
          <input type="checkbox" value={payer.name} onChange={this.onAddingItem} />
        </label>
        {payer.name}
      </div>
    )
    return (
      <div>{payerList}</div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("inside PayerFormContainer", state.payer)
  return {
    payers: state.payer.payers
    };
};

export default withRouter(connect(mapStateToProps, {fetchPayer})(PayerFormContainer))
