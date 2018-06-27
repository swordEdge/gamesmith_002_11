/*
 * Confirm Code SMS modal
 */

import React, { Component, PropTypes } from 'react';
import { confirmCodeRequest } from 'containers/App/actions';
import { openApplySms } from 'containers/Modals/actions';import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/UI/Modal';
import ConfirmCodeForm from 'components/ConfirmCodeForm';


class ConfirmCode extends Component {
  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    const { params: { jobID } } = this.props;
    dispatch(confirmCodeRequest({ values, resolve, reject, jobID }));
  });

  render() {
    const { className = '', isOpen, onCloseModal, onOpenApplySms } = this.props;
    return (
      <Modal title="Enter Code from SMS" className={className} isOpen={isOpen} closeModal={onCloseModal}>
        <ConfirmCodeForm
          onSubmit={this.onSubmit}
          onResend={onOpenApplySms}/>
      </Modal>
    );
  }
}

ConfirmCode.propTypes = {
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  onOpenApplySms: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
    onOpenApplySms: () => dispatch(openApplySms()),
  })
)(ConfirmCode);
