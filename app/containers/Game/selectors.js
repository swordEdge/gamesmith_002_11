/*
 * Game selectors
 */

import { createSelector } from 'reselect';

// Direct selector to the game state domain
const selectGameDomain = () => state => state.get('game');

// Default selector used by Game
const selectGame = () => createSelector(
  selectGameDomain(),
  state => state.get('game').toJS()
);

const selectIsFetching = () => createSelector(
  selectGameDomain(),
  state => state.get('isFetching')
);


// export default selectGame;
export {
  selectGame,
  selectIsFetching,
};
