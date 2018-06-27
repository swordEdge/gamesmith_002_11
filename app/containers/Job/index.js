/*
 * Job container
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { jobRequest, applyJobRequest } from './actions';
import { editJobRequest } from 'containers/Recruiter/actions';
import AddJobForm from 'components/AddJobForm';
import { openApplySms, openDeleteJob } from 'containers/Modals/actions';

import selectJob, { selectPhoneValidated } from './selectors';
import { selectUser } from 'containers/App/selectors';

import Button from 'components/UI/Button';
import JobLogo from 'components/UI/JobLogo';

import s from './styles.css';

class Job extends Component {
  state = {
    isEditingJob: false,
  }

  componentWillMount() {
    const { params: { jobID }, onGetJob } = this.props;
    onGetJob(jobID);
  }

  componentWillUpdate(nextProps) {
    const { params: { jobID }, onGetJob } = this.props;
    const nextID = nextProps.params.jobID;
    if (nextID !== jobID) {
      onGetJob(nextID);
    }
  }

  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    const { params: { jobID } } = this.props;
    dispatch(editJobRequest({ jobID, values, resolve, reject, toggle: this.toggleEditJob }));
  });

  toggleEditJob = () => {
    this.setState({
      isEditingJob: !this.state.isEditingJob,
    });
  }

  render() {
    const { params: { jobID }, isValidated, onApply, onValidate, onDelete } = this.props;
    const { user } = this.props;

    const { job: { location, description, imgUrl, company = {}, startDate, role = {}, recruiter = {}, applied }, isFetching, message } = this.props.job;
    const button = recruiter.id === user.id ?
      <div className={s.buttonContainer}>
        <Button
          text="Edit"
          className={s.buttons}
          onClick={this.toggleEditJob}/><Button
            text="Delete"
            color="transparent"
            className={s.buttons}
            onClick={() => onDelete(jobID)}/>
      </div> : <Button
        text={applied ? 'Applied' : 'Interested'}
        color={applied ? 'transparent-job' : 'yellow'}
        className={s.button}
        disabled={applied}
        onClick={isValidated ? () => onApply(jobID) : onValidate} />;

    const editJob = (
      <div>
        <div className={s.top}>
          <h1>Edit Job</h1>
        </div>
        <div className={s.job}>
          <AddJobForm
            showImageUpload={({}.hasOwnProperty.call(user, 'recruiter'))}
            onSubmit={this.onSubmit}
            initialValues={{
              role: role.name,
              company: company.name,
              startDate: startDate ? new Date(startDate) : '',
              location,
              description,
              imgUrl}}
            isEditingJob={this.state.isEditingJob}/>
        </div>
      </div>
    );

    const jobDescription = (
      <div>
        <div className={s.top}>
          <h1>{role.name}</h1>
        </div>
        {isFetching ?
          <div>
            <h3>{message}</h3>
            <div className={`loader ${s.loading}`}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div> : <div>{button}</div> }
        <div className={s.job}>
          {imgUrl ?
            <div className={s.logo}>
              <img src={imgUrl} alt="" style={{width: 190}}/>
            </div>
            :
            recruiter.logo ?
              <div className={s.logo}>
                <img src={recruiter.logo} alt="" style={{width: 190}}/>
              </div>
              :
              <div className={s.logo}>
                <h1>{company.name}</h1>
              </div>
          }
          <div className={`${s.data} ${!recruiter.logo && s.nologo}`}>
            <h2>
              {company.name}
            </h2>
            <h4>
              {location}
            </h4>
            <div className={s.description}>
              {description}
            </div>
            {isFetching ?
              <div>
                <h3>{message}</h3>
                <div className={`loader ${s.loading}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div> : <div>{button}</div> }
          </div>
        </div>
      </div>
    );

    return (
      <main role="main" className={s.root}>
        <nav className={s.nav}>
          <Link to="/jobs"><i className="icon-arrow-left" />Back to Jobs</Link>
        </nav>
        {this.state.isEditingJob ? editJob : jobDescription }
      </main>
    );
  }
}

Job.propTypes = {
  params: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  user: PropTypes.object,
  isValidated: PropTypes.bool.isRequired,
  onApply: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onGetJob: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    job: selectJob(),
    user: selectUser(),
    isValidated: selectPhoneValidated(),
  }),
  dispatch => ({
    dispatch,
    onGetJob: id => dispatch(jobRequest(id)),
    onValidate: () => dispatch(openApplySms()),
    onApply: id => dispatch(applyJobRequest(id)),
    onDelete: id => dispatch(openDeleteJob(id)),
  })
)(Job);
