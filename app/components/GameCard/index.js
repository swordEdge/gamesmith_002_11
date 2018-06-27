/*
 * Game card
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Avatar from 'components/UI/Avatar';

import s from './styles.css';

const GameCard = ({ gameID, title, width, makerCount, makers, studio = '', imageSm = '', imageLg = '' }) => {
  // maximum number of makers to display based on layout style
  const MAX = width < 767 ? 4 : 6;
  let makersWrapper;

  if (makers) {
    makersWrapper = (
      <div className={s.makers}>
        {makers.map((m, idx) => idx < MAX && <Avatar key={idx} className={s.avatar} image={m.imgUrl} firstName={m.firstName} lastName={m.lastName} linkTo={`maker/${m.id}`} />)}
        {(makerCount && makers && makerCount > makers.length) &&
          <p className={s.more}>and {makerCount - makers.length} more</p>}
      </div>
    );
  }

  return (
    <div className={s.root}>
      <div className={s.overlay}></div>
      <div className={s.content} style={{ backgroundImage: `url('${width < 767 ? imageSm : imageLg}')` }}>
        <div className={s.info}>
          <Link to={`/game/${gameID}`}>
            <h1>{title}</h1>
          </Link>
          {studio && <p className={s.studio}>{studio}</p>}
          {makersWrapper}
        </div>
        <div className={s.extra}>
          {studio && <Link to={`/game/${gameID}`}><p>{studio}</p></Link>}
        </div>
      </div>
      <Link to={`/game/${gameID}`}>
        <button><i className="icon-forward" /></button>
      </Link>
    </div>
  );
};

GameCard.propTypes = {
  gameID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  studio: PropTypes.string,
  makers: PropTypes.array,
  makerCount: PropTypes.number,
  imageSm: PropTypes.string,
  imageLg: PropTypes.string,
};

export default GameCard;
