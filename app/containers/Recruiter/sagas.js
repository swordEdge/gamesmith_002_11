/*
 * Recruiter sagas
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
  ADD_JOBS_REQUEST,
  POSTED_JOBS_REQUEST,
  DELETE_JOBS_REQUEST,
  EDIT_JOBS_REQUEST,
} from './constants';

import {
  postedJobSuccess,
  postedJobError,
  addJobSuccess,
  addJobError,
  editJobSuccess,
  editJobError,
  deleteJobError,
} from './actions';

import {
  openMessage,
} from 'containers/Modals/actions';

function* postedJobsRequestWatcher() {
  while (true) {
    yield take(POSTED_JOBS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        const req = yield call(makeRequest, 'GET', {}, 'jobcardsForRecruiter', {
          'X-Auth-Token': token,
        });
        yield put(postedJobSuccess(req.data));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(postedJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(postedJobError(e));
      // TODO:40 find a way to keep the url but still display the error page
      yield put(replace('/error'));
    }
  }
}

function* addJobRequestWatcher() {
  while (true) {
    const { payload: { values: { role, company, startDate, location, description,imgUrl }, resolve, reject, toggle } } = yield take(ADD_JOBS_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        // post job request
        const req = yield call(makeRequest, 'POST', { role, company, startDate : startDate ? ((new Date(startDate)).getFullYear() + '-' + ((new Date(startDate)).getMonth()+1) + '-' + (new Date(startDate)).getDate() ) : '', location, description }, 'jobcard/create', {
          'X-Auth-Token': token,
        });
        const { id } = req.data;
        if (imgUrl) {
          // add image file to form data
          const data = new FormData();
          data.append('jobLogo', imgUrl);
          // request the update profile image api
          yield call(makeRequest, 'POST', data, `jobcard/uploadjoblogo/${id}`, {
            'X-Auth-Token': token,
          });
        }
        yield call(resolve);
        // this is just a generic modal used for displaying system messages
        yield put(addJobSuccess(req.data));
        yield call(toggle);
        yield put(openMessage('Job was successfully posted!', 'blank'));
      } else {
        // if expired remove token and user data
        yield call(reject);
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(addJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e)
      yield call(reject, { description: 'Could not add job.' });
      yield put(addJobError(e));
    }
  }
}

function* deleteJobRequestWatcher() {
  while (true) {
    const { payload: { id } } = yield take(DELETE_JOBS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request maker data
        yield call(makeRequest, 'POST', {}, `jobcard/delete/${id}`, {
          'X-Auth-Token': token,
        });
        // yield put(deleteJobSuccess(req.data));
        yield put(openMessage('Job was Successfully deleted', 'blank'));
        yield put(replace('/?jobs'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(deleteJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(deleteJobError(e));
      yield put(replace('/?error'));
    }
  }
}

function* editJobRequestWatcher() {
  while (true) {
    const { payload: { jobID, values: { role, company, startDate, location, description, imgUrl }, resolve, reject, toggle } } = yield take(EDIT_JOBS_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        // post job request
        const req = yield call(makeRequest, 'POST', { role, company, startDate : startDate ? ((new Date(startDate)).getFullYear() + '-' + ((new Date(startDate)).getMonth()+1) + '-' + (new Date(startDate)).getDate() ) : '', location, description }, `jobcard/update/${jobID}`, {

          'X-Auth-Token': token,
        });
        if (imgUrl && (typeof(imgUrl) == 'object')) {
          // add image file to form data
          const data = new FormData();
          data.append('jobLogo', imgUrl);
          // request the update profile image api
          yield call(makeRequest, 'POST', data, `jobcard/uploadjoblogo/${jobID}`, {
            'X-Auth-Token': token,
          });
        }
        yield call(resolve);
        // this is just a generic modal used for displaying system messages
        yield put(editJobSuccess(req.data));
        yield call(toggle);
        yield put(openMessage('Job was successfully updated!', 'blank'));
        yield put(replace('/recruiter'));
      } else {
        // if expired remove token and user data
        yield call(reject);
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(editJobError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e)
      yield call(reject, { description: 'Could not update job.' });
      yield put(editJobError(e));
    }
  }
}


export default [
  postedJobsRequestWatcher,
  addJobRequestWatcher,
  deleteJobRequestWatcher,
  editJobRequestWatcher,
];
