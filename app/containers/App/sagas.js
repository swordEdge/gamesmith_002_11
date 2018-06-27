/*
 * App sagas
 */

import { take, call, put } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';
import moment from 'moment';
import { indexOf, find } from 'lodash';

import {
  makeRequest,
  getUserData,
  setUserData,
  removeUserData,
  setAuthToken,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  getReturnUrl,
  removeReturnUrl,
  BACKEND_URL,
  FORUM_URL
} from 'utils';

import {
  DIRECT_SIGNUP_REQUEST,
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  LOGOUT_REQUEST,
  USER_REQUEST,
  PENDING_REQUEST,
  ACCEPT_REQUEST,
  REJECT_REQUEST,
  MESSAGE_REQUEST,
  INVITE_REQUEST,
  CONNECT_REQUEST,
  ADD_EXP_REQUEST,
  DELETE_EXP_REQUEST,
  APPLY_SMS_REQUEST,
  CONFIRM_CODE_REQUEST,
  CREDITS_REQUEST,
  GET_AUTOCOMPLETE_REQUEST,
  UPDATE_DETAILS_REQUEST,
  AVAILABILITY_REQUEST,
  PASSWORD_LINK_REQUEST,
  UPDATE_PASSWORD_REQUEST,
} from './constants';

import {
  loginSuccess,
  loginError,
  directSignupSuccess,
  directSignupError,
  signupSuccess,
  signupError,
  logoutSuccess,
  logoutError,
  userRequest,
  userSuccess,
  userError,
  pendingRequest,
  pendingSuccess,
  pendingError,
  acceptSuccess,
  acceptError,
  rejectSuccess,
  rejectError,
  messageSuccess,
  messageError,
  inviteSuccess,
  inviteError,
  connectSuccess,
  connectError,
  addExpSuccess,
  addExpError,
  deleteExpSuccess,
  deleteExpError,
  applySmsSuccess,
  applySmsError,
  confirmCodeSuccess,
  confirmCodeError,
  // updateCreditsRequest,
  updateCreditsSuccess,
  updateCreditsError,
  getAutocompleteSuccess,
  getAutocompleteError,
  updateDetailsSuccess,
  updateDetailsError,
  availabilitySuccess,
  availabilityError,
  passwordLinkSuccess,
  passwordLinkError,
  updatePasswordSuccess,
  updatePasswordError,
} from './actions';
import {
  openCustomSignIn,
  closeModal,
  openMessage,
  openDirectSIgnUpMessage,
  openConfirmCode,
  openCheckDetails,
  openAvailability,
  openAddExp,
} from 'containers/Modals/actions';
import { makerRequest } from 'containers/Maker/actions';
import { peopleRequest } from 'containers/People/actions';
import { applyJobRequest } from 'containers/Job/actions';

// watcher for user login requests
function* loginRequestWatcher() {
  while (true) {
    const { payload: { values: { email, password }, resolve, reject, returnUrl, nonce } } = yield take(LOGIN_REQUEST);
    try {
      // request the login api
      const req = yield call(makeRequest, 'POST', {
        identifier: email,
        password,
      }, 'login');
      // if successful resolve the form and set token
      yield call(resolve);
      yield call(setAuthToken, req.data);
      yield put(loginSuccess(req.statusText));
      // yield put(userRequest(req.data, returnUrl, nonce));
      // yield put(userRequest(req.data, returnUrl ?  returnUrl : req.data.recruiter ? '/recruiter' : '/maker/me', nonce)); //sent return url along with based on user type.

      const { token } = yield call(getAuthToken);
      let api = 'me';
      const user = yield call(makeRequest, 'GET', {}, api, {
        'X-Auth-Token': token,
      });
      let url = yield call(getReturnUrl);
      if(localStorage.getItem('onboarding') == 'true'){
        yield call(setUserData, user.data);
        yield put(openCheckDetails(user.data));
        // localStorage.removeItem('onboarding');
        yield put(push('/'));
      } else{
        yield put(userRequest(req.data, returnUrl ?  returnUrl : url ? url : user.data.recruiter ? '/recruiter' : '/maker/me', nonce)); //sent return url along with based on user type.
        yield put(closeModal());
      }

    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { password: 'Wrong login credentials' });
      yield put(loginError(e));
    }
  }
}

