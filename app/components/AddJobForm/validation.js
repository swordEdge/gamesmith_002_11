/*
 * AddJobForm validation
 */

import { createValidator, required, Daterequired } from 'utils/validation';

const validate = createValidator({
  role: [required],
  company: [required],
  startDate: [Daterequired],
  location: [required],
  description: [required],
});

export default validate;
