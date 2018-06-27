/*
 * Details form validation
 */

import { createValidator, required, email } from 'utils/validation';

const validate = createValidator({
  firstName: [required],
  lastName: [required],
  email: [email, required],
});

export default validate;
