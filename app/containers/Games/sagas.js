/*
 * Games sagas
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
  GAMES_REQUEST,
  SEARCH_GAMES,
} from './constants';

import {
  openMessage,
} from 'containers/Modals/actions';
import {
  gamesSuccess,
  gamesError,
  gamesRequest,
} from './actions';

// watcher for games requests
function* gamesRequestWatcher() {
  while (yield take(GAMES_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, 'browse/games', {
          'X-Auth-Token': token,
        });
        yield put(gamesSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(gamesError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(gamesError(e.toString()));
      yield put(openMessage());
      yield put(push('/'));
    }
  }
}

function* searchGamesWatcher() {
  while (true) {
    const { payload: { query } } = yield take(SEARCH_GAMES);
    try {

      if (checkAuthToken()) { // check auth token for expiration
        const { token } = yield call(getAuthToken);
        // check for empty query strings to prevent bad server requests
        if (!query.trim()) {
          console.log('Empty String');
          // request game data
          yield put(gamesRequest());
        }else {
          console.log("search game");
          // request user data
          const req = yield call(makeRequest, 'GET', {}, `searchgame?q=${query}`, {
            'X-Auth-Token': token,
          });
          yield put(gamesSuccess(req.data));
        }
      }
      else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(gamesError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e.toString());
      yield put(gamesError(e.toString()));
      yield put(openMessage());
      yield put(push('/games'));
    }
  }
}

export default [
  gamesRequestWatcher,
  searchGamesWatcher,
];
