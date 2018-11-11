import React, { Component } from 'react';
import Tip from '../billContainers/Tip'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill} from '../../actions/billAction'
import _ from 'lodash'

class BillPayerContainer extends Component {

  state = {
    renderTip: false
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

  renderPayers = (item) => {
    if (item.payers.length === 0 ) {
      return <p>Unassigned</p>
    } else {
      let payers = _.uniqBy(item.payers, 'id')
      return payers.map(payer => {
        return <p key={payer.id}>{payer.name}</p>
      })
    }
  }

  handleNext = () => {
    this.setState({renderTip: true})
  }

  handleDisplay = () => {
    this.setState({renderTip: false})
  }

  render() {
    if (!this.props.wholeBill) {
      return <div>Loading...</div>
    }
    const renderItems = this.props.wholeBill.items.map(item => {
      return (
        <div key={item.id} onClick={() => this.selectPayers(item.id)}>
        {item.title} - ${parseFloat(item.price).toFixed(2)}
        {this.renderPayers(item)}
        <hr/>
      </div>
      )
    })
    return (
      <div>
        <p>Click each item to assign payers</p>
        {renderItems}
        <button onClick={this.handleBack}>Back</button>
        <button onClick={this.handleNext}>Next</button>

        {this.state.renderTip ? <Tip handleDisplay={this.handleDisplay} /> : null}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside assignPayers state", state.text.wholeBill)
  return {
    items: state.text.items,
    selectedPayers: state.payer.selectedPayers,
    wholeBill: state.text.wholeBill
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill})(BillPayerContainer))
