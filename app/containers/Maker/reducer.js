/*
 * Maker reducer
 */

import { fromJS } from 'immutable';
import {
  MAKER_REQUEST,
  MAKER_SUCCESS,
  MAKER_ERROR,
  VERIFY_CREDIT_REQUEST,
  VERIFY_CREDIT_SUCCESS,
  VERIFY_CREDIT_ERROR,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  message: '',
  maker: {},
});

function makerReducer(state = initialState, action) {
  switch (action.type) {
    case MAKER_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case MAKER_SUCCESS:
      return state
        .set('isFetching', false)
        .set('maker', fromJS(action.data))
        .set('message', 'test');
    case MAKER_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case VERIFY_CREDIT_REQUEST:
      return state
        .set('isFetching', true)
        .set('message', '');
    case VERIFY_CREDIT_SUCCESS:
      return state
        .set('isFetching', false)
        .set('message', 'verified credit');
    case VERIFY_CREDIT_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    default:
      return state;
  }
}

export default makerReducer;
