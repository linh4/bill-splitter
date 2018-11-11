import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createItems, getBill} from '../../actions/billAction'
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter } from 'react-router-dom'
import { currentUser } from '../../actions/userAction'
import {postItems, clearItems} from '../../actions/billAction'

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
     // window.onbeforeunload = function() { return "Are you sure you want to leave?"; }
       return (
         <div>
           <br/>
           <button onClick={this.handleCreate}>Create Items Manually</button>

           <FileInputComponent
            labelText="Select file"
            labelStyle={{fontSize:14}}
            multiple={true}
            imagePreview={true}
            callbackFunction={(img)=>this.handleChange(img)}
            accept="image/*"
            buttonComponent={<button type="button">Attach</button>}
            />

            {
              this.state.img && this.props.items.length > 0 && (<div>
                  {this.props.items ?
                    this.props.items.map((item, idx) =>
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
    items: state.text.items
    };
};

export default withRouter(connect(mapStateToProps, {createItems, currentUser, getBill, postItems, clearItems})(ImageUpload))
