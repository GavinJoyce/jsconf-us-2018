import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { task, timeout } from 'ember-concurrency';

function * waitAMoment(tracker) {
  tracker.start();
  try {
    yield timeout(2000);
  } finally {
    tracker.end();
  }
}

export default Component.extend(Realtime, {
  taskToRun: task(waitAMoment).enqueue(),

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('startTask', () => {
      this.get('startTask').perform();
    });

    this.addRealtimeListener('cancelTasks', () => {
      this.get('cancelTasks').perform();
    });

    this.addRealtimeListener('clearTasks', () => {
      this.get('clearTasks').perform();
    });
  },

  startTask: task(function * () {
    this.get('concurrencyGraph').send('startTask');
    yield timeout(400);
  }),

  cancelTasks: task(function * () {
    this.get('concurrencyGraph').send('cancelTasks');
    yield timeout(400);
  }),

  clearTasks: task(function * () {
    this.get('concurrencyGraph').send('clearTasks');
    yield timeout(400);
  }),

});
