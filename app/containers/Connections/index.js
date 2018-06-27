/*
 * Connections container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import { makerRequest } from 'containers/Maker/actions';

import { selectUser } from 'containers/App/selectors';
import { selectMaker } from 'containers/Maker/selectors';

import MakerCard from 'components/MakerCard';

import s from './styles.css';

class Connections extends Component {
  componentWillMount() {
    const { params: { makerID }, user, onGetMaker } = this.props;
    onGetMaker(makerID === 'me' ? user.id : makerID);
  }

  componentWillUpdate(nextProps) {
    const { params: { makerID }, user, onGetMaker } = this.props;
    const nextID = nextProps.params.makerID;
    if (nextProps.params.makerID !== makerID) {
      onGetMaker(nextID === 'me' ? user.id : nextID);
    }
  }

  render() {
    const { params: { makerID }, user: { id }, doc, maker } = this.props;
    const m = maker || {};

    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to={`/maker/${makerID}`}><i className="icon-arrow-left" />Back to Profile</Link>
        </nav>
        <div className={s.top}>
          <h1>Industry Connections</h1>
        </div>
        <div className={s.makers}>
          {m.connections && m.connections.length > 0 ? m.connections.map((p, idx) => (
            <MakerCard
              key={idx}
              id={p.id}
              currID={id}
              avatar={p.imgUrl}
              firstName={p.firstName}
              lastName={p.lastName}
              width={doc.width}
              role={p.currRole}
              gameName={p.currGame}
              gameStudio={p.currCompany}
              connection="yes"
              claimed />
          )) : <h3>{makerID === 'me' ? "You haven't connected with any other makers yet." : "This maker hasn't connected with any others yet."}</h3>}
        </div>
      </main>
    );
  }
}

Connections.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
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
  onGetMaker: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
  }),
  dispatch => ({
    dispatch,
    onGetMaker: id => dispatch(makerRequest(id)),
  })
)(Connections);
