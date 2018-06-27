/*
 * Header actions
 */

import {
  OPEN_MENU,
  CLOSE_MENU,
} from './constants';

export function openMenu() {
  return {
    type: OPEN_MENU,
  };
}

export function closeMenu() {
  return {
    type: CLOSE_MENU,
  };
}
