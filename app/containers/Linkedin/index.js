/*
 * Linkedin container
 */

import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import {
  loginRequest,
  joinRequest,
  makerRequest,
} from './actions';

import s from './styles.css';

class Linkedin extends Component {
  componentDidMount() {
    const { location: { query }, dispatch, onLoginRequest, onJoinRequest, onMakerRequest } = this.props;
    if ({}.hasOwnProperty.call(query, 'code')) {
      if ({}.hasOwnProperty.call(query, 'state') && query.state === 'print') {
        // this is for dev/testing purposes to log an auth code without expiring it through a request
        this.root.querySelector('h2').style.display = 'none';
        this.root.querySelector('pre').style.display = 'block';
        this.root.querySelector('pre').innerHTML = query.code;
      } else if ({}.hasOwnProperty.call(query, 'state') && query.state === 'join') {
        // this will take the user to the join request flow
        onJoinRequest({ code: query.code });
      } else if ({}.hasOwnProperty.call(query, 'state') && query.state.length > 600) {
        // the length check is just to make sure the auth object is
        // contained in state, which should be ~700 characters long
        onMakerRequest({ code: query.code, token: query.state });
      } else if ({}.hasOwnProperty.call(query, 'state') && query.state === 'forum') {
        onLoginRequest({code: query.code, returnUrl: '/forum'});
      } else {
        // default action is to attempt to log the user in which will be successful
        // if the linkedin account is connected to an approved maker
        onLoginRequest({ code: query.code });
      }
    } else {
      dispatch(push('/'));
    }
  }

  render() {
    return (
      <main role="main" className={s.root} ref={(c) => { this.root = c; }}>
        <div className="loader"><div></div><div></div><div></div></div>
        <h2>Gamesmith uses LinkedIn to verify candidate ownership and protect users</h2>
        <pre style={{ display: 'none' }}></pre>
      </main>
    );
  }
}

Linkedin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  onLoginRequest: PropTypes.func.isRequired,
  onJoinRequest: PropTypes.func.isRequired,
  onMakerRequest: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
    onLoginRequest: ({ code, returnUrl }) => dispatch(loginRequest({ code, returnUrl })),
    onJoinRequest: ({ code }) => dispatch(joinRequest({ code })),
    onMakerRequest: ({ code, token }) => dispatch(makerRequest({ code, token })),
  })
)(Linkedin);
