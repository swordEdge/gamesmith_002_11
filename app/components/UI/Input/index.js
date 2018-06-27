/*
 * Input component
 */

import React, { PropTypes } from 'react';

import s from './styles.css';

const Input = ({ open, disabled, label, type = 'text', value, touched, error, onBlur, onChange, onFocus,
  className, name }) => (
  <div className={`${s.root} ${value ? s.filled : ''} ${disabled ? s.disabled : ''} ${className || ''}`}>
    {type === 'textarea' ?
      <textarea value={value} onBlur={onBlur} onChange={onChange} onFocus={onFocus} name={name} /> :
      <input
        className={(open || touched) ? s.touched : ''} value={value} type={type} onBlur={onBlur}
        onChange={onChange} onFocus={onFocus} disabled={disabled} name={name} />}
    {label && <label className={touched && error ? 'error' : ''}>{label}</label>}
    <span className={`${s.line} ${touched && error ? 'error' : ''}`}></span>
    {touched && error && <span className={s.error}>{error}</span>}
  </div>
);

Input.propTypes = {
  open: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default Input;
