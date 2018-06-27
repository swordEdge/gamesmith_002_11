/*
 * People actions
 */

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

// get people action creators
export function peopleRequest() {
  return {
    type: PEOPLE_REQUEST,
  };
}

export function peopleSuccess(data) {
  return {
    type: PEOPLE_SUCCESS,
    data,
  };
}

export function peopleError(message) {
  return {
    type: PEOPLE_ERROR,
    message,
  };
}

export function toggleSearch() {
  return {
    type: TOGGLE_SEARCH,
  };
}

export function searchPeopleRequest(query) {
  return {
    type: SEARCH_PEOPLE_REQUEST,
    payload: {
      query,
    },
  };
}

export function searchPeopleSuccess(data) {
  return {
    type: SEARCH_PEOPLE_SUCCESS,
    data,
  };
}

export function searchPeopleError(message) {
  return {
    type: SEARCH_PEOPLE_ERROR,
    message,
  };
}

export function nextPageRequest(url, offset, query) {
  return {
    type: NEXT_PAGE_REQUEST,
    payload: {
      url,
      offset,
      query,
    },
  };
}

export function nextPageSuccess(data) {
  return {
    type: NEXT_PAGE_SUCCESS,
    data,
  };
}

export function nextPageError(message) {
  return {
    type: NEXT_PAGE_ERROR,
    message,
  };
}

export function clearSearchPeople() {
  return {
    type: CLEAR_SEARCH_PEOPLE,
  };
}
