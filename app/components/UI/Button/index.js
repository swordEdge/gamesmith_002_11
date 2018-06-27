/*
 * Button component
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import s from './styles.css';

const Button = ({ text, color = 'yellow', to, disabled, newTab, className, ...rest }) => (
  to ? to.charAt(0) === '/'
    ? <Link
      to={to} title={text} disabled={disabled} target={newTab ? '_blank' : ''}
      className={`btn ${s.root} ${color} ${className || ''}`} {...rest}>{text}</Link>
    : <a
      href={to} title={text} disabled={disabled} target={newTab ? '_blank' : ''}
      className={`btn ${s.root} ${color} ${className || ''}`} {...rest}>{text}</a>
    : <button
      title={text} disabled={disabled} className={`btn ${s.root} ${color} ${className || ''}`}
      {...rest}>{text}</button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['yellow', 'blue', 'transparent']),
  to: PropTypes.string,
  disabled: PropTypes.bool,
  newTab: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
