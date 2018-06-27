/*
 * Job selectors
 */

import { createSelector } from 'reselect';

import { selectUser } from 'containers/App/selectors';

// Direct selector to the job state domain
const selectJobDomain = () => state => state.get('job');

// Default selector used by Job
const selectJob = () => createSelector(
  selectJobDomain(),
  job => job.toJS()
);

const selectPhoneValidated = () => createSelector(
  selectUser(),
  user => (user.maker ? user.maker.phoneNumberValidated : user.recruiter.phoneNumberValidated)
);

export default selectJob;

export {
  selectPhoneValidated,
};
