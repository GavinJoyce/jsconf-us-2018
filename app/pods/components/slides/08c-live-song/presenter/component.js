import Component from '@ember/component';
import Realtime from 'ember-present/mixins/realtime';
import { task } from 'ember-concurrency';

export default Component.extend(Realtime, {
  actions: {
    assignPerson(instrument, section) {
      this.get('_assignPerson').perform(instrument, section);
    },
    unassignPerson(instrument) {
      this._unassignPerson(instrument);
    },

    play() {
      this.broadcastToRole('midi-gateway', 'liveControl', { command: 'play' });
    },

    stop() {
      this.broadcastToRole('midi-gateway', 'liveControl', { command: 'stop' });
    },

  },

  _assignPerson: task(function * (instrument, section) {
    this._unassignPerson(instrument);
    let user = yield this.get('getRandomUserWithMetadata').perform('section', section);

    if (user) {
      let socketId = user.socketId;
      this.get('realtime').emit('updateUserMetadata', { socketId, instrument });
    }
  }),

  _unassignPerson(instrument) {
    this.get('realtime').emit('clearMetadataByValue', 'instrument', instrument);
  },
});
