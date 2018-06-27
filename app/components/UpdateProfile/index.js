/*
 * Update Profile component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';
import CustomInput from 'components/UI/CustomInput';
import Phone from 'components/UI/Phone';
import UploadPhoto from 'components/UI/UploadPhoto';
import Select from 'components/UI/Select';
import AutoComplete from 'components/UI/AutoComplete';
import statuses from 'data/statuses';
import CustomDate from 'components/UI/CustomDate';
import availabilities from 'data/availabilities';
import validate from './validation';
import s from './styles.css';


export const fields = ['image', 'firstName', 'lastName', 'email', 'phoneNumber', 'bio', 'availability','currRole', 'currCompany', 'location', 'skills', 'accomplishments','availableAt','isLinkedInUser'];


let UpdateProfile = ({ maker: { imgUrl = '' }, fields: { image, firstName, lastName, email, phoneNumber, bio, status, availability, currRole, currCompany, location, skills, accomplishments, availableAt,isLinkedInUser }, handleSubmit, submitting, error, onGetSuggestions,onEmail }) =>(
  <form onSubmit={handleSubmit}>
    <div className="step">
      <h2>1. Basic Info</h2>
      <div className="row">
        <div className="col-sm-4">
          <UploadPhoto imgUrl={imgUrl} image={image} />
        </div>
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-6">
              <Input className="input" open label="First Name" type="text" {...firstName} />
            </div>
            <div className="col-sm-6">
              <Input className="input" open label="Last Name" type="text" {...lastName} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              {isLinkedInUser.value == true ?
                <Input className="input" open label="Email" type="text" {...email} disabled/>
                :
                <CustomInput className="input" open label="Email" type="text" {...email} disabled action={onEmail}/>
              }
            </div>
            <div className="col-sm-6">
              <Phone className="input" open label="Phone" {...phoneNumber} />
            </div>
          </div>
          <Input className="input textarea" open label="About" type="textarea" {...bio} />
        </div>
      </div>
    </div>
    <div className="step">
      <h2>2. Can studios contact you about work</h2>
      <div className="row">
        <div className="col-sm-6">
          <Select
            className="input" options={availabilities} label="Future Availability Date"
            {...availability} />
        </div>
        { availability.value == "Open at Future Date" &&
        <div className="col-sm-6">
          <div className={s.date}>
            <CustomDate label="Available At" showPresent noPast open {...availableAt} />
          </div>
        </div>
        }
      </div>
    </div>
    <div className="step">
      <h2>3. Profile Builder</h2>
      <div className="row">
        <div className="col-sm-6">
          <AutoComplete
            {...currRole}
            label="Job Title"
            loadOptions={(query, cb) => { onGetSuggestions({ url: 'roles', query, cb }); }} />
          {/*<AutoComplete*/}
            {/*{...currGame}*/}
            {/*label="Most Recent Game"*/}
            {/*loadOptions={(query, cb) => { onGetSuggestions({ url: 'games', query, cb }); }} />*/}
          <AutoComplete
            {...currCompany}
            label="Company"
            loadOptions={(query, cb) => { onGetSuggestions({ url: 'companies', query, cb }); }} />
        </div>
        <div className="col-sm-6">
          <Input className="input" open label="Skills" type="text" {...skills} />
          <Input
            className="input textarea" open label="Accomplishments" type="textarea"
            {...accomplishments} />
        </div>
      </div>
    </div>
    <div className="step">
      <h2>4. Current Location</h2>
      <Input className="input" open label="Location" type="text" {...location} />
    </div>
    {error && <div className="error">{error}</div>}
    <Button disabled={submitting} type="submit" text="Save" />
  </form>
);

UpdateProfile.propTypes = {
  error: PropTypes.string,
  maker: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

export default UpdateProfile = reduxForm({
  form: 'profile',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(UpdateProfile);