function* signupRequestWatcher() {
  while (true) {
    const { payload: { values: { firstName, lastName, email, password, currCompany, currRole, currGame }, resolve, reject } } = yield take(SIGNUP_REQUEST);
    try {
      const req = yield call(makeRequest, 'POST',
        {
          // id: 0,
          firstName,
          lastName,
          email,
          password,
          currCompany,
          currRole,
          currGame,
        }, 'joinrequest/signup');
      yield call(resolve);
      yield put(signupSuccess(req.statusText));
      yield put(closeModal());
      yield put(openMessage('Sign-up Request Sent','We will send you an email after your account is activated.'));

    }catch (e) {
      yield call(reject, { email: e.response.data.error });
      yield put(signupError(e));
    }
  }
}

function* directSignupRequestWatcher() {
  while (true) {
    const { payload: { values: { email, password }, resolve, reject } } = yield take(DIRECT_SIGNUP_REQUEST);
    try {
      const req = yield call(makeRequest, 'POST',
        {
          email,
          password,
        }, 'profile/signup');
      yield call(resolve);
      yield put(directSignupSuccess(req.statusText));
      yield put(closeModal());
      yield put(openCustomSignIn());
    }catch (e) {
      yield call(reject,  { email: e.response.data.error });
      yield put(directSignupError(e));
    }
  }
}

// watcher for use logout requests
function* logoutRequestWatcher() {
  while (yield take(LOGOUT_REQUEST)) {
    try {
      // remove token and user data from local storage
      yield call(removeAuthToken);
      yield call(removeUserData);
      yield call(removeReturnUrl);
      yield put(logoutSuccess());
      // redirect to the home screen
      yield put(push('/'));
    } catch (e) {
      yield put(logoutError(e));
    }
  }
}

// watcher for user data requests
function* userRequestWatcher() {
  while (true) {
    try {
      const { payload: { profile, returnUrl, nonce } } = yield take(USER_REQUEST);
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        yield call(removeReturnUrl);
        let api = 'me';
        const req = yield call(makeRequest, 'GET', {}, api, {
          'X-Auth-Token': token,
        });

        if(req.data) {
          yield call(setUserData, req.data);
        }

        if(nonce && nonce.length > 0) {
          api = 'me?' + nonce;
          const forumData = yield call(makeRequest, 'GET', {}, api, {
            'X-Auth-Token': token,
          });
          let data = forumData.data;
          let payload = data.payload;
          let newSig = data.sig;
          const forumURL = FORUM_URL ? FORUM_URL : 'http://forum.gamesmith.com';
          const forumRedirect = forumURL + '/session/sso_login';
          window.location = forumRedirect + "?sso=" + payload + "&sig=" + newSig;
        } else if(!nonce && returnUrl && returnUrl.length > 0 && ((!req.data.isSuperuser && req.data.id !== 1)) ) { //patced for super admin users only.
          window.location = returnUrl;
        } else {
          if (req.data.isSuperuser || req.data.id === 1) {
            // if superuser, redirect to admin panel
            yield call(removeAuthToken);
            yield call(removeUserData);
            window.location = BACKEND_URL;
          } else {
            // else load the people
            yield call(setUserData, req.data);
            yield put(userSuccess(req.data));
            if (window.opener) {
              window.opener.location = profile ? '/maker/me?updated' : '/people';
              window.close();
            } else if (profile) { //only used for profile update.
              // const user = getUserData();
              window.location = req.data.recruiter ? '/recruiter' : '/maker/me?updated';
            } else {
              yield put(push('/people'));
            }
          }
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        yield call(removeReturnUrl);
        // redirect user to Home and show the unauthorized message
        yield put(userError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(userError(e));
      // if the current window is a popup close it
      // and redirect the parent window to error messsage
      if (window.opener) {
        window.opener.location = '/?error';
        window.close();
      } else {
        yield put(openMessage());
        yield put(push('/'));
      }
    }
  }
}

// watcher for pending connection requests
function* pendingRequestWatcher() {
  while (yield take(PENDING_REQUEST)) {
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'GET', {}, 'connections/pending', {
          'X-Auth-Token': token,
        });
        yield put(pendingSuccess(req.data));
      }
    } catch (e) {
      // console.log(e);
      yield put(pendingError(e));
    }
  }
}

