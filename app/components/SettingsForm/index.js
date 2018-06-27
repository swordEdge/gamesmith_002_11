/*
 * Settings form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Checkbox from 'components/UI/Checkbox';
import Button from 'components/UI/Button';
import Input from 'components/UI/Input';
import UploadPhoto from 'components/UI/UploadPhoto';

import validate from './validation';

export const fields = ['image', 'oldPassword', 'newPassword', 'confirmPassword', 'memberConnections', 'memberMessaging', 'surveys', 'jobEnquiries'];

let SettingsForm = ({ fields: { image, oldPassword, newPassword, confirmPassword, memberConnections, memberMessaging, surveys, jobEnquiries }, handleSubmit, submitting, error, imgUrl, showImageUpload }) => (
  <form onSubmit={handleSubmit}>
    <div className="step container-fluid">
      <div className="row">
        {showImageUpload &&
          <div className="col-sm-4">
            <UploadPhoto imgUrl={imgUrl} image={image}/>   
          </div>
        }  
        <div className={showImageUpload ? "col-sm-8" : "col-sm-12"}>
          <h2>1. Change Password</h2>
          <Input className="input" open label="Current Password" type="password" {...oldPassword} />
          <Input className="input" open label="New Password" type="password" {...newPassword} />
          <Input className="input" open label="Repeat New Password" type="password" {...confirmPassword} />
        </div>
      </div>
    </div>
    <div className="step container-fluid">
      <h2>2. Communication Preferences</h2>
      <div className="row">
        <div className="col-sm-offset-2 col-sm-5 col-md-offset-3 col-md-4">
          <Checkbox className="checkbox" {...memberConnections}>Member Connections</Checkbox>
          <Checkbox className="checkbox" {...memberMessaging}>Member Messaging</Checkbox>
        </div>
        <div className="col-sm-5 col-md-4">
          <Checkbox className="checkbox" {...surveys}>Surveys</Checkbox>
          <Checkbox className="checkbox" {...jobEnquiries}>Job Enquires</Checkbox>
        </div>
      </div>
    </div>
    {error && <div className="error">{error}</div>}
    <Button disabled={submitting} type="submit" text="Update" />
    <p className="footnote">Send an e-mail to <a href="mailto:delete@gamesmith.com">delete@gamesmith.com</a> if you'd like to have your profile removed.</p>
  </form>
);

SettingsForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  imgUrl: PropTypes.string,
};

export default SettingsForm = reduxForm({
  form: 'settings',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SettingsForm);
