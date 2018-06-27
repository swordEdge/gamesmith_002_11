/*
 * Auth form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';

import validate from './validation';
import s from './styles.css';

export const fields = ['firstName', 'lastName', 'email', 'currCompany', 'password' ,'currRole', 'currGame'];

let SignUpForm = ({ fields: { firstName, lastName, email, password, currCompany, currGame, currRole }, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Input label="First Name" className={s.first} {...firstName} />
    <Input label="Last Name" className={s.last} {...lastName} />
    <Input label="Email" {...email} />
    <Input label="Password" type="password" {...password} />
    <Input label="Game Title You Have Worked On" {...currGame} />
    <Input label="Your Current Job Title" {...currRole} />
    <Input label="Current Company" {...currCompany} />
    <Button type="submit" text="Apply" />
  </form>
);

SignUpForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SignUpForm = reduxForm({
  form: 'signup',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(SignUpForm);
