/*
 * Sign in modal
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { linkedinAuth } from 'utils';

import { loginRequest } from 'containers/App/actions';
import {
  openSignUp,
  openForgetPassword,
} from 'containers/Modals/actions';
import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';
import AuthForm from 'components/AuthForm';

class SignIn extends Component {
  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    dispatch(loginRequest({ values, resolve, reject }));
  });

  render() {
    const { className = '', isOpen, onCloseModal , onSignUp, onForgetPassword} = this.props;
    return (
      <Modal title="Sign In" className={className} isOpen={isOpen} closeModal={onCloseModal}>
        <Button onClick={linkedinAuth} text="with Linkedin" color="blue" />
        <p className="or">or</p>
        <AuthForm onSubmit={this.onSubmit} />
        <div className="links">
          <a onClick={onSignUp}>Join Now</a>
        </div>
        <div className="links">
          <a onClick={onForgetPassword}>Forget Password</a>
        </div>
      </Modal>
    );
  }
}

SignIn.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  onSignUp: PropTypes.func.isRequired,
  onForgetPassword: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
    onSignUp: () => dispatch(openSignUp()),
    onForgetPassword: () => dispatch(openForgetPassword()),
  })
)(SignIn);
