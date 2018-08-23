'use strict';

require('dotenv').config();

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
          canControlPresentation: true,
        },
        screen: {
          name: 'screen',
          type: 'scaled',
          password: 'screenpassword',
          canControlPresentation: true,
        },
        audience: {
          name: 'audience',
          type: 'responsive',
          canControlPresentation: false,
        },
        ableton: {
          name: 'ableton',
          type: 'responsive',
          password: 'abletonpassword',
          canControlPresentation: true,
        },
        'midi-gateway': {
          name: 'midi-gateway',
          password: 'midipassword',
          canControlPresentation: true,
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
      socketServerUrl: 'http://34.201.128.169:5300',
      socketServerPort: 5300,
      roles: {
        presenter: {
          name: 'presenter',
          type: 'responsive',
          password: process.env.PRESENTER_PASSWORD,
          canControlPresentation: true,
        },
        screen: {
          name: 'screen',
          type: 'scaled',
          password: process.env.SCREEN_PASSWORD,
          canControlPresentation: true,
        },
        audience: {
          name: 'audience',
          type: 'responsive',
          canControlPresentation: false,
        },
        ableton: {
          name: 'ableton',
          type: 'responsive',
          password: process.env.ABLETON_PASSWORD,
          canControlPresentation: true,
        },
        'midi-gateway': {
          name: 'midi-gateway',
          password: process.env.MIDI_GATEWAY_PASSWORD,
          canControlPresentation: true,
        },
      },
    };
  }

  return ENV;
};
