import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createItems, getBill} from '../actions/billAction'
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../actions/userAction'
import {fetchBill, postItems} from '../actions/billAction'

class ImageUpload extends Component {

  state = {
    img: null
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

  handleChange = (img) => {
    this.setState({img: img})
    let billId = this.props.bill.id
    return this.props.createItems(billId, this.state.img[0].base64)
  }

  loopArr = (billId) => {
    let arr = this.props.itemArr
    for (let i in arr) {
       this.props.postItems(billId, arr[i])
      }
    return arr
  }

  handleSave = () => {
    let billId = this.props.bill.id
    this.loopArr(billId)
    return this.props.fetchBill(billId)
    .then(() => (this.props.items.length = 0))
    .then(() => this.props.history.push(`/bills/${billId}`))
  }



   render() {
     // window.onbeforeunload = function() { return "Are you sure you want to leave?"; }
       return (
         <div>
           <FileInputComponent
            labelText="Select file"
            labelStyle={{fontSize:14}}
            multiple={true}
            imagePreview={false}
            callbackFunction={(img)=>this.handleChange(img)}
            accept="image/*"
            buttonComponent={<button type="button">Attach</button>}
            />
            {
              this.state.img && this.props.itemArr.length > 0 && (<div>
                  {this.props.itemArr ?
                    this.props.itemArr.map((item, idx) =>
                      <div key={idx}>{item.title} - ${parseFloat(item.price).toFixed(2)}</div>
                      )
                      :
                      <div>Loading...</div>}
                <div>
                  <button onClick={this.handleSave}>Save</button>
                  <p>***Click Attach again to upload another image***</p>
                </div>
              </div>)
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
    itemArr: state.text.itemArr,
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {createItems, currentUser, getBill, fetchBill, postItems})(ImageUpload))
