/*
 * Maker sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { replace } from 'react-router-redux';

import {
  makeRequest,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
} from 'utils';

import {
  MAKER_REQUEST,
  VERIFY_CREDIT_REQUEST
} from './constants';

import {
  makerSuccess,
  makerError,
  verifyCreditSuccesss,
  verifyCreditError,
} from './actions';

// watcher for maker data requests
function* makerRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(MAKER_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'GET', {}, `gamemaker/${id}`, {
          'X-Auth-Token': token,
        });
        yield put(makerSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(makerError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(makerError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

// watcher for verify credit requests
function* verifyCreditWatcher() {
  while (true) {
    const { payload: { decision, id , makerID} } = yield take(VERIFY_CREDIT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'POST', {}, `gamecredit/verify/${decision}/${id}`, {
          'X-Auth-Token': token,
        });
        const req_maker = yield call(makeRequest, 'GET', {}, `gamemaker/${makerID}`, {
          'X-Auth-Token': token,
        });
        yield put(makerSuccess(req_maker.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(verifyCreditError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield put(verifyCreditError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

export default [
  makerRequestWatcher,
  verifyCreditWatcher,
];
