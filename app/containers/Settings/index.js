/*
 * Settings container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getSettingsRequest,
  updateSettingsRequest,
} from './actions';

import { selectSettings } from './selectors';
import { selectUser } from 'containers/App/selectors';

import SettingsForm from 'components/SettingsForm';

import s from './styles.css';

class Settings extends Component {
  componentWillMount() {
    const { onGetSettings } = this.props;
    onGetSettings();
  }

  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    const imgUrl = ({}.hasOwnProperty.call(this.props.user, 'recruiter')) ? this.props.user.recruiter.logo : null;
    const { user: { email } } = this.props;
    this.setState({ clicked: false });
    dispatch(updateSettingsRequest({ values, resolve, reject, email, imgUrl }));
  });

  render() {
    const { user, settings: { settings } } = this.props;
    const imgUrl = ({}.hasOwnProperty.call(user, 'recruiter')) ? user.recruiter.logo : null;
    // only recruiters can change their logos from the settings page
    // if logged in as a maker we disable image upload - this is done on the maker profile page instead
    return (
      <main role="main" className={s.root}>
        <div className={s.top}>
          <h1>Settings</h1>
        </div>
        <div className={s.steps}>
          <SettingsForm
            showImageUpload={({}.hasOwnProperty.call(user, 'recruiter'))}
            imgUrl={imgUrl}
            initialValues={settings}
            onSubmit={this.onSubmit} />
        </div>
      </main>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isSuperuser: PropTypes.bool.isRequired,
    maker: PropTypes.object,
    recruiter: PropTypes.object,
  }).isRequired,
  settings: PropTypes.object.isRequired,
  onGetSettings: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    settings: selectSettings(),
  }),
  dispatch => ({
    dispatch,
    onGetSettings: () => dispatch(getSettingsRequest()),
  })
)(Settings);
