/*
 * Message form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';

import s from './styles.css';

export const fields = ['subject', 'message'];

let MessageForm = ({ fields: { subject, message }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <Input label="Subject" open {...subject} />
    <Input label="Message" type="textarea" {...message} />
    <Button type="submit" text="Send" />
  </form>
);

MessageForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default MessageForm = reduxForm({
  form: 'messaging',
  fields,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(MessageForm);
