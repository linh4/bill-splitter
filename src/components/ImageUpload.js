import React, { Component } from 'react'
import {connect} from 'react-redux'
import {convertImg} from '../actions/billAction'
// import ImageUploader from 'react-images-upload';
import FileInputComponent from 'react-file-input-previews-base64'
import { withRouter } from 'react-router-dom'

class ImageUpload extends Component {

  state = { pictures: [] };

  onDrop = (picture) => {
    this.setState({
            pictures: [...this.state.pictures, picture],
        });
        console.log(this.state.pictures)
    this.props.convertImg(this.state.pictures)
    this.props.histore.push('/bills')
   }

   render() {
       return (
         <FileInputComponent
          labelText="Select file"
          labelStyle={{fontSize:14}}
          multiple={true}
          callbackFunction={(img)=>this.props.convertImg(img[0].base64)}
          accept="image/*"
          />
       );
   }
}

export default withRouter(connect(null, {convertImg})(ImageUpload))
