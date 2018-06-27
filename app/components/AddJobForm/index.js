/*
 * AddJobForm component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';
import CustomDate from 'components/UI/CustomDate';
import Date from 'components/UI/Date';
import JobLogo from 'components/UI/JobLogo';

import validate from './validation';

import s from './styles.css';

export const fields = [
  'imgUrl',
  'role',
  'company',
  'startDate',
  'location',
  'description',
];

let AddJobForm = ({ fields: { role, company, startDate, location, description, imgUrl }, handleSubmit, isEditingJob, showImageUpload  }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input label="Job Title" open {...role} />
    <Input label="Company" open {...company} />
    <CustomDate label="From" open {...startDate} />
    <Input label="Location" open {...location} />
    <Input type="textarea" label="Description" open {...description} />
    <div className="row">
      {showImageUpload &&
        <JobLogo imgUrl={imgUrl}/>
      }
    </div>
    <Button type="submit" text={isEditingJob ? 'Update Job' : 'Post'} />
  </form>
);

AddJobForm.propTypes = {
  prop: PropTypes.string,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
  isEditingJob: PropTypes.bool,
  imgUrl: PropTypes.object,
};

export default AddJobForm = reduxForm({
  form: 'addJob',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AddJobForm);
