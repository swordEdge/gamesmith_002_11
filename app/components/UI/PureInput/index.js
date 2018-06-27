/*
 * Pure Input component
 */

import React, { Component, PropTypes } from 'react';

class PureInput extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    const { value, ...rest } = this.props;
    return <input value={value} {...rest}/>;
  }
}

PureInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
};

export default PureInput;
