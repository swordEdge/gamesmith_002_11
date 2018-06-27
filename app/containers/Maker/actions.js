/*
 * Maker actions
 */

import {
  MAKER_REQUEST,
  MAKER_SUCCESS,
  MAKER_ERROR,
  VERIFY_CREDIT_REQUEST,
  VERIFY_CREDIT_SUCCESS,
  VERIFY_CREDIT_ERROR,
} from './constants';

// get maker action creators
export function makerRequest(id) {
  return {
    type: MAKER_REQUEST,
    payload: {
      id,
    },
  };
}

export function makerSuccess(data) {
  return {
    type: MAKER_SUCCESS,
    data,
  };
}

export function makerError(message) {
  return {
    type: MAKER_ERROR,
    message,
  };
}

// get verify action creators
export function verifyCreditRequest(decision, id , makerID) {
  return {
    type: VERIFY_CREDIT_REQUEST,
    payload: {
      decision,
      id,
      makerID,
    },
  };
}

export function verifyCreditSuccesss(data) {
  return {
    type: VERIFY_CREDIT_SUCCESS,
    data,
  };
}
export function verifyCreditError(message) {
  return {
    type: VERIFY_CREDIT_ERROR,
    message,
  };
}
