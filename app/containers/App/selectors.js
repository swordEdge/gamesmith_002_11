/*
 * App selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the app state domain
const selectAppDomain = () => state => state.get('app');

// Default selector used by App
const selectApp = () => createSelector(
  selectAppDomain(),
  substate => substate.toJS()
);

const selectAuth = () => createSelector(
  selectAppDomain(),
  state => state.get('authenticated')
);

const selectUser = () => createSelector(
  selectAppDomain(),
  state => state.get('user').toJS()
);

const selectRequests = () => createSelector(
  selectAppDomain(),
  state => state.get('requests').toJS()
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route');

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export default selectApp;
export {
  selectAuth,
  selectUser,
  selectRequests,
  selectLocationState,
};
