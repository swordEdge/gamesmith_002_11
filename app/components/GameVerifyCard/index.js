/*
 * Game Verify card
 */

import React, { PropTypes } from 'react';

import s from './styles.css';

const GameVerifyCard = ({ id, role, game, company, onVerify }) => (
  <div id={`game-${id}`} className={s.root}>
    <div className={s.content}>
      <h2>{role}</h2>
      {game && <h3><small>Game: </small>{game}</h3>}
      {game && <h3><small>Company: </small>{company}</h3>}
      <div className={s.buttons}>
        <i onClick={() => { document.getElementById(`game-${id}`).classList.add('hidden'); onVerify(id, 'no'); }} className="icon-no" />
        <i onClick={() => { document.getElementById(`game-${id}`).classList.add('hidden'); onVerify(id, 'yes'); }} className="icon-yes" />
      </div>
    </div>
  </div>
);

GameVerifyCard.propTypes = {
  id: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  company: PropTypes.string,
  onVerify: PropTypes.func.isRequired,
};

export default GameVerifyCard;
