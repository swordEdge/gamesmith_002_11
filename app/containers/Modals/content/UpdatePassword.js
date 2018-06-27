/*
 * Sign in modal
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { updatePasswordRequest } from 'containers/App/actions';
import Modal from 'components/UI/Modal';
import ResetPasswordForum from 'components/ResetPassword';

class UpdatePassword extends Component {

  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    dispatch(updatePasswordRequest({ values, resolve, reject }));
  });

  render() {
    const { className = '', isOpen, onCloseModal } = this.props;

    return (
      <Modal title="Reset Password" className={className} isOpen={isOpen} closeModal={onCloseModal}>
        <p>Enter your new password below</p>
        <ResetPasswordForum
          onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

UpdatePassword.propTypes = {
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
)(UpdatePassword);
