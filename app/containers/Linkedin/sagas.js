/*
 * Linkedin sagas
 */

import request from 'axios';
import { push } from 'react-router-redux';
import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars

import {
  BACKEND_URL,
  setAuthToken,
  setUserData,
  getAuthToken,
  makeRequest
} from 'utils';

import {
  LOGIN_REQUEST,
  JOIN_REQUEST,
  MAKER_REQUEST,
} from './constants';

import { userRequest } from 'containers/App/actions';
import {
  openCheckInbox,
  openCheckDetails,
  openMessage,
} from 'containers/Modals/actions';

// watcher for linkedin login requests
function* loginRequestWatcher() {
  while (true) {
    const { payload: { code, returnUrl } } = yield take(LOGIN_REQUEST);
    try {
      const req = yield call(request, {
        url: `${BACKEND_URL}/api/linkedin/signin?code=${code}`,
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      yield call(setAuthToken, req.data);
      if(returnUrl) {
        const token = getAuthToken();
        const userReq = yield call(makeRequest, 'GET', {}, 'me', {
          'X-Auth-Token': token.token,
        });
        yield call(setUserData, userReq.data);
        if(window.opener) {
          window.opener.location = '/forum';
        }
        window.close();
      } else {
        // set user data (and close this window if it's a popup)
        yield put(userRequest());
      }
    } catch (e) {
      if (window.opener) {
        window.opener.location = `/?error&code=${e.response.data.errors[0].code}`;
        window.close();
      } else {
        console.error('Authentication failed. Linkedin code may be incorrect or expired.'); // eslint-disable-line no-console
        yield put(openMessage('Error', 'There was an error in processing your request.'));
        yield put(push('/'));
      }
    }
  }
}

// watcher for maker join requests
function* joinRequestWatcher() {
  while (true) {
    const { payload: { code } } = yield take(JOIN_REQUEST);
    // listens for requests to join the network then adds a maker to the pending approval list
    const req = yield call(request, {
      url: `${BACKEND_URL}/api/linkedin/maker/joinrequest?code=${code}`,
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
      validateStatus: () => true,
    });
    if (req.status >= 200 && req.status < 300) {
      // if successful show user the check inbox message
      if (window.opener) {
        window.opener.location = `/?checkInbox&email=${req.data.email}`;
        window.close();
      } else {
        yield put(openCheckInbox(req.data.email));
        yield put(push('/'));
      }
    } else if (req.data && req.data.errors && req.data.errors.length > 0 && req.data.errors[0].code === 40006) {
      // if Linkedin account being already connected to a maker
      if (window.opener) {
        window.opener.location = '/?registered';
        window.close();
      } else {
        console.error('Linkedin account is already connected to a maker profile.'); // eslint-disable-line no-console
        yield put(push('/?registered'));
      }
    } else if (window.opener) {
      window.opener.location = '/?error';
      window.close();
    } else {
      console.error('There was an error in processing the request.'); // eslint-disable-line no-console
      yield put(openMessage('Error', 'There was an error in processing your request.'));
      yield put(push('/'));
    }
  }
}

// watcher for maker accept invite requests
function* makerRequestWatcher() {
  while (true) {
    const { payload: { token, code } } = yield take(MAKER_REQUEST);
    // this takes the encoded json string (state query) and converts it into a valid object
    const authToken = JSON.parse(decodeURIComponent(token));
    try {
      // request the maker accept invite api (join to linkedin account)
      yield call(request, {
        url: `${BACKEND_URL}/api/linkedin/maker/join?code=${code}`,
        method: 'GET',
        headers: {
          'X-Auth-Token': authToken.token,
          'Cache-Control': 'no-cache',
        },
      });

      // on success set auth token and push to onboarding flow
      yield call(setAuthToken, authToken);
      // request user data
      const req = yield call(makeRequest, 'GET', {}, 'me', {
        'X-Auth-Token': authToken.token,
      });
      // set the user data
      yield call(setUserData, req.data);

      yield put(openCheckDetails(req.data));
      yield put(push('/'));
    } catch (e) {
      // this error is usually caused by a linkedin account being already connected to a maker
      console.log(e); // eslint-disable-line no-console
      if (window.opener) {
        window.opener.location = '/?error';
        window.close();
      } else {
        console.error('Request failed. Linkedin code may be incorrect or expired.'); // eslint-disable-line no-console
        yield put(openMessage('Error', 'There was an error in processing your request.'));
        yield put(push('/'));
      }
    }
  }
}

export default [
  loginRequestWatcher,
  joinRequestWatcher,
  makerRequestWatcher,
];
