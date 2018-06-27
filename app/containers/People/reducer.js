/*
 * People reducer
 */

import { fromJS } from 'immutable';
import {
  PEOPLE_REQUEST,
  PEOPLE_SUCCESS,
  PEOPLE_ERROR,
  TOGGLE_SEARCH,
  SEARCH_PEOPLE_REQUEST,
  SEARCH_PEOPLE_SUCCESS,
  SEARCH_PEOPLE_ERROR,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CLEAR_SEARCH_PEOPLE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isSearching: false,
  isLastPage: false,
  people: [],
  search: [],
  message: '',
});

function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case PEOPLE_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case PEOPLE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('people', fromJS(action.data))
        .set('message', '');
    case PEOPLE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case TOGGLE_SEARCH:
      return state
        .set('isSearching', !state.get('isSearching'));
    case SEARCH_PEOPLE_REQUEST:
      return state
        .set('isFetching', true)
        .set('isLastPage', false)
        .set('search', fromJS([]))
        .set('message', '');
    case SEARCH_PEOPLE_SUCCESS:
      return state
        .set('isFetching', false)
        .set('search', fromJS(action.data))
        .set('message', '');
    case SEARCH_PEOPLE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case NEXT_PAGE_REQUEST:
      return state
        .set('isFetching', true);
    case NEXT_PAGE_SUCCESS: {
      const target = state.get('isSearching') ? 'search' : 'people';
      return state
        .set('isFetching', false)
        .set(target, state.get(target).concat(action.data))
        .set('isLastPage', action.data.length < 20)
        .set('message', '');
    }
    case NEXT_PAGE_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case CLEAR_SEARCH_PEOPLE:
      return state
        .set('isFetching', false)
        .set('search', fromJS([]))
        .set('isLastPage', false)
        .set('isSearching', false);
    default:
      return state;
  }
}

export default peopleReducer;
