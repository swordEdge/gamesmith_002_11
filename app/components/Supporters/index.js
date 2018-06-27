/*
 * Supporters component
 */

import React from 'react';
import Slider from 'react-slick';

import bethesda from './img/bethesda.png';
import meewow from './img/meewow.png';
import evodant from './img/evodant.png';
import sega from './img/sega.png';
import koolbit from './img/koolbit.png';
import bandaiNamco from './img/bandai-namco.png';
import rubySeven from './img/ruby-seven.png';
import sixFoot from './img/sixfoot.png';
import camex from './img/camex.png';


import s from './styles.css';

const Supporters = () => {

  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    className: s.slider,
    speed: 1000,
    swipe: false,
    dragging: false,
    centerMode: true,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {breakpoint: 544, settings: {slidesToShow: 1, autoplaySpeed: 6000}},
      {breakpoint: 992, settings: {slidesToShow: 2, autoplaySpeed: 5000}},
      {breakpoint: 10000, settings: {slidesToShow: 3, autoplaySpeed: 4000}},
    ],
  };

  return (
    <section className={s.root}>
      <div>
        <h4>SUPPORTED BY</h4>
        <Slider {...sliderSettings}>
          <div className={s.supporter}>
            <div>
              <img src={bandaiNamco} alt="Bandai Namco" />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={meewow} alt="MeeWow" />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={sega} alt="Sega" width={250}/>
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={sixFoot} alt="Six Foot" width={300}/>
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={evodant} alt="Evodant" />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={bethesda} alt="Bethesda" />
            </div>
          </div>
          {/*<div className={s.supporter}>*/}
            {/*<div>*/}
              {/*<img src={koolbit} alt="Koolbit" />*/}
            {/*</div>*/}
          {/*</div>*/}
          <div className={s.supporter}>
            <div>
              <img src={rubySeven} alt="Ruby Seven" width={350} />
            </div>
          </div>
          <div className={s.supporter}>
            <div>
              <img src={camex} alt="Camex" width={300}/>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Supporters;
