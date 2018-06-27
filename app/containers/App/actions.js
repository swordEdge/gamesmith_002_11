/*
 * App actions
 */

import {
  DIRECT_SIGNUP_REQUEST,
  DIRECT_SIGNUP_SUCCESS,
  DIRECT_SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  PENDING_REQUEST,
  PENDING_SUCCESS,
  PENDING_ERROR,
  ACCEPT_REQUEST,
  ACCEPT_SUCCESS,
  ACCEPT_ERROR,
  REJECT_REQUEST,
  REJECT_SUCCESS,
  REJECT_ERROR,
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_ERROR,
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_ERROR,
  ADD_EXP_REQUEST,
  ADD_EXP_SUCCESS,
  ADD_EXP_ERROR,
  DELETE_EXP_REQUEST,
  DELETE_EXP_SUCCESS,
  DELETE_EXP_ERROR,
  APPLY_SMS_REQUEST,
  APPLY_SMS_SUCCESS,
  APPLY_SMS_ERROR,
  CONFIRM_CODE_REQUEST,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_ERROR,
  CREDITS_REQUEST,
  CREDITS_SUCCESS,
  CREDITS_ERROR,
  GET_AUTOCOMPLETE_REQUEST,
  GET_AUTOCOMPLETE_SUCCESS,
  GET_AUTOCOMPLETE_ERROR,
  UPDATE_DETAILS_REQUEST,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_ERROR,
  AVAILABILITY_REQUEST,
  AVAILABILITY_SUCCESS,
  AVAILABILITY_ERROR,
  PASSWORD_LINK_REQUEST,
  PASSWORD_LINK_SUCCESS,
  PASSWORD_LINK_ERROR,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
} from './constants';


export function directSignupRequest(data) {
  return {
    type: DIRECT_SIGNUP_REQUEST,
    payload: data,
  };
}
export function directSignupSuccess(message) {
  return {
    type: DIRECT_SIGNUP_SUCCESS,
    message,
  };
}
export function directSignupError(error) {
  return {
    type: DIRECT_SIGNUP_ERROR,
    payload: error,
  };
}
//Sign In action creator
export function signupRequest(data) {
  return {
    type: SIGNUP_REQUEST,
    payload: data,
  };
}
export function signupSuccess(message) {
  return {
    type: SIGNUP_SUCCESS,
    message,
  };
}
export function signupError(error) {
  return {
    type: SIGNUP_ERROR,
    payload: error,
  };
}
// login action creators
export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
}
export function loginSuccess(message) {
  return {
    type: LOGIN_SUCCESS,
    message,
  };
}
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
}

// reset password action creators
export function passwordLinkRequest(data) {
  return {
    type: PASSWORD_LINK_REQUEST,
    payload: data,
  };
}
export function passwordLinkSuccess(message) {
  return {
    type: PASSWORD_LINK_SUCCESS,
    message,
  };
}
export function passwordLinkError(error) {
  return {
    type: PASSWORD_LINK_ERROR,
    payload: error,
  };
}

// update password action creators
export function updatePasswordRequest(data) {
  return {
    type: UPDATE_PASSWORD_REQUEST,
    payload: data,
  };
}
export function updatePasswordSuccess(message) {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
    message,
  };
}
export function updatePasswordError(error) {
  return {
    type: UPDATE_PASSWORD_ERROR,
    payload: error,
  };
}

// logout action creators
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}
export function logoutSuccess(message) {
  return {
    type: LOGOUT_SUCCESS,
    message,
  };
}
export function logoutError(message) {
  return {
    type: LOGOUT_ERROR,
    message,
  };
}

// get user action creators
export function userRequest(profile, returnUrl, nonce) {
  return {
    type: USER_REQUEST,
    payload: {
      profile,
      returnUrl,
      nonce
    },
  };
}
export function userSuccess(data) {
  return {
    type: USER_SUCCESS,
    data,
  };
}
export function userError(message) {
  return {
    type: USER_ERROR,
    message,
  };
}

// get pending connections action creators
export function pendingRequest() {
  return {
    type: PENDING_REQUEST,
  };
}
export function pendingSuccess(data) {
  return {
    type: PENDING_SUCCESS,
    data,
  };
}
export function pendingError(message) {
  return {
    type: PENDING_ERROR,
    message,
  };
}

// reject connection request action creators
export function acceptRequest(id) {
  return {
    type: ACCEPT_REQUEST,
    payload: {
      id,
    },
  };
}
export function acceptSuccess(message) {
  return {
    type: ACCEPT_SUCCESS,
    message,
  };
}
export function acceptError(message) {
  return {
    type: ACCEPT_ERROR,
    message,
  };
}

