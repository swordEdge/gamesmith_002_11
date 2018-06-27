/*
 * Add experience form validation
 */

import { createValidator, required, Daterequired } from 'utils/validation';

const validate = createValidator({
  currRole: [required],
  currGame: [required],
  currCompany: [required],
  platforms: [required],
  startDate: [Daterequired],
  location: [required]
});

export default validate;
