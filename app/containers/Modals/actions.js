/*
 * Modal actions
 */

import {
  OPEN_MODAL,
  CLOSE_MODAL,
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

export function openModal(id, title = '', message = '', receiverID = '' ,name = '', data, email) {
  return {
    type: OPEN_MODAL,
    id,
    title,
    message,
    receiverID,
    name,
    data,
    email,
  };
}

export function openSignIn() {
  return openModal(SIGN_IN);
}

export function openCustomSignIn() {
  return openModal(CUSTOM_SIGN_IN);
}

export function openConfirmationMessage(code) {
  return openModal(CONFIRMATION_MESSAGE, '', '', '', '', code);
}

export function openSignUp() {
  return openModal(SIGN_UP);
}

export function openForgetPassword() {
  return openModal(FORGET_PASSWORD);
}

export function openResetPassword() {
  return openModal(UPDATE_PASSWORD);
}

export function openDirectSignUp() {
  return openModal(DIRECT_SIGN_UP);
}

export function openEditEmail() {
  return openModal(EDIT_EMAIL);
}

export function openMessage(title, message) {
  return openModal(MESSAGE, title, message);
}

export function openInvite(receiverID) {
  return openModal(INVITE, '', '', receiverID);
}

// TODO:20 find a way around those empty string args
export function openMessaging(receiverID, name) {
  return openModal(MESSAGING, '', '', receiverID, name);
}

export function openCheckInbox(email) {
  return openModal(CHECK_INBOX, '', '', '', '','',email);
}

export function openRegistered() {
  return openModal(REGISTERED);
}

export function openAddExp() {
  return openModal(ADD_EXP);
}

export function openApplySms() {
  return openModal(APPLY_SMS);
}

export function openDeleteJob() {
  return openModal(DELETE_JOB);
}

export function openDeleteExp(id) {
  return openModal(DELETE_EXP, '', '', '', '', id);
}

export function openConfirmCode() {
  return openModal(CONFIRM_CODE);
}

export function openCheckDetails(user) {
  return openModal(CHECK_DETAILS, '', '', '', '', user);
}

export function openAvailability() {
  return openModal(AVAILABILITY);
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}
