/*
 * Game Details card
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { uniq } from 'lodash';
import moment from 'moment';
import Button from 'components/UI/Button';

import s from './styles.css';

const getIcon = (icon) => {
  switch (icon) {
    case 'PS3':
    case 'PS4':
    case 'PSP':
      return 'playstation';
    case 'Xbox 360':
    case 'Xbox One':
      return 'xbox';
    case 'iOS':
      return 'apple';
    case 'Browser':
      return 'web';
    case 'PC':
      return 'windows';
    case 'Android':
    case 'AR':
    case 'VR':
    case 'DS':
      return icon.toLowerCase();
    default:
      return 'controller';
  }
};

const GameDetailsCard = ({ gameID, title, endDate, studio = '', image = '', location = '', platforms = '', onDeleteExp, makerID, userID, onVerifyCredit, creditID, verified, imageLg = '',imageSm = '',width}) => {
  const MAX = width < 767 ? 4 : 6;
  const platformList = uniq(platforms.map(p => getIcon(p.displayName)));
  const verifyIcon = verified ? <i className={`icon-star ${s.verifyCheck}`}/> : <i className={`icon-circle-check ${s.verifyCheck}`}/>;
  return (
    <div className={s.root}>
      <Link>
        <div className={s.overlay}></div>
        <div className={s.content} style={{ backgroundImage: `url('${width < 767 ? imageSm : imageLg}')` }}>
          <h1>{title}</h1>
          {studio && <p>{studio}</p>}
          {platforms && <div className={s.platforms}>{platformList.map((p, idx) => <i key={idx} className={`icon-${p}`} />)}</div>}
          <div className={s.buttonsContainer}>
            { makerID === userID &&
              <Button
                to="/maker/me"
                onClick={() => onDeleteExp(creditID)}
                className={s.buttoner}
                text="Delete"
                color="transparent" />}
            { makerID !== userID &&
              <span
                className={s.verifyButton}
                onClick={() => onVerifyCredit('yes', creditID , makerID)}>
                {verifyIcon} {verified ? 'Verified' : 'Verify'}
              </span>}
          </div>
        </div>
        {endDate || location ?
         <div className={s.extra}>
          {endDate && <p className={s.gameCard}>{moment(`${endDate.month}, ${endDate.year}`, 'MM, YYYY').format('MMMM YYYY')}</p>}
          {location && <p className={s.location}><i className="icon-pin" />{location}</p>}
        </div> : null }
      </Link>
    </div>
  );
};

GameDetailsCard.propTypes = {
  gameID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  platforms: PropTypes.array.isRequired,
  studio: PropTypes.string,
  endDate: PropTypes.object,
  image: PropTypes.string,
  location: PropTypes.string,
  onDeleteExp: PropTypes.func,
  makerID: PropTypes.number,
  userID: PropTypes.number,
  creditID: PropTypes.number,
  onVerifyCredit: PropTypes.func,
  verified: PropTypes.bool,
  imageLg: PropTypes.string,
  imageSm: PropTypes.string,
  width: PropTypes.number.isRequired,
};

export default GameDetailsCard;
