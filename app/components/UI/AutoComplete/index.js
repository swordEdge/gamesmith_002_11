/*
 * AutoComplete component
 */

import React, { PropTypes, Component } from 'react';
import { AsyncCreatable } from 'react-select';
import 'react-select/dist/react-select.css';

import { startCase, upperFirst } from 'lodash';

import s from '../Select/styles.css';

class AutoComplete extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { initialValue, label, value, touched, error, className, onChange, onBlur } = this.props;
    const initial = {
      name: value || initialValue || '',
      value: value || initialValue || '',
    };
    return (
      <div className={`${s.root} ${value ? s.filled : ''} ${className || ''} input`}>
        {label && <label className={touched && error ? 'error' : ''}>{label}</label>}
        <AsyncCreatable
          {...this.props}
          labelKey="name"
          value={initial}
          placeholder=""
          autoload={!!value}
          searchPromptText="Type to get suggestions"
          promptTextCreator={l => l}
          onBlurResetsInput={true}
          onBlur={() => onBlur({ name: value, value })}
          onChange={(val) => { onChange(val && val.name ? startCase(upperFirst(val.name)) : ''); }}
          isLoading={false}
          ignoreCase={false}
          cache={false} />
        <span className={`${s.line} ${touched && error ? 'error' : ''}`} />
        {touched && error && <span className={s.error}>{error}</span>}
      </div>
    );
  }
}

AutoComplete.propTypes = {
  value: PropTypes.string,
  initialValue: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
};

export default AutoComplete;
