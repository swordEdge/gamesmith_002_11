/*
 * Apply SMS modal
 */

import React, { Component, PropTypes } from 'react';
import { applySmsRequest } from 'containers/App/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Modal from 'components/UI/Modal';
import ApplySmsForm from 'components/ApplySmsForm';


class ApplySms extends Component {
  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    dispatch(applySmsRequest({ values, resolve, reject }));
  });

  render() {
    const { className = '', isOpen, onCloseModal } = this.props;
    return (
      <Modal title="Confirm your Phone" className={className} isOpen={isOpen} closeModal={onCloseModal}>
        <ApplySmsForm
          onSubmit={this.onSubmit}
          destroyOnUnmount={false}/>
      </Modal>
    );
  }
}

ApplySms.propTypes = {
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
)(ApplySms);
