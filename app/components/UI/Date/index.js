/*
 * Date input component
 */

import React, { PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import s from './styles.css';

const Date = ({ open, label, type = 'text', value, touched, error, onBlur, onChange, onFocus,
  showPresent, noFuture, noPast, className }) => (
  <div className={`${s.root} ${value ? s.filled : ''} ${className || ''}`}>
    {label && <label className={touched && error ? 'error' : ''}>{label}</label>}
    <DatePicker
      className={(open || touched) && s.touched} value={value} type={type}
      selected={value ? value === 'Present' ? moment() : moment(value) : null}
      dateFormat={showPresent && moment(value, 'MMMM YYYY').isSame(moment(), 'd') ? '[Present]' : 'MMMM YYYY'} minDate={noPast && moment()} maxDate={noFuture && moment()} onFocus={onFocus}
      todayButton={showPresent && 'Present'} showYearDropdown onChange={onChange} />
    <span className={`${s.line} ${touched && error ? 'error' : ''}`}></span>
    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

Date.propTypes = {
  open: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  touched: PropTypes.bool,
  showPresent: PropTypes.bool,
  noFuture: PropTypes.bool,
  noPast: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
};

export default Date;
