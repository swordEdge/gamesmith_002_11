/*
 * Availability validation
 */

import { createValidator, required } from 'utils/validation';

const validate = createValidator({
  availability: [required],
  location: [required],
});

export default validate;
