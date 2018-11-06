import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchBill} from '../actions/billAction'

class BillPayerContainer extends Component {

  componentDidMount() {
    this.props.fetchBill(this.props.match.params.id)
  }

  selectPayers = (id) => {
    this.props.history.push(`/items/${id}/payers`)
  }

  render() {
    if (this.props.items.length < 0) {
      return <div>Loading...</div>
    }
    let sortedItems = this.props.items.sort((a,b) => a.id - b.id)
    const renderItems = sortedItems.map(item => {
      return (
        <div key={item.id} onClick={() => this.selectPayers(item.id)}>
        {item.title} - ${parseFloat(item.price).toFixed(2)}
        <p>Unassigned</p>
        <hr/>
      </div>
      )
    })
    return (
      <div>
        <p>Click each item to assign payers</p>
        {renderItems}
        <button onClick={this.props.history.goBack}>Back</button>
        <button>Next</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {fetchBill})(BillPayerContainer))
