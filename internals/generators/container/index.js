/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Container',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantHeaders',
    default: false,
    message: 'Do you want headers?',
  }, {
    type: 'confirm',
    name: 'wantCSS',
    default: true,
    message: 'Does it have styling?',
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors/reducer tupel for this container?',
  }, {
    type: 'confirm',
    name: 'wantSagas',
    default: true,
    message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
  }, {
    type: 'confirm',
    name: 'wantTests',
    default: false,
    message: 'Do you want unit tests?',
  }],
  actions: (data) => {
    // Generate index.js
    const actions = [{
      type: 'add',
      path: '../../app/containers/{{properCase name}}/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }];

    // If they want a CSS file, add styles.css
    if (data.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/styles.css',
        templateFile: './container/styles.css.hbs',
        abortOnFail: true,
      });
    }

    // If they want unit tests, add tests.js
    if (data.wantTest) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/index.test.js',
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/selectors.js',
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });

      // Tests
      if (data.wantTest) {
        // Actions
        actions.push({
          type: 'add',
          path: '../../app/containers/{{properCase name}}/tests/actions.test.js',
          templateFile: './container/actions.test.js.hbs',
          abortOnFail: true,
        });

        // Selectors
        actions.push({
          type: 'add',
          path: '../../app/containers/{{properCase name}}/tests/selectors.test.js',
          templateFile: './container/selectors.test.js.hbs',
          abortOnFail: true,
        });

        // Reducers
        actions.push({
          type: 'add',
          path: '../../app/containers/{{properCase name}}/tests/reducer.test.js',
          templateFile: './container/reducer.test.js.hbs',
          abortOnFail: true,
        });
      }
    }

    // Sagas
    if (data.wantSagas) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/sagas.js',
        templateFile: './container/sagas.js.hbs',
        abortOnFail: true,
      });
      if (data.wantTests) {
        actions.push({
          type: 'add',
          path: '../../app/containers/{{properCase name}}/tests/sagas.test.js',
          templateFile: './container/sagas.test.js.hbs',
          abortOnFail: true,
        });
      }
    }

    return actions;
  },
};
