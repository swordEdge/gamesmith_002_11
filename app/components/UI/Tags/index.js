/*
 * Tags component
 */

import React, { PropTypes } from 'react';
import PureInput from 'components/UI/PureInput';

import s from './styles.css';

const Tags = ({ label, platforms, className }) => (
  <div className={`${s.root} ${className || ''}`}>
    {label && <label>{label}</label>}
    {platforms.map((p, idx) => (
      <div key={idx}>
        <PureInput
          type="checkbox"
          id={`platform-${p.value.id}`}
          className={s.checkbox}
          value={p.active.value}
          onBlur={p.active.onBlur}
          onFocus={p.active.onFocus}
          onChange={p.active.onChange} />
        <label
          htmlFor={`platform-${p.value.id}`}
          className={`${s.tag} ${p.value.active ? s.active : ''}`}>{p.value.name || ''}</label>
      </div>
    ))}
  </div>
);

Tags.propTypes = {
  label: PropTypes.string,
  platforms: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
};

export default Tags;
