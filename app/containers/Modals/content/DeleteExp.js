/*
 * Delete Exp Confirmation modal
 */

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';

import { deleteExpRequest } from 'containers/App/actions';
import s from 'containers/Modals/styles.css';

const DeleteExp = ({ gameID, className = '', isOpen, onCloseModal, onDeleteConfirm }) => (
  <Modal title="Are you sure you want to delete this game?" className={className} isOpen={isOpen} closeModal={onCloseModal}>
    <Button className={s.buttons} onClick={onCloseModal} text="Cancel" /><Button className={s.buttons} onClick={() => onDeleteConfirm(gameID)} text="Delete" />
  </Modal>
);

DeleteExp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
  params: PropTypes.object,
  onSubmit: PropTypes.func,
  onDeleteConfirm: PropTypes.func,
  gameID: PropTypes.number,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
    onDeleteConfirm: gameID => dispatch(deleteExpRequest(gameID)),
  })
)(DeleteExp);
