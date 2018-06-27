/*
 * Add Experience modal
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  addExpRequest,
  getAutocompleteRequest,
} from 'containers/App/actions';

import Modal from 'components/UI/Modal';
import AddExpForm from 'components/AddExpForm';

import platforms from 'data/platforms';

const initial = {
  platforms,
};

class AddExp extends Component {
  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    dispatch(addExpRequest({ values, resolve, reject }));
  });

  getSuggestions = data =>
    this.props.handleAutoComplete(data);

  render() {
    const { className = '', isOpen, onCloseModal } = this.props; // eslint-disable-line

    return (
      <Modal title="Add Game" className={className} isOpen={isOpen} closeModal={onCloseModal}>
        <AddExpForm
          onSubmit={this.onSubmit}
          initialValues={initial}
          onGetSuggestions={this.getSuggestions} />
      </Modal>
    );
  }
}

AddExp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  handleAutoComplete: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
    handleAutoComplete: data => dispatch(getAutocompleteRequest(data)),
  })
)(AddExp);
