/*
 * Settings selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the settings state domain
const selectSettingsDomain = () => state => state.get('settings');

// Default selector used by Settings
const selectSettings = () => createSelector(
  selectSettingsDomain(),
  state => state.toJS()
);

// export default selectSettings;
export {
  selectSettings,
};