// watcher for connection accept requests
function* acceptRequestWatcher() {
  while (true) {
    try {
      const { payload: { id } } = yield take(ACCEPT_REQUEST);
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'POST', {}, `connections/approve/${id}`, {
          'X-Auth-Token': token,
        });
        yield put(pendingRequest());
        yield put(acceptSuccess(req.statusText));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(acceptError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(acceptError(e));
      yield put(openMessage());
    }
  }
}

// watcher for connection reject requests
function* rejectRequestWatcher() {
  while (true) {
    try {
      const { payload: { id } } = yield take(REJECT_REQUEST);
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request user data
        const req = yield call(makeRequest, 'POST', {}, `connections/reject/${id}`, {
          'X-Auth-Token': token,
        });
        yield put(pendingRequest());
        yield put(rejectSuccess(req.statusText));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(rejectError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // console.log(e);
      yield put(rejectError(e));
      yield put(openMessage());
    }
  }
}

// watcher for message send requests
function* messageRequestWatcher() {
  while (true) {
    const { payload: { values: { subject, message }, receiverID, resolve, reject } } = yield take(MESSAGE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(makeRequest, 'POST', {
          receiverId: receiverID,
          subject,
          message,
        }, 'message', {
          'X-Auth-Token': token,
        });
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(messageSuccess(req.statusText));
        yield put(openMessage('Your Message Was Sent', 'blank'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(messageError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield call(reject, { message: 'Could not send message.' });
      yield put(messageError(e));
    }
  }
}

// watcher for invitation requests
function* inviteRequestWatcher() {
  while (true) {
    const { payload: { values: { email }, receiverID, resolve, reject } } = yield take(INVITE_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(makeRequest, 'POST', {
          makerid: receiverID,
          email,
        }, 'invitecolleague', {
          'X-Auth-Token': token,
        });
        // if successful resolve the form and show confirmation
        yield call(resolve);
        yield put(inviteSuccess(req.statusText));
        yield put(openMessage('Invitation Sent', `An invitation was emailed to ${email}`));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(inviteError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield call(reject, { email: 'Could not send invitation. This maker may have already been invited.' });
      yield put(inviteError(e));
    }
  }
}

// watcher for connection requests
function* connectRequestWatcher() {
  while (true) {
    const { payload: { id, page } } = yield take(CONNECT_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the message api
        const req = yield call(makeRequest, 'POST', {
          id,
        }, `connections/request/${id}`, {
          'X-Auth-Token': token,
        });
        // if successful refresh views and show confirmation
        if (page && page === 'people') {
          yield put(peopleRequest());
        } else if (page && page === 'maker') {
          yield put(makerRequest(id));
        }
        yield put(connectSuccess(req.statusText));
        yield put(openMessage('Connection Request Sent', 'blank'));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(connectError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield put(openMessage('Error Requesting Connection', 'blank'));
      yield put(messageError(e));
    }
  }
}

// watcher for add experience requests
function* addExpRequestWatcher() {
  while (true) {
    const { payload: { values: { currRole, currGame, currCompany, platforms, startDate, endDate, location = '' }, resolve, reject } } = yield take(ADD_EXP_REQUEST);
    try {
      if (platforms.filter(p => p.active).length < 1) {
        yield call(reject, { location: 'Platforms are required' });
      } else if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // update credits request
        const req = yield call(makeRequest, 'POST', JSON.stringify([{
          id: 0,
          score: 0,
          role: {
            id: -1,
            name: currRole,
          },
          game: {
            id: -1,
            name: currGame,
            platforms: [],
          },
          company: {
            id: -1,
            name: currCompany,
          },
          platforms: platforms.filter(p => p.active).map(m => ({
            id: m.id,
            displayName: '',
            names: [],
            icon: '',
          })),
          location,
          startDate: startDate ? startDate === 'Present' ? {
            year: parseInt(moment().format('YYYY'), 10),
            month: parseInt(moment().format('MM'), 10),
          } : {
            year: parseInt(moment(startDate).format('YYYY'), 10),
            month: parseInt(moment(startDate).format('MM'), 10),
          } : null,
          endDate: endDate ? endDate === 'Present' ? {
            year: parseInt(moment().format('YYYY'), 10),
            month: parseInt(moment().format('MM'), 10),
          } : {
            year: parseInt(moment(endDate).format('YYYY'), 10),
            month: parseInt(moment(endDate).format('MM'), 10),
          } : null,
        }]), `gamemaker/updatecredits/${id}`, {
          'X-Auth-Token': token,
          'Content-Type': 'application/json',
        });
        yield call(resolve);
        yield put(addExpSuccess(req.statusText));
        // this is just a generic modal used for displaying system messages
        // yield put(openMessage('Experience Added!', 'blank'));
        // yield put(push('/maker/me'));
        if(localStorage.getItem('onboarding') == 'true'){
          yield put(openAvailability());
          localStorage.removeItem('onboarding');
        } else{
          window.location = '/maker/me';
        }

      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(addExpError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield call(reject, { location: 'Could not add experience.' });
      yield put(addExpError(e));
    }
  }
}
// watcher for delete experience requests
function* deleteExpRequestWatcher() {
  while (true) {
    const { payload: { gameID } } = yield take(DELETE_EXP_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // delete credits request
        console.log(id, gameID);
        const req = yield call(makeRequest, 'POST', {}, `gamecredit/delete/${id}/${gameID}   `, {
          'X-Auth-Token': token,
        });
        yield put(deleteExpSuccess(req.statusText));
        // this is just a generic modal used for displaying system messages
        // yield put(openMessage('Experience Deleted', 'blank'));
        // yield put(push('/maker/me'));
        window.location = '/maker/me';
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(deleteExpError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield put(deleteExpError(e));
    }
  }
}

// watcher for apply SMS requests
function* applySmsRequestWatcher() {
  while (true) {
    const { payload: { values: { phone: phoneNumber }, resolve, reject, jobID } } = yield take(APPLY_SMS_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        const { id, maker } = yield call(getUserData);
        // update profile with provided phone number
        // regex formats the phone number for twilio api
        yield call(makeRequest, 'POST', { ...maker, phoneNumber: phoneNumber.replace(/[()\s-]+/g, '') }, `profile/update/${id}`, {
          'X-Auth-Token': token,
        });
        yield call(makeRequest, 'POST', {}, 'profile/sendsmsvalidationcode', { 'X-Auth-Token': token });
        yield call(resolve);
        yield put(applySmsSuccess('Sent sms with code'));
        yield put(openConfirmCode(jobID));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(applySmsError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield call(reject, { location: 'Could not verify phone' });
      yield put(applySmsError(e));
      yield put(openMessage('Error Submitting Phone Number', 'blank'));
    }
  }
}

// watcher for confirm code requests
function* confirmCodeRequestWatcher() {
  while (true) {
    const { payload: { values: { code: smsCode }, resolve, reject, jobID } } = yield take(CONFIRM_CODE_REQUEST);
    try {
      if (checkAuthToken()) {
        // check auth token for expiration
        const { token } = yield call(getAuthToken);
        yield call(makeRequest, 'POST', { smsCode }, 'profile/validatesmscode', { 'X-Auth-Token': token });
        yield call(resolve);
        yield put(confirmCodeSuccess('phone validated'));
        yield put(applyJobRequest(jobID));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield call(reject);
        yield put(confirmCodeError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      yield call(reject, { location: 'Could not verify phone' });
      yield put(confirmCodeError(e));
      yield put(openMessage('Error Confirming Code', 'Confirmation code is required for the message to be sent.'));
    }
  }
}

// watcher for pending connection requests
function* creditsRequestWatcher() {
  while (true) {
    const { payload: { credit, credits } } = yield take(CREDITS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        const { id } = yield call(getUserData);
        // add new credit to the credits array
        if (credit) {
          const index = indexOf(credits, find(credits, { id: credit.id }));
          credits.splice(index, 1, credit);
        }
        // update credits request
        const req = yield call(makeRequest, 'POST', {
          credits,
        }, `gamemaker/updatecredits/${id}`, {
          'X-Auth-Token': token,
        });
        yield put(updateCreditsSuccess(req.statusText));
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(addExpError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
      yield put(updateCreditsError(e));
    }
  }
}

// Watcher for autocomplete requests
function* autocompleteRequestWatcher() {
  while (true) {
    const { payload: { query, url, cb } } = yield take(GET_AUTOCOMPLETE_REQUEST);
    try {
      // check for empty query strings to prevent bad server requests
      if (!query.trim()) {
        yield call(cb, null, { options: [] });
        yield put(getAutocompleteSuccess('Empty query string submitted.'));
      // check auth token for expiration
      } else if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request autocomplete data
        const req = yield call(makeRequest, 'GET', {}, `autocomplete/${url}?q=${query}`, {
          'X-Auth-Token': token,
        });
        yield call(cb, null, { options: req.data });
        yield put(getAutocompleteSuccess('Successfully fetched suggestions!'));
      }
    } catch (e) {
      yield call(cb, { _error: 'Error fetching suggestions.' });
      yield put(getAutocompleteError(e));
    }
  }
}

// watcher for 'check details' requests
function* updateDetailsRequestWatcher() {
  while (true) {
    const { payload: { values: { firstName, lastName, currRole, currCompany, currGame }, resolve, reject } } = yield take(UPDATE_DETAILS_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the profile update api
        // in order for it to submit correctly we pull
        // the missing data fields from the user object
        const { id, maker: { phoneNumber, connections, credits, bio, availability, location, imgUrl, skills, accomplishments } } = yield call(getUserData);
        yield call(makeRequest, 'POST', {
          id,
          firstName,
          lastName,
          currRole,
          currCompany,
          currGame: "",
          phoneNumber,
          connections,
          credits,
          bio,
          availability,
          location,
          imgUrl,
          skills,
          accomplishments,
          additionalInfo: [
            {
              timesVerified: 0,
              availableAt: null,
              latestGameId: 0,
            }
          ],
        }, `profile/update/${id}`, {
          'X-Auth-Token': token,
        });
        // if successful resolve the form
        yield call(resolve);
        yield put(updateDetailsSuccess('Successfully updated profile!'));
        // update user data object
        const req = yield call(makeRequest, 'GET', {}, 'me', {
          'X-Auth-Token': token,
        });
        yield call(setUserData, req.data);
        yield put(userSuccess(req.data));
        // close modal
        yield put(closeModal());
        // if user has game credits, push to game verify page
        if (credits.length > 0) {
          yield put(push('/verify'));
        } else {
          if(localStorage.getItem('onboarding') != 'true'){
            localStorage.setItem('onboarding', 'true')
          }
          yield put(openAddExp());
          // yield put(openAvailability());
        }
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(updateDetailsError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: 'Error updating profile.' });
      yield put(updateDetailsError(e));
    }
  }
}

// watcher for availability requests
function* availabilityRequestWatcher() {
  while (true) {
    const { payload: { values: {availability, availableAt, location }, resolve, reject } } = yield take(AVAILABILITY_REQUEST);
    try {
      // check auth token for expiration
      if (checkAuthToken()) {
        const { token } = yield call(getAuthToken);
        // request the profile update api
        // in order for it to submit correctly we pull
        // the missing data fields from the user object
        const { id, maker: { firstName, lastName, currRole, currGame, currCompany, phoneNumber, connections, credits, bio, imgUrl, skills, accomplishments } } = yield call(getUserData);
        yield call(makeRequest, 'POST', {
          id,
          firstName,
          lastName,
          currRole,
          currCompany,
          currGame: "",
          phoneNumber,
          connections,
          credits,
          bio,
          availability,
          location,
          imgUrl,
          skills,
          accomplishments,
          additionalInfo: [
            {
              timesVerified: 0,
              availableAt: availability ? availability === 'Open at Future Date' ? availableAt ? availableAt : null : null : null,
              latestGameId: 0,
            }
          ],
        }, `profile/update/${id}`, {
          'X-Auth-Token': token,
        });
        // if successful resolve the form
        yield call(resolve);
        yield put(updateDetailsSuccess('Successfully updated profile!'));
        // update user data object
        const req = yield call(makeRequest, 'GET', {}, 'me', {
          'X-Auth-Token': token,
        });
        yield call(setUserData, req.data);
        yield put(availabilitySuccess(req.data));
        // push to game verify page
        yield put(push('/people?welcome'));
        yield put(closeModal());
      } else {
        // if expired remove token and user data
        yield call(removeAuthToken);
        yield call(removeUserData);
        // redirect user to Home and show the unauthorized message
        yield put(availabilityError('Login credentials have expired'));
        yield put(replace('/?unauthorized'));
      }
    } catch (e) {
      // if unauthorized reject the form and pass an error message
      yield call(reject, { _error: 'Error updating profile.' });
      yield put(availabilityError(e));
    }
  }
}

function* passwordLinkRequestWatcher() {
  while (true) {
    const { payload: { values: { email}, resolve, reject } } = yield take(PASSWORD_LINK_REQUEST);
    try {
      const req = yield call(makeRequest, 'POST',{ email }, 'resetpassword');
      yield call(resolve);
      yield put(passwordLinkSuccess(req.statusText));
      yield put(closeModal());
      yield put(openMessage('Password Request Sent','Reset password link successfully sent to your email.'));
    }catch (e) {
      yield call(reject, { email: e.response.data.error });
      yield put(passwordLinkError(e));
    }
  }
}

function* updatePasswordRequestWatcher() {
  while (true) {
    const { payload: { values: {newPassword}, resolve, reject } } = yield take(UPDATE_PASSWORD_REQUEST);
    try {

      const { token } = yield call(getAuthToken);

      if (newPassword) {
        const req = yield call(makeRequest, 'POST', {
          oldemail: localStorage.getItem('resetEmail'),
          oldpassword: localStorage.getItem('resetCode'),
          newpassword: newPassword,
        }, 'updatepassword', {
          'X-Auth-Token': token,
        });

        yield call(resolve);
        yield put(updatePasswordSuccess(req.statusText));
        yield put(closeModal());

        // remove temporary localstorage variable
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetCode');

        // get user data from local storage
        const user = getUserData();

        window.location = user.recruiter ? '/recruiter?resetpassword' : '/maker/me?resetpassword' ;
      }
    }catch (e) {
      console.log(e)
      // yield call(reject, { email: e.response.data.error });
      yield put(updatePasswordError(e));
    }
  }
}

export default [
  loginRequestWatcher,
  signupRequestWatcher,
  directSignupRequestWatcher,
  logoutRequestWatcher,
  userRequestWatcher,
  pendingRequestWatcher,
  acceptRequestWatcher,
  rejectRequestWatcher,
  messageRequestWatcher,
  inviteRequestWatcher,
  connectRequestWatcher,
  addExpRequestWatcher,
  deleteExpRequestWatcher,
  applySmsRequestWatcher,
  confirmCodeRequestWatcher,
  creditsRequestWatcher,
  autocompleteRequestWatcher,
  updateDetailsRequestWatcher,
  availabilityRequestWatcher,
  passwordLinkRequestWatcher,
  updatePasswordRequestWatcher,

];
