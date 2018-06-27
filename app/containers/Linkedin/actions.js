/*
 * Linkedin actions
 */

import {
  LOGIN_REQUEST,
  JOIN_REQUEST,
  MAKER_REQUEST,
} from './constants';

// linkedin login action creator
export function loginRequest(data) {
  return {
    type: LOGIN_REQUEST,
    payload: data,
  };
}

// maker join action creator
export function joinRequest(data) {
  return {
    type: JOIN_REQUEST,
    payload: data,
  };
}

// maker accept invite action creator
export function makerRequest(data) {
  return {
    type: MAKER_REQUEST,
    payload: data,
  };
}
