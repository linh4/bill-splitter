import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createItems, getBill} from '../actions/billAction'
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../actions/userAction'
import {fetchBill, postItems} from '../actions/billAction'

class ImageUpload extends Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.currentUser(token)
      return this.props.getBill(this.props.match.params.id)
    } else {
      alert('Please Log In')
    }
  }

  handleUpload = (img) => {
    let billId = this.props.bill.id
    this.props.createItems(billId, img[0].base64)
    // .then(() => this.props.fetchBill(billId))
    .then(() => this.props.history.push(`/bills/${billId}`))
    // this.props.history.push(`/bills/${billId}`)
  }

   render() {
       return (
         <FileInputComponent
          labelText="Select file"
          labelStyle={{fontSize:14}}
          multiple={true}
          callbackFunction={(img)=>this.handleUpload(img)}
          accept="image/*"
          />
       );
   }
}

const mapStateToProps = (state) => {
  console.log("in image upload", state)
  return {
    currentUserI: state.user.currentUser,
    bill: state.text.bill,
    itemArr: state.text.itemArr
    };
};

export default withRouter(connect(mapStateToProps, {createItems, currentUser, getBill, fetchBill, postItems})(ImageUpload))
