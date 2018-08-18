import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  latency: service(),
  hasTestedLatency: false,

  didInsertElement() {
    this._super(...arguments);

    this.addRealtimeListener('forceTestLatency', () => {
      this.get('_testLatencyTask').perform();
    });
  },

  actions: {
    testLatency() {
      this.get('_testLatencyTask').perform();
    }
  },

  _testLatencyTask: task(function * () {
    if (!this.get('hasTestedLatency')) {
      this.set('hasTestedLatency', true);
      yield timeout(Math.random() * 1000); //TODO: GJ: add jitter to service and remove this

      this.get('latency').testRealtimeLatency();
    }
   }).drop(),
});