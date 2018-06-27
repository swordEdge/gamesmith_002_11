/*
 * App container
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component, PropTypes, cloneElement } from 'react';
import Helmet from 'react-helmet';
import { throttle } from 'lodash';

import Header from 'containers/Header';
import Footer from 'components/Footer';
import SideNav from 'containers/SideNav';

import Modals from 'containers/Modals';

import s from './styles.css';

const RESIZE = 'resize';

class App extends Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    window: { height: 0, width: 0 },
    document: { height: 0, width: 0 },
  };

  componentDidMount() {
    // resize event listener for win/doc width/height
    this.onResize();
    this.onResizeThrottled = throttle(this.onResize, 250);
    window.addEventListener(RESIZE, this.onResizeThrottled);
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.onResizeThrottled);
  }

  onResize = () => {
    const win = window;
    const doc = document;
    const body = doc.documentElement;
    this.setState({
      window: {
        height: win.innerHeight,
        width: win.innerWidth,
      },
      document: {
        height: body.clientHeight,
        width: body.clientWidth,
      },
    });
  }

  render() {
    const { children, location } = this.props;
    const page = cloneElement(children, {
      win: this.state.window,
      doc: this.state.document,
    });

    return (
      <div className={s.root}>
        <Helmet
          titleTemplate="%s - Gamesmith"
          defaultTitle="Gamesmith"
          meta={[
            { name: 'description', content: 'The Place for Game Makers' },
          ]} />
        <Header location={location} />
        <SideNav />
        {page}
        <Footer/>
        <Modals location={location} params={this.props.params}/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default App;
