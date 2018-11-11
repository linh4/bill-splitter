import React, { Component } from 'react';
import ItemCreateFormContainer from './ItemCreateFormContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postItems } from '../../actions/billAction'
import { itemArr } from '../../actions/billAction'

class ItemContainer extends Component {

  state = {
    renderForm: false
  }

  handleAdd = () => {
    document.getElementById('add').style.display = 'none'
    this.setState({renderForm: true})
  }

  handleSave = () => {
    let billId = this.props.match.params.id
    let arr = this.props.items
    this.props.postItems(billId, arr)
  }

  render() {
    if (this.props.items.length === 0) {
      return (<div>
        <button onClick={this.handleAdd} id="add">Add Item</button>
        {this.state.renderForm ? (<div>
          <ItemCreateFormContainer />
        </div>)
          : null
        }
        <br/>
        <button onClick={this.props.history.goBack} id="back">Back</button>
      </div>)
    }
    return (
      <div>
          {this.props.items.map((item, idx) => <div key={idx}>{item.title} - ${parseFloat(item.price).toFixed(2)}</div>)}
          <ItemCreateFormContainer />
          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.props.history.goBack} id="back">Back</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside create form", state)
  return {
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {postItems, itemArr})(ItemContainer))
