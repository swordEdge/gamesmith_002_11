/*
 * Employers container
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';

import EmployerForm from 'components/EmployerForm';
import studioImg from './img/gamesmith-studio-image.png';
import basicImg from './img/gamesmith-basic-image.png';

import s from './styles.css';
import { applyAsEmployerRequest } from './actions';

class Employers extends Component {

  onSubmit = (values, dispatch) => new Promise((resolve, reject) => {
    console.log('onSubmit');
    dispatch(applyAsEmployerRequest({ values, resolve, reject }));
  });

  render() {
    console.log('employers');
    return (
      <main role="main" className={s.root}>
        <div className={s.top}>
          <h2>The worlds elite game professionals are at your fingertips!</h2>
          <h3>Choose what is right for you!</h3>
        </div>
        <div className={s.content}>
          <div >
            <div>
              <h3 className={s.yellow}>Gamesmith Basic</h3>
              <div className={ `${s.customPadding} ${s.floating}`}>
                <img src={basicImg} alt="basic" width={170}/>
              </div>
              <div className={ `${s.customPadding} ${s.contentPadding}`}>
                <p>Free to join, free post jobs and hire! Receive candidate interest direct to your inbox. Source from over 188,000 game professionals</p>
              </div>
            </div>
            <div className={s.studioMargin}>
              <h3 className={s.yellow}>Gamesmith Studio</h3>
              <div className={ `${s.customPadding} ${s.floating}`}>
                <img src={studioImg} alt="studio" width={170} />
              </div>
              <div className={ `${s.customPadding} ${s.contentPadding}`}>
                <p>To match you with the best independent talent, we tailor our search to specific skills you are looking for. Our screening process includes reviewing previous projects and work history, plus skill assessment. You receive available candidates direct into your inbox.</p>
              </div>
            </div>
          </div>

          <div>
            <h3>Sign Up To Start Hiring</h3>
            <EmployerForm onSubmit={this.onSubmit} />
          </div>
        </div>
      </main>
    );
  }
}

Employers.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  createStructuredSelector({}),
  dispatch => ({
    dispatch,
  })
)(Employers);