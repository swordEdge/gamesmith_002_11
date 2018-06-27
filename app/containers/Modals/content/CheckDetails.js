/*
 * Check details modal
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUser } from 'containers/App/selectors';

import { updateDetailsRequest } from 'containers/App/actions';

import Modal from 'components/UI/Modal';
import DetailsForm from 'components/DetailsForm';

class CheckDetails extends Component {
  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    dispatch(updateDetailsRequest({ values, resolve, reject }));
  });

  render() {
    const { className = '', isOpen, onCloseModal, data: { email, maker: { firstName, lastName, currRole, currCompany } } } = this.props;
    return (
      <Modal title="Let's Check We Have The Right Details" className={className} isOpen={isOpen} closeModal={onCloseModal}>
        <DetailsForm
          initialValues={{
            firstName,
            lastName,
            email,
            currRole,
            currCompany,
          }}
          onSubmit={this.onSubmit} />
      </Modal>
    );
  }
}

CheckDetails.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  data: PropTypes.object.isRequired,
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
)(CheckDetails);
