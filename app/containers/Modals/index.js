/*
 * Modal container
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'lodash';

import selectModal from './selectors';
import { selectMaker } from 'containers/Maker/selectors';

import {
  openSignIn,
  openSignUp,
  openDirectSignUp,
  openEditEmail,
  openCustomSignIn,
  openConfirmationMessage,
  closeModal,
} from './actions';
import { makerRequest } from 'containers/Maker/actions';

import {
  SIGN_IN,
  CUSTOM_SIGN_IN,
  SIGN_UP,
  DIRECT_SIGN_UP,
  EDIT_EMAIL,
  MESSAGE,
  INVITE,
  MESSAGING,
  CHECK_INBOX,
  CHECK_DETAILS,
  REGISTERED,
  ADD_EXP,
  APPLY_SMS,
  CONFIRM_CODE,
  AVAILABILITY,
  DELETE_JOB,
  DELETE_EXP,
  FORGET_PASSWORD,
  UPDATE_PASSWORD,
  CONFIRMATION_MESSAGE,
} from './constants';

import SignIn from './content/SignIn';
import CustomSignIn from './content/CustomSignIn';
import ConfirmationMessage from './content/ConfirmationMessage';
import SignUp from './content/SignUp';
import DirectSignUp from './content/DirectSignUp';
import EditEmail from './content/EditEmail';
import Message from './content/Message';
import Invite from './content/Invite';
import Messaging from './content/Messaging';
import CheckInbox from './content/CheckInbox';
import CheckDetails from './content/CheckDetails';
import Registered from './content/Registered';
import AddExp from './content/AddExp';
import ApplySms from './content/ApplySms';
import ConfirmCode from './content/ConfirmCode';
import Availability from './content/Availability';
import DeleteJob from './content/DeleteJob';
import DeleteExp from './content/DeleteExp';
import ForgetPassword from './content/ForgetPassword';
import UpdatePassword from './content/UpdatePassword';


import s from './styles.css';

const Modals = ({ modal: { id, name, title, message, receiverID, isOpen, data, email }, onCloseModal, onOpenSignin, onOpenSignup,onOpenDirectSignup,onOpenEditEmail ,params }) => {
  let modal;

  switch (id) {
    default:
    case SIGN_IN:
      modal = <SignIn className={s.signin} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case CUSTOM_SIGN_IN:
      modal = <CustomSignIn className={s.signin} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case CONFIRMATION_MESSAGE:
      modal = <ConfirmationMessage code={data} className={s.signin} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case SIGN_UP:
      modal = <SignUp className={s.signup} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case FORGET_PASSWORD:
      modal = <ForgetPassword className={s.signup} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case UPDATE_PASSWORD:
      modal = <UpdatePassword className={s.signup} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case DIRECT_SIGN_UP:
      modal = <DirectSignUp className={s.directsignup} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case EDIT_EMAIL:
      modal = <EditEmail className={s.editemail} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case MESSAGE:
      modal = <Message title={title} message={message} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case INVITE:
      modal = <Invite receiverID={receiverID} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case MESSAGING:
      modal = <Messaging receiverID={receiverID} name={name} isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case CHECK_INBOX:
      modal = <CheckInbox isOpen={isOpen} onCloseModal={onCloseModal} email={email} />;
      break;
    case CHECK_DETAILS:
      modal = <CheckDetails isOpen={isOpen} onCloseModal={onCloseModal} data={data}/>;
      break;
    case REGISTERED:
      modal = <Registered isOpen={isOpen} onCloseModal={onCloseModal} onOpenSignin={onOpenSignin} />;
      break;
    case ADD_EXP:
      modal = <AddExp isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case APPLY_SMS:
      modal = <ApplySms isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case CONFIRM_CODE:
      modal = <ConfirmCode isOpen={isOpen} onCloseModal={onCloseModal} params={params} />;
      break;
    case AVAILABILITY:
      modal = <Availability isOpen={isOpen} onCloseModal={onCloseModal} />;
      break;
    case DELETE_JOB:
      modal = <DeleteJob isOpen={isOpen} onCloseModal={onCloseModal} params={params} />;
      break;
    case DELETE_EXP:
      modal = <DeleteExp gameID={data} isOpen={isOpen} onCloseModal={onCloseModal} params={params} />;
      break;
  }

  return modal;
};

Modals.propTypes = {
  modal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    receiverID: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    isOpen: PropTypes.bool.isRequired
  }).isRequired,
  maker: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onOpenSignin: PropTypes.func.isRequired,
  onOpenSignup: PropTypes.func.isRequired,
  onOpenDirectSignup: PropTypes.func.isRequired,
  onOpenEditEmail: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    modal: selectModal(),
    maker: selectMaker(),
  }),
  (dispatch, ownProps) => ({
    dispatch,
    onCloseModal: () => {
      dispatch(closeModal());
      // this clears the query url parameter
      if (!isEmpty(ownProps.location.query)) {
        dispatch(replace({
          ...ownProps.location,
          query: {},
        }));
      }
    },
    onOpenSignin: () => dispatch(openSignIn()),
    onOpenSignup: () => dispatch(openSignUp()),
    onOpenDirectSignup: () => dispatch(openDirectSignUp()),
    onOpenEditEmail: () => dispatch(openEditEmail()),
    onGetMaker: id => dispatch(makerRequest(id)),
  })
)(Modals);
