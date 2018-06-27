/*
 * People sagas
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
  PEOPLE_REQUEST,
  SEARCH_PEOPLE_REQUEST,
  NEXT_PAGE_REQUEST,
} from './constants';

import {
  openMessage,
} from 'containers/Modals/actions';
import {
  peopleRequest,
  peopleSuccess,
  peopleError,
  searchPeopleSuccess,
  searchPeopleError,
  nextPageSuccess,
  nextPageError,
} from './actions';

// watcher for people requests
function* peopleRequestWatcher() {
  while (yield take(PEOPLE_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        // TODO:10 how do I query the user given the input?
        const req = yield call(makeRequest, 'GET', {}, 'browse/makers', {
          'X-Auth-Token': token,
        });
        yield put(peopleSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(peopleError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(peopleError(e));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

// watcher for people search requests
function* searchPeopleRequestWatcher() {
  while (true) {
    const { payload: { query } } = yield take(SEARCH_PEOPLE_REQUEST);
    try {
      // check for empty query string to prevent bad server requests
      // dispatches reqular people request instead
      if (!query.trim()) {
        yield put(searchPeopleSuccess([]));
        yield put(peopleRequest());
      // check auth token for expiration
      } else if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, `searchmaker?q=${query}`, {
          'X-Auth-Token': token,
        });
        yield put(searchPeopleSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(searchPeopleError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(searchPeopleError(e.toString()));
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
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, `${url}?${query && `q=${query}&`}offset=${offset}`, {
          'X-Auth-Token': token,
        });
        yield put(nextPageSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(nextPageError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(nextPageError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

export default [
  peopleRequestWatcher,
  searchPeopleRequestWatcher,
  nextPageRequestWatcher,
];
