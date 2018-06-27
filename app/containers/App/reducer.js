/*
 * App reducer
 */

import { fromJS } from 'immutable';
import { checkAuthToken, getUserData } from 'utils';
import {
  DIRECT_SIGNUP_REQUEST,
  DIRECT_SIGNUP_SUCCESS,
  DIRECT_SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  PENDING_REQUEST,
  PENDING_SUCCESS,
  PENDING_ERROR,
  ACCEPT_REQUEST,
  ACCEPT_SUCCESS,
  ACCEPT_ERROR,
  REJECT_REQUEST,
  REJECT_SUCCESS,
  REJECT_ERROR,
  MESSAGE_REQUEST,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_ERROR,
  CONNECT_REQUEST,
  CONNECT_SUCCESS,
  CONNECT_ERROR,
  ADD_EXP_REQUEST,
  ADD_EXP_SUCCESS,
  ADD_EXP_ERROR,
  DELETE_EXP_REQUEST,
  DELETE_EXP_SUCCESS,
  DELETE_EXP_ERROR,
  APPLY_SMS_REQUEST,
  APPLY_SMS_SUCCESS,
  APPLY_SMS_ERROR,
  CONFIRM_CODE_REQUEST,
  CONFIRM_CODE_SUCCESS,
  CONFIRM_CODE_ERROR,
  CREDITS_REQUEST,
  CREDITS_SUCCESS,
  CREDITS_ERROR,
  GET_AUTOCOMPLETE_REQUEST,
  GET_AUTOCOMPLETE_SUCCESS,
  GET_AUTOCOMPLETE_ERROR,
  UPDATE_DETAILS_REQUEST,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_ERROR,
  AVAILABILITY_REQUEST,
  AVAILABILITY_SUCCESS,
  AVAILABILITY_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  checkingToken: false,
  isFetching: false,
  authenticated: checkAuthToken(),
  message: '',
  user: getUserData() || {},
  requests: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // login actions
    case DIRECT_SIGNUP_REQUEST:
      return state
        .set('message', '');
    case DIRECT_SIGNUP_SUCCESS:
      return state
        .set('message', action.message);
    case DIRECT_SIGNUP_ERROR:
      return state
        .set('message', action.message);
    case SIGNUP_REQUEST:
      return state
        .set('message', '');
    case SIGNUP_SUCCESS:
      return state
        .set('message', action.message);
    case SIGNUP_ERROR:
      return state
        .set('message', action.message);
    case LOGIN_REQUEST:
      return state
        .set('message', '');
    case LOGIN_SUCCESS:
      return state
        .set('authenticated', true)
        .set('message', action.message);
    case LOGIN_ERROR:
      return state
        .set('message', action.message);
    // logout actions
    case LOGOUT_REQUEST:
      return state
        .set('authenticated', true)
        .set('message', '');
    case LOGOUT_SUCCESS:
      return state
        .set('authenticated', false)
        .set('message', action.message);
    case LOGOUT_ERROR:
      return state
        .set('message', action.message);
    // user data actions
    case USER_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case USER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('authenticated', true)
        .set('user', fromJS(action.data))
        .set('message', '');
    case USER_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // pending requests actions
    case PENDING_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case PENDING_SUCCESS:
      return state
        .set('isFetching', false)
        .set('requests', fromJS(action.data))
        .set('message', '');
    case PENDING_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // connection accept actions
    case ACCEPT_REQUEST:
      return state
        .set('message', '');
    case ACCEPT_SUCCESS:
      return state
        .set('message', action.message);
    case ACCEPT_ERROR:
      return state
        .set('message', action.message);
    // connection reject actions
    case REJECT_REQUEST:
      return state
        .set('message', '');
    case REJECT_SUCCESS:
      return state
        .set('message', action.message);
    case REJECT_ERROR:
      return state
        .set('message', action.message);
    // messaging actions
    case MESSAGE_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case MESSAGE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', '');
    case MESSAGE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // maker invite actions
    case INVITE_REQUEST:
      return state
        .set('message', '');
    case INVITE_SUCCESS:
      return state
        .set('message', action.message);
    case INVITE_ERROR:
      return state
        .set('message', action.message);
    // maker connect actions
    case CONNECT_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case CONNECT_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case CONNECT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // add experience actions
    case ADD_EXP_REQUEST:
      return state
        .set('message', '');
    case ADD_EXP_SUCCESS:
      return state
        .set('message', action.message);
    case ADD_EXP_ERROR:
      return state
        .set('message', action.message);
    // add experience actions
    case DELETE_EXP_REQUEST:
      return state
        .set('message', '');
    case DELETE_EXP_SUCCESS:
      return state
        .set('message', action.message);
    case DELETE_EXP_ERROR:
      return state
        .set('message', action.message);
    // apply SMS actions
    case APPLY_SMS_REQUEST:
      return state
        .set('message', '');
    case APPLY_SMS_SUCCESS:
      return state
        .set('message', action.message);
    case APPLY_SMS_ERROR:
      return state
        .set('message', action.message);
    // confirm code actions
    case CONFIRM_CODE_REQUEST:
      return state
        .set('message', '');
    case CONFIRM_CODE_SUCCESS:
      return state
        .set('message', action.message);
    case CONFIRM_CODE_ERROR:
      return state
        .set('message', action.message);
    // update credits actions
    case CREDITS_REQUEST:
      return state
        .set('message', '');
    case CREDITS_SUCCESS:
      return state
        .set('message', action.message);
    case CREDITS_ERROR:
      return state
        .set('message', action.message);
    // autocomplete actions
    case GET_AUTOCOMPLETE_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case GET_AUTOCOMPLETE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case GET_AUTOCOMPLETE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    // check details actions
    case UPDATE_DETAILS_REQUEST:
      return state
        .set('message', '');
    case UPDATE_DETAILS_SUCCESS:
      return state
        .set('message', action.message);
    case UPDATE_DETAILS_ERROR:
      return state
        .set('message', action.message);
    // availability actions
    case AVAILABILITY_REQUEST:
      return state
        .set('message', '');
    case AVAILABILITY_SUCCESS:
      return state
        .set('message', action.message);
    case AVAILABILITY_ERROR:
      return state
        .set('message', action.message);
    default:
      return state;
  }
}

export default appReducer;
