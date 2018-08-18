import Service from '@ember/service';
import { bind } from '@ember/runloop';
import { task, timeout } from 'ember-concurrency';

export default Service.extend({
  showTapReminder: false,
  emphasise: false,

  init() {
    this._super(...arguments);

    window.document.body.addEventListener(
      'touchmove',
      bind(this, this._userInteraction),
      { passive: false }
    );

    window.document.body.addEventListener(
      'touchstart',
      bind(this, this._userInteraction),
      { passive: false }
    );

    window.document.body.addEventListener(
      'click',
      bind(this, this._userInteraction),
      { passive: false }
    );

    this.get('scheduleReminder').perform();
  },

  _userInteraction() {
    this.get('scheduleReminder').perform();
  },

  scheduleReminder: task(function * () {
    this.set('showTapReminder', false);
    yield timeout(20000);
    this.set('showTapReminder', true);
    this.get('flash').perform();
  }).restartable(),

  flash: task(function * () {
    yield timeout(1000);
    this.toggleProperty('emphasise');
    this.get('flash').perform();
  }).restartable()
});