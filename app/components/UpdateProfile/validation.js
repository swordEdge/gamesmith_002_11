/*
 * Update Profile validation
 */

import { createValidator, required } from 'utils/validation';

const validate = createValidator({
  firstName: [required],
  lastName: [required],
});

export default validate;
