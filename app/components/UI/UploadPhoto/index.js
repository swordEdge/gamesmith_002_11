/*
 * UploadPhoto component
 */

import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import s from './styles.css';

class UploadPhoto extends Component {
  state = {
    files: [],
  }

  render() {
    const { files } = this.state;
    const { imgUrl, image } = this.props;

    return (
      <div className={s.root}>
        <Dropzone
          ref={(c) => { this.dropzone = c; }}
          className={s.avatar}
          multiple={false}
          accept="image/*"
          onDrop={(newFiles) => {
            this.setState({ files: newFiles });
            image.onChange(newFiles[0]);
          }}>
          {(image.value || files.length > 0 || imgUrl) && <img src={image.value ? image.value.preview : (files.length > 0 ? files[0].preview : imgUrl)} alt="" />}
        </Dropzone>
        <button onClick={() => this.dropzone.open()} type="button">Upload Photo</button>
      </div>
    );
  }
}

UploadPhoto.propTypes = {
  imgUrl: PropTypes.string,
  image: PropTypes.object,
};

export default UploadPhoto;
