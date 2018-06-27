/*
 * Header component
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import DropdownMenu from 'react-dd-menu';
import { createStructuredSelector } from 'reselect';

import {
  logoutRequest,
  pendingRequest,
} from 'containers/App/actions';
import { showSideNav } from 'containers/SideNav/actions';
import {
  openSignIn,
  openSignUp,
  openDirectSignUp,
  openMessage,
  openCheckInbox,
  openRegistered,
  openCheckDetails,
  openAvailability,
} from 'containers/Modals/actions';
import {
  openMenu,
  closeMenu,
} from './actions';

import {
  selectAuth,
  selectUser,
  selectRequests,
} from 'containers/App/selectors';
import { selectIsOpen } from './selectors';

import { getUserData } from 'utils';

import Avatar from 'components/UI/Avatar';
import Button from 'components/UI/Button';

import logo from './svg/logo.svg';

import s from './styles.css';

class Header extends Component {
  state = {
    available: false,
  }

  getOffset = (element) => {
    if(element != null){
      let bounding = element.getBoundingClientRect();
      return {
        top: bounding.top + document.body.scrollTop,
        left: bounding.left + document.body.scrollLeft
      };
    }
  }

  handleScroll = () => {

    let navHeader = document.getElementById('fixed-header');
    let authNav = document.getElementById('auth-nav');
    let unauthNav = document.getElementById('unauth-nav');
    let startElement = document.getElementById('sec2');

    if(navHeader != null && startElement != null){
      let offset = this.getOffset(startElement);
      let windowsScrollTop  = window.pageYOffset;
      if(windowsScrollTop >= offset.top){
        if(authNav != null){
          navHeader.classList.remove("transparent__app-containers-Header-styles__lpZKO");
        } else if(unauthNav != null){
          navHeader.classList.remove("home__app-containers-Header-styles__1klet");
          navHeader.classList.remove("_1kletu3kH9siPkA8Wdc0Iz");
        }
        navHeader.classList.add("navbar-fixed-background");
      }else{
        navHeader.classList.remove("navbar-fixed-background");
        if(authNav != null){
          navHeader.classList.add("transparent__app-containers-Header-styles__lpZKO");
        } else if(unauthNav != null){
          navHeader.classList.add("home__app-containers-Header-styles__1klet");
          navHeader.classList.add("_1kletu3kH9siPkA8Wdc0Iz");
        }
      }
    }
  }

  componentDidMount() {

    window.addEventListener('scroll', this.handleScroll);

    const { location: { query }, user, authenticated, onSignIn, onMessage, onCheckInbox, onRegistered, onAvailability, onCheckDetails, onGetRequests } = this.props;
    if ({}.hasOwnProperty.call(query, 'login')) {
      onSignIn();
    } else if ({}.hasOwnProperty.call(query, 'error')) {
      if (query.code == 40002 ){
        onMessage('LogIn Failed', 'Linkedin auth failed. Please check if the code is incorrect/expired.');
      }else if (query.code == 40003 ){
        onMessage('Not Registered', 'You must receive an invite email and click on the claim button to register');
      }else if (query.code == 40004 ){
        onMessage('Wrong Credentials', 'No user found with the given credentials.');
      }else if (query.code == 40005 ){
        onMessage('Disabled', 'User has disabled messaging preferences.');
      }else{
        onMessage();
      }
    } else if ({}.hasOwnProperty.call(query, 'unauthorized')) {
      onMessage('Unauthorized', 'Your credentials have expired, please log in again.');
    } else if ({}.hasOwnProperty.call(query, 'checkInbox')) {
      onCheckInbox(query.email);
    } else if ({}.hasOwnProperty.call(query, 'checkDetails') && getUserData()) {
      onCheckDetails();
    } else if ({}.hasOwnProperty.call(query, 'registered')) {
      onRegistered();
    } else if ({}.hasOwnProperty.call(query, 'availability') && getUserData()) {
      onAvailability();
    } else if ({}.hasOwnProperty.call(query, 'updated')) {
      onMessage('Profile Updated!', 'blank');
    } else if ({}.hasOwnProperty.call(query, 'resetpassword')) {
      onMessage('Success','Password successfully changed.');
    } else if ({}.hasOwnProperty.call(query, 'welcome')) {
      onMessage('Welcome to Gamesmith!', 'blank');
    } else if (authenticated) {
      onGetRequests(user.id);
    } else if({}.hasOwnProperty.call(query, 'onboarding')){
      localStorage.setItem('onboarding', query.onboarding)
      onSignIn();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const { location: { query }, user, authenticated, onSignIn, onMessage, onCheckInbox, onRegistered, onAvailability, onCheckDetails, onGetRequests } = this.props;
    if ({}.hasOwnProperty.call(query, 'login')) {
      onSignIn();
    } else if ({}.hasOwnProperty.call(query, 'error')) {
      onMessage();
    } else if ({}.hasOwnProperty.call(query, 'unauthorized')) {
      onMessage('Unauthorized', 'Your credentials have expired, please log in again.');
    } else if ({}.hasOwnProperty.call(query, 'checkInbox')) {
      onCheckInbox();
    } else if ({}.hasOwnProperty.call(query, 'checkDetails') && getUserData()) {
      onCheckDetails(query.email);
    } else if ({}.hasOwnProperty.call(query, 'registered')) {
      onRegistered();
    } else if ({}.hasOwnProperty.call(query, 'availability') && getUserData()) {
      onAvailability();
    } else if ({}.hasOwnProperty.call(query, 'updated')) {
      onMessage('Profile Updated!', 'blank');
    } else if ({}.hasOwnProperty.call(query, 'welcome')) {
      onMessage('Welcome to Gamesmith!', 'blank');
    } else if (authenticated) {
      onGetRequests(user.id);
    } else if ({}.hasOwnProperty.call(query, 'resetpassword')) {
      onMessage('Success','Password successfully changed.');
    } else if({}.hasOwnProperty.call(query, 'onboarding')){
      localStorage.setItem('onboarding', query.onboarding)
      onSignIn();
    }
  }

  handleButton = () => {
    this.setState({ available: !this.state.available });
  }

  closeWindow = () => {
    const { dispatch } = this.props;
    if (window.opener) {
      window.opener.location = '/';
      // window.close();
    } else {
      dispatch(push('/'));
    }
  }

  render() {
    const { available } = this.state;
    const { location: { pathname }, user, requests, isOpen, onOpenMenu, onCloseMenu, onShowNav, onSignIn, onSignUp,onDirectSignUp,
      onLogout, authenticated } = this.props;
    const u = user.maker || user.recruiter || {};
    const link = user.recruiter ? 'recruiter' : 'maker/me';
    const menuOptions = {
      isOpen,
      className: `${s.menu} ${isOpen ? s.active : ''}`,
      close: onCloseMenu,
      closeOnInsideClick: false,
      enterTimeout: 150,
      leaveTimeout: 150,
      toggle: (
        <Avatar onClick={isOpen ? onCloseMenu : onOpenMenu} className={s.avatar} image={u.imgUrl || u.logo} firstName={u.firstName} lastName={u.lastName} withText />
      ),
    };
    let header;

    // this funky switch statement allows us to use regex to test against
    // the first slug in the url and render the header accordingly
    const test = (str) => {
      switch (true) {
        // if user is at the home path
        case /^\/$/.test(str):
          header = (
            <header className={`${s.root} ${authenticated ? s.transparent : s.home}`}  id="fixed-header">
              <input id="nav-toggle" type="checkbox" name="nav-toggle" className="hidden" />
              {authenticated && <label
                htmlFor="nav-toggle"
                className={s.toggle}
                onClick={onShowNav}>
                <div></div>
                <div></div>
                <div></div>
              </label> }
              <Link style={{ flex: '0 0 auto' }} to="/">
                <img className={s.logo} src={logo} alt="" />
              </Link>
              {authenticated ? <nav className={s.nav} id="auth-nav">
                  <div className={s.blank}></div>
                  <a className={pathname.indexOf('forum') === 1 ? s.active : ''} href="/forum">Forum</a>
                  <Link className={pathname.indexOf('games') === 1 ? s.active : ''} to="/games">Games</Link>
                  <Link className={pathname.indexOf('people') === 1 ? s.active : ''} to="/people">People</Link>
                  <Link className={pathname.indexOf('jobs') === 1 ? s.active : ''} to="/jobs">Jobs</Link>
                  <Link className={pathname.indexOf('home') === 1 ? s.active : ''} to="/">About</Link>
                  <DropdownMenu {...menuOptions}>
                    {/*<Button*/}
                      {/*text={available ? 'Go Unavailable' : 'Go Available'}*/}
                      {/*color={available ? 'transparent' : 'yellow'}*/}
                      {/*onClick={this.handleButton} />*/}
                    <li><Link to={`/${link}`} onClick={onCloseMenu}>Profile</Link></li>
                    <li><Link to="/requests" onClick={onCloseMenu}>Requests{requests && requests.length > 0 && <small>({requests.length})</small>}</Link></li>
                    <li><Link to="/settings" onClick={onCloseMenu}>Settings</Link></li>
                    <li><a onClick={onLogout}>Logout</a></li>
                  </DropdownMenu>
                </nav> :  <nav className={`${s.nav} ${s.home}`} id="unauth-nav">
                  <a href="/forum" style={{paddingRight:'10px'}}>Forum</a>
                  {/*<a onClick={onSignUp}>Invite Request</a>*/}
                  <Link to="/jobs" style={{paddingRight:'10px'}}>Industry Jobs</Link>
                  <Link to="/employers" style={{paddingRight:'10px'}}>Employers</Link>
                  <a onClick={onSignIn}>
                    <div>Sign In</div>
                  </a>
                </nav>}
            </header>
          );
          break;
        // if user is at any path that begins with /linkedin or /join
        case /^\/linkedin/.test(str):
        case /^\/join/.test(str):
        case /^\/verify/.test(str):
          header = (
            <header className={s.root} style={{ justifyContent: 'center' }}>
              <a onClick={this.closeWindow}><img className={s.logo} src={logo} alt="" /></a>
            </header>
          );
          break;
        default:
          header = (
            <header className={s.root} style={{ opacity: authenticated ? 1 : 0.8}}>
              <input id="nav-toggle" type="checkbox" name="nav-toggle" className="hidden" />
              {authenticated && <label
                htmlFor="nav-toggle"
                className={s.toggle}
                onClick={onShowNav}>
                <div></div>
                <div></div>
                <div></div>
              </label> }
              <Link style={{ flex: '0 0 auto' }} to="/">
                <img className={s.logo} src={logo} alt="" />
              </Link>
              {authenticated ? <nav className={s.nav}>
                <div className={s.blank}></div>
                <a className={pathname.indexOf('forum') === 1 ? s.active : ''} href="/forum">Forum</a>
                <Link className={pathname.indexOf('games') === 1 ? s.active : ''} to="/games">Games</Link>
                <Link className={pathname.indexOf('people') === 1 ? s.active : ''} to="/people">People</Link>
                <Link className={pathname.indexOf('jobs') === 1 ? s.active : ''} to="/jobs">Jobs</Link>
                <Link className={pathname.indexOf('/') === 1 ? s.active : ''} to="/">About</Link>
                <DropdownMenu {...menuOptions}>
                  {/*<Button*/}
                    {/*text={available ? 'Go Unavailable' : 'Go Available'}*/}
                    {/*color={available ? 'transparent' : 'yellow'}*/}
                    {/*onClick={this.handleButton} />*/}
                  <li><Link to={`/${link}`} onClick={onCloseMenu}>Profile</Link></li>
                  <li><Link to="/requests" onClick={onCloseMenu}>Requests{requests && requests.length > 0 && <small>({requests.length})</small>}</Link></li>
                  <li><Link to="/settings" onClick={onCloseMenu}>Settings</Link></li>
                  <li><a onClick={onLogout}>Logout</a></li>
                </DropdownMenu>
              </nav> : <nav className={s.nav}>
                <a className={pathname.indexOf('forum') === 1 ? s.active : ''} href="/forum">Forum</a>
                <a className={pathname.indexOf('jobs') === 1 ? s.active : ''} href="/jobs">Industry Jobs</a>
                <a className={pathname.indexOf('home') === 1 ? s.active : ''} href="/">About</a>
                <a onClick={onSignIn}>
                  <div>Sign In</div>
                </a>
              </nav>}
            </header>
          );
          break;
      }
    };

    test(pathname);

    return header;
  }
}

