/*
 * Confirm code form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';

import s from './styles.css';

export const fields = [
  'code',
];

let ConfirmCodeForm = ({ fields: { code }, handleSubmit, onResend }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input type="number" label="Verification code" open {...code} />
    <Button type="submit" text="Confirm" />
    <p onClick={onResend}>Re-send code</p>
  </form>
);

ConfirmCodeForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};

export default ConfirmCodeForm = reduxForm({
  form: 'confirmcode',
  fields,
  // validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(ConfirmCodeForm);
