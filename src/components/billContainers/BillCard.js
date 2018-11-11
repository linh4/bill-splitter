import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class BillCard extends Component {

  handlePayer = (itemId) => {
    this.props.history.push(`/items/${itemId}/payers`)
  }

  render() {
    const item = this.props.item
    return (
      <div>
        <div>
          {item.title} - ${parseFloat(item.price).toFixed(2)}
        </div>
      </div>
    )
  }
}

export default withRouter(BillCard)
