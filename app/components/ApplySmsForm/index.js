/*
 * Apply Sms form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Phone from 'components/UI/Phone';

import s from './styles.css';

export const fields = [
  'phone',
];

let ApplySmsForm = ({ fields: { phone }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p>We want to provide a number for the studio to contact you.  We will send you a confirmation code via SMS to confirm you are real.</p>
    <Phone label="Phone" {...phone} />
    <Button
      type="submit"
      text="Continue" />
  </form>
);

ApplySmsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ApplySmsForm = reduxForm({
  form: 'sms',
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(ApplySmsForm);
