/*
 * Requests container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import { pendingRequest } from 'containers/App/actions';

import { selectRequests } from 'containers/App/selectors';

import RequestCard from 'components/RequestCard';

import s from './styles.css';

class Requests extends Component {
  componentWillMount() {
    const { onGetRequests } = this.props;
    onGetRequests();
  }

  render() {
    const { requests } = this.props;
    
    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to="/maker/me"><i className="icon-arrow-left" />Back to Profile</Link>
        </nav>
        <div className={s.top}>
          <h1>Connection Requests</h1>
        </div>
        <div className={s.requests}>
          {requests && requests.length > 0 ? requests[0] && requests[0].makers ? requests[0].makers.map((p, idx) => (
            <RequestCard
              key={idx}
              id={p.id}
              avatar={p.imgUrl}
              firstName={p.firstName}
              lastName={p.lastName}
              role={p.currRole}
              company={p.currCompany} />
          )): '' : <h3>You don't have any pending connection requests.</h3>}
          {requests && requests.length > 0 ? requests[0] && requests[0].recruiter ? requests[0].recruiter.map((p, idx) => (
                <RequestCard
                  key={idx}
                  id={p.id}
                  avatar={p.imgUrl}
                  firstName={p.firstName}
                  lastName={p.lastName}
                  role={p.currRole}
                  company={p.currCompany} />
              )): '' : ''}
        </div>
      </main>
    );
  }
}

Requests.propTypes = {
  requests: PropTypes.array.isRequired,
  onGetRequests: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    requests: selectRequests(),
  }),
  dispatch => ({
    dispatch,
    onGetRequests: id => dispatch(pendingRequest(id)),
  })
)(Requests);
