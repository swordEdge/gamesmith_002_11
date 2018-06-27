/*
 * Message modal
 */

import React, { PropTypes } from 'react';

import Modal from 'components/UI/Modal';
import Button from 'components/UI/Button';

const Message = ({ className = '', title, message, isOpen, onCloseModal }) => (
  <Modal title={title || 'Error'} className={className} isOpen={isOpen} closeModal={onCloseModal}>
    {message !== 'blank' && <p>{message || 'Ouch, it seems an error has occured.'}</p>}
    <Button onClick={onCloseModal} text="OK" />
  </Modal>
);

Message.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Message;
