/*
 * Employer form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';
import Phone from 'components/UI/Phone';

import validate from './validation';

import s from './styles.css';

export const fields = ['company', 'first_name', 'last_name', 'email', 'phone'];

let EmployerForm = ({ fields: { company, first_name, last_name, email, phone }, handleSubmit }) => {
  return (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input label="First Name" className={s.first} {...first_name} />
    <Input label="Last Name" className={s.last} {...last_name} />
    <Input label="Email" type="email" {...email} />
    <Phone label="Phone" {...phone} />
    <Input label="Company" {...company} />
    <Button type="submit" className={s.btn} text="Apply as Employer" />
  </form>
)};

EmployerForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EmployerForm = reduxForm({
  form: 'employerForm',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(EmployerForm);
