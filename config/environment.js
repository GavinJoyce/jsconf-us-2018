'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'jsconf-us-2018',
    podModulePrefix: 'jsconf-us-2018/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    'ember-websockets': {
      socketIO: true
    },
    emberPresent: {
      socketServerUrl: 'http://localhost:5200',
      socketServerPort: 5200,
      roles: {
        presenter: {
          name: 'presenter',
          type: 'responsive',
          password: 'presenterpassword',
          canContolPresentation: true,
        },
        screen: {
          name: 'screen',
          type: 'scaled',
          password: 'screenpassword',
          canContolPresentation: true,
        },
        audience: {
          name: 'audience',
          type: 'responsive',
          canContolPresentation: false,
        },
        ableton: {
          name: 'ableton',
          type: 'responsive',
          password: 'abletonpassword',
          canContolPresentation: true,
        },
        'midi-gateway': {
          name: 'midi-gateway',
          password: 'midipassword',
          canContolPresentation: true,
        },
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.emberPresent = {
      socketServerUrl: 'http://34.226.118.128:5300',
      socketServerPort: 5300,
      roles: {
        presenter: {
          name: 'presenter',
          type: 'responsive',
          password: 'presenterpassword', //TODO: from ENV
        },
        screen: {
          name: 'screen',
          type: 'scaled',
          password: 'screenpassword',
        },
        audience: {
          name: 'audience',
          type: 'responsive',
        },
        ableton: {
          name: 'ableton',
          type: 'responsive',
          password: 'abletonpassword',
        },
        'midi-gateway': {
          name: 'midi-gateway',
          password: 'midipassword',
        },
      },
    };
  }

  return ENV;
};
