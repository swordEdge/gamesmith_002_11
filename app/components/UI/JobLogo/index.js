/*
 * UploadPhoto component
 */

import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';

import s from './styles.css';

class JobLogo extends Component {
  state = {
    files: [],
  }

  render() {
    const { files } = this.state;
    const { imgUrl} = this.props;
    return (
      <div className={s.root} >
        <div className='col-sm-12'>
          <Dropzone
            ref={(c) => { this.dropzone = c; }}
            className={s.avatar}
            multiple={false}
            accept="image/*"
            onDrop={(newFiles) => {
              this.setState({ files: newFiles });
              imgUrl.onChange(newFiles[0]);
            }}>
            {(imgUrl.value) && <img src={imgUrl.value.preview ? imgUrl.value.preview : imgUrl.value } alt="logo" />}
          </Dropzone>
        </div>
        <div className="col-sm-12">
          <button onClick={() => this.dropzone.open()} type="button">Upload Logo</button>
        </div>
      </div>
    );
  }
}

JobLogo.propTypes = {
  imgUrl: PropTypes.object,
};

export default JobLogo;
