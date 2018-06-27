/*
 * Job actions
 */

import {
  JOB_REQUEST,
  JOB_SUCCESS,
  JOB_ERROR,
  APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
} from './constants';

export function jobRequest(id) {
  return {
    type: JOB_REQUEST,
    payload: {
      id,
    },
  };
}

export function jobSuccess(data) {
  return {
    type: JOB_SUCCESS,
    data,
  };
}

export function jobError(message) {
  return {
    type: JOB_ERROR,
    message,
  };
}

export function applyJobRequest(id) {
  return {
    type: APPLY_JOB_REQUEST,
    payload: {
      id,
    },
  };
}

export function applyJobSuccess(data) {
  return {
    type: APPLY_JOB_SUCCESS,
    data,
  };
}

export function applyJobError(message) {
  return {
    type: APPLY_JOB_ERROR,
    message,
  };
}
