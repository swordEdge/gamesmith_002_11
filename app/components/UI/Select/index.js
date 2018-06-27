/*
 * Select component
 */

import React, { PropTypes } from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

import s from './styles.css';

const Select = ({ options, label, value = '', touched, error, onBlur, onChange, className }) => (
  <div className={`${s.root} ${value ? s.filled : ''} ${className || ''}`}>
    {label && <label className={touched && error ? 'error' : ''}>{label}</label>}
    <ReactSelect options={options} value={value} onChange={v => onChange(v)} onBlur={() => onBlur()} />
    <span className={`${s.line} ${touched && error ? 'error' : ''}`}></span>
    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

Select.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Select;
