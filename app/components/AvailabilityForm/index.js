/*
 * Availability form component
 */

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Button from 'components/UI/Button';
import Select from 'components/UI/Select';
import Input from 'components/UI/Input';

import availabilities from 'data/availabilities';
import CustomDate from 'components/UI/CustomDate';

import validate from './validation';

import s from './styles.css';

export const fields = [ 'availability', 'availableAt', 'location'];

let AvailabilityForm = ({ fields: { availability,availableAt, location }, handleSubmit }) => (
  <form className={s.root} onSubmit={handleSubmit}>
    <p>Because when great projects come around, Studios use Gamesmith to contact talent</p>
    <Select options={availabilities} label="Future Availability Date" {...availability} />
    { availability.value == "Open at Future Date" &&
    <div className="col-sm-12">
      <div className={s.date}>
        <CustomDate label="Available At" showPresent noPast open {...availableAt} />
      </div>
    </div>
    }
    <Input label="Location" {...location} />
    <Button type="submit" text="Join" />
  </form>
);

AvailabilityForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AvailabilityForm = reduxForm({
  form: 'availability',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS(),
})(AvailabilityForm);
