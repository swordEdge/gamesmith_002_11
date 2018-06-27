/*
 * Reset Password container
 */

import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { resetPasswordRequest } from './actions';
import selectResetPassword from './selectors';

import s from './styles.css';

class ResetPassword extends Component {
  componentDidMount() {
    const { location: { query }, dispatch, onResetPasswordRequest } = this.props;
    if ({}.hasOwnProperty.call(query, 'email') && {}.hasOwnProperty.call(query, 'code')) {
      localStorage.setItem('resetEmail', query.email);
      localStorage.setItem('resetCode', query.code);
      onResetPasswordRequest({ email: query.email, code: query.code });
    } else {
      dispatch(push('/'));
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <main role="main" className={s.root}>
        <div className="loader"><div></div><div></div><div></div></div>
        <h2>Verify Code and Email</h2>
      </main>
    );
  }
}

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onResetPasswordRequest: PropTypes.func.isRequired,
};

export default connect(
  selectResetPassword(),
  dispatch => ({
    dispatch,
    onResetPasswordRequest: ({ email, code }) => dispatch(resetPasswordRequest({ email, code })),
  })
)(ResetPassword);
