import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  audio: service(),
  latency: service(),
  userAgent: service(),
  playingSound: undefined,

  didInsertElement() {
    this._super(...arguments);

    this.get('latency').testRealtimeLatencyIfRequired();

    this.addRealtimeListener('playSound', (data) => {
      let os = this.get('userAgent.os.info.name');

      if(data.targetOs === undefined || RegExp(data.targetOs).test(os)) {
        let latency = this.get('latency');

        latency.executeInSynchronizedFuture(data.delayInMs, data.serverTime, () => {
          if (this.isDestroyed) { return; } //TODO: GJ :task
          this.get('audio').play(data.sound);
          this.get('displaySound').perform(data.sound);
        });
      }
    });
  },

  displaySound: task(function * (sound) {
    this.set('playingSound', sound);
    yield timeout(300);
    this.set('playingSound', null);
  }).drop(),
});