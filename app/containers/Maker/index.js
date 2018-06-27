/*
 * Maker container
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import { getGameURLFromId } from '../../utils/hashingFunction';

import { slice } from 'lodash';
import { makerRequest, verifyCreditRequest } from './actions';
import { connectRequest } from 'containers/App/actions';
import {
  openMessaging,
  openInvite,
  openAddExp,
  openDeleteExp,
} from 'containers/Modals/actions';

import { selectMaker } from './selectors';
import { selectUser } from 'containers/App/selectors';

import Avatar from 'components/UI/Avatar';
import Button from 'components/UI/Button';
import GameDetailsCard from 'components/GameDetailsCard';

import s from './styles.css';

class Maker extends Component {

  componentWillMount() {
    const { params: { makerID }, user, onGetMaker } = this.props;
    onGetMaker(makerID === 'me' ? user.id : makerID);
  }

  componentWillUpdate(nextProps) {
    const { params: { makerID }, user, onGetMaker } = this.props;
    const nextID = nextProps.params.makerID;
    if (nextID !== makerID) {
      onGetMaker(nextID === 'me' ? user.id : nextID);
    }
  }

  // componentDidUpdate() {
  //   const { params: { makerID }, user, onGetMaker } = this.props;
  //   onGetMaker(makerID === 'me' ? user.id : makerID);
  // }

  moreAbout = () => {
    this.about.classList.remove('preview');
  }

  moreSkills = () => {
    this.skills.classList.remove('preview');
  }

  moreAccomplishments = () => {
    this.accomplishments.classList.remove('preview');
  }

  render() {
    const { params: { makerID }, win, user, maker, onMessage, onInvite, onAddExp, onConnect, onDeleteExp, onVerifyCredit, verify } = this.props; // eslint-disable-line
    // redirect to recruiter page if needed
    const currUser = makerID === 'me';
    const m = maker || {};
    const u = user || {};
    
    if(m && m.additionalInfo && m.additionalInfo[0] && m.additionalInfo[0].availableAt){
      console.log(new Date(m.additionalInfo[0].availableAt));
    }

    const verified = m.credits && (m.credits.reduce((score, credit) => score + credit.score, 0) > 0);
    const timesVerified = verified && (m.credits.reduce((score, credit) => score + credit.score, 0));
    let imgUrl = null;
    if (m) {
      imgUrl = m.imgUrl;
    } else {
      ({}.hasOwnProperty.call(user, 'recruiter')) ? imgUrl = user.recruiter.logo : null;
      imgUrl = ({}.hasOwnProperty.call(u, 'recruiter')) ? user.recruiter.logo : null;
    }
    let history;
    let button;

      history = (
        <section className={s.history}>
          <div className={s.top}>
            <h1>Game History</h1>
            {currUser && <Button text="Add Game" onClick={onAddExp} />}
          </div>
          <div className={s.games}>
            {m.credits && m.credits.length > 0 ? m.credits.map((g, idx) => (
                <GameDetailsCard
                  key={idx}
                  gameID={g.game && g.game.id}
                  makerID={m.id}
                  endDate={g.endDate}
                  location={g.location}
                  platforms={g.platforms}
                  title={g.game && g.game.name}
                  studio={g.company && g.company.name}
                  onDeleteExp={onDeleteExp}
                  userID={u.id}
                  creditID={g.id}
                  onVerifyCredit={onVerifyCredit}
                  verified={g.verification}
                  width={win.width}
                  imageSm={g.game ? getGameURLFromId(g.game.id.toString(), '550x520') : null}
                  imageLg={g.game ? getGameURLFromId(g.game.id.toString(), '1500x400') : null}/>
              )) : <h3>There are no games to display</h3>}
          </div>
        </section>
      );

    if (currUser) {
      button = <Button to="/edit" className={s.button} style={{ border: 0}} text="Edit Profile" color="transparent" />;
    } else if (!m.claimed) {
      button = <Button text="Invite" color="transparent" onClick={() => onInvite(m.id)} />;
    } else if (m.connected) {
      button = <Button text="Message" onClick={() => onMessage(m.id, `${m.firstName} ${m.lastName}`)} />;
    } else if (m.connectPending) {
      button = <Button text="Pending" color="transparent" />;
    } else {
      button = <Button text="Connect" onClick={() => onConnect({ id: m.id, page: 'maker' })} />;
    }

    /* eslint-disable no-mixed-operators */
    return (
      <main role="main" className={s.root}>
        <div className="row">
          <div className={s.profile}>
            <div className={s.user}>
              <Avatar className={s.avatar} linkTo="/maker/me" image={imgUrl} firstName={m.firstName} lastName={m.lastName} />
              {m.firstName && <h3>{`${m.firstName} ${m.lastName || ''}`}</h3>}
              {verified && <span className={s.verified} data-tooltip="Professionally verified by fellow game makers">Verified &#x2605; {timesVerified} Games</span>}
              {m.currRole && <h4>{m.currRole}</h4>}
              {button}
            </div>
            {((m.additionalInfo && m.additionalInfo.length > 0) || m.currCompany || m.location) && <div className={s.info}>
              <ul>
                {m.additionalInfo && m.additionalInfo.length > 0 && <li>
                  <i className="icon-controller"></i>
                  <span>{m.additionalInfo[0]["latestGameName"]}</span>
                </li>}
                {m.currCompany && <li>
                  <i className="icon-briefcase"></i>
                  <span>{m.currCompany}</span>
                </li>}
                {m.location && <li>
                  <i className="icon-pin"></i>
                  <span>{m.location}</span>
                </li>}
                {/*{m.availability && <li>*/}
                  {/*{m.availability == 'Not Available' ? <i className="fa fa-window-close-o"></i>*/}
                    {/*: <i className="fa fa-check-square-o"></i> }*/}
                  {/*<span>{m.availability}</span>*/}
                  {/*{m.availability == "Open at Future Date" && m.additionalInfo && m.additionalInfo[0].availableAt &&*/}
                  {/*<span className={s.smalldate}>*/}
                    {/*&nbsp;( {moment(new Date(m.additionalInfo[0].availableAt)).format('MM-DD-YYYY') }  )*/}
                  {/*</span>*/}
                  {/*}*/}
                {/*</li>}*/}
              </ul>
            </div>}
            { (currUser || m.availability) && 
                <div className={`${s.avail}`}>
                {m.availability && <p className={s.pAvail}>
                  {m.availability == 'Not Available' ? <i className="fa fa-window-close-o"></i>
                    : <i className="fa fa-check-square-o"></i> }
                  <span> {m.availability}</span>
                  {m.availability == "Open at Future Date" && m.additionalInfo && m.additionalInfo[0] && m.additionalInfo[0].availableAt &&
                    <span className={s.smalldate}>
                      &nbsp;( {moment(m.availableDate).format("DD/MM/YYYY") }  )
                    </span>
                  }</p>}
                { currUser &&
                <div style={{textAlign: 'center', marginBottom: 10}}>
                  <Button
                    to="/edit"
                    text="Edit Work Availability"
                    color={'yellow'}
                    className={`${s.btnAvail}`}/>
                </div>
                }
              </div>
            }



            <div
              ref={(c) => { this.about = c; }}
              className={`${s.about} ${m.bio && m.bio.length > 240 ? 'preview' : ''}`}>
              <h3>About</h3>
              <p>{m.bio || (currUser ? 'Click the Edit Profile button above to add some details about yourself.' : 'Apparently, this maker prefers to keep an air of mystery about them.')}</p>
              <div className={s.more}>
                <a onClick={() => this.moreAbout()}>Read More</a>
              </div>
            </div>

            {m.skills && <div
              ref={(c) => { this.skills = c; }}
              className={`${s.about} ${m.skills.length > 240 ? 'preview' : ''}`}>
              <h3>Skills</h3>
              <p>{m.skills}</p>
              <div className={s.more}>
                <a onClick={() => this.moreSkills()}>Read More</a>
              </div>
            </div>}

            {m.accomplishments && <div
              ref={(c) => { this.accomplishments = c; }}
              className={`${s.about} ${m.accomplishments.length > 240 ? 'preview' : ''}`}>
              <h3>Accomplishments</h3>
              <p>{m.accomplishments}</p>
              <div className={s.more}>
                <a onClick={() => this.moreAccomplishments()}>Read More</a>
              </div>
            </div>}

            <div className={s.connections}>
              <h3>Industry Connections</h3>
              {m.connections && m.connections.length > 0 ? slice(m.connections, 0, 3).map((c, idx) => (
                  <div key={idx} className={s.connection}>
                    <Avatar className={s.img} linkTo={`/maker/${c.id}`} image={c.imgUrl} firstName={c.firstName} lastName={c.lastName} />
                    <Link to={`/maker/${c.id}`}>
                      <div>
                        <h4>{`${c.firstName || ''} ${c.lastName || ''}`}</h4>
                        {c.currCompany && <h5>{c.currCompany}</h5>}
                      </div>
                    </Link>
                    {c.id !== user.id && <i onClick={() => onMessage(c.id, `${c.firstName || ''} ${c.lastName || ''}`)} className="icon-mail" />}
                  </div>
                )) : <p>{currUser ? "You haven't connected with any other makers yet." : "This maker hasn't connected with any others yet. Why not send them a request?"}</p>}
              <div className={s.all}>
                <Link to={`/maker/${makerID}/connections`}>See All</Link>
              </div>
            </div>

            <Link to={`/maker/${makerID}/connections`} className={s.link}>Industry Connections</Link>
            <Link to={`/maker/${makerID}/games`} className={s.link}>Game History</Link>
          </div>
          {history}
        </div>
      </main>
    );
  }
}

Maker.propTypes = {
  params: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  maker: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    claimed: PropTypes.bool,
    connected: PropTypes.bool,
    connectPending: PropTypes.bool,
    lastName: PropTypes.string,
    location: PropTypes.string,
    currRole: PropTypes.string,
    currCompany: PropTypes.string,
    currGame: PropTypes.string,
    credits: PropTypes.array,
    connections: PropTypes.array,
  }),
  win: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  onGetMaker: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  onInvite: PropTypes.func.isRequired,
  onAddExp: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onDeleteExp: PropTypes.func.isRequired,
  onVerifyCredit: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
  }),
  dispatch => ({
    dispatch,
    onGetMaker: id => dispatch(makerRequest(id)),
    onMessage: (id, name) => dispatch(openMessaging(id, name)),
    onInvite: id => dispatch(openInvite(id)),
    onAddExp: () => dispatch(openAddExp()),
    onVerifyCredit: (decision, id , makerID) => dispatch(verifyCreditRequest(decision, id , makerID)),
    onConnect: ({ id, page }) => dispatch(connectRequest({ id, page })),
    onDeleteExp: gameID => dispatch(openDeleteExp(gameID)),
  })
)(Maker);
