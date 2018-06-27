const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function email(value) {
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function required(value) {
  if (isEmpty(value) || value[0] === undefined) {
    return 'Required';
  }
}

export function Daterequired(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
}

export function boolean(value) {
  if (value !== true) {
    return 'Required';
  }
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function match(field, name) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return `Must match ${name}`;
      }
    }
  };
}

export function notMatch(field, text) {
  return (value, data) => {
    if (data && !isEmpty(data[field])) {
      if (value === data[field]) {
        return `Must be different from ${text}`;
      }
    }
  };
}
