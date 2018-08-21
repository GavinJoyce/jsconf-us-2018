import { computed } from '@ember/object';
import Object from '@ember/object';
import { capitalize } from '@ember/string';
import Component from '@ember/component';
import { defer as rsvpDefer } from 'rsvp';
import { A } from '@ember/array';
import { task } from 'ember-concurrency';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

let Tracker = Object.extend({
  id: null,
  performTime: null,
  startTime: null,
  endTime: computed.oneWay('comp.timeElapsed'),
  comp: null,
  taskInstance: null,
  isCanceled: computed.oneWay('taskInstance.isCanceled'),
  state: computed('taskInstance.state', function() {
    return capitalize(this.get('taskInstance.state'));
  }),
  hasStarted: false,
});

export default Component.extend(InboundActions, {
  classNames: ['w-full'],
  task: null,
  trackers: null,
  timeElapsed: 0,
  startTime: null,
  nextId: 0,

  lowerLimit: computed('trackers.[]', function() {
    let trackers = this.get('trackers');
    if (!trackers) { return 0; }
    let v = Math.min(...trackers.mapBy('performTime'));
    return v;
  }),

  upperLimit: computed('timeElapsed', function() {
    let timeElapsed = this.get('timeElapsed');
    return Math.max(10000, timeElapsed);
  }),

  colors: undefined,
  labelHeights: undefined,

  ticker: task(function * () {
    while (true) {
      let now = +new Date();
      this.set('timeElapsed', now - this.startTime);

      let defer = rsvpDefer();
      window.requestAnimationFrame(defer.resolve);
      yield defer.promise;
    }
  }).drop(),

  init() {
    this._super(...arguments);

    this.set('colors', [ 'red', 'green', 'blue' ]);
    this.set('labelHeights', [ 0, 100, 200, 300, 400 ]);

    this.restart();
  },

  restart() {
    this.nextId = 0;
    this.set('trackers', A());
    this.get('ticker').cancelAll();
    this.set('timeElapsed', 0);
    this.startTime = 0;
  },

  actions: {
    startTask() {
      this.startTime = this.startTime || +new Date();
      let tracker = Tracker.create({
        id: this.nextId++,
        performTime: this.timeElapsed,
        comp: this,
        start: () => {
          tracker.set('hasStarted', true);
          tracker.set('startTime', this.timeElapsed);
        },
        end: () => {
          tracker.set('endTime', this.timeElapsed);
        },
      });

      let task = this.get('task');
      let taskInstance = task.perform(tracker);
      tracker.set('taskInstance', taskInstance);

      this.get('trackers').pushObject(tracker);
      this.get('ticker').perform();
    },

    cancelTasks() {
      this.get('task').cancelAll();
    },

    clearTasks() {
      this.restart();
    }
  }
});