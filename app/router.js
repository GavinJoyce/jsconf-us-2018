import EmberPresentRouter from 'ember-present/routing/router';
import config from './config/environment';

const Router = EmberPresentRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('preview', function() {
    this.route('all');
    this.route('screen-and-presenter');
  });

  this.route('login');

  this.route('auth', { path: '/' }, function() {

    this.route('slides', function() {
      //title
      this.slide('01-title', { transition: 'slide' });

      //intro
      this.slide('02a-intercom-logo', { transition: 'slide' });
      this.slide('02b-intercom-homepage', { transition: 'slide' });
      this.slide('02c-intercom-embercom', { transition: 'slide' });
      this.slide('02d-books', { transition: 'slide' });
      this.slide('02e-people', { transition: 'slide' });
      this.slide('02f-intercomics', { transition: 'slide' });
      this.slide('02g-events-sf', { transition: 'slide' });
      this.slide('02h-events-london', { transition: 'slide' });
      this.slide('02i-events-dublin', { transition: 'slide' });
      this.slide('02j-vicar-st-empty', { transition: 'slide' });
      this.slide('02k-vicar-st-full', { transition: 'slide' });

      //previous talks
      this.slide('03a-tech', { transition: 'slide' });
      this.slide('03b-vicar-st-symphony', { transition: 'slide' });
      this.slide('03c-vicar-st-freeze', { transition: 'slide' });
      this.slide('03d-vicar-st-error', { transition: 'slide' });
      this.slide('03e-emberconf', { transition: 'slide' });
      this.slide('03f-emberconf-errors', { transition: 'slide' });
      this.slide('03g-emberconf-working', { transition: 'slide' });

      //ember-present
      this.slide('04a-ember-present', { transition: 'slide' });
      this.slide('04b-ember-install-ember-present', { transition: 'slide' });
      this.slide('04c-router', { transition: 'slide' });
      this.slide('04d-slide-components', { transition: 'slide' });
      this.slide('04e-beginning', { transition: 'slide' });
      this.slide('04f-middle', { transition: 'slide' });
      this.slide('04g-end', { transition: 'slide' });
      this.slide('04h-slide-role-components', { transition: 'slide' });
      this.slide('04i-screen-and-presenter', { transition: 'slide' });
      this.slide('04j-screen-presenter-and-audience', { transition: 'slide' });
      this.slide('04k-code-snippets', { transition: 'slide' });
      this.slide('04l-video', { transition: 'slide' });
      this.slide('04m-background-colors', { transition: 'slide' });
      this.slide('04n-tailwind-css-colors', { transition: 'slide' });
      this.slide('04o-scaling-slides', { transition: 'slide' });
      this.slide('04p-pointer', { transition: 'slide' });

      //ember-present addons
      this.slide('05a-animated-guide-to-ember-app', { transition: 'slide' });
      this.slide('05b-animated-guide-to-ember-vms', { transition: 'slide' });
      this.slide('05c-animated-guide-to-ember-vm-internals', { transition: 'slide' });
      this.slide('05d-ember-concurrency-machty', { transition: 'slide' });
      this.slide('05e-ember-concurrency-ember-present', { transition: 'slide' });
      this.slide('05f-ember-concurrency-none', { transition: 'slide' });
      this.slide('05g-ember-concurrency-drop', { transition: 'slide' });
      this.slide('05h-ember-concurrency-enqueue', { transition: 'slide' });
      this.slide('05i-ember-animated-video', { transition: 'slide' });
      this.slide('05j-ember-animated-list', {  });
      this.slide('05k-ember-animated-transition', { });

      //realtime sounds
      this.slide('06a-login', { transition: 'slide' });
      this.slide('06b-realtime-drums', { transition: 'slide' });
      this.slide('06c-latency-graph', { transition: 'slide' });
      this.slide('06d-latency-video', { transition: 'slide' });
      this.slide('06e-clock-drift-graph', { transition: 'slide' });
      this.slide('06f-synchronised-drums', { transition: 'slide' });

      //beethoven's 5th
      this.slide('07a-beethovens-5th', { transition: 'slide' });

      //Ableton live
      this.slide('08a-left-middle-right', { transition: 'slide' });
      this.slide('08b-live-technology', { transition: 'slide' });
      this.slide('08c-live-song', { transition: 'slide' });

      //thanks
      this.slide('09-thanks', { transition: 'slide' });
    });
  });
});

export default Router;
