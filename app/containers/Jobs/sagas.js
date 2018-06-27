/*
 * Jobs sagas
 */

import { take, call, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
} from 'utils';

import {
  JOBS_REQUEST,
  SEARCH_JOBS_REQUEST,
  NEXT_PAGE_REQUEST,
} from './constants';

import {
  openMessage,
} from 'containers/Modals/actions';
import {
  jobsRequest,
  jobsSuccess,
  jobsError,
  searchJobsSuccess,
  searchJobsError,
  nextPageSuccess,
  nextPageError,
} from './actions';

// watcher for people requests
function* jobsRequestWatcher() {
  while (yield take(JOBS_REQUEST)) {
    try {
      // jobs list if user logged in
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, 'browse/jobs', {
          'X-Auth-Token': token,
        });
        yield put(jobsSuccess(req.data));
      } else {
        // request job list - no auth token required
        const req = yield call(makeRequest, 'GET', {}, 'browse/jobs', {});
        yield put(jobsSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(jobsError(e));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

// watcher for job search requests
function* searchJobsRequestWatcher() {
  while (true) {
    const { payload: { query } } = yield take(SEARCH_JOBS_REQUEST);
    try {
      // const { token } = yield call(getAuthToken);
      if (!query.trim()) {
        yield put(searchJobsSuccess([]));
        yield put(jobsRequest());
      } else {
        const req = yield call(makeRequest, 'GET', {}, `searchjob?q=${query}`, {});
        yield put(searchJobsSuccess(req.data));
      } 
    } catch (e) {
      console.log(e);
      yield put(searchJobsError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}
// watcher for next page requests
function* nextPageRequestWatcher() {
  while (true) {
    const { payload: { url, offset, query } } = yield take(NEXT_PAGE_REQUEST);
    try {
        // request next page of jobs
      const req = yield call(makeRequest, 'GET', {}, `${url}?${query && `q=${query}&`}offset=${offset}`, {});
      yield put(nextPageSuccess(req.data));
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

export default [
  jobsRequestWatcher,
  searchJobsRequestWatcher,
  nextPageRequestWatcher,
];
