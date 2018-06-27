/*
 * Footer component
 */

import React from 'react';
import { Link } from 'react-router';

import s from './styles.css';
import {linkedinAuth} from '../../utils';
import Button from '../UI/Button';

import {checkAuthToken} from 'utils';

const Footer = () => (
  <footer className={s.root}>
    <div className={s.info}>
      <a>&copy; 2017 Gamesmith Inc.</a>
    </div>
    <nav className={s.nav}>
      <Link to="/terms">Terms & Privacy</Link>
    </nav>
    <div className={s.info}>
      <a href="mailto:support@gamesmith.com">support@gamesmith.com</a>
      <a href="mailto:sales@gamesmith.com">sales@gamesmith.com</a>
    </div>

  </footer>
);

export default Footer;
