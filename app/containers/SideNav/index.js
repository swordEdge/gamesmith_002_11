/*
 * Side nav container
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';

import Button from 'components/UI/Button';
import { getUserData } from 'utils';

import {
  logoutRequest,
  pendingRequest,
} from 'containers/App/actions';
import { hideSideNav } from './actions';

import { selectRequests } from 'containers/App/selectors';
import { selectShowNav } from './selectors';

import s from './styles.css';

class SideNav extends Component {
  state = {
    available: false,
  }

  onTouchStart = (evt) => {
    const nav = this.nav;
    nav.startX = evt.touches[0].pageX;
    nav.currentX = nav.startX;
    nav.touchingSideNav = true;
    requestAnimationFrame(this.update);
  }

  onTouchMove = (evt) => {
    const nav = this.nav;
    if (!nav.touchingSideNav) return;
    nav.currentX = evt.touches[0].pageX;
    const translateX = Math.min(0, nav.currentX - nav.startX);
    if (translateX < 0) evt.preventDefault();
  }

  onTouchEnd = () => {
    const nav = this.nav;
    const { onHideNav } = this.props;
    if (!nav.touchingSideNav) return;
    nav.touchingSideNav = false;
    const translateX = Math.min(0, nav.currentX - nav.startX);
    nav.style.transform = '';
    if (translateX < 0) onHideNav();
  }

  update = () => {
    const nav = this.nav;
    if (!nav.touchingSideNav) return;
    requestAnimationFrame(this.update);
    const translateX = Math.min(0, nav.currentX - nav.startX);
    nav.style.transform = `translateX(${translateX}px)`;
  }

  handleButton = () => {
    this.setState({ available: !this.state.available });
  }

  render() {
    const { showNav, requests, onHideNav, onLogout } = this.props;
    const { available } = this.state;
    const user = getUserData();
    const link = user && user.recruiter ? 'recruiter' : 'maker/me';

    return (
      <aside className={s.root} style={{ pointerEvents: showNav ? 'auto' : 'none' }}>
        <div className={s.overlay} style={{ opacity: showNav ? 1 : 0 }} onClick={onHideNav}></div>
        <nav
          className={s.nav}
          style={{ transform: showNav ? 'none' : 'translateX(-102%)' }}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          ref={(c) => { this.nav = c; }}>
          <ul>
            <li><Link to="/games" onClick={onHideNav}>Games<i className="icon-box" /></Link></li>
            <li><Link to="/people" onClick={onHideNav}>People<i className="icon-head" /></Link></li>
            <li><Link to="/jobs" onClick={onHideNav}>Jobs<i className="icon-briefcase" /></Link></li>
            <li><Link to="/forum" onClick={onHideNav}>Forum<i className="icon-web" /></Link></li>
            <li><Link to="/" onClick={onHideNav}>About<i className="icon-star" /></Link></li>
          </ul>
          <ul>
            <li><Link to={`/${link}`} onClick={onHideNav}>Profile<i className="icon-layout" /></Link></li>
            <li><Link to="/requests" onClick={onHideNav}>
              <div>Requests{requests && requests.length > 0 && <small>({requests.length})</small>}</div>
              <i className="icon-bell" /></Link>
            </li>
            <li><Link to="/settings" onClick={onHideNav}>Settings<i className="icon-cog" /></Link></li>
            <li><a onClick={onLogout}>Logout<i className="icon-power" /></a></li>
          </ul>
          {/*<Button*/}
            {/*text={available ? 'Go Unavailable' : 'Go Available'}*/}
            {/*color={available ? 'transparent' : 'yellow'}*/}
            {/*onClick={this.handleButton} />*/}
        </nav>
      </aside>
    );
  }
}

SideNav.propTypes = {
  showNav: PropTypes.bool.isRequired,
  requests: PropTypes.array.isRequired,
  onHideNav: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    showNav: selectShowNav(),
    requests: selectRequests(),
  }),
  dispatch => ({
    dispatch,
    onHideNav: () => dispatch(hideSideNav()),
    onGetRequests: () => dispatch(pendingRequest()),
    onLogout: () => {
      dispatch(hideSideNav());
      dispatch(logoutRequest());
    },
  })
)(SideNav);
