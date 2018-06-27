/*
 * Modal selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the modal state domain
const selectModalDomain = () => state => state.get('modal');

// Default selector used by Modal
const selectModal = () => createSelector(
  selectModalDomain(),
  substate => substate.toJS()
);

export default selectModal;
