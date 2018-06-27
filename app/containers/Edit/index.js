/*
 * Edit container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import moment from 'moment';
import { updateProfileRequest } from './actions';
import { getAutocompleteRequest } from 'containers/App/actions';
import { makerRequest } from 'containers/Maker/actions';
import { openEditEmail } from 'containers/Modals/actions';

import { selectEdit } from './selectors';
import { selectUser } from 'containers/App/selectors';
import { selectMaker } from 'containers/Maker/selectors';

import UpdateProfile from 'components/UpdateProfile';

import s from './styles.css';

class Edit extends Component {
  componentWillMount() {
    const { user, onGetMaker } = this.props;
    onGetMaker(user.id);
  }

  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    const { maker: { connections, credits, imgUrl } } = this.props;
    dispatch(updateProfileRequest({ values, resolve, reject, connections, credits, imgUrl }));
  });

  getSuggestions = data => this.props.handleAutoComplete(data);

  onNext = () => {
    const { dispatch } = this.props;
    dispatch(openEditEmail());
  }

  render() {
    const { user, maker, profile: { isFetching } } = this.props;
    return (
      <main role="main" className={s.root}>
        <div className={s.top}>
          <h1>Edit Profile Info</h1>
        </div>
        <div className={s.steps}>
          <UpdateProfile
            maker={maker}
            initialValues={{ ...user, ...maker,
              availableAt: maker.additionalInfo ? maker.additionalInfo[0] && maker.additionalInfo[0].availableAt ? moment(maker.availableDate).format('YYYY-MM-DD') : '' : '',
              isLinkedInUser: maker.additionalInfo ? maker.additionalInfo[0] && maker.additionalInfo[0].isLinkedInUser ? maker.additionalInfo[0].isLinkedInUser : false : false
            }}
            onSubmit={this.onSubmit}
            onGetSuggestions={this.getSuggestions}
            onEmail={this.onNext}
            isFetching={isFetching} />
        </div>
      </main>
    );
  }
}

Edit.propTypes = {
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
    additionalInfo: PropTypes.array,
  }),
  profile: PropTypes.object.isRequired,
  onGetMaker: PropTypes.func.isRequired,
  handleAutoComplete: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    user: selectUser(),
    maker: selectMaker(),
    profile: selectEdit(),
  }),
  dispatch => ({
    dispatch,
    onGetMaker: id => dispatch(makerRequest(id)),
    handleAutoComplete: data => dispatch(getAutocompleteRequest(data)),
  })
)(Edit);
