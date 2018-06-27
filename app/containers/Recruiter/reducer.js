/*
 * Recruiter reducer
 */

import { fromJS } from 'immutable';
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

const initialState = fromJS({
  isFetching: false,
  message: '',
  recruiter: {},
  postedJobs: [],
});

function recruiterReducer(state = initialState, action) {
  switch (action.type) {
    case RECRUITER_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case RECRUITER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('recruiter', fromJS(action.data))
        .set('message', 'test');
    case RECRUITER_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case POSTED_JOBS_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case POSTED_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('postedJobs', fromJS(action.data))
        .set('message', 'postedJobs');
    case POSTED_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case ADD_JOBS_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case ADD_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('postedJobs', state.get('postedJobs').concat([action.job]))
        .set('message', 'test');
    case ADD_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case EDIT_JOBS_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case EDIT_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        // .set('postedJobs', fromJS(action.data))
        .set('message', 'test');
    case EDIT_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case DELETE_JOBS_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', 'deleting');
    case DELETE_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        // .set('postedJobs', fromJS(action.data))
        .set('message', 'test');
    case DELETE_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    default:
      return state;
  }
}

export default recruiterReducer;
