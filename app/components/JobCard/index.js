/*
 * Job card
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Button from 'components/UI/Button';

import s from './styles.css';

const JobCard = ({ id, title, applied, date = '',imgUrl, location = '', company = '', recruiter, toggleEditJob }) => (
  <div className={s.root}>
    <Link to={`/job/${id}`}>
      <div className={s.content}>
        <div className={s.info}>
          <h1>{title}</h1>
          {company && <p>{company}</p>}
        </div>
        <div className={s.extra} >
          <div>
            {date && <p>{date}</p>}
            {location && <p><i className="icon-pin" />{location}</p>}
          </div>
          {!recruiter ? <Button
            className={s.button}
            text={applied ? 'Applied' : 'Interested'}
            color={applied ? 'transparent-job' : 'yellow'} /> :
            <Button
              className={s.button}
              text="Edit Job"
              onClick={() => toggleEditJob}/>
          }
        </div>
      </div>
      <button><i className="icon-forward" /></button>
    </Link>
  </div>
);

JobCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  company: PropTypes.string,
  recruiter: PropTypes.bool,
  applied: PropTypes.bool,
  date: PropTypes.string,
  location: PropTypes.string,
  imgUrl: PropTypes.string,
  toggleEditJob: PropTypes.func,
};


export default JobCard;
