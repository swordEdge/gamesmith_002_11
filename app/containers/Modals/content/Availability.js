/*
 * Availability modal
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from 'containers/App/selectors';

import { availabilityRequest } from 'containers/App/actions';

import Modal from 'components/UI/Modal';
import AvailabilityForm from 'components/AvailabilityForm';

class Availability extends Component {
  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    dispatch(availabilityRequest({ values, resolve, reject }));
  });

  render() {
    const { user: { maker: { status, availability,availableAt, location } }, className = '', isOpen, onCloseModal } = this.props;
    return (
      <Modal title="Available To Talk?" className={className} isOpen={isOpen} closeModal={onCloseModal}>
        <AvailabilityForm
          initialValues={{
            status,
            availability,
            availableAt,
            location,
          }}
          onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

Availability.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
  }),
  dispatch => ({
    dispatch,
  })
)(Availability);
