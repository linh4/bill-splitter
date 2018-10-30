import React from 'react';
import ImageUploader from 'react-images-upload';

export default class ImageCard extends React.Component {

  state = {
    pictures: []
  }

	onDrop = (pictureFiles, pictureDataURLs) => {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
	}

    render() {
      console.log(this.state.pictures)
        return (
            <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif']}
              maxFileSize={5242880}
            />
        );
    }
}
