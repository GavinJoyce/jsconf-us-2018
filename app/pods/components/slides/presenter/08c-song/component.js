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
  },

  _assignPerson: task(function * (instrument, section) {
    this._unassignPerson(instrument);
    let user = yield this.get('getRandomUserWithMetadata').perform('section', section);

    if (user) {
      let socketId = user.socketId;
      this.get('realtime').emit('updateUserMetaData', { socketId, instrument });
    }
  }),

  _unassignPerson(instrument) {
    this.get('realtime').emit('clearMetadataByValue', 'instrument', instrument);
  },
});
