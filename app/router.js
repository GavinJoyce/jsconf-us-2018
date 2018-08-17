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
      this.slide('02a-intro', { transition: 'slide' });
      this.slide('02b-intercom', { transition: 'slide' });
      this.slide('02c-books', { transition: 'slide' });
      this.slide('02d-people', { transition: 'slide' });
      this.slide('02e-intercomics', { transition: 'slide' });
      this.slide('02f-events-sf', { transition: 'slide' });
      this.slide('02g-events-london', { transition: 'slide' });
      this.slide('02h-events-dublin', { transition: 'slide' });
      this.slide('02i-vicar-st-empty', { transition: 'slide' });
      this.slide('02j-vicar-st-full', { transition: 'slide' });

      //previous talks
      this.slide('03a-tech', { transition: 'slide' });
      this.slide('03b-vicar-st-symphony', { transition: 'slide' });
      this.slide('03c-vicar-st-freeze', { transition: 'slide' });
      this.slide('03d-vicar-st-error', { transition: 'slide' });
      this.slide('03e-emberconf', { transition: 'slide' });
      this.slide('03f-emberconf-working', { transition: 'slide' });
      this.slide('03g-emberconf-errors', { transition: 'slide' });

      //ember-present
      this.slide('04a-ember-present', { transition: 'slide' });
      this.slide('04z-pointer', { transition: 'slide' });

      //login
      this.slide('05-login', { transition: 'slide' });

      //realtime sounds
      this.slide('06a-realtime-drums', { transition: 'slide' });
      this.slide('06b-latency-graph', { transition: 'slide' });
      this.slide('06c-latency-video', { transition: 'slide' });
      this.slide('06d-clock-drift-graph', { transition: 'slide' });
      this.slide('06e-synchronised-drums', { transition: 'slide' });

      //beethoven's 5th
      this.slide('07a-beethovens-5th', { transition: 'slide' });

      //Ableton live
      this.slide('08a-left-middle-right', { transition: 'slide' });
      this.slide('08b-technology', { transition: 'slide' });
      this.slide('08c-song', { transition: 'slide' });

      //thanks
      this.slide('09-thanks', { transition: 'slide' });
    });
  });
});

export default Router;
