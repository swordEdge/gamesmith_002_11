/*
 * Jobs selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the jobs state domain
const selectJobsDomain = () => state => state.get('jobs');

// Default selector used by Jobs
const selectJobs = () => createSelector(
  selectJobsDomain(),
  state => state.get('jobs').toJS()
);
const selectSearch = () => createSelector(
  selectJobsDomain(),
  state => state.get('search').toJS()
);
const selectIsSearching = () => createSelector(
  selectJobsDomain(),
  state => state.get('isSearching')
);
const selectIsFetching = () => createSelector(
  selectJobsDomain(),
  state => state.get('isFetching')
);
const selectOffset = () => createSelector(
  [selectJobs(), selectSearch(), selectIsSearching()],
  (jobs, search, isSearching) => (isSearching ? search : jobs).length
);
const selectIsLastPage = () => createSelector(
  selectJobsDomain(),
  state => state.get('isLastPage')
);

// export selectPeople and selectSearch
export {
  selectJobs,
  selectSearch,
  selectIsSearching,
  selectIsFetching,
  selectOffset,
  selectIsLastPage,
};
