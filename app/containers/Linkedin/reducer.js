/*
 * Linkedin reducer
 */

import { fromJS } from 'immutable';
import {
  LOGIN_REQUEST,
  JOIN_REQUEST,
  MAKER_REQUEST,
} from './constants';

// The initial state of Linkedin
const initialState = fromJS({
  message: '',
});

function linkedinReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state
        .set('message', '');
    case JOIN_REQUEST:
      return state
        .set('message', '');
    case MAKER_REQUEST:
      return state
        .set('message', '');
    default:
      return state;
  }
}

export default linkedinReducer;
