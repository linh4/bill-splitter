import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class BillCard extends Component {

  handlePayer = (itemId) => {
    this.props.history.push(`/items/${itemId}/payers`)
  }

  render() {
    const item = this.props.item
    return (
      <div className="row-items">
        <div className="item-title">
          {item.title}
        </div>
        <div className="item-price">
          <span>$</span>
          <p className="price-number">{parseFloat(item.price).toFixed(2)}</p>
        </div>
      </div>
    )
  }
}

export default withRouter(BillCard)
