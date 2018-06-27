/*
 * Details form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';

import validate from './validation';

import s from './styles.css';

export const fields = ['firstName', 'lastName', 'email', 'currRole', 'currCompany'];

let DetailsForm = ({ fields: { firstName, lastName, email, currRole, currCompany }, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Input label="First Name" {...firstName} />
    <Input label="Last Name" {...lastName} />
    <Input label="Email" {...email} disabled />
    <Input label="Job Title" {...currRole} />
    <Input label="Company" {...currCompany} />
    <div className={s.terms}>
      <span>By joining, you agree to the&nbsp;</span>
      <a>Terms & Privacy Policy</a>
    </div>
    <Button type="submit" text="Next" />
  </form>
);

DetailsForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default DetailsForm = reduxForm({
  form: 'details',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(DetailsForm);
