/*
 * Recruiter selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the recruiter state domain
const selectRecruiterDomain = () => state => state.get('recruiter');

// Default selector used by Recruiter
const selectRecruiter = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('recruiter').toJS()
);

const selectJobs = () => createSelector(
  selectRecruiterDomain(),
  state => state.get('postedJobs').toJS()
);

export {
  selectRecruiter,
  selectJobs,
};
