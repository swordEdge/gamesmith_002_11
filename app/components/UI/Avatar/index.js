/*
 * Avatar component
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import s from './styles.css';

const Avatar = ({ linkTo, image, firstName = '', lastName, withText, className, ...rest }) => {
  const initials = `${firstName.slice(0, 1)}${lastName ? `${lastName.slice(0, 1)}` : ''}`;

  return (
    linkTo ? <Link to={linkTo} {...rest}>
      <div className={`${s.wrapper} ${className || ''}`}>
        {image
          ? <img className={s.avatar} src={image} alt={initials} />
          : <div>{initials}</div>}
      </div>
      {withText && `${firstName}${lastName ? ` ${lastName.slice(0, 1)}` : ''}`}
    </Link> : <a {...rest}>
      <div className={`${s.wrapper} ${className || ''}`}>
        {image
          ? <img className={s.avatar} src={image} alt={initials} />
          : <div>{initials}</div>}
      </div>
      {withText && `${firstName}${lastName ? ` ${lastName.slice(0, 1)}` : ''}`}
    </a>
  );
};

Avatar.propTypes = {
  linkTo: PropTypes.string,
  image: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  withText: PropTypes.bool,
  className: PropTypes.string,
};

export default Avatar;
