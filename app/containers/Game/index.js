/*
 * Game makers container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import { gameRequest } from './actions';

import { selectUser } from 'containers/App/selectors';
import {
  selectGame,
  selectIsFetching,
} from './selectors';

import MakerCard from 'components/MakerCard';

import s from './styles.css';

class Game extends Component {
  componentWillMount() {
    const { params: { gameID }, onGetGame } = this.props;
    onGetGame(gameID);
  }

  componentWillUpdate(nextProps) {
    const { params: { gameID }, onGetGame } = this.props;
    const nextID = nextProps.params.gameID;
    if (nextID !== gameID) {
      onGetGame(nextID);
    }
  }

  render() {
    const { user: { id }, doc, game, isFetching } = this.props;
    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to="/games"><i className="icon-arrow-left" />Back to Games</Link>
        </nav>
        <div className={s.top}>
          <h1>{game.name || ''}</h1>
        </div>
        <div className={s.makers}>
          {game.makers && game.makers.length > 0 ? game.makers.map((m, idx) => (
            <MakerCard
              key={idx}
              id={m.id}
              currID={id}
              avatar={m.imgUrl}
              firstName={m.firstName}
              lastName={m.lastName}
              width={doc.width}
              currRole={m.currRole}
              currGame={m.currGame}
              currCompany={m.currCompany}
              connection={m.connected ? 'yes' : m.connectPending ? 'pending' : 'no'}
              claimed={m.claimed} />
          )) : (!isFetching && <h3>This game has no makers to display</h3>)}
          {isFetching &&
          <div>
            <h3>Loading</h3>
            <div className="loader">
              <div />
              <div />
              <div />
            </div>
          </div>}
        </div>
      </main>
    );
  }
}

Game.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  params: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  onGetGame: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    isFetching: selectIsFetching(),
    user: selectUser(),
    game: selectGame(),
  }),
  dispatch => ({
    dispatch,
    onGetGame: id => dispatch(gameRequest(id)),
  })
)(Game);
