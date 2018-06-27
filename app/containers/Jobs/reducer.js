/*
 * Jobs reducer
 */

import { fromJS } from 'immutable';
import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_ERROR,
  TOGGLE_SEARCH,
  SEARCH_JOBS_REQUEST,
  SEARCH_JOBS_SUCCESS,
  SEARCH_JOBS_ERROR,
  NEXT_PAGE_REQUEST,
  NEXT_PAGE_SUCCESS,
  NEXT_PAGE_ERROR,
  CLEAR_SEARCH_PEOPLE,
} from './constants';

const initialState = fromJS({
  isFetching: false,
  isSearching: false,
  isLastPage: false,
  jobs: [],
  search: [],
  message: '',
});

function jobsReducer(state = initialState, action) {
  switch (action.type) {
    case JOBS_REQUEST:
      return state
        .set('isFetching', true)
        .set('isSearching', false)
        .set('message', '');
    case JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('jobs', fromJS(action.data))
        .set('message', '');
    case JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case TOGGLE_SEARCH:
      return state
        .set('isSearching', !state.get('isSearching'));
    case SEARCH_JOBS_REQUEST:
      return state
        .set('isFetching', true)
        .set('isLastPage', false)
        .set('search', fromJS([]))
        .set('message', '');
    case SEARCH_JOBS_SUCCESS:
      return state
        .set('isFetching', false)
        .set('jobs', fromJS(action.data))
        .set('message', '');
    case SEARCH_JOBS_ERROR:
      return state
        .set('isFetching', false)
        .set('message', action.message);
    case NEXT_PAGE_REQUEST:
      return state
        .set('isFetching', true);
    case NEXT_PAGE_SUCCESS: {
      const target = state.get('isSearching') ? 'search' : 'jobs';
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

export default jobsReducer;
