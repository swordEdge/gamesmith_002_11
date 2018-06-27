/*
 * Recruiter actions
 */

import {
  RECRUITER_REQUEST,
  RECRUITER_SUCCESS,
  RECRUITER_ERROR,
  POSTED_JOBS_REQUEST,
  POSTED_JOBS_SUCCESS,
  POSTED_JOBS_ERROR,
  ADD_JOBS_REQUEST,
  ADD_JOBS_SUCCESS,
  ADD_JOBS_ERROR,
  EDIT_JOBS_REQUEST,
  EDIT_JOBS_SUCCESS,
  EDIT_JOBS_ERROR,
  DELETE_JOBS_REQUEST,
  DELETE_JOBS_SUCCESS,
  DELETE_JOBS_ERROR,
} from './constants';

export function recruiterRequest(id) {
  return {
    type: RECRUITER_REQUEST,
    payload: {
      id,
    },
  };
}

export function recruiterSuccess(data) {
  return {
    type: RECRUITER_SUCCESS,
    data,
  };
}

export function recruiterError(message) {
  return {
    type: RECRUITER_ERROR,
    message,
  };
}

export function postedJobRequest(id) {
  return {
    type: POSTED_JOBS_REQUEST,
    payload: {
      id,
    },
  };
}

export function postedJobSuccess(data) {
  return {
    type: POSTED_JOBS_SUCCESS,
    data,
  };
}

export function postedJobError(message) {
  return {
    type: POSTED_JOBS_ERROR,
    message,
  };
}

export function addJobRequest(data) {
  return {
    type: ADD_JOBS_REQUEST,
    payload: data,
  };
}

export function addJobSuccess(job) {
  return {
    type: ADD_JOBS_SUCCESS,
    job,
  };
}

export function addJobError(message) {
  return {
    type: ADD_JOBS_ERROR,
    message,
  };
}

export function editJobRequest(data) {
  return {
    type: EDIT_JOBS_REQUEST,
    payload: data,
  };
}

export function editJobSuccess(data) {
  return {
    type: EDIT_JOBS_SUCCESS,
    data,
  };
}

export function editJobError(message) {
  return {
    type: EDIT_JOBS_ERROR,
    message,
  };
}

export function deleteJobRequest(id) {
  return {
    type: DELETE_JOBS_REQUEST,
    payload: {
      id,
    },
  };
}

export function deleteJobSuccess(data) {
  return {
    type: DELETE_JOBS_SUCCESS,
    data,
  };
}

export function deleteJobError(message) {
  return {
    type: DELETE_JOBS_ERROR,
    message,
  };
}
