import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createItems, getBill} from '../../actions/billAction'
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../../actions/userAction'
import {postItems} from '../../actions/itemAction'
import '../../style/Form.css'
import '../../style/Item.css'


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

  handleSave = () => {
    let billId = this.props.bill.id
    let arr = this.props.items
    this.props.postItems(billId, arr)
    .then(() => this.props.history.push(`/bills/${billId}`))
  }

  handleCreate = () => {
    let id = this.props.match.params.id
    this.props.history.push(`/bills/${id}/items`)
  }

   render() {
       return (
         <div className="home-page">
            <div className="image-box">
              <FileInputComponent
               labelText={<label className="label-upload">Click 'Attach' to select image file</label>}
               multiple={true}
               imagePreview={true}
               callbackFunction={(img)=>this.handleChange(img)}
               accept="image/*"
               buttonComponent={<button className="btn signup upload-btn" type="button">Attach</button>}
               />
            </div>

            {
              this.state.img && this.props.items.length > 0 && (<div className="render-box">
                  {this.props.items ?
                    this.props.items.map((item, idx) =>
                      <div key={idx} className="row">
                        <div className="item-title">
                          {item.title}
                        </div>
                        <div className="item-price">
                          ${parseFloat(item.price).toFixed(2)}
                        </div>
                      </div>
                      )
                      :
                      <div>Loading...</div>}
                <div>
                  <p className="note">***Click Attach again to upload more images***</p>
                  <button className="btn submit upload-btn" onClick={this.handleSave}>Save</button>
                </div>
              </div>)
            }
            <div onClick={this.props.history.goBack} id="back">
              <span>&#10229;</span>
              Go Back
            </div>
         </div>
       );
   }
}

const mapStateToProps = (state) => {
  console.log("in image upload", state)
  return {
    currentUserI: state.user.currentUser,
    bill: state.text.bill,
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {createItems, currentUser, getBill, postItems})(ImageUpload))
