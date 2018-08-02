import EmberPresentRouter from 'ember-present/routing/router';
import config from './config/environment';

const Router = EmberPresentRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('all');
  this.route('presenter-and-screen');

  this.route('login');

  this.route('auth', { path: '/' }, function() {
    this.slide('01-title');
    this.slide('02-intercom');
  });
});

export default Router;
