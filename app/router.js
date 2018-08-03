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
    this.role('screen');
    this.role('presenter');
    this.role('audience');

    this.route('slides', function() {
      this.slide('01-title', { transition: 'slide' });
      this.slide('02a-intro', { transition: 'slide' });
      this.slide('03a-tech', { transition: 'slide' });
      this.slide('04a-ember-present', { transition: 'slide' });
      this.slide('05-login', { transition: 'slide' });
      this.slide('06a-realtime-drums', { transition: 'slide' });
      this.slide('07a-beethovens-5th', { transition: 'slide' });
      this.slide('08-thanks', { transition: 'slide' });
    });
  });
});

export default Router;
