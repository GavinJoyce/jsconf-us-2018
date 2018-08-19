import Component from '@ember/component';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { readOnly } from '@ember/object/computed';
import Realtime from 'ember-present/mixins/realtime';

export default Component.extend(Realtime, {
  audio: inject(),
  latency: inject(),
  session: inject(),
  beethoven12Audio: inject(),

  symphonyInstrument: readOnly('session.user.metadata.symphonyInstrument'),

  didInsertElement() {
    this._super(...arguments);

    this.get('latency').testRealtimeLatencyIfRequired();

    this.addRealtimeListener('assignSymphonyInstruments', () => {
      this.get('assignRandomInstrument').perform();
    });

    this.addRealtimeListener('playSymphony', (data) => {
      let latency = this.get('latency');
      let symphonyInstrument = this.get('symphonyInstrument');

      if(symphonyInstrument) {
        latency.executeInSynchronizedFuture(data.delayInMs, data.serverTime, () => {
          if (this.isDestroyed) { return; }
          this.get('audio').play(symphonyInstrument);
        });
      }
    });
  },

  assignRandomInstrument: task(function * () {
    let symphonyInstrument = this.get('beethoven12Audio').getRandomSound();

    yield timeout(Math.random() * 3000); //some jitter
    this.get('realtime').emit('updateUserMetadata', { symphonyInstrument });
  })
});