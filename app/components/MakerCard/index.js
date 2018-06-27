/*
 * Maker card
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { connectRequest } from 'containers/App/actions';
import {
  openMessaging,
  openInvite,
} from 'containers/Modals/actions';

import Avatar from 'components/UI/Avatar';
import Button from 'components/UI/Button';
import { getGameURLFromId } from '../../utils/hashingFunction';

import s from './styles.css';

const MakerCard = ({ id, currID, firstName, connection, claimed = false, avatar = '', lastName = '',
  platforms = '', currRole = '', currGame = '', currCompany = '', gameImage = '', onMessage, onInvite,
  onConnect, width, imageSm, imageLg, timesVerified}) => {
  const linkTo = `/maker/${id === currID ? 'me' : id}`;
  let button;

  console.log(width)

  if (id === currID) {
    button = <Button to="/edit" className={s.button} text="Edit Profile" color="transparent" />;
  } else if (!claimed) {
    button = <Button className={s.button} text="Invite" color="transparent" onClick={() => onInvite(id)} />;
  } else if (connection === 'yes') {
    button = <Button className={s.button} text="Message" onClick={() => onMessage(id, `${firstName} ${lastName}`)} />;
  } else if (connection === 'pending') {
    button = <Button className={s.button} text="Pending" color="transparent" />;
  } else {
    button = <Button className={s.button} text="Connect" onClick={() => onConnect({ id, page: 'people' })} />;
  }

  return (
    <div className={s.root} style={{ backgroundImage: `url('${ width < 767 ? imageSm : ''}')` }}>
      { (width < 767) && <div className={s.cusOverlay}></div>}
      <div className={s.flex} >
        { (width > 767) && <div className={s.maker}>
          <div>
            <Avatar className={s.avatar} linkTo={linkTo} image={avatar} firstName={firstName} lastName={lastName} />
            <Link to={linkTo}>
              {timesVerified > 0 ? <p className={s.verified} style={{ color: '#F8E81c', 'fontSize': '14px'}} data-tooltip="Professionally verified by fellow game makers">VERIFIED &#x2605; {timesVerified}</p> : ''}
            </Link>
          </div>
          <Link to={linkTo}>
            <h1>{`${firstName} ${lastName}`}</h1>
            {currRole && <h3><i className="icon-briefcase"></i>{currRole}</h3>}
          </Link>
        </div>}
        <div className={s.game} style={{ backgroundImage: `url('${ width < 767 ? '' : imageLg}')`, backgroundColor:  width < 767 ? 'transparent' : '#101010' }}>
          { (width > 767) && <div className={s.overlay}></div>}
          { (width < 767) && <div className={s.maker}>
            <div style={{ marginBottom: 20}}>
              <Avatar className={s.avatar} linkTo={linkTo} image={avatar} firstName={firstName} lastName={lastName} />
              <Link to={linkTo}>
                {timesVerified > 0 ? <p className={s.verified} style={{ color: '#F8E81c', 'fontSize': '14px'}} data-tooltip="Professionally verified by fellow game makers">VERIFIED &#x2605; {timesVerified}</p> : ''}
              </Link>
            </div>
            <Link to={linkTo}>
              <h1>{`${firstName} ${lastName}`}</h1>
              {currRole && <h3><i className="icon-briefcase"></i>{currRole}</h3>}
            </Link>
          </div>}
          <div>
            {currGame && <p>{currGame}</p>}
            {currCompany && <p>{currCompany}</p>}
            {platforms && <div className={s.platforms}>{platforms.map(p => <i key={p} className={`icon-${p}`} />)}</div>}
          </div>
          {button}
        </div>
        <Link to={linkTo}><button><i className="icon-forward" /></button></Link>
      </div>
    </div>
  );
};

MakerCard.propTypes = {
  id: PropTypes.number.isRequired,
  currID: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  connection: PropTypes.string.isRequired,
  claimed: PropTypes.bool,
  lastName: PropTypes.string,
  avatar: PropTypes.string,
  platforms: PropTypes.array,
  currRole: PropTypes.string,
  currGame: PropTypes.string,
  currCompany: PropTypes.string,
  gameImage: PropTypes.string,
  onMessage: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
    onMessage: (id, name) => dispatch(openMessaging(id, name)),
    onInvite: id => dispatch(openInvite(id)),
    onConnect: ({ id, page }) => dispatch(connectRequest({ id, page })),
  })
)(MakerCard);
