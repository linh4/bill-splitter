import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createItems, postItems} from '../actions/billAction'
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../actions/userAction'

class ImageUpload extends Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      return this.props.currentUser(token)
    }
  }

  handleUpload = (img) => {
    let billId = this.props.bills.slice(-1)[0].id
    this.props.createItems(billId,img[0].base64)
    .then(() => this.props.history.push('/bills'))
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
  console.log("inside state of imageupload", state)
  return {
    currentUserI: state.user.currentUser,
    bills: state.text.bills,
    fetchItems: state.text.fetchItems
    };
};

export default withRouter(connect(mapStateToProps, {createItems, currentUser, postItems})(ImageUpload))
