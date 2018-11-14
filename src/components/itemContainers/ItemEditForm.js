import React from "react";
import { connect } from 'react-redux'
import { getItem, editItem } from '../../actions/itemAction'

class ItemEditForm extends React.Component {

  state = {
    id: 0,
    title: '',
    price: 0
  }

  componentDidMount() {
    this.props.getItem(this.props.match.params.id)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidUpdate (prevState, prevProps) {
    if (prevProps.id !== this.props.selectedItem.id) {
      let item = this.props.selectedItem
      this.setState({
        id: item.id,
        title: item.title,
        price: parseFloat(item.price).toFixed(2)
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let billId = this.props.selectedItem.bill.id
    this.props.editItem(this.state)
    .then(() => this.props.history.push(`/bills/${billId}/items`))
  }

  handleFocus = (e) => {
    e.persist()
    setTimeout(function() {
      e.target.parentElement.lastElementChild.style.opacity = '0'
    }, 100)
  }

  handleBlur = (e) => {
    e.persist()
    setTimeout(function() {
      e.target.parentElement.lastElementChild.style.opacity = '1'
    }, 300)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="add-form" onFocus={this.handleFocus} onBlur={this.handleBlur} >
          <div className="input add-title">
            <input name="title" value={this.state.title} onChange={this.handleChange} />
            <span><i class="fas fa-tag"></i></span>
          </div>

          <div className="input add-price">
            <input name="price" value={this.state.price} onChange={this.handleChange}/>
            <span><i class="fas fa-dollar-sign"></i></span>
          </div>

          <div className="add-btn">
            <input type="submit" value="EDIT"/>
          </div>
        </form>
        {/* <button onClick={this.props.history.goBack}>Back</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedItem: state.text.selectedItem
  }
}

export default connect(mapStateToProps, {getItem, editItem})(ItemEditForm)
