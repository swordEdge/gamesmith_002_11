/*
 * Sign in modal
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { linkedinAuth } from 'utils';

import { signupRequest } from 'containers/App/actions';

import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';
import SignUpForm from 'components/SignUpForm';

class SignUp extends Component {
  onSubmit = (values, dispatch) =>{ return new Promise((resolve, reject) => {
    dispatch(signupRequest({ values, resolve, reject }));
  });
  }

  render() {
    const { className = '', isOpen, onCloseModal } = this.props;
    return (
      <Modal title="Sign-Up" className={className} isOpen={isOpen} closeModal={onCloseModal}>
      <p> Gamesmith is an invite-only community for professional game makers.</p>
      <SignUpForm onSubmit={this.onSubmit} />
        <p>By joining gamesmith you agree our <a href="/terms" target="_blank">terms and conditions</a>.</p>
      </Modal>
    );
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
  })
)(SignUp);