// reject connection request action creators
export function rejectRequest(id) {
  return {
    type: REJECT_REQUEST,
    payload: {
      id,
    },
  };
}
export function rejectSuccess(message) {
  return {
    type: REJECT_SUCCESS,
    message,
  };
}
export function rejectError(message) {
  return {
    type: REJECT_ERROR,
    message,
  };
}

// message action creators
export function messageRequest(data) {
  return {
    type: MESSAGE_REQUEST,
    payload: data,
  };
}
export function messageSuccess(data) {
  return {
    type: MESSAGE_SUCCESS,
    data,
  };
}
export function messageError(message) {
  return {
    type: MESSAGE_ERROR,
    message,
  };
}

// invite action creators
export function inviteRequest(data) {
  return {
    type: INVITE_REQUEST,
    payload: data,
  };
}
export function inviteSuccess(message) {
  return {
    type: INVITE_SUCCESS,
    message,
  };
}
export function inviteError(message) {
  return {
    type: INVITE_ERROR,
    message,
  };
}

// connect request action creators
export function connectRequest(data) {
  return {
    type: CONNECT_REQUEST,
    payload: data,
  };
}
export function connectSuccess(message) {
  return {
    type: CONNECT_SUCCESS,
    message,
  };
}
export function connectError(message) {
  return {
    type: CONNECT_ERROR,
    message,
  };
}

// add experience action creators
export function addExpRequest(data) {
  return {
    type: ADD_EXP_REQUEST,
    payload: data,
  };
}

export function addExpSuccess(message) {
  return {
    type: ADD_EXP_SUCCESS,
    message,
  };
}

export function addExpError(message) {
  return {
    type: ADD_EXP_ERROR,
    message,
  };
}
// DELETE experience action creators
export function deleteExpRequest(gameID) {
  return {
    type: DELETE_EXP_REQUEST,
    payload: {
      gameID,
    },
  };
}

export function deleteExpSuccess(message) {
  return {
    type: DELETE_EXP_SUCCESS,
    message,
  };
}

export function deleteExpError(message) {
  return {
    type: DELETE_EXP_ERROR,
    message,
  };
}

// apply sms action creators
export function applySmsRequest(data) {
  return {
    type: APPLY_SMS_REQUEST,
    payload: data,
  };
}

export function applySmsSuccess(message) {
  return {
    type: APPLY_SMS_SUCCESS,
    message,
  };
}

export function applySmsError(message) {
  return {
    type: APPLY_SMS_ERROR,
    message,
  };
}

// confirm sms code action creators
export function confirmCodeRequest(data) {
  return {
    type: CONFIRM_CODE_REQUEST,
    payload: data,
  };
}

export function confirmCodeSuccess(message) {
  return {
    type: CONFIRM_CODE_SUCCESS,
    message,
  };
}

export function confirmCodeError(message) {
  return {
    type: CONFIRM_CODE_ERROR,
    message,
  };
}

// update credits action creators
export function updateCreditsRequest(data) {
  return {
    type: CREDITS_REQUEST,
    payload: data,
  };
}

export function updateCreditsSuccess(message) {
  return {
    type: CREDITS_SUCCESS,
    message,
  };
}

export function updateCreditsError(message) {
  return {
    type: CREDITS_ERROR,
    message,
  };
}

// autocomplete action creators
export function getAutocompleteRequest(data) {
  return {
    type: GET_AUTOCOMPLETE_REQUEST,
    payload: data,
  };
}

export function getAutocompleteSuccess(message) {
  return {
    type: GET_AUTOCOMPLETE_SUCCESS,
    message,
  };
}

export function getAutocompleteError(message) {
  return {
    type: GET_AUTOCOMPLETE_ERROR,
    message,
  };
}

// check details action creators
export function updateDetailsRequest(data) {
  return {
    type: UPDATE_DETAILS_REQUEST,
    payload: data,
  };
}

export function updateDetailsSuccess(message) {
  return {
    type: UPDATE_DETAILS_SUCCESS,
    message,
  };
}

export function updateDetailsError(message) {
  return {
    type: UPDATE_DETAILS_ERROR,
    message,
  };
}

// availability action creators
export function availabilityRequest(data) {
  return {
    type: AVAILABILITY_REQUEST,
    payload: data,
  };
}

export function availabilitySuccess(message) {
  return {
    type: AVAILABILITY_SUCCESS,
    message,
  };
}

export function availabilityError(message) {
  return {
    type: AVAILABILITY_ERROR,
    message,
  };
}