// var Hello = React.createClass({
//
//
//
//   render: function() {
//     return <div>
//       <div className="navbar navbar-default" ref="navbar" id="navbar" role="navigation">
//         <div className="container">
//           <div className="navbar-header">
//             <a className="navbar-brand" href="#">Project name</a>
//           </div>
//         </div>
//       </div>
//       <section id="sec1"></section>
//       <section id="sec2" ref="sec2"></section>
//       <section id="sec3"></section>
//     </div>;
//   }
// });


Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  requests: PropTypes.array.isRequired,
  authenticated: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpenMenu: PropTypes.func.isRequired,
  onCloseMenu: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onDirectSignUp: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  onCheckInbox: PropTypes.func.isRequired,
  onCheckDetails: PropTypes.func.isRequired,
  onRegistered: PropTypes.func.isRequired,
  onAvailability: PropTypes.func.isRequired,
  onShowNav: PropTypes.func.isRequired,
  onGetRequests: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({
    authenticated: selectAuth(),
    isOpen: selectIsOpen(),
    user: selectUser(),
    requests: selectRequests(),
  }),
  dispatch => ({
    dispatch,
    onOpenMenu: () => dispatch(openMenu()),
    onCloseMenu: () => dispatch(closeMenu()),
    onSignIn: () => dispatch(openSignIn()),
    onSignUp: () => dispatch(openSignUp()),
    onDirectSignUp: () => dispatch(openDirectSignUp()),
    onMessage: (title, message) => dispatch(openMessage(title, message)),
    onCheckInbox: (email) => dispatch(openCheckInbox(email)),
    onCheckDetails: () => dispatch(openCheckDetails()),
    onRegistered: () => dispatch(openRegistered()),
    onAvailability: () => dispatch(openAvailability()),
    onShowNav: () => dispatch(showSideNav()),
    onGetRequests: () => dispatch(pendingRequest()),
    onLogout: () => {
      dispatch(closeMenu());
      dispatch(logoutRequest());
    },
  })
)(Header);
