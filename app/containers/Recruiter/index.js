/*
 * Recruiter container
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import {
  recruiterRequest,
  postedJobRequest,
  addJobRequest,
 } from './actions';

import { connectRequest } from 'containers/App/actions';
import {
  selectRecruiter,
  selectJobs,
} from './selectors';

import { selectUser } from 'containers/App/selectors';

import AddJobForm from 'components/AddJobForm';
import JobCard from 'components/JobCard';

import Avatar from 'components/UI/Avatar';
import Button from 'components/UI/Button';

import s from './styles.css';

class Recruiter extends Component {
  state = {
    isPostingJob: false,
  }

  componentWillMount() {
    const { params: { makerID }, user, onGetMaker, onGetJobs } = this.props;
    onGetMaker(makerID === 'me' ? user.id : makerID);
    onGetJobs(makerID === 'me' ? user.id : makerID);
  }

  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    dispatch(addJobRequest({ values, resolve, reject, toggle: this.togglePostJob }));
  });

  togglePostJob = () => {
    this.setState({
      isPostingJob: !this.state.isPostingJob,
    });
  }

  render() {
    const { params: { makerID }, win, user, jobs, onInvite, onConnect } = this.props; // eslint-disable-line
    // redirect to recruiter page if needed
    const currUser = makerID === 'me';
    const m = user.recruiter || {};
    let history;
    let button;

    const postJob = (
      <section className={s.history}>
        <div className={`${s.top} ${s.cusTop}`}>
          <nav className={s.backLink}>
            <Link onClick={this.togglePostJob}><i className="icon-arrow-left" /> Back to Profile</Link>
          </nav>
          <h1>Posting a Job</h1>
        </div>
        <div className={s.games}>
          <AddJobForm
            showImageUpload={({}.hasOwnProperty.call(user, 'recruiter'))}
            onSubmit={this.onSubmit} />
        </div>
      </section>
    );

    // if (win.width > 767) {
      history = (
        <section className={s.history}>
          <div className={s.top}>
            <h1>Jobs</h1>
            <Button text="Post a Job" onClick={this.togglePostJob} />
          </div>
          <div className={s.games}>
            {jobs && jobs.length > 0 ? jobs.map((j, idx) => (
              <JobCard
                key={idx}
                id={j.id}
                title={j.role.name}
                location={j.location}
                recruiter/>
            )) : <h3>There are no jobs to display</h3>}
          </div>
        </section>
      );
    // }

    return (
      <main role="main" className={s.root}>
        <div className="row">
          <div className={s.profile}>
            <div className={s.user}>
              <Avatar className={s.avatar} linkTo="/recruiter" image={m.logo} firstName={m.firstName} lastName={m.lastName} />
              {m.firstName && <h3>{`${m.firstName} ${m.lastName || ''}`}</h3>}
              {m.currCompany && <h4>{m.currCompany}</h4>}
              {!currUser && m.claimed && <span className={s.verified} data-tooltip="Professionally verified by fellow game makers">Verified</span>}
              {button}
            </div>

            {(m.currGame || m.currCompany || m.location) && <div className={s.info}>
              <ul>
                {m.currGame && <li>
                  <i className="icon-controller"></i>
                  <span>{m.currGame}</span>
                </li>}
                {m.currCompany && <li>
                  <i className="icon-briefcase"></i>
                  <span>{m.currCompany}</span>
                </li>}
                {m.location && <li>
                  <i className="icon-pin"></i>
                  <span>{m.location}</span>
                </li>}
              </ul>
            </div>}
            {/*<Link to={`/maker/${makerID}/connections`} className={s.link}>Industry Connections</Link>*/}
            {/*<Link to={`/maker/${makerID}/games`} className={s.link}>Game History</Link>*/}
          </div>
          {this.state.isPostingJob ? postJob : history}
        </div>
      </main>
    );
  }
}

Recruiter.propTypes = {
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
  onGetMaker: PropTypes.func,
  onGetJobs: PropTypes.func,
  onMessage: PropTypes.func,
  onInvite: PropTypes.func,
  onAddExp: PropTypes.func,
  onConnect: PropTypes.func,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    recruiter: selectRecruiter(),
    jobs: selectJobs(),
  }),
  dispatch => ({
    dispatch,
    onGetMaker: id => dispatch(recruiterRequest(id)),
    onGetJobs: id => dispatch(postedJobRequest(id)),
    onConnect: ({ id, page }) => dispatch(connectRequest({ id, page })),
  })
)(Recruiter);
