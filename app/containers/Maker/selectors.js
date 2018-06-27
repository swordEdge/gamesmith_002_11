/*
 * Maker selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the maker state domain
const selectMakerDomain = () => state => state.get('maker');

// Default selector used by Maker
// const selectMaker = () => createSelector(
//   selectMakerDomain(),
//   substate => substate.toJS()
// );

const selectMaker = () => createSelector(
  selectMakerDomain(),
  state => state.get('maker').toJS()
);

// export default selectMaker;
export {
  selectMaker,
};
