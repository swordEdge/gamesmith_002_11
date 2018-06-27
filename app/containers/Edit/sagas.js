/*
 * Update profile sagas
 */

import { take, call, put } from 'redux-saga/effects';  // eslint-disable-line no-unused-vars
import { replace } from 'react-router-redux';
import { reset } from 'redux-form';
import moment from 'moment';

import {
  makeRequest,
  getUserData,
  removeUserData,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
} from 'utils';
import {
  closeModal,
  openMessage,
} from 'containers/Modals/actions';
import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_EMAIL_REQUEST,
} from './constants';

import {
  rejectError,
} from 'containers/App/actions'

import {
  updateProfileSuccess,
  updateProfileError,
} from './actions';

import { userRequest,logoutRequest  } from 'containers/App/actions';

function* updateEmailRequestWatcher() {
  while (true) {
    const { payload: { values: {oldemail, newemail, password  }, resolve, reject } } = yield take(UPDATE_EMAIL_REQUEST);
    let  request;
    try {
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id, email } = yield call(getUserData);
        if (oldemail == email && oldemail != newemail)
        {
            request =  yield call(makeRequest, 'POST',{
              oldpassword: password,
              oldemail: oldemail,
              newemail: newemail,
            }, `updateemail`, {
              'X-Auth-Token': token,
            });

          yield put(closeModal());
          yield put(openMessage('Successfully Update Email','You are logged out from GameSmith because you have changed yor email. Please Login with new Email to continue'));
          yield put(logoutRequest())
        } else {
          yield put(closeModal());
          yield put(openMessage('Email is is incorrect', oldemail != email ? oldemail == newemail ? '' : 'Old email does not match with existing email' : 'Both Emails are Same'));
        }
      }
    }catch (e){
      yield call(reject, e.response.data.error ? {newemail: e.response.data.error} : {password: "Password is Incorrect"});
    }
  }
}

// watcher for profile update requests
function* updateProfileRequestWatcher() {
  while (true) {
    const { payload: { values: { image, firstName, lastName, email, password, currRole, currCompany, currGame, availability, bio, location, skills, accomplishments, phoneNumber, availableAt,isLinkedInUser }, resolve, reject, connections, credits, imgUrl } } = yield take(UPDATE_PROFILE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
          // request the profile update api
          yield call(makeRequest, 'POST', {
            id,
            firstName,
            lastName,
            currRole,
            currCompany,
            currGame: "",
            phoneNumber,
            bio,
            availability,
            location,
            imgUrl,
            skills,
            accomplishments,
            additionalInfo: [
              {
                timesVerified: 0,
                availableAt: availability ? availability === 'Open at Future Date' ? availableAt ? moment(availableAt).format('YYYY-MM-DD') : null : null : null,
                latestGameId: 0,
              }
            ],
          }, `profile/edit/${id}`, {
            'X-Auth-Token': token,
          });
          // check if there is an image to update
          if (image) {
            // add image file to form data
            const data = new FormData();
            data.append('picture', image);
            // request the update profile image api
            yield call(makeRequest, 'POST', data, `profile/updatepicture/${id}`, {
              'X-Auth-Token': token,
            });
          }
          // if successful resolve the form and show confirmation
          yield call(resolve);
          yield put(updateProfileSuccess('Successfully updated profile!'));
          // refresh user data (pass true to redirect to profile instead of People)
          yield put(userRequest(true));
          // flash a page refresh to get rid of cached image
          yield put(reset('profile'));

      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(updateProfileError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: 'Error updating profile.' });
      yield put(updateProfileError(e));
    }
  }
}

export default [
  updateProfileRequestWatcher,
  updateEmailRequestWatcher,
];
