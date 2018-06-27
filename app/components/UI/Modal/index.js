/*
 * Modal component
 */

import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';

import s from './styles.css';

class ReactModal extends Component {
  state = {
    isOpen: false,
  }

  closeModal = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { title, isOpen, closeModal, children, className } = this.props;

    return (
      <Modal
        isOpen={isOpen || this.state.isOpen}
        onRequestClose={closeModal || this.closeModal}
        overlayClassName={s.overlay}
        className={`${s.root} ${className || ''}`}>
        <button className={s.close} onClick={closeModal || this.closeModal}>
          <i className="icon-cross" />
        </button>
        <h2>{title}</h2>
        <div className={s.content}>
          {children}
        </div>
      </Modal>
    );
  }
}

ReactModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  className: PropTypes.string,
};

export default ReactModal;
