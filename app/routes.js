/*
* These are the pages you can go to
*
* They are all wrapped in the App component, which should contain the navbar etc
* We are using verbose react-router plain routes here in order to support webpack
* code splitting for better performance
*
* See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
*/

import { getAsyncInjectors } from 'utils/asyncInjectors';
import appSaga from 'containers/App/sagas';
import makerSaga from 'containers/Maker/sagas';
import peopleSaga from 'containers/People/sagas';
import recruiterSaga from 'containers/Recruiter/sagas';
import {
  requireAuth,
  redirectAuth,
  linkedinAuth,
  getAuthToken,
  checkAuthToken,
  removeAuthToken,
  getUserData,
  removeUserData,
  redirectAuthSSO,
  setReturnUrl
} from 'utils';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = cb => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line

  // Init main sagas
  appSaga.concat(makerSaga).concat(peopleSaga).concat(recruiterSaga).forEach((saga) => {
    if (!Reflect.has(store.asyncSagas, saga)) {
      store.runSaga(saga);
      store.asyncSagas[saga] = true; // eslint-disable-line no-param-reassign
    }
  });

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        System.import('containers/Home')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
      // onEnter: redirectAuth(),
    }, {
      path: '/forum',
      name: 'forum',
      getComponent(nextState, cb) {
        const { location: { query } } = nextState;
        const importModules = Promise.all([
          System.import('containers/Forum/reducer'),
          System.import('containers/Forum/sagas'),
          System.import('containers/Forum'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('forum', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/forum/login',
      name: 'forumLogin',
      getComponent(nextState, cb) {
        const { location: { query } } = nextState;
        const importModules = Promise.all([
          System.import('containers/ForumLogin/reducer'),
          System.import('containers/ForumLogin/sagas'),
          System.import('containers/ForumLogin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('forumLogin', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: redirectAuthSSO(),
    }, {
      path: '/employers',
      name: 'employers',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Employers/reducer'),
          System.import('containers/Employers/sagas'),
          System.import('containers/Employers'),
        ]);

        const renderRoute = loadModule(cb);
        
        importModules.then(([reducer, sagas, component]) => {
          injectReducer('employers', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/linkedin',
      name: 'linkedin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Linkedin/reducer'),
          System.import('containers/Linkedin/sagas'),
          System.import('containers/Linkedin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('linkedin', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: (nextState, replace) => {
        const { location: { query } } = nextState;
        if (!{}.hasOwnProperty.call(query, 'code')) {
          if ({}.hasOwnProperty.call(query, 'getcode')) {
            linkedinAuth('print');
          } else {
            replace('/');
          }
        }
      },
    }, {
      path: '/resetpassword',
      name: 'resetpassword',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/ResetPassword/reducer'),
          System.import('containers/ResetPassword/sagas'),
          System.import('containers/ResetPassword'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('resetpassword', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/maker/:makerID',
      name: 'maker',
      getComponent(nextState, cb) {
        System.import('containers/Maker')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
      onEnter: (nextState, replace) => {
        setReturnUrl(nextState.location.pathname);
        if (!getAuthToken() || !getUserData()) {
          removeAuthToken();
          removeUserData();
          replace('/?login');
        } else if (!checkAuthToken()) {
          removeAuthToken();
          removeUserData();
          replace('/?unauthorized');
        } else {
          // if the user visits own ID slug redirect to /me
          const makerID = nextState.params.makerID.toString();
          const user = getUserData();
          if (user && user.id.toString() === makerID) {
            replace('/maker/me');
          }
        }
      },
    }, {
      path: '/maker/:makerID/connections',
      name: 'connections',
      getComponent(nextState, cb) {
        System.import('containers/Connections')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/maker/:makerID/games',
      name: 'history',
      getComponent(nextState, cb) {
        System.import('containers/GameHistory')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/maker/:makerID/game/:gameID',
      name: 'details',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/GameDetails/reducer'),
          System.import('containers/GameDetails'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('gameDetails', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/games',
      name: 'games',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Games/reducer'),
          System.import('containers/Games/sagas'),
          System.import('containers/Games'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('games', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/game/:gameID',
      name: 'game',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Game/reducer'),
          System.import('containers/Game/sagas'),
          System.import('containers/Game'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('game', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/join/maker/:id',
      name: 'join',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Join/reducer'),
          System.import('containers/Join/sagas'),
          System.import('containers/Join'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('join', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/people',
      name: 'people',
      getComponent(nextState, cb) {
        System.import('containers/People')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/jobs',
      name: 'jobs',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Jobs/reducer'),
          System.import('containers/Jobs/sagas'),
          System.import('containers/Jobs'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('jobs', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/job/:jobID',
      name: 'job',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Job/reducer'),
          System.import('containers/Job/sagas'),
          System.import('containers/Job'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('job', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/requests',
      name: 'requests',
      getComponent(nextState, cb) {
        System.import('containers/Requests')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/settings',
      name: 'settings',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Settings/reducer'),
          System.import('containers/Settings/sagas'),
          System.import('containers/Settings'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('settings', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/edit',
      name: 'edit',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Edit/reducer'),
          System.import('containers/Edit/sagas'),
          System.import('containers/Edit'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('profile', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/recruiter',
      name: 'recruiter',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Recruiter/reducer'),
          System.import('containers/Recruiter/sagas'),
          System.import('containers/Recruiter'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('recruiter', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/verify',
      name: 'verify',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Verify/reducer'),
          System.import('containers/Verify/sagas'),
          System.import('containers/Verify'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('verify', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      onEnter: requireAuth(),
    }, {
      path: '/unsubscribe/:code',
      name: 'unsubscribe',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Unsubscribe/reducer'),
          System.import('containers/Unsubscribe/sagas'),
          System.import('containers/Unsubscribe'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('unsubscribe', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/terms',
      name: 'terms',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Terms'),
        ]);
        const renderRoute = loadModule(cb);
        importModules.then(([component]) => {
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'error',
      getComponent(nextState, cb) {
        System.import('containers/Error')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
