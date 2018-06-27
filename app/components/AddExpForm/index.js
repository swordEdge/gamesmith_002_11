/*
 * Add experience form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Input from 'components/UI/Input';
import Tags from 'components/UI/Tags';
import Date from 'components/UI/Date';
// import MonthDate from 'components/UI/MonthDate';
import AutoComplete from 'components/UI/AutoComplete';

import validate from './validation';

import s from './styles.css';

export const fields = [
  'currRole',
  'currGame',
  'currCompany',
  'platforms[]',
  'platforms[].active',
  'startDate',
  'value',
  'endDate',
  'location',
  'onChange',
];

let AddExpForm = ({ fields: { currRole, currGame, value, onChange, currCompany, platforms, startDate, endDate, location }, handleSubmit, onGetSuggestions }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p>Please fill all fields</p>
    <AutoComplete
      {...currRole}
      label="Job Title"
      loadOptions={(query, cb) => { onGetSuggestions({ url: 'roles', query, cb }); }} />
    <AutoComplete
      {...currGame}
      label="Game"
      loadOptions={(query, cb) => { onGetSuggestions({ url: 'games', query, cb }); }} />
    <AutoComplete
      {...currCompany}
      label="Company"
      loadOptions={(query, cb) => { onGetSuggestions({ url: 'companies', query, cb }); }} />
    <Tags label="Platforms" platforms={platforms} />
    <Date label="From" open noFuture {...startDate} />
    <Date label="Until" showPresent noFuture open {...endDate} />
    <Input label="Location" open {...location} />
    <Button type="submit" text="Add Game" />
  </form>
);

AddExpForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onGetSuggestions: PropTypes.func.isRequired,
};

export default AddExpForm = reduxForm({
  form: 'experience',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AddExpForm);
