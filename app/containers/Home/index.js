/*
 * Home container
 *
 * This is the first thing users see, at the '/' route
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { linkedinAuth } from 'utils';

import { openSignUp } from 'containers/Modals/actions';

// import Partners from 'components/Partners';
import Supporters from 'components/Supporters';
import RightNow from 'components/RightNow';
import Button from 'components/UI/Button';

import bg1 from './img/bg1.jpg';
import bg2 from './img/bg2.jpg';
import bg3 from './img/bg3.jpg';
import bg4 from './img/bg4.jpg';

import s from './styles.css';

import {
  checkAuthToken,
} from 'utils';

const Home = ({ doc ,onSignUp}) => (
  <main role="main" className={s.root}>
    <section className={s.full} style={{ backgroundImage: `url(${bg1})` }}>
      <h1>The Place{doc && doc.width < 544 ? <br/> : ' '}for Game Makers</h1>
      {!checkAuthToken() ?
        <div>
          <p>Invite only. You have to have shipped a product to be accepted.</p>
          <Button onClick={onSignUp} text="apply" className={s.button}/>
        </div>
        : <div></div>
      }
    </section>
    <Supporters/>
    {/*<section className={s.left} style={{ backgroundImage: `url(${bg2})` }}>*/}
      {/*<div>*/}
        {/*<h2>Professional</h2>*/}
        {/*<p>Invite only. You have to have shipped a product to be invited.</p>*/}
      {/*</div>*/}
    {/*</section>*/}
    <section className={s.right} style={{ backgroundImage: `url(${bg3})` }} id="sec2">
      <div>
        <h2>Connect</h2>
        <p>Network with over 200,000 game professionals worldwide.</p>
      </div>
    </section>
    <section className={s.left} style={{ backgroundImage: `url(${bg4})` }}>
      <div>
        <h2>Discover</h2>
        <p>Supported by top-flight game studies. Gain credit for your work and apply directly to studios.</p>
      </div>
    </section>
    {/*<Partners/>*/}
    <RightNow
      title="Right Now"
      description="These users are taking advantage of the Gamesmith platform." />
  </main>
);

Home.propTypes = {
  doc: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  onSignUp: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
    onSignUp: () => dispatch(openSignUp())
  })
)(Home);
