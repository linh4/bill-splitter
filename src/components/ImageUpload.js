import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createItems, getBill} from '../actions/billAction'
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../actions/userAction'
import {fetchBill, postItems} from '../actions/billAction'

class ImageUpload extends Component {

  state = {
    img: null,
    display: 'block'
  }

  handleChange = (img) => {
    this.setState({img: img})
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      this.props.currentUser(token)
      return this.props.getBill(this.props.match.params.id)
    } else {
      alert('Please Log In')
    }
  }

  handleUpload = () => {
    if (this.state.img) {
      let billId = this.props.bill.id
      this.props.createItems(billId, this.state.img[0].base64)
      .then(() => this.props.fetchBill(billId))
      .then(() => this.props.history.push(`/bills/${billId}`))
      // this.props.history.push(`/bills/${billId}`)
    }
  }

  handleDisplay = () => {
    this.setState({display: 'none'})
  }

   render() {
       return (
         <div>
           <FileInputComponent
            labelText="Select file"
            labelStyle={{fontSize:14}}
            multiple={true}
            imagePreview={true}
            callbackFunction={(img)=>this.handleChange(img)}
            accept="image/*"
            buttonComponent={<button type="button" style={{display: this.state.display}} onClick={this.handleDisplay} >Attach</button>}
            />
            {
              this.state.img && <button onClick={this.handleUpload}>Submit</button>
            }

         </div>


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
